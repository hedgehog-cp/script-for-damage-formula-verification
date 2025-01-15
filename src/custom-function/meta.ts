enum nationality {
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
 * @returns { nationality } 国籍
 */
function to_nationality(sort_id: number): nationality {
  if (sort_id === 0) return nationality.abyssal;
  if (!sort_id || sort_id < 1000) return nationality.unknown;

  if (sort_id < 30000) return nationality.japanese;
  if (sort_id < 31000) return nationality.german;
  if (sort_id < 32000) return nationality.italian;
  if (sort_id < 33000) return nationality.american;
  if (sort_id < 34000) return nationality.british;
  if (sort_id < 35000) return nationality.french;
  if (sort_id < 36000) return nationality.russian;
  if (sort_id < 37000) return nationality.swedish;
  if (sort_id < 38000) return nationality.dutch;
  if (sort_id < 39000) return nationality.australian;

  return nationality.unknown;
}

/**
 * 電探であるかを検証します.
 * @param { api_mst_slotitem } mst 装備マスタ
 * @returns { boolean } 電探であればtrueを返します.
 */
function is_radar(mst: api_mst_slotitem): boolean {
  return mst.api_type[3] === 11;
}

/**
 * 対空電探であるかを検証します.
 * @param { api_mst_slotitem } mst 装備マスタ
 * @returns { boolean } 対空電探であればtrueを返します.
 */
function is_anti_air_radar(mst: api_mst_slotitem): boolean {
  return is_radar(mst) && mst.api_tyku >= 2;
}

/**
 * 水上電探であるかを検証します.
 * @param { api_mst_slotitem } mst 装備マスタ
 * @returns { boolean } 水上電探であればtrueを返します.
 */
function is_surface_radar(mst: api_mst_slotitem): boolean {
  return is_radar(mst) && mst.api_saku >= 5;
}

/**
 * 命中電探であるかを検証します.
 * @param { api_mst_slotitem } mst 装備マスタ
 * @returns { boolean } 命中電探であればtrueを返します.
 */
function is_accuracy_radar(mst: api_mst_slotitem): boolean {
  return is_radar(mst) && mst.api_houm >= 8;
}

function to_original_id(mst: api_mst_ship): number | undefined {
  // 線形探索したくない
  return api_mst_ship
    .filter((v) => v.api_yomi === mst.api_yomi)
    .filter((v) => v.api_sort_id % 10 === 1)
    .at(0)?.api_id;
}
