/**
 * 装備ボーナス.対潜を計算し, これを返します.
 * @param { strign[] } attacker_ids 攻撃艦の艦船IDの配列
 * @param { strign[][] } slotitem_ids 攻撃艦が装備している装備の装備IDすべての配列.
 * @param { strign[][] } slotitem_levels 攻撃艦が装備している装備の改修値すべての配列.
 * @param { number } rows データ件数. 引数のそれぞれの配列サイズ.
 * @returns { number[] } 装備ボーナス.対潜
 * @customfunction
 */
function calc_tais_bonus(
  attacker_ids: string[],
  slotitem_ids: string[][],
  slotitem_levels: string[][],
  rows: number
): number[] {
  const bonus = calc_bonus(
    attacker_ids.map((e) => Number(e)),
    slotitem_ids.map((arr) => arr.map((e) => Number(e))),
    slotitem_levels.map((arr) => arr.map((e) => Number(e))),
    rows
  );
  return bonus.map((v) => v.tais || 0);
}

/**
 * 装備ボーナス雷撃を計算し, これを返します.
 * @param { strign[] } attacker_ids 攻撃艦の艦船IDの配列
 * @param { strign[][] } slotitem_ids 攻撃艦が装備している装備の装備IDすべての配列.
 * @param { strign[][] } slotitem_levels 攻撃艦が装備している装備の改修値すべての配列.
 * @param { number } rows データ件数. 引数のそれぞれの配列サイズ.
 * @returns { number[] } 装備ボーナス雷撃
 * @customfunction
 */
function calc_raig_bonus(
  attacker_ids: string[],
  slotitem_ids: string[][],
  slotitem_levels: string[][],
  rows: number
): number[] {
  const { ids, levels } = priority_filter(
    slotitem_ids.map((arr) => arr.map((e) => Number(e))),
    slotitem_levels.map((arr) => arr.map((e) => Number(e))),
    rows
  );

  const bonus = calc_bonus(
    attacker_ids.map((e) => Number(e)),
    ids,
    levels,
    rows
  );
  return bonus.map((v) => v.raig || 0);
}

/**
 * 装備ボーナスを計算し, これを返します.
 * @param { number[] } attacker_ids 攻撃艦の艦船IDの配列
 * @param { number[][] } slotitem_ids 攻撃艦が装備している装備の装備IDすべての配列.
 * @param { number[][] } slotitem_levels 攻撃艦が装備している装備の改修値すべての配列.
 * @param { number } rows データ件数. 引数のそれぞれの配列サイズ.
 * @returns { bonus_t[] } 装備ボーナス
 */
function calc_bonus(
  attacker_ids: number[],
  slotitem_ids: number[][],
  slotitem_levels: number[][],
  rows: number
): bonus_t[] {
  const result: bonus_t[] = [];

  for (let i = 0; i < rows; i++) {
    const attacker = build_attacker(
      attacker_ids[i] as number,
      slotitem_ids[i] as number[],
      slotitem_levels[i] as number[]
    );

    if (attacker === undefined) {
      const zero = {
        houg: 0,
        tyku: 0,
        kaih: 0,
        souk: 0,
        houm: 0,
        tais: 0,
        raig: 0,
      } as const;
      result.push(zero);
    } else {
      const bonuses_object = get_bonuses_object(attacker);
      const bonus = aggregate_bonuses(bonuses_object);
      result.push(bonus);
    }
  }

  return result;
}

/**
 * 引数から攻撃艦を構築してこれを返します. 構築できないときundefinedを返します.
 * @param { number } attacker_id 攻撃艦の艦船ID.
 * @param { number[] } slotitem_ids 攻撃艦が装備している装備の装備IDすべて.
 * @param { number[] } slotitem_levels 攻撃艦が装備している装備の改修値すべて.
 * @returns 構築した攻撃艦またはundefined
 */
function build_attacker(
  attacker_id: number,
  slotitem_ids: number[],
  slotitem_levels: number[]
): ship | undefined {
  const id = Number(attacker_id);
  const mst_ship = to_master(id, api_mst_ship);
  if (mst_ship === undefined) return undefined;

  const slot_size = Math.min(slotitem_ids.length, slotitem_levels.length);
  const slotitems: equipment[] = [];
  for (let i = 0; i < slot_size; i++) {
    const id = slotitem_ids[i] as number;
    const mst_slotitem = to_master(id, api_mst_slotitem);
    const level = slotitem_levels[i] as number;
    slotitems.push(new equipment(mst_slotitem, level));
  }

  return new ship(mst_ship, new slot(slotitems));
}

/**
 * 装備ボーナスオブジェクトを集計し, 装備ボーナスを返します.
 * @param { bonus_t[] } bonuses_object 装備ボーナスオブジェクト
 * @returns { bonus_t } 装備ボーナス
 */
function aggregate_bonuses(bonuses_object: bonus_t[]): bonus_t {
  const bonus = {
    houg: 0,
    tyku: 0,
    kaih: 0,
    souk: 0,
    houm: 0,
    tais: 0,
    raig: 0,
  };

  for (const e of bonuses_object) {
    bonus.houg += e.houg || 0;
    bonus.tyku += e.tyku || 0;
    bonus.kaih += e.kaih || 0;
    bonus.souk += e.souk || 0;
    bonus.houm += e.houm || 0;
    bonus.tais += e.tais || 0;
    bonus.raig += e.raig || 0;
  }

  return bonus;
}

/**
 * ある攻撃艦のための装備ボーナスオブジェクトを計算し, これを返します.
 * @param { ship } attacker 攻撃艦
 * @returns { bonus_t[] } 装備ボーナスオブジェクト
 */
function get_bonuses_object(attacker: ship): bonus_t[] {
  if (!attacker.slot.has_item()) return [];

  const result: bonus_t[] = [];

  const anti_air_radar = attacker.slot.count_anti_air_radar();
  const surface_radar = attacker.slot.count_surface_radar();
  const accuracy_radar = attacker.slot.count_accuracy_radar();

  for (const { types, ids, bonuses } of fit_bonuses) {
    if (!(types || ids) && bonuses) continue;

    const fit_slotitems = (function () {
      if (types) {
        return attacker.slot.items.filter((v) => types.includes(v.type2));
      }
      if (ids) {
        return attacker.slot.items.filter((v) => ids.includes(v.id));
      }
    })();
    if (!(fit_slotitems && fit_slotitems.length)) continue;

    for (const bonus of bonuses) {
      // 未改造判定
      if (bonus.shipS && !bonus.shipS.includes(attacker.original_id)) {
        continue;
      }

      // 艦型判定
      if (bonus.shipClass && !bonus.shipClass.includes(attacker.ctype)) {
        continue;
      }

      // 国籍判定
      if (
        bonus.shipNationality &&
        !bonus.shipNationality.includes(attacker.nationality)
      ) {
        continue;
      }

      // 艦種判定
      if (bonus.shipType && !bonus.shipType.includes(attacker.stype)) {
        continue;
      }

      // 艦船ID判定
      if (bonus.shipX && !bonus.shipX.includes(attacker.id)) {
        continue;
      }

      // 対空電探判定
      if (bonus.bonusAR && !anti_air_radar) {
        continue;
      }

      // 水上電探判定
      if (bonus.bonusSR && !surface_radar) {
        continue;
      }

      // 命中電探判定
      if (bonus.bonusAccR && !accuracy_radar) {
        continue;
      }

      if (bonus.requires) {
        const required_slotitems = bonus.requires;
        const required_level = bonus.requiresLevel || 0;
        const target_slotitems = attacker.slot.items.filter((v) =>
          required_slotitems.includes(v.id)
        );

        if (bonus.num && target_slotitems.length < bonus.num) {
          continue;
        }
        if (
          required_level &&
          !target_slotitems.some((v) => v.level >= required_level)
        ) {
          continue;
        }
        if (!target_slotitems.length) {
          continue;
        }
        // ?
        // if () { continue; }
      }

      if (
        bonus.requiresType &&
        !attacker.slot.items.some((v) => bonus.requiresType?.includes(v.type2))
      ) {
        continue;
      }

      // なぜかundefinedの可能性が無くならないので, 適当に変数に置く.
      const min_level = bonus.level;
      if (min_level) {
        const level_fits = fit_slotitems.filter((v) => v.level >= min_level);

        if (!level_fits.length) {
          continue;
        }

        if (bonus.num && level_fits.length < bonus.num) {
          continue;
        }

        if (!bonus.num) {
          for (let i = 0; i < level_fits.length; i++) {
            if (bonus.bonus) result.push(bonus.bonus);
          }
        } else {
          if (bonus.bonus) result.push(bonus.bonus);
        }
      } else if (bonus.num && fit_slotitems.length < bonus.num) {
        continue;
      } else if (!bonus.num) {
        for (let i = 0; i < fit_slotitems.length; i++) {
          if (bonus.bonus) result.push(bonus.bonus);
        }
      } else {
        if (bonus.bonus) result.push(bonus.bonus);
      }
    } // for bonus of bonuses
  } // for bonuses of fit_bonuses

  return result;
}

/**
 * @see https://x.com/Divinity_123/status/1854937456086311200
 * @see https://docs.google.com/spreadsheets/d/1pXwnNTIYkMYXwJqYA1-J2TQNyr_MF9eSdOr8r_guZY4/edit?gid=787357589#gid=787357589
 *
 * @param { number[][] } slotitem_ids 攻撃艦が装備している装備の装備IDすべての配列.
 * @param { number[][] } slotitem_levels 攻撃艦が装備している装備の改修値すべての配列.
 * @param { number } rows データ件数. 引数のそれぞれの配列サイズ.
 * @returns  { {ids: number[][], levels: number[][]} } 優先度でフィルタリングされた装備IDと改修値.
 */
function priority_filter(
  slotitem_ids: number[][],
  slotitem_levels: number[][],
  rows: number
) {
  const result_ids: number[][] = [];
  const result_levels: number[][] = [];

  // for self-stackable
  const get_filtered_value = function (
    id: number,
    ids: number[],
    levels: number[],
    slot_size: number
  ) {
    const temp_ids: number[] = [];
    const temp_levels: number[] = [];
    for (let i = 0; i < slot_size; i++) {
      if (ids[i] == id) {
        temp_ids.push(ids[i] as number);
        temp_levels.push(levels[i] as number);
      }
    }
    return { filtered_ids: temp_ids, filtered_levels: temp_levels };
  };

  // for no self-stackable
  const get_value_of_max_level = function (
    id: number,
    ids: number[],
    levels: number[]
  ) {
    let max_index = -Infinity;
    let max_level = -Infinity;
    for (let i = 0, len = Math.min(ids.length, levels.length); i < len; i++) {
      if (ids[i] == id && (levels[i] as number) > max_level) {
        max_level = levels[i] as number;
        max_index = i;
      }
    }
    return { id: ids[max_index] as number, level: levels[max_index] as number };
  };

  for (let row = 0; row < rows; row++) {
    const ids = slotitem_ids[row] as number[];
    const levels = slotitem_levels[row] as number[];
    const slot_size: number = Math.min(ids.length, levels.length);

    // // 522: 零式小型水上機
    // // 523: 零式小型水上機(熟練)
    if (ids.includes(522) || ids.includes(523)) {
      const {
        filtered_ids: filtered_ids_522,
        filtered_levels: filtered_levels_522,
      } = get_filtered_value(522, ids, levels, slot_size);

      const {
        filtered_ids: filtered_ids_523,
        filtered_levels: filtered_levels_523,
      } = get_filtered_value(523, ids, levels, slot_size);

      result_ids.push(filtered_ids_522.concat(filtered_ids_523));
      result_levels.push(filtered_levels_522.concat(filtered_levels_523));
      continue;
    }

    // // 238: 零式水上偵察機11型乙
    // // 239: 零式水上偵察機11型乙(熟練)
    if (ids.includes(238) || ids.includes(239)) {
      if (ids.includes(238)) {
        const { id, level } = get_value_of_max_level(238, ids, levels);
        result_ids.push([id]);
        result_levels.push([level]);
        continue;
      }

      if (ids.includes(239)) {
        const { id, level } = get_value_of_max_level(239, ids, levels);
        result_ids.push([id]);
        result_levels.push([level]);
        continue;
      }
    }

    // // 521: 紫雲(熟練)
    if (ids.includes(521)) {
      const { filtered_ids, filtered_levels } = get_filtered_value(
        521,
        ids,
        levels,
        slot_size
      );
      result_ids.push(filtered_ids);
      result_levels.push(filtered_levels);
      continue;
    }

    // // 118: 紫雲
    if (ids.includes(118)) {
      const { filtered_ids, filtered_levels } = get_filtered_value(
        118,
        ids,
        levels,
        slot_size
      );
      result_ids.push(filtered_ids);
      result_levels.push(filtered_levels);
      continue;
    }

    // // 369: Swordfish Mk.III改(水上機型/熟練)
    if (ids.includes(369)) {
      const { id, level } = get_value_of_max_level(369, ids, levels);
      result_ids.push([id]);
      result_levels.push([level]);
      continue;
    }

    // // 368: Swordfish Mk.III改(水上機型)
    if (ids.includes(368)) {
      const { id, level } = get_value_of_max_level(368, ids, levels);
      result_ids.push([id]);
      result_levels.push([level]);
      continue;
    }

    // // 372: 天山一二型甲
    if (ids.includes(372)) {
      const { id, level } = get_value_of_max_level(372, ids, levels);
      result_ids.push([id]);
      result_levels.push([level]);
      continue;
    }

    // // 373: 天山一二型甲改(空六号電探改装備機)
    if (ids.includes(373)) {
      const { id, level } = get_value_of_max_level(373, ids, levels);
      result_ids.push([id]);
      result_levels.push([level]);
      continue;
    }

    // // 374: 天山一二型甲改(熟練/空六号電探改装備機)
    if (ids.includes(374)) {
      const { id, level } = get_value_of_max_level(374, ids, levels);
      result_ids.push([id]);
      result_levels.push([level]);
      continue;
    }

    // // 425: Barracuda Mk.III
    if (ids.includes(425)) {
      const { filtered_ids, filtered_levels } = get_filtered_value(
        425,
        ids,
        levels,
        slot_size
      );
      result_ids.push(filtered_ids);
      result_levels.push(filtered_levels);
      continue;
    }

    // // 424: Barracuda Mk.II
    if (ids.includes(424)) {
      const { filtered_ids, filtered_levels } = get_filtered_value(
        424,
        ids,
        levels,
        slot_size
      );
      result_ids.push(filtered_ids);
      result_levels.push(filtered_levels);
      continue;
    }

    result_ids.push(ids);
    result_levels.push(levels);
  }

  return { ids: result_ids, levels: result_levels };
}
