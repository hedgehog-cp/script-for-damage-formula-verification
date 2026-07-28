namespace kcv {
  /**
   * 電探であるかを検証します.
   * @param { kcv.kcsapi.api_mst_slotitem } mst 装備マスタ
   * @returns { boolean } 電探であればtrueを返します.
   */
  export function is_radar(mst: kcv.kcsapi.api_mst_slotitem): boolean {
    return mst.api_type[3] === 11;
  }

  /**
   * 対空電探であるかを検証します.
   * @param { kcv.kcsapi.api_mst_slotitem } mst 装備マスタ
   * @returns { boolean } 対空電探であればtrueを返します.
   */
  export function is_anti_air_radar(mst: kcv.kcsapi.api_mst_slotitem): boolean {
    return is_radar(mst) && mst.api_tyku >= 2;
  }

  /**
   * 水上電探であるかを検証します.
   * @param { kcv.kcsapi.api_mst_slotitem } mst 装備マスタ
   * @returns { boolean } 水上電探であればtrueを返します.
   */
  export function is_surface_radar(mst: kcv.kcsapi.api_mst_slotitem): boolean {
    return is_radar(mst) && mst.api_saku >= 5;
  }

  /**
   * 命中電探であるかを検証します.
   * @param { kcv.kcsapi.api_mst_slotitem } mst 装備マスタ
   * @returns { boolean } 命中電探であればtrueを返します.
   */
  export function is_accuracy_radar(mst: kcv.kcsapi.api_mst_slotitem): boolean {
    return is_radar(mst) && mst.api_houm >= 8;
  }
} // namespace kcv
