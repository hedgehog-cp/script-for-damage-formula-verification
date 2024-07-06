class slotitem_t {
  public constructor(master: api_mst_slotitem_t | undefined, level: number) {
    this.master = master;
    this.id = master?.api_id || slotitem_t.null_value;
    this.type2 = master?.api_type[2] || slotitem_t.null_value;
    this.level = level;
  }

  public static readonly null_value: number = NaN;

  /** 装備マスタ */
  public readonly master: api_mst_slotitem_t | undefined;
  /** 有効な装備IDまたはnull_id */
  public readonly id: number;
  /** api_type[2] */
  public readonly type2: number;
  /** 有効な装備改修値または-1. 有効でない改修値のとき, parse時に-1に変換される. */
  public readonly level: number;
}
