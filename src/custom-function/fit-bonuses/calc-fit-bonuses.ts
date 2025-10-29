namespace fit_bonuses {
  /**
   * 装備ボーナスのベースとなる装備を抽出する
   * @param { kcv.ship} attacker 攻撃艦
   * @param { number[] } types カテゴリID
   * @returns 装備ボーナスのベースとなる装備
   */
  function extract_fit_equipments_by_types(
    attacker: kcv.ship,
    types: number[]
  ): kcv.equipment[] {
    let fit_equipmets: kcv.equipment[] = [];

    for (const equipmet of attacker.equipments) {
      if (equipmet) {
        const type: number = equipmet.mst.api_type[2] || -1;
        if (types.includes(type)) {
          fit_equipmets.push(equipmet);
        }
      }
    }

    return fit_equipmets;
  }

  /**
   * 装備ボーナスのベースとなる装備を抽出する
   * @param { kcv.ship} attacker 攻撃艦
   * @param { number[] } ids 装備ID
   * @returns 装備ボーナスのベースとなる装備
   */
  function extract_fit_equipments_by_ids(
    attacker: kcv.ship,
    ids: number[]
  ): kcv.equipment[] {
    let fit_equipments: kcv.equipment[] = [];

    for (const equipment of attacker.equipments) {
      if (equipment) {
        const id: number = equipment.mst.api_id;
        if (ids.includes(id)) {
          fit_equipments.push(equipment);
        }
      }
    }

    return fit_equipments;
  }

  /**
   * 装備ボーナスのベースとなる装備を抽出する
   * @param { kcv.ship} attacker 攻撃艦
   * @param { number[] | undefined } types カテゴリID
   * @param { number[] | undefined } ids 装備ID
   * @returns 装備ボーナスのベースとなる装備
   */
  function extract_fit_equipments(
    attacker: kcv.ship,
    types: number[] | undefined,
    ids: number[] | undefined
  ): kcv.equipment[] {
    if (types) {
      return extract_fit_equipments_by_types(attacker, types);
    }

    if (ids) {
      return extract_fit_equipments_by_ids(attacker, ids);
    }

    throw "not (types xor ids)";
  }

  /**
   * @brief 指定された艦娘の条件を満たしているかを検証する.
   * もとより指定されていなければ, 無条件として通過する.
   * @param { fit_bonuses.bonus_data } bonus_data
   * @param { kcv.ship } attacker 攻撃艦
   * @returns 条件を満たせばtrue.
   */
  function matches_ship(
    bonus_data: fit_bonuses.bonus_data,
    attacker: kcv.ship
  ): boolean {
    if (bonus_data.shipS && !bonus_data.shipS.includes(attacker.original_id)) {
      return false;
    }

    if (
      bonus_data.shipClass &&
      !bonus_data.shipClass.includes(attacker.mst.api_ctype)
    ) {
      return false;
    }

    if (
      bonus_data.shipNationality &&
      !bonus_data.shipNationality.includes(attacker.nationality)
    ) {
      return false;
    }

    if (
      bonus_data.shipType &&
      !bonus_data.shipType.includes(attacker.mst.api_stype)
    ) {
      return false;
    }

    if (bonus_data.shipX && !bonus_data.shipX.includes(attacker.mst.api_id)) {
      return false;
    }

    return true;
  }

  /**
   * @brief 指定された装備の条件を満たしているかを検証する.
   * もとより指定されていなければ, 無条件として通過する.
   * @param { fit_bonuses.bonus_data } data
   * @param { kcv.ship } attacker 攻撃艦
   * @returns 条件を満たせばtrue.
   */
  function matches_required_id(
    data: fit_bonuses.bonus_data,
    attacker: kcv.ship
  ): boolean {
    if (!data) {
      return true;
    }

    // count_if
    let count = 0;
    for (const equipmet of attacker.equipments) {
      if (equipmet) {
        if (!data.requiresLevel || data.requiresLevel <= equipmet.level) {
          count++;
        }
      }
    }

    return count >= (data.requiresNum || 1);
  }

  /**
   * @brief 指定された装備の条件を満たしているかを検証する.
   * もとより指定されていなければ, 無条件として通過する.
   * @param { fit_bonuses.bonus_data } data
   * @param { kcv.ship } attacker 攻撃艦
   * @returns 条件を満たせばtrue.
   */
  function matches_required_category(
    data: fit_bonuses.bonus_data,
    attacker: kcv.ship
  ): boolean {
    if (!data.requiresType) {
      return true;
    }

    // count_if
    let count = 0;
    for (const equipment of attacker.equipments) {
      if (equipment) {
        const type = equipment.mst.api_type[2] || -1;
        if (data.requiresType.includes(type)) {
          count++;
        }
      }
    }

    return count >= (data.requiresNumType || 1);
  }

  /**
   * @brief 指定された条件を満たしているかを検証する.
   * 満たしていないならば, ボーナス付与なし. 次のボーナスへ.
   * もとより指定されていなければ, 無条件として通過する.
   * @param { fit_bonuses.bonus_data } data
   * @param { kcv.ship } attacker 攻撃艦
   * @returns 条件を満たせばtrue.
   */
  function matches_data(
    data: fit_bonuses.bonus_data,
    attacker: kcv.ship
  ): boolean {
    return (
      matches_ship(data, attacker) &&
      matches_required_id(data, attacker) &&
      matches_required_category(data, attacker)
    );
  }

  /**
   * 指定した改修値以上の装備の個数を数え上げ, これを返す.
   * @param { kcv.equipment[] } fit_equipments 装備ボーナスのベースとなる装備
   * @param { number } level 改修値
   * @returns 指定した改修値以上の装備の個数.
   */
  function count_if(fit_equipments: kcv.equipment[], level: number): number {
    let count = 0;
    for (const equipment of fit_equipments) {
      if (equipment.level >= level) {
        count++;
      }
    }
    return count;
  }

  /**
   * @brief 装備ボーナスを求める.
   * @param { kcv.ship } attacker 攻撃艦
   * @param { fit_bonuses.bonus_equipment[] } bonus_list 74式ENのfit_bonuses.json
   * @returns 攻撃艦に付与する装備ボーナス.
   */
  export function calc_bonus(
    attacker: kcv.ship,
    bonus_list: fit_bonuses.bonus_equipment[]
  ): bonus_value {
    // 型をbonus_valueとするとreadonlyのため, 複合代入演算ができない.
    // 現状では, 雷装と対潜だけが必要.
    const total /*: bonus_value */ = {
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
    // const has_anti_air_radar = attacker.equipments.some(
    //   (e) => e && kcv.is_anti_air_radar(e.mst)
    // );
    const has_accuracy_radar = attacker.equipments.some(
      (e) => e && kcv.is_accuracy_radar(e.mst)
    );
    const has_surface_radar = attacker.equipments.some(
      (e) => e && kcv.is_surface_radar(e.mst)
    );

    for (const { types, ids, bonuses } of bonus_list) {
      const fit_equipmets = extract_fit_equipments(attacker, types, ids);
      if (fit_equipmets.length === 0) {
        continue;
      }

      for (const data of bonuses) {
        if (!matches_data(data, attacker)) {
          continue;
        }

        if (data.bonus) {
          const num = data.level
            ? count_if(fit_equipmets, data.level)
            : fit_equipmets.length;

          if (data.num) {
            if (num >= data.num) {
              total.raig += data.bonus.raig || 0;
              total.tais += data.bonus.tais || 0;
            }
          } else {
            total.raig += (data.bonus.raig || 0) * num;
            total.tais += (data.bonus.tais || 0) * num;
          }
        }

        // if (data.bonusAR && has_anti_air_radar) {
        //   total.tais += data.bonusAccR.tais || 0;
        //   total.raig += data.bonusAccR.raig || 0;
        // }

        if (data.bonusAccR && has_accuracy_radar) {
          // total.tais += data.bonusAccR.tais || 0;
          total.raig += data.bonusAccR.raig || 0;
        }

        if (data.bonusSR && has_surface_radar) {
          total.tais += data.bonusSR.tais || 0;
          total.raig += data.bonusSR.raig || 0;
        }
      }
    }

    return total;
  }
}

/**
 * 装備ボーナス.対潜を計算し, これを返します.
 * @param { number[] } attacker_ids 攻撃艦の艦船ID. 全ての行.
 * @param { number[][] } slotitem_ids 攻撃艦が装備している装備の装備ID. 全ての行.
 * @param { number[][] } slotitem_levels 攻撃艦が装備している装備の改修値. 全ての行.
 * @param { number } rows 入力行数.
 * @returns { number[] } 装備ボーナス.対潜
 * @customfunction エントリーポイント. 1次元配列を受け取ると2次元配列になる.
 * 行数を取得しているため, インデックスアクセスでundefinedとならない.
 */
function calc_tais_bonus(
  attacker_ids: number[][],
  slotitem_ids: number[][],
  slotitem_levels: number[][],
  rows: number
): number[] {
  const bonus = calc_bonus(
    attacker_ids.flat(),
    slotitem_ids,
    slotitem_levels,
    rows
  );
  return bonus.map((v) => v.tais || 0);
}

/**
 * 装備ボーナス.雷装を計算し, これを返します.
 * @param { number[] } attacker_ids 攻撃艦の艦船ID. 全ての行.
 * @param { number[][] } slotitem_ids 攻撃艦が装備している装備の装備ID. 全ての行.
 * @param { number[][] } slotitem_levels 攻撃艦が装備している装備の改修値. 全ての行.
 * @param { number } rows 入力行数.
 * @returns { number[] } 装備ボーナス.雷装
 * @customfunction エントリーポイント. 1次元配列を受け取ると2次元配列になる.
 * 行数を取得しているため, インデックスアクセスでundefinedとならない.
 */
function calc_raig_bonus(
  attacker_ids: number[][],
  slotitem_ids: number[][],
  slotitem_levels: number[][],
  rows: number
): number[] {
  const bonus = calc_bonus(
    attacker_ids.flat(),
    slotitem_ids,
    slotitem_levels,
    rows,
    temporarily_mysterious_modify
  );
  return bonus.map((v) => v.raig || 0);
}

/**
 * 装備ボーナスを計算し, これを返します.
 * @param { number[] } attacker_ids 攻撃艦の艦船IDの配列
 * @param { number[][] } slotitem_ids 攻撃艦が装備している装備の装備IDすべての配列.
 * @param { number[][] } slotitem_levels 攻撃艦が装備している装備の改修値すべての配列.
 * @param { number } rows データ件数. 引数のそれぞれの配列サイズ.
 * @returns { fit_bonuses.bonus_value[] } 装備ボーナス
 */
function calc_bonus(
  attacker_ids: number[],
  slotitem_ids: number[][],
  slotitem_levels: number[][],
  rows: number,
  attacker_mod_func: ((attacker: kcv.ship) => void) | null = null
): fit_bonuses.bonus_value[] {
  const result: fit_bonuses.bonus_value[] = [];
  const zero: fit_bonuses.bonus_value = {
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
      if (attacker_mod_func) attacker_mod_func(attacker);
      result.push(fit_bonuses.calc_bonus(attacker, fit_bonuses.fit_bonuses));
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
 * @returns 構築した攻撃艦またはundefined.
 */
function build_attacker(
  attacker_id: number,
  slotitem_ids: number[],
  slotitem_levels: number[]
): kcv.ship | undefined {
  const mst_ship = kcv.find_master(attacker_id, kcv.api_mst_ship);
  if (mst_ship === undefined) return undefined;

  const original_id = kcv.to_original_id(mst_ship);
  if (!original_id) return undefined;

  const nationality = kcv.to_nationality(mst_ship.api_sort_id);

  const slot_size = Math.min(slotitem_ids.length, slotitem_levels.length);
  const equipments: (kcv.equipment | undefined)[] = [];
  for (let i = 0; i < slot_size; i++) {
    const id = slotitem_ids[i] as number;
    const level = slotitem_levels[i] as number;
    const mst_slotitem = kcv.find_master(id, kcv.api_mst_slotitem);
    if (mst_slotitem) {
      equipments.push(new kcv.equipment(mst_slotitem, level));
    } else {
      equipments.push(undefined);
    }
  }

  return new kcv.ship(mst_ship, original_id, nationality, equipments);
}

/**
 * @see https://x.com/Divinity_123/status/1854937456086311200
 * @see https://docs.google.com/spreadsheets/d/1pXwnNTIYkMYXwJqYA1-J2TQNyr_MF9eSdOr8r_guZY4/edit?gid=787357589#gid=787357589
 * @param { kcv.ship } attacker 攻撃艦
 */
function temporarily_mysterious_modify(attacker: kcv.ship): void {
  // 偵察機
  {
    const rank = [522, 523, 238, 239, 521, 118, 369, 368];

    // 522: 零式小型水上機
    // 523: 零式小型水上機(熟練)
    // self-stackable
    if (
      attacker.equipments.some((e) => e && [522, 523].includes(e.mst.api_id))
    ) {
      const low_rank_equipments = rank.slice(rank.findIndex((e) => e === 238));
      for (let e of attacker.equipments) {
        if (e && low_rank_equipments.includes(e.mst.api_id)) e = undefined;
      }
      return;
    }

    // 238: 零式水上偵察機11型乙
    // 239: 零式水上偵察機11型乙(熟練)
    // no self-stackable
    if (
      attacker.equipments.some((e) => e && [238, 239].includes(e.mst.api_id))
    ) {
      let max_level = -Infinity;
      let index = 0;
      for (let i = 0, len = attacker.equipments.length; i < len; i++) {
        const e = attacker.equipments[i];
        if (e && [238, 239].includes(e.mst.api_id) && e.level > max_level) {
          max_level = e.level;
          index = i;
        }
      }

      const low_rank_equipments = rank.slice(rank.findIndex((e) => e === 238));
      for (let i = 0, len = attacker.equipments.length; i < len; i++) {
        const e = attacker.equipments[i];
        if (e && low_rank_equipments.includes(e.mst.api_id) && i !== index) {
          attacker.equipments[i] = undefined;
        }
      }

      return;
    }

    // 521: 紫雲(熟練)
    // self-stackable
    if (attacker.equipments.some((e) => e && [521].includes(e.mst.api_id))) {
      const low_rank_equipments = rank.slice(rank.findIndex((e) => e === 118));
      for (let e of attacker.equipments) {
        if (e && low_rank_equipments.includes(e.mst.api_id)) e = undefined;
      }

      return;
    }

    // 118: 紫雲
    // self-stackable
    if (attacker.equipments.some((e) => e && [118].includes(e.mst.api_id))) {
      const low_rank_equipments = rank.slice(rank.findIndex((e) => e === 369));
      for (let e of attacker.equipments) {
        if (e && low_rank_equipments.includes(e.mst.api_id)) e = undefined;
      }

      return;
    }

    // 369: Swordfish Mk.III改(水上機型/熟練)
    // no self-stackable
    if (attacker.equipments.some((e) => e && [369].includes(e.mst.api_id))) {
      let max_level = -Infinity;
      let index = 0;
      for (let i = 0, len = attacker.equipments.length; i < len; i++) {
        const e = attacker.equipments[i];
        if (e && [369].includes(e.mst.api_id) && e.level > max_level) {
          max_level = e.level;
          index = i;
        }
      }

      const low_rank_equipments = rank.slice(rank.findIndex((e) => e === 369));
      for (let i = 0, len = attacker.equipments.length; i < len; i++) {
        const e = attacker.equipments[i];
        if (e && low_rank_equipments.includes(e.mst.api_id) && i !== index) {
          attacker.equipments[i] = undefined;
        }
      }

      return;
    }

    // 368: Swordfish Mk.III改(水上機型)
    // no self-stackable
    if (attacker.equipments.some((e) => e && [368].includes(e.mst.api_id))) {
      let max_level = -Infinity;
      let index = 0;
      for (let i = 0, len = attacker.equipments.length; i < len; i++) {
        const e = attacker.equipments[i];
        if (e && [368].includes(e.mst.api_id) && e.level > max_level) {
          max_level = e.level;
          index = i;
        }
      }

      const low_rank_equipments = rank.slice(rank.findIndex((e) => e === 368));
      for (let i = 0, len = attacker.equipments.length; i < len; i++) {
        const e = attacker.equipments[i];
        if (e && low_rank_equipments.includes(e.mst.api_id) && i !== index) {
          attacker.equipments[i] = undefined;
        }
      }

      return;
    }
  }

  // 艦攻
  {
    const rank = [372, 373, 374, 425, 424];

    // 372: 天山一二型甲
    // no self-stackable
    if (attacker.equipments.some((e) => e && [372].includes(e.mst.api_id))) {
      let max_level = -Infinity;
      let index = 0;
      for (let i = 0, len = attacker.equipments.length; i < len; i++) {
        const e = attacker.equipments[i];
        if (e && [372].includes(e.mst.api_id) && e.level > max_level) {
          max_level = e.level;
          index = i;
        }
      }

      const low_rank_equipments = rank.slice(rank.findIndex((e) => e === 372));
      for (let i = 0, len = attacker.equipments.length; i < len; i++) {
        const e = attacker.equipments[i];
        if (e && low_rank_equipments.includes(e.mst.api_id) && i !== index) {
          attacker.equipments[i] = undefined;
        }
      }

      return;
    }

    // 373: 天山一二型甲改(空六号電探改装備機)
    // no self-stackable
    if (attacker.equipments.some((e) => e && [373].includes(e.mst.api_id))) {
      let max_level = -Infinity;
      let index = 0;
      for (let i = 0, len = attacker.equipments.length; i < len; i++) {
        const e = attacker.equipments[i];
        if (e && [373].includes(e.mst.api_id) && e.level > max_level) {
          max_level = e.level;
          index = i;
        }
      }

      const low_rank_equipments = rank.slice(rank.findIndex((e) => e === 373));
      for (let i = 0, len = attacker.equipments.length; i < len; i++) {
        const e = attacker.equipments[i];
        if (e && low_rank_equipments.includes(e.mst.api_id) && i !== index) {
          attacker.equipments[i] = undefined;
        }
      }

      return;
    }

    // 374: 天山一二型甲改(熟練/空六号電探改装備機)
    // no self-stackable
    if (attacker.equipments.some((e) => e && [374].includes(e.mst.api_id))) {
      let max_level = -Infinity;
      let index = 0;
      for (let i = 0, len = attacker.equipments.length; i < len; i++) {
        const e = attacker.equipments[i];
        if (e && [374].includes(e.mst.api_id) && e.level > max_level) {
          max_level = e.level;
          index = i;
        }
      }

      const low_rank_equipments = rank.slice(rank.findIndex((e) => e === 374));
      for (let i = 0, len = attacker.equipments.length; i < len; i++) {
        const e = attacker.equipments[i];
        if (e && low_rank_equipments.includes(e.mst.api_id) && i !== index) {
          attacker.equipments[i] = undefined;
        }
      }

      return;
    }

    // 425: Barracuda Mk.III
    // self-stackable
    if (attacker.equipments.some((e) => e && [425].includes(e.mst.api_id))) {
      const low_rank_equipments = rank.slice(rank.findIndex((e) => e === 424));
      for (let e of attacker.equipments) {
        if (e && low_rank_equipments.includes(e.mst.api_id)) e = undefined;
      }

      return;
    }

    // 424: Barracuda Mk.II
    // self-stackable
    if (attacker.equipments.some((e) => e && [425].includes(e.mst.api_id))) {
      //   const low_rank_equipments = rank.slice(rank.findIndex((e) => e === 0));
      //   for (let e of attacker.equipments) {
      //     if (e && low_rank_equipments.includes(e.mst.api_id)) e = undefined;
      //   }

      return;
    }
  }
}
