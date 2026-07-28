namespace kcv {
  /** 艦船 */
  export class ship {
    public constructor(
      mst: kcv.kcsapi.api_mst_ship,
      original_id: number,
      nationality: number,
      equipments: (kcv.equipment | undefined)[],
    ) {
      this.mst = mst;
      this.base_id = original_id;
      this.nationality = nationality;
      this.equipments = equipments;
    }

    /** 艦船マスタ */
    public readonly mst: kcv.kcsapi.api_mst_ship;

    /** 未改造ID */
    public readonly base_id: number;

    /** 艦籍 */
    public readonly nationality: nationality;

    /**
     * 装備
     * @note より高機能とするならば型slotを定義してslotの配列を保持する
     */
    public readonly equipments: (kcv.equipment | undefined)[];
  }
} // namespace kcv
