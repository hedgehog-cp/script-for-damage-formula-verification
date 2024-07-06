enum nationality_t {
  unknown = 0,
  abyssal = 0,
  japanese = 1,
  german = 2,
  italian = 3,
  american = 4,
  british = 5,
  french = 6,
  russian = 7,
  swedish = 8,
  dutch = 9,
  australian = 10,
}

/**
 * ソート順から国籍に変換し, これを返します.
 * @param { number } sort_id ソート順
 * @returns { nationality_t } 国籍
 */
function to_nationality(sort_id: number): nationality_t {
  if (sort_id === 0) return nationality_t.abyssal;
  if (!sort_id || sort_id < 1000) return nationality_t.unknown;

  if (sort_id < 30000) return nationality_t.japanese;
  if (sort_id < 31000) return nationality_t.german;
  if (sort_id < 32000) return nationality_t.italian;
  if (sort_id < 33000) return nationality_t.american;
  if (sort_id < 34000) return nationality_t.british;
  if (sort_id < 35000) return nationality_t.french;
  if (sort_id < 36000) return nationality_t.russian;
  if (sort_id < 37000) return nationality_t.swedish;
  if (sort_id < 38000) return nationality_t.dutch;
  if (sort_id < 39000) return nationality_t.australian;

  return nationality_t.unknown;
}

/**
 * 電探であるかを検証します.
 * @param { api_mst_slotitem_t } mst 装備マスタ
 * @returns { boolean } 電探であればtrueを返します.
 */
function is_radar(mst: api_mst_slotitem_t): boolean {
  return mst.api_type[3] === 11;
}

/**
 * 対空電探であるかを検証します.
 * @param { api_mst_slotitem_t } mst 装備マスタ
 * @returns { boolean } 対空電探であればtrueを返します.
 */
function is_anti_air_radar(mst: api_mst_slotitem_t): boolean {
  return is_radar(mst) && mst.api_tyku > 1;
}

/**
 * 水上電探であるかを検証します.
 * @param { api_mst_slotitem_t } mst 装備マスタ
 * @returns { boolean } 水上電探であればtrueを返します.
 */
function is_surface_radar(mst: api_mst_slotitem_t): boolean {
  return is_radar(mst) && mst.api_saku > 4;
}

/**
 * 命中電探であるかを検証します.
 * @param { api_mst_slotitem_t } mst 装備マスタ
 * @returns { boolean } 命中電探であればtrueを返します.
 */
function is_accuracy_radar(mst: api_mst_slotitem_t): boolean {
  return is_radar(mst) && mst.api_houm >= 8;
}
