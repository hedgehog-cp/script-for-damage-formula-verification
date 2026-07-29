namespace kcv {
  export namespace kcsapi {
    /** 艦船マスタの型 */
    export type api_mst_ship = {
      /** 改装時に必要な弾薬 */
      readonly api_afterbull?: number;

      /** 改装時に必要な鋼材 */
      readonly api_afterfuel?: number;

      /** 改装可能Lv */
      readonly api_afterlv?: number;

      /** 改装後艦船ID ("0" は改装なし) */
      readonly api_aftershipid?: string;

      /** レアリティ: 1=藍, 2=青, 3=水, 4=銀, 5=金, 6=虹, 7=輝虹, 8=桜虹 */
      readonly api_backs?: number;

      /** 解体資材 [燃料, 弾薬, 鋼材, ボーキサイト] */
      readonly api_broken?: number[];

      /** 建造時間 (分) */
      readonly api_buildtime?: number;

      /** 搭載弾薬 */
      readonly api_bull_max?: number;

      /** 艦型ID */
      readonly api_ctype: number;

      /** 搭載燃料 */
      readonly api_fuel_max?: number;

      /** 取得時台詞 (`<br>` は改行) */
      readonly api_getmes?: string;

      /** 火力 [初期値, 最大値] */
      readonly api_houg?: number[];

      /** 艦船ID */
      readonly api_id: number;

      /** 射程: 0=無, 1=短, 2=中, 3=長, 4=超長 */
      readonly api_leng?: number;

      /** 運 [初期値, 最大値] */
      readonly api_luck?: number[];

      /** 艦載機搭載数 */
      readonly api_maxeq?: number[];

      /** 艦娘名 */
      readonly api_name: string;

      /** 近代化改修強化値 [火力, 雷装, 対空, 装甲] */
      readonly api_powup?: number[];

      /** 雷装 [初期値, 最大値] */
      readonly api_raig?: number[];

      /** スロット数 */
      readonly api_slot_num: number;

      /** 速力: 0=陸上基地, 5=低速, 10=高速, 15=高速+, 20=最速 */
      readonly api_soku: number;

      /** 母港ソート順 */
      readonly api_sort_id: number;

      /** 図鑑番号 */
      readonly api_sortno?: number;

      /** 装甲 [初期値, 最大値] */
      readonly api_souk?: number[];

      /** 艦種ID */
      readonly api_stype: number;

      /** 耐久 [初期値, 最大値] */
      readonly api_taik?: number[];

      /** 対空 [初期値, 最大値] */
      readonly api_tyku?: number[];

      /** ボイス設定フラグ: 1: 放置ボイス, 2: 時報, 4: 特殊放置ボイス */
      readonly api_voicef?: number;

      /** 艦娘名読み */
      readonly api_yomi: string;

      /** 対潜 [初期値, 最大値] (護衛空母のみ存在) */
      readonly api_tais?: number[];
    };
  } // namespace kcsapi
} // namespace kcv
