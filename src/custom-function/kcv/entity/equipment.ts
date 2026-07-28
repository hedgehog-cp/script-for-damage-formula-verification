namespace kcv {
  /** 装備 */
  export class equipment {
    public constructor(mst: kcv.kcsapi.api_mst_slotitem, level: number) {
      this.mst = mst;
      this.level = level;
    }

    /** 装備マスタ */
    public readonly mst: kcv.kcsapi.api_mst_slotitem;

    /** 有効な装備改修値または-1. 有効でない改修値のとき, parse時に-1に変換される. */
    public readonly level: number;
  }
} // namespace kcv
