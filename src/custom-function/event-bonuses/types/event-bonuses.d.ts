namespace event_bonuses {
  export type modifier = {
    // 第8種乗算補正 ∊ [min, sup)
    readonly a8?: {
      readonly min: number;
      readonly sup?: number;
    };

    // 第2種加算補正 ∊ (inf, max]
    readonly b2?: {
      readonly inf?: number;
      readonly max: number;
    };
  };

  export type map = {
    readonly maparea_id?: number; // #5-3-Pの5
    readonly mapinfo_no?: number; // #5-3-Pの3
    readonly no?: number[]; // #5-3-PのPに対応する16
  };

  // FIXME
  export type phase = "航空戦" | "砲撃戦" | "雷撃戦" | "夜戦";

  export type condition = {
    readonly ship_id?: number[];
    readonly yomi?: string[]; // `original_id: number[]`のほうがよい?
    readonly stype?: number[];
    readonly ctype?: number[];
    readonly nationality?: number[];

    //   readonly equipment: any; 保留

    readonly map?: map[];

    readonly abyss_ship_id?: number[];

    readonly xal01?: boolean; // 装甲破砕

    readonly phase?: phase[];
  };

  export type bonus = {
    readonly mod: modifier;
    readonly cnd: condition;
  };
} // namespace event_bonuses
