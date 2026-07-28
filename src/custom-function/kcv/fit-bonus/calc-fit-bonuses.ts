namespace kcv {
  /**
   * @brief 装備ボーナスを求める.
   * @param { kcv.ship } attacker 攻撃艦
   * @param { kcv.eoen.bonus_equipment[] } bonus_list 74式ENのkcv.eoen.json
   * @returns 攻撃艦に付与する装備ボーナス.
   */
  export function calc_fit_bonuses(
    attacker: kcv.ship,
    bonus_list: kcv.eoen.bonus_equipment[],
  ): kcv.eoen.bonus_value {
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
      (e) => e && kcv.is_accuracy_radar(e.mst),
    );
    const has_surface_radar = attacker.equipments.some(
      (e) => e && kcv.is_surface_radar(e.mst),
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
    ids: number[] | undefined,
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
   * 装備ボーナスのベースとなる装備を抽出する
   * @param { kcv.ship} attacker 攻撃艦
   * @param { number[] } ids 装備ID
   * @returns 装備ボーナスのベースとなる装備
   */
  function extract_fit_equipments_by_ids(
    attacker: kcv.ship,
    ids: number[],
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
   * @param { number[] } types カテゴリID
   * @returns 装備ボーナスのベースとなる装備
   */
  function extract_fit_equipments_by_types(
    attacker: kcv.ship,
    types: number[],
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
   * @brief 指定された条件を満たしているかを検証する.
   * 満たしていないならば, ボーナス付与なし. 次のボーナスへ.
   * もとより指定されていなければ, 無条件として通過する.
   * @param { kcv.eoen.bonus_data } data
   * @param { kcv.ship } attacker 攻撃艦
   * @returns 条件を満たせばtrue.
   */
  function matches_data(
    data: kcv.eoen.bonus_data,
    attacker: kcv.ship,
  ): boolean {
    return (
      matches_ship(data, attacker) &&
      matches_required_id(data, attacker) &&
      matches_required_category(data, attacker)
    );
  }

  /**
   * @brief 指定された艦娘の条件を満たしているかを検証する.
   * もとより指定されていなければ, 無条件として通過する.
   * @param { kcv.eoen.bonus_data } bonus_data
   * @param { kcv.ship } attacker 攻撃艦
   * @returns 条件を満たせばtrue.
   */
  function matches_ship(
    bonus_data: kcv.eoen.bonus_data,
    attacker: kcv.ship,
  ): boolean {
    if (bonus_data.shipS && !bonus_data.shipS.includes(attacker.base_id)) {
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
   * @param { kcv.eoen.bonus_data } data
   * @param { kcv.ship } attacker 攻撃艦
   * @returns 条件を満たせばtrue.
   */
  function matches_required_id(
    data: kcv.eoen.bonus_data,
    attacker: kcv.ship,
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
   * @param { kcv.eoen.bonus_data } data
   * @param { kcv.ship } attacker 攻撃艦
   * @returns 条件を満たせばtrue.
   */
  function matches_required_category(
    data: kcv.eoen.bonus_data,
    attacker: kcv.ship,
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
} // namespace kcv
