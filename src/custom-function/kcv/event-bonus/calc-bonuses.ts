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
  phase: ("航空戦" | "砲撃戦" | "雷撃戦" | "夜戦")[],
  rows: number,
): number[] {
  // TODO: あとで実装する
  return new Array(rows).fill(1);
}
