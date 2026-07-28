namespace kcv {
  /**
   * 未改造IDを返します.
   * @param { kcv.kcsapi.api_mst_ship } mst 艦船マスタ.
   * @returns 未改造ID.
   */
  export function to_base_id(mst: kcv.kcsapi.api_mst_ship): number | undefined {
    // 線形探索したくない
    return kcv.kcsapi.api_mst_ship
      .filter((v) => v.api_yomi === mst.api_yomi)
      .filter((v) => v.api_sort_id % 10 === 1)
      .at(0)?.api_id;
  }
} // namespace kcv
