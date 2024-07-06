class attacker_t {
  private static to_original_id(master: api_mst_ship_t): number {
    // 線形探索したくない
    const mst = api_mst_ship
      .filter((v) => v.api_yomi === master.api_yomi)
      .filter((v) => v.api_sort_id % 10 === 1);
    return mst[0]?.api_id ?? attacker_t.null_value;
  }

  public constructor(master: api_mst_ship_t, slot: slot_t) {
    this.master = master;
    this.id = master.api_id;
    this.stype = master.api_stype;
    this.ctype = master.api_ctype;
    this.original_id = attacker_t.to_original_id(master);
    this.nationality = to_nationality(master.api_sort_id);
    this.slot = slot;
  }

  public static readonly null_value: number = NaN;

  public readonly master: api_mst_ship_t;
  public readonly id: number;
  public readonly stype: number;
  public readonly ctype: number;
  public readonly original_id: number;
  public readonly nationality: nationality_t;
  public readonly slot: slot_t;
}
