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
  const bonus = calc_bonus(attacker_ids, slotitem_ids, slotitem_levels, rows);
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
  const bonus = calc_bonus(attacker_ids, slotitem_ids, slotitem_levels, rows);
  return bonus.map((v) => v.raig || 0);
}

/**
 * 装備ボーナスを計算し, これを返します.
 * @param { strign[] } attacker_ids 攻撃艦の艦船IDの配列
 * @param { strign[][] } slotitem_ids 攻撃艦が装備している装備の装備IDすべての配列.
 * @param { strign[][] } slotitem_levels 攻撃艦が装備している装備の改修値すべての配列.
 * @param { number } rows データ件数. 引数のそれぞれの配列サイズ.
 * @returns { bonus_t[] } 装備ボーナス
 */
function calc_bonus(
  attacker_ids: string[],
  slotitem_ids: string[][],
  slotitem_levels: string[][],
  rows: number
): bonus_t[] {
  const result: bonus_t[] = [];

  for (let i = 0; i < rows; i++) {
    const attacker = build_attacker(
      attacker_ids[i] as string,
      slotitem_ids[i] as string[],
      slotitem_levels[i] as string[]
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
 * @param attacker_id 攻撃艦の艦船ID.
 * @param slotitem_ids 攻撃艦が装備している装備の装備IDすべて.
 * @param slotitem_levels 攻撃艦が装備している装備の改修値すべて.
 * @returns 構築した攻撃艦またはundefined
 */
function build_attacker(
  attacker_id: string,
  slotitem_ids: string[],
  slotitem_levels: string[]
): attacker_t | undefined {
  const id = Number(attacker_id);
  const mst_ship = to_master(id, api_mst_ship);
  if (mst_ship === undefined) return undefined;

  // それぞれの配列長はslot_sizeであることにする.
  const slot_size = 6;
  const ids = slotitem_ids.map((v) => Number(v));
  // 空の装備の改修値を-1にする. 0にすると条件0以上で困るかもしれない.
  const levels = slotitem_levels.map((v) => (v === "" ? -1 : Number(v)));
  const slotitems: slotitem_t[] = [];
  for (let i = 0; i < slot_size; i++) {
    const id = ids[i] as number;
    const mst_slotitem = to_master(id, api_mst_slotitem);
    const level = levels[i] as number;
    slotitems.push(new slotitem_t(mst_slotitem, level));
  }

  return new attacker_t(mst_ship, new slot_t(slotitems));
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
 * @param { attacker_t } attacker 攻撃艦
 * @returns { bonus_t[] } 装備ボーナスオブジェクト
 */
function get_bonuses_object(attacker: attacker_t): bonus_t[] {
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
