namespace event_bonuses {
  export const bonuses: event_bonuses.bonus[] = [
    // E2 駆逐艦*1.03
    {
      mod: {
        a8: { min: 1.03 },
      },
      cnd: {
        stype: [2],
        map: [{ maparea_id: 59, mapinfo_no: 2 }],
      },
    },
    // E2UW 駆逐艦*1.14
    {
      mod: {
        a8: { min: 1.14 },
      },
      cnd: {
        stype: [2],
        map: [
          {
            maparea_id: 59,
            mapinfo_no: 2,
            no: [28, 30],
          },
        ],
      },
    },
  ];
} // namespace event_bonuses
