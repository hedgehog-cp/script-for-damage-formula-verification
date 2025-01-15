namespace fit_bonuses_ns {
  /// @brief 装備種3(カテゴリ)で指定された装備を搭載しているかを検証する.
  /// もとより指定されていなければ, 無条件として通過する.
  function matches_categories(categories: number[], attacker: ship): boolean {
    if (categories.length > 0) {
      const has_fit_equipment: boolean = attacker.slot.items.some(
        (e) => e.master && categories.includes(e.type2)
      );
      if (!has_fit_equipment) {
        return false;
      }
    }

    return true;
  }

  /// @brief 装備IDで指定された装備を搭載しているかを検証する.
  /// もとより指定されていなければ, 無条件として通過する.
  function matches_ids(ids: number[], attacker: ship): boolean {
    if (ids.length > 0) {
      const has_fit_equipment: boolean = attacker.slot.items.some(
        (e) => e.master && ids.includes(e.id)
      );
      if (!has_fit_equipment) {
        return false;
      }
    }

    return true;
  }

  /// @brief 指定された装備を搭載しているかを検証する.
  /// 搭載していないならば, ボーナス付与なし. 次のボーナスへ.
  /// もとより指定されていなければ, 無条件として通過する.
  function matches_bonus_equipment(
    bonus_equipment: bonus_equipment,
    attacker: ship
  ): boolean {
    const { types, ids, bonuses } = bonus_equipment;
    return (
      (!types || matches_categories(types, attacker)) &&
      (!ids || matches_ids(ids, attacker))
    );
  }

  /// @brief 指定された艦娘の条件を満たしているかを検証する.
  /// もとより指定されていなければ, 無条件として通過する.
  function matches_ship(bonus_data: bonus_data, attacker: ship): boolean {
    if (bonus_data.shipS && !bonus_data.shipS.includes(attacker.original_id)) {
      return false;
    }

    if (
      bonus_data.shipClass &&
      !bonus_data.shipClass.includes(attacker.ctype)
    ) {
      return false;
    }

    if (
      bonus_data.shipNationality &&
      !bonus_data.shipNationality.includes(attacker.nationality)
    ) {
      return false;
    }

    if (bonus_data.shipType && !bonus_data.shipType.includes(attacker.stype)) {
      return false;
    }

    if (bonus_data.shipX && !bonus_data.shipX.includes(attacker.id)) {
      return false;
    }

    return true;
  }

  /// @brief 指定された装備の条件を満たしているかを検証する.
  /// もとより指定されていなければ, 無条件として通過する.
  function matches_required_id(
    bonus_data: bonus_data,
    attacker: ship
  ): boolean {
    if (bonus_data.requires) {
      const count: number = attacker.slot.items.reduce((acc, e) => {
        if (!e.master) return acc;
        return bonus_data.requires?.includes(attacker.id) &&
          (!bonus_data.requiresLevel || e.level >= bonus_data.requiresLevel)
          ? acc + 1
          : acc;
      }, 0);
      if (count < (bonus_data.requiresNum || 1)) {
        return false;
      }
    }

    return true;
  }

  /// @brief 指定された装備の条件を満たしているかを検証する.
  /// もとより指定されていなければ, 無条件として通過する.
  function matches_required_category(
    bonus_data: bonus_data,
    attacker: ship
  ): boolean {
    if (bonus_data.requiresType) {
      const count: number = attacker.slot.items.reduce((acc, e) => {
        if (!e.master) return acc;
        return bonus_data.requiresType?.includes(e.type2) ? acc + 1 : acc;
      }, 0);
    }

    return true;
  }

  /// @brief 指定された条件を満たしているかを検証する.
  /// 満たしていないならば, ボーナス付与なし. 次のボーナスへ.
  /// もとより指定されていなければ, 無条件として通過する.
  function matches_bonus_data(bonus_data: bonus_data, attacker: ship): boolean {
    return (
      matches_ship(bonus_data, attacker) &&
      matches_required_id(bonus_data, attacker) &&
      matches_required_category(bonus_data, attacker)
    );
  }

  /// @brief 指定された条件を満たす装備の搭載数を数え上げる.
  function count_fit_equipment(
    attacker: ship,
    bonus_equipment: bonus_equipment,
    bonus_data: bonus_data
  ): number {
    const { types, ids, bonuses } = bonus_equipment;
    return attacker.slot.items.reduce((acc, e) => {
      if (!e.master) return acc;

      if (ids && !ids.includes(e.id)) {
        return acc;
      }

      if (types && !types.includes(e.type2)) {
        return acc;
      }

      if (bonus_data.level && e.level < bonus_data.level) {
        return acc;
      }

      return acc + 1;
    }, 0);
  }

  /// @brief 装備ボーナスを求める.
  export function calc_bonus(
    attacker: ship,
    bonus_list: bonus_equipment[]
  ): bonus_value {
    // 型をbonus_valueとするとreadonlyのため, 複合代入演算ができない.
    // 現状では, 雷装と対潜だけが必要.
    let total /*: bonus_value */ = {
      //   houg: 0,
      //   tyku: 0,
      //   kaih: 0,
      //   souk: 0,
      //   houm: 0,
      tais: 0,
      raig: 0,
      //   saku: 0,
      //   leng: 0,
      //   baku: 0,
    };

    // 現状, 対空電探は, 対潜ボーナス, 雷装ボーナスそれぞれへの影響が無いのでコメントアウト.
    // const has_anti_air_radar = attacker.slot.count_anti_air_radar();
    const has_accuracy_radar = attacker.slot.count_accuracy_radar();
    const has_surface_radar = attacker.slot.count_surface_radar();

    for (const bonus_equipment of bonus_list) {
      if (!matches_bonus_equipment(bonus_equipment, attacker)) continue;

      for (const bonus_data of bonus_equipment.bonuses) {
        if (!matches_bonus_data(bonus_data, attacker)) continue;

        if (bonus_data.bonus) {
          const count: number = count_fit_equipment(
            attacker,
            bonus_equipment,
            bonus_data
          );

          if (bonus_data.num && count < bonus_data.num) {
            // 算入しない
          } else if (
            bonus_data.num ||
            bonus_data.requires ||
            bonus_data.requiresType
          ) {
            total.tais += bonus_data.bonus.tais || 0;
            total.raig += bonus_data.bonus.raig || 0;
          } else {
            total.tais += (bonus_data.bonus.tais || 0) * count;
            total.raig += (bonus_data.bonus.raig || 0) * count;
          }
        }

        // if (bonus_data.bonusAR && has_anti_air_radar) {
        //   total.tais += bonus_data.bonusAccR.tais || 0;
        //   total.raig += bonus_data.bonusAccR.raig || 0;
        // }

        if (bonus_data.bonusAccR && has_accuracy_radar) {
          // total.tais += bonus_data.bonusAccR.tais || 0;
          total.raig += bonus_data.bonusAccR.raig || 0;
        }

        if (bonus_data.bonusSR && has_surface_radar) {
          total.tais += bonus_data.bonusSR.tais || 0;
          total.raig += bonus_data.bonusSR.raig || 0;
        }
      }
    }

    return total;
  }
}

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
 * @returns { fit_bonuses_ns.bonus_value[] } 装備ボーナス
 */
function calc_bonus(
  attacker_ids: number[],
  slotitem_ids: number[][],
  slotitem_levels: number[][],
  rows: number
): fit_bonuses_ns.bonus_value[] {
  const result: fit_bonuses_ns.bonus_value[] = [];
  const zero: fit_bonuses_ns.bonus_value = {
    houg: 0,
    tyku: 0,
    kaih: 0,
    souk: 0,
    houm: 0,
    tais: 0,
    raig: 0,
  } as const;

  for (let i = 0; i < rows; i++) {
    const attacker = build_attacker(
      attacker_ids[i] as number,
      slotitem_ids[i] as number[],
      slotitem_levels[i] as number[]
    );

    if (attacker) {
      const bonus: fit_bonuses_ns.bonus_value = fit_bonuses_ns.calc_bonus(
        attacker,
        fit_bonuses_ns.fit_bonuses
      );
      result.push(bonus);
    } else {
      result.push(zero);
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
