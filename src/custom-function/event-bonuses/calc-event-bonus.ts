namespace event_bonuses {
  export function extract_event_bonus(
    attacker: attacker_t,
    map: event_bonuses.map,
    abyss_id: number,
    xal01: 0 | 1,
    phase: event_bonuses.phase
  ): event_bonuses.modifier[] {
    return event_bonuses.bonuses
      .filter((e) => matches_map(e.map, map))
      .flatMap((e) =>
        e.bonuses
          .filter(
            (bonus) =>
              matches_attacker(bonus.cnd, attacker) &&
              matches_equipment(bonus.cnd, attacker.slot) &&
              matches_abyss_ship(bonus.cnd, abyss_id) &&
              matches_xal01(bonus.cnd, xal01) &&
              matches_phase(bonus.cnd, phase)
          )
          .map((bonus) => bonus.mod)
      );
  }

  function matches_map(
    cnd: event_bonuses.map,
    map: event_bonuses.map
  ): boolean {
    if (cnd.maparea_id && cnd.maparea_id !== map.maparea_id) {
      return false;
    }

    if (cnd.mapinfo_no && cnd.mapinfo_no !== map.mapinfo_no) {
      return false;
    }

    // スプレから受け取ったmap.noは必ず単一の整数Nであるので, Number([N]) -> Nとできる.
    if (cnd.no && !cnd.no.includes(Number(map.no))) {
      return false;
    }

    return true;
  }

  function matches_attacker(
    cnd: event_bonuses.condition,
    attacker: attacker_t
  ): boolean {
    if (cnd.ship_id && !cnd.ship_id.includes(attacker.id)) {
      return false;
    }

    if (cnd.yomi && !cnd.yomi.includes(attacker.master.api_yomi)) {
      return false;
    }

    if (cnd.stype && !cnd.stype.includes(attacker.stype)) {
      return false;
    }

    if (cnd.ctype && !cnd.ctype.includes(attacker.ctype)) {
      return false;
    }

    if (cnd.nationality && !cnd.nationality.includes(attacker.nationality)) {
      return false;
    }

    return true;
  }

  function matches_equipment(
    cnd: event_bonuses.condition,
    equipments: slot_t
  ): boolean {
    if (cnd.equipment) {
      if (!equipments.items.some((e) => cnd.equipment?.id?.includes(e.id))) {
        return false;
      }
    }

    return true;
  }

  function matches_abyss_ship(
    cnd: event_bonuses.condition,
    abyss_id: number
  ): boolean {
    if (cnd.abyss_ship_id && !cnd.abyss_ship_id.includes(abyss_id)) {
      return false;
    }

    return true;
  }

  // 装甲破砕
  function matches_xal01(cnd: event_bonuses.condition, xal01: 0 | 1): boolean {
    if (cnd.xal01 && cnd.xal01 !== xal01) {
      return false;
    }

    return true;
  }

  function matches_phase(
    cnd: event_bonuses.condition,
    phase: event_bonuses.phase
  ): boolean {
    if (cnd.phase && !cnd.phase.includes(phase)) {
      return false;
    }

    return true;
  }
} // namespace event_bonuses

/**
 * 期間限定海域の第8種乗算補正値を計算し, これを返します.
 * @param { number[] } attacker_id 攻撃艦の艦船ID. 全ての行.
 * @param { number[][] } slotitem_ids 攻撃艦が装備している装備の装備ID. 全ての行.
 * @param { number[][] } slotitem_levels 攻撃艦が装備している装備の改修値. 全ての行.
 * @param { number[] } map_maparea_id #5-3-Pの5. 全ての行.
 * @param { number[] } map_map_info_id #5-3-Pの3. 全ての行.
 * @param { number[] } map_no #5-3-PのPに対応する16. 全ての行.
 * @param { number[] } abyss_id 防御艦の艦船ID. 全ての行.
 * @param { 0 | 1 } xal01 装甲破砕. 全ての行.
 * @param { ("航空戦" | "砲撃戦" | "雷撃戦" | "夜戦")[] } phase 戦闘フェーズ. 全ての行.
 * @param { number } rows 入力行数.
 * @returns { number[] } 期間限定海域の第8種乗算補正値.
 * @customfunction エントリーポイント. 1次元配列を受け取ると2次元配列になる.
 * 行数を取得しているため, インデックスアクセスでundefinedとならない.
 */
function calc_event_bonus_a8(
  attacker_id: number[][],
  slotitem_ids: number[][],
  slotitem_levels: number[][],
  map_maparea_id: number[][],
  map_map_info_id: number[][],
  map_no: number[][],
  abyss_id: number[][],
  xal01: 0 | 1,
  phase: event_bonuses.phase,
  rows: number
): number[] {
  const result: number[] = [];

  for (let i = 0; i < rows; i++) {
    const bonus: number = calc_event_bonus_a8_per_row(
      (attacker_id[i] as number[])[0] as number,
      slotitem_ids[i] as number[],
      slotitem_levels[i] as number[],
      (map_maparea_id[i] as number[])[0] as number,
      (map_map_info_id[i] as number[])[0] as number,
      (map_no[i] as number[])[0] as number,
      (abyss_id[i] as number[])[0] as number,
      xal01,
      phase[i] as event_bonuses.phase
    );
    result.push(bonus);
  }

  return result;
}

function calc_event_bonus_a8_per_row(
  attacker_id: number,
  slotitem_ids: number[],
  slotitem_levels: number[],
  map_maparea_id: number,
  map_map_info_id: number,
  map_no: number,
  abyss_id: number,
  xal01: 0 | 1,
  phase: event_bonuses.phase
): number {
  const attacker = build_attacker(attacker_id, slotitem_ids, slotitem_levels);
  if (!attacker) return NaN;

  const map: event_bonuses.map = {
    maparea_id: map_maparea_id,
    mapinfo_no: map_map_info_id,
    no: [map_no],
  };

  return event_bonuses
    .extract_event_bonus(attacker, map, abyss_id, xal01, phase)
    .reduce((acc, bonus) => {
      if (!bonus.a8) return acc;
      return bonus.a8.sup
        ? (acc * (bonus.a8.min + bonus.a8.sup)) / 2
        : acc * bonus.a8.min;
    }, 1.0);
}

// a8とだいたい同じ
function calc_event_bonus_b2(): number[] {
  return [];
}
