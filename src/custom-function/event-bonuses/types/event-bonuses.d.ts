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

  // TODO: 艦載機の組み合わせ
  export type equipment = {
    readonly id?: number[];
  };

  export type condition = {
    readonly ship_id?: number[];
    readonly yomi?: string[]; // `original_id: number[]`のほうがよい?
    readonly stype?: number[];
    readonly ctype?: number[];
    readonly nationality?: number[];

    readonly equipment?: equipment;

    readonly abyssal_ship_id?: number[];

    readonly xal01?: number; // 装甲破砕: APIに合わせて, 0 | 1 | opt

    readonly phase?: phase[];
  };

  export type bonus = {
    readonly mod: modifier;
    readonly cnd: condition;
  };

  export type map_bonuses = {
    readonly map: map;
    readonly bonuses: bonus[];
  };
} // namespace event_bonuses_v2
