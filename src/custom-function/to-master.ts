/** concept */
type has_api_id = {
  api_id: number;
};

/**
 * IDに対応するマスタを1つ返します. 一致するものが無ければundefinedを返します.
 * @param id 艦船ID | 装備ID
 * @param mst 艦船マスタ | 装備マスタ
 * @returns {T | undefined} IDに対応するマスタ | undefined
 */
function to_master<T extends has_api_id>(id: number, mst: T[]): T | undefined {
  // いつかid===0が実装されるかもしれないが, いまはここでundefinedにする.
  if (!id) return undefined;

  // 二分探索
  let index: number = -1;
  let left: number = 0;
  let right: number = mst.length - 1;
  let middle: number;

  while (left <= right) {
    middle = Math.floor((left + right) / 2);

    const mst_id: number | undefined = mst[middle]?.api_id;
    if (mst_id === undefined) {
      return undefined;
    }

    if (mst_id === id) {
      index = middle;
      break;
    }

    if (mst_id < id) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return mst[index]?.api_id === id ? mst[index] : undefined;
}
