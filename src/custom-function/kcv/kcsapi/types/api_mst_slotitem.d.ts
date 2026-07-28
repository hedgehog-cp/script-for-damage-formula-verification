namespace kcv {
  export namespace kcsapi {
    /** 装備マスタの型 */
    export type api_mst_slotitem = {
      /** (常に 0) */
      readonly api_atap: number;

      /** 爆撃回避 (常に 0) */
      readonly api_bakk: number;

      /** 爆装 */
      readonly api_baku: number;

      /** 廃棄資材 [燃料, 弾薬, 鋼材, ボーキサイト] */
      readonly api_broken: number[];

      /** 火力 */
      readonly api_houg: number;

      /** 回避 (局地戦闘機では迎撃) */
      readonly api_houk: number;

      /** 命中 (局地戦闘機では対爆) */
      readonly api_houm: number;

      /** 装備ID */
      readonly api_id: number;

      /** 射程 */
      readonly api_leng: number;

      /** 運 (常に 0) */
      readonly api_luck: number;

      /** 装備名 */
      readonly api_name: string;

      /** 雷装 */
      readonly api_raig: number;

      /** 雷撃回避 (常に 0) */
      readonly api_raik: number;

      /** 雷撃命中 (常に 0) */
      readonly api_raim: number;

      /** レアリティ: 0=コモン, 1=レア, 2=ホロ, 3=Sホロ, 4=SSホロ, 5=SSホロ, 6=SSホロ+, 7=SS++ */
      readonly api_rare: number;

      /** 索敵妨害 (常に 0) */
      readonly api_sakb: number;

      /** 索敵 */
      readonly api_saku: number;

      /** 速力 */
      readonly api_soku: number;

      /** 並べ替え順 */
      readonly api_sortno: number;

      /** 装甲 */
      readonly api_souk: number;

      /** 耐久 (常に 0) */
      readonly api_taik: number;

      /** 対潜 */
      readonly api_tais: number;

      /** 対空 */
      readonly api_tyku: number;

      /** 装備タイプ: [0]=大分類, [1]=図鑑分類, [2]=カテゴリ, [3]=アイコンID, [4]=航空機グラフィックID */
      readonly api_type: number[];

      /** 未使用 (常に "0") */
      readonly api_usebull: string;

      /** グラフィックバージョン */
      readonly api_version?: number;

      /** 航空機コスト */
      readonly api_cost?: number;

      /** 航続距離 */
      readonly api_distance?: number;
    };
  } // namespace kcsapi
} // namespace kcv
