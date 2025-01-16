namespace kcv {
  export class ship {
    public constructor(
      mst: api_mst_ship,
      original_id: number,
      nationality: number,
      equipments: (kcv.equipment | undefined)[]
    ) {
      this.mst = mst;
      this.original_id = original_id;
      this.nationality = nationality;
      this.equipments = equipments;
    }

    public readonly mst: api_mst_ship;
    public readonly original_id: number;
    public readonly nationality: nationality;
    public readonly equipments: (kcv.equipment | undefined)[];
  }
}
