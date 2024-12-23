namespace event_bonuses {
  export function extract_event_bonus(
    attacker: attacker_t,
    map: event_bonuses.map,
    abyss_id: number,
    phase: event_bonuses.phase
  ) {
    return event_bonuses.bonuses
      .filter(
        (e) =>
          matches_attacker(e.cnd, attacker) &&
          matches_map(e.cnd, map) &&
          matches_abyss_ship(e.cnd, abyss_id) &&
          matches_phase(e.cnd, phase)
      )
      .map((e) => e.mod);
  }

  function matches_attacker(
    cnd: event_bonuses.condition,
    attacker: attacker_t
  ) {
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

  function matches_map(cnd: event_bonuses.condition, map: event_bonuses.map) {
    const matches_map_impl = function (
      cnd_map: event_bonuses.map,
      map: event_bonuses.map
    ) {
      if (cnd_map.maparea_id && cnd_map.maparea_id != map.maparea_id) {
        return false;
      }

      if (cnd_map.mapinfo_no && cnd_map.mapinfo_no != map.mapinfo_no) {
        return false;
      }

      // スプレから受け取ったmap.noは必ず単一の整数Nであるので, Number([N]) -> Nとできる.
      if (cnd_map.no && !cnd_map.no.includes(Number(map.no))) {
        return false;
      }

      return true;
    };

    if (cnd.map && !cnd.map.some((e) => matches_map_impl(e, map))) {
      return false;
    }

    return true;
  }

  function matches_abyss_ship(cnd: event_bonuses.condition, abyss_id: number) {
    if (cnd.abyss_ship_id && !cnd.abyss_ship_id.includes(abyss_id)) {
      return false;
    }

    return true;
  }

  function matches_phase(
    cnd: event_bonuses.condition,
    phase: event_bonuses.phase
  ) {
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
    .extract_event_bonus(attacker, map, abyss_id, phase)
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
