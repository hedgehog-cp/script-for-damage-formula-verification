class slot_t {
  public constructor(slotitems: slotitem_t[]) {
    this.items = slotitems;
  }

  /**
   * スロットが装備を1つ以上保持しているかを検証します.
   * @returns { boolean } 1つ以上保持していればtrueを返します.
   */
  public has_item(): boolean {
    return this.items.some((v) => v.id);
  }

  /**
   * スロットに含まれる対空電探の個数を数え上げ, これを返します.
   * @returns { number } 対空電探の個数
   */
  public count_anti_air_radar(): number {
    return this.items.reduce(
      (acc, e) => acc + (!e.master ? 0 : is_anti_air_radar(e.master) ? 1 : 0),
      0
    );
  }

  /**
   * スロットに含まれる水上電探の個数を数え上げ, これを返します.
   * @returns { number } 水上電探の個数
   */
  public count_surface_radar(): number {
    return this.items.reduce(
      (acc, e) => acc + (!e.master ? 0 : is_surface_radar(e.master) ? 1 : 0),
      0
    );
  }

  /**
   * スロットに含まれる射撃用電探の個数を数え上げ, これを返します.
   * @returns { number } 射撃用電探の個数
   */
  public count_accuracy_radar(): number {
    return this.items.reduce(
      (acc, e) => acc + (!e.master ? 0 : is_accuracy_radar(e.master) ? 1 : 0),
      0
    );
  }

  /** このスロットが保持する0個以上の装備. 配列サイズは常に6であるはず. */
  public readonly items: slotitem_t[];
}
