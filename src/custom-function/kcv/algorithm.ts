namespace kcv {
  /**
   * key以上の最初の位置を返します.
   * @param array ソート済み配列
   * @param value
   * @param key
   * @returns
   */
  export function lowerBound<T>(
    array: readonly T[],
    value: number,
    key: (item: T) => number,
  ): number {
    let first = 0;
    let last = array.length;

    while (first < last) {
      const mid = first + ((last - first) >> 1);

      if (key(array[mid]) < value) {
        first = mid + 1;
      } else {
        last = mid;
      }
    }

    return first;
  }
} // namespace kcv
