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
function calc_tais_bonuses(
  attacker_ids: number[][],
  slotitem_ids: number[][],
  slotitem_levels: number[][],
  rows: number,
): number[] {
  const bonus = kcv.calc_bonus(
    attacker_ids.flat(),
    slotitem_ids,
    slotitem_levels,
    rows,
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
function calc_raig_bonuses(
  attacker_ids: number[][],
  slotitem_ids: number[][],
  slotitem_levels: number[][],
  rows: number,
): number[] {
  const bonus = kcv.calc_bonus(
    attacker_ids.flat(),
    slotitem_ids,
    slotitem_levels,
    rows,
    kcv.temporarily_unknown_modify,
  );
  return bonus.map((v) => v.raig || 0);
}

namespace kcv {
  /**
   * 装備ボーナスを計算し, これを返します.
   * @param { number[] } attacker_ids 攻撃艦の艦船IDの配列
   * @param { number[][] } slotitem_ids 攻撃艦が装備している装備の装備IDすべての配列.
   * @param { number[][] } slotitem_levels 攻撃艦が装備している装備の改修値すべての配列.
   * @param { number } rows データ件数. 引数のそれぞれの配列サイズ.
   * @returns { kcv.eoen.bonus_value[] } 装備ボーナス
   */
  export function calc_bonus(
    attacker_ids: number[],
    slotitem_ids: number[][],
    slotitem_levels: number[][],
    rows: number,
    attacker_mod_func: ((attacker: kcv.ship) => void) | null = null,
  ): kcv.eoen.bonus_value[] {
    const result: kcv.eoen.bonus_value[] = [];
    const zero: kcv.eoen.bonus_value = {
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
        slotitem_levels[i] as number[],
      );
      if (attacker) {
        if (attacker_mod_func) attacker_mod_func(attacker);
        result.push(kcv.calc_fit_bonuses(attacker, kcv.eoen.fit_bonuses));
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
    slotitem_levels: number[],
  ): kcv.ship | undefined {
    const mst_ship = kcv.kcsapi.api_mst_ship.at(
      kcv.lowerBound(kcv.kcsapi.api_mst_ship, attacker_id, (e) => e.api_id),
    );
    if (mst_ship?.api_id !== attacker_id) {
      return undefined;
    }

    const original_id = kcv.to_base_id(mst_ship);
    if (!original_id) return undefined;

    const nationality = kcv.to_nationality(mst_ship.api_sort_id);

    const slot_size = Math.min(slotitem_ids.length, slotitem_levels.length);
    const equipments: (kcv.equipment | undefined)[] = [];
    for (let i = 0; i < slot_size; i++) {
      const id = slotitem_ids[i] as number;
      const level = slotitem_levels[i] as number;

      const mst_slotitem = kcv.kcsapi.api_mst_slotitem.at(
        kcv.lowerBound(kcv.kcsapi.api_mst_slotitem, id, (e) => e.api_id),
      );
      if (mst_slotitem?.api_id !== id) {
        equipments.push(undefined);
      } else {
        equipments.push(new kcv.equipment(mst_slotitem, level));
      }
    }

    return new kcv.ship(mst_ship, original_id, nationality, equipments);
  }
} // namespace kcv
