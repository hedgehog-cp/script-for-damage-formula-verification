// 権限の設定に困難があるため, とりあえずのところはJSONを手動更新する.
/** 装備ボーナスオブジェクト */
// const fit_bonuses = fetchJson<fit_bonuses_t[]>(
//   "https://raw.githubusercontent.com/ElectronicObserverEN/Data/master/Data/FitBonuses.json"
// );

/** 装備ボーナスオブジェクト */
const fit_bonuses: fit_bonuses_t[] = [
  {
    types: [9],
    bonuses: [
      {
        shipType: [7, 10, 11, 18],
        level: 2,
        num: 1,
        bonus: { saku: 1 },
      },
      {
        shipType: [7, 10, 11, 18],
        level: 4,
        num: 1,
        bonus: { houg: 1 },
      },
      {
        shipType: [7, 10, 11, 18],
        level: 6,
        num: 1,
        bonus: { saku: 1 },
      },
      {
        shipType: [7, 10, 11, 18],
        level: 10,
        num: 1,
        bonus: { houg: 1, saku: 1 },
      },
    ],
  },
  {
    types: [10],
    bonuses: [
      {
        shipX: [662, 663, 668],
        num: 1,
        bonus: { houg: 2, kaih: 1, tais: 3 },
      },
      {
        shipX: [501, 502, 506, 507],
        num: 1,
        bonus: { houg: 2 },
      },
    ],
  },
  {
    types: [11],
    bonuses: [
      {
        shipX: [662, 663, 668],
        num: 1,
        bonus: { houg: 1, kaih: 1, tais: 1 },
      },
      {
        shipX: [501, 502, 506, 507],
        num: 1,
        bonus: { houg: 1, kaih: 1 },
      },
    ],
  },
  {
    types: [12, 13],
    bonuses: [
      {
        shipX: [569, 648, 951, 961],
        num: 1,
        bonusAR: { houg: 1, tyku: 2, kaih: 3 },
      },
      {
        shipX: [955, 960],
        num: 1,
        bonusAR: { tyku: 2, kaih: 1 },
      },
    ],
  },
  {
    types: [25],
    bonuses: [
      {
        shipX: [662],
        num: 1,
        bonus: { kaih: 1, tais: 4 },
      },
      {
        shipX: [663, 668],
        num: 1,
        bonus: { kaih: 1, tais: 3 },
      },
    ],
  },
  {
    types: [29],
    bonuses: [
      {
        shipS: [34, 55, 69, 85, 86],
        num: 1,
        bonus: { houg: 4, kaih: -1 },
      },
      {
        shipS: [55],
        num: 1,
        bonus: { houg: 4, raig: 8 },
      },
      {
        shipS: [132],
        bonus: { houg: 2 },
      },
      {
        shipS: [20],
        bonus: { houg: 1, tyku: 1 },
      },
      {
        shipX: [662, 663, 668],
        num: 1,
        bonus: { houg: 4, raig: 2 },
      },
    ],
  },
  {
    types: [42],
    bonuses: [
      {
        shipS: [85, 86],
        num: 1,
        bonus: { houg: 6, kaih: -2 },
      },
      {
        shipS: [131, 143],
        num: 1,
        bonus: { houg: 4, kaih: -1 },
      },
      {
        shipX: [592],
        num: 1,
        bonus: { houg: 3, raig: 3 },
      },
      {
        shipX: [592],
        requires: [174],
        num: 1,
        bonus: { raig: 5 },
      },
    ],
  },
  {
    ids: [3, 122, 533],
    bonuses: [
      {
        shipClass: [54],
        bonus: { houg: 1, tyku: 2, kaih: 1 },
      },
      {
        shipX: [968],
        bonus: { houg: 1, kaih: 1, houm: 1 },
      },
    ],
  },
  {
    ids: [5],
    bonuses: [
      {
        shipClass: [9, 52],
        bonus: { houg: 1 },
      },
      {
        shipClass: [52],
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [15],
    bonuses: [
      {
        shipX: [566, 567, 568, 648, 651, 656, 670, 915, 951],
        num: 1,
        bonus: { raig: 2 },
      },
      {
        shipX: [566, 567, 568, 648, 651, 656, 670, 915, 951],
        num: 2,
        bonus: { raig: 2 },
      },
      {
        shipS: [642],
        num: 1,
        bonus: { raig: 5, kaih: 1 },
      },
    ],
  },
  {
    ids: [18, 52],
    bonuses: [
      {
        shipX: [156, 277, 278],
        bonus: { houg: 1 },
      },
      {
        shipX: [594, 646, 698],
        bonus: { houg: 1, kaih: 1 },
      },
      {
        shipX: [599, 610],
        bonus: { houg: 2, kaih: 1 },
      },
    ],
  },
  {
    ids: [19],
    bonuses: [
      {
        shipType: [7],
        bonus: { tyku: 1, kaih: 1 },
      },
      {
        shipClass: [75, 76],
        bonus: { houg: 2, tais: 3 },
      },
      {
        shipS: [89],
        bonus: { houg: 2, tyku: 2, kaih: 2, tais: 2 },
      },
      {
        shipX: [894, 899],
        bonus: { houg: 1, tyku: 1, kaih: 1, tais: 1 },
      },
    ],
  },
  {
    ids: [24, 57, 111],
    bonuses: [
      {
        shipX: [553, 554],
        bonus: { houg: 2 },
      },
    ],
  },
  {
    ids: [26, 62, 79, 80, 81, 207, 208],
    bonuses: [
      {
        shipX: [662],
        num: 1,
        bonus: { houg: 2, kaih: 1 },
      },
      {
        shipX: [501, 506, 663, 668],
        num: 1,
        bonus: { houg: 2 },
      },
      {
        shipX: [502, 507],
        num: 1,
        bonus: { houg: 1 },
      },
      {
        shipX: [501, 502, 506, 507, 663, 668],
        bonus: { tyku: 1, kaih: 1 },
      },
    ],
  },
  {
    ids: [30, 410],
    bonuses: [
      {
        shipX: [73, 501, 502, 506, 507],
        num: 1,
        bonus: { tyku: 3, kaih: 2, saku: 2 },
      },
      {
        shipClass: [54],
        num: 1,
        bonus: { tyku: 3, kaih: 2, saku: 2 },
      },
    ],
  },
  {
    ids: [410],
    bonuses: [
      {
        shipX: [73, 501, 502, 506, 507],
        num: 1,
        bonus: { houg: 1, tyku: 2, souk: 1, kaih: 2 },
      },
      {
        shipClass: [54],
        num: 1,
        bonus: { houg: 1, tyku: 2, souk: 1, kaih: 2 },
      },
      {
        shipX: [968],
        num: 1,
        bonus: { houg: 1, tyku: 1, kaih: 1 },
      },
    ],
  },
  {
    ids: [35],
    bonuses: [
      {
        shipX: [149, 591, 592],
        num: 1,
        bonus: { houg: 1, tyku: 1 },
      },
      {
        shipX: [150],
        num: 1,
        bonus: { tyku: 1 },
      },
      {
        shipX: [151, 593, 954],
        num: 1,
        bonus: { tyku: 1, kaih: 1 },
      },
      {
        shipX: [152],
        num: 1,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [39, 40, 49, 131],
    bonuses: [
      {
        shipX: [662, 663],
        bonus: { tyku: 2, kaih: 1 },
      },
      {
        shipX: [668],
        bonus: { tyku: 3, kaih: 2 },
      },
      {
        shipClass: [56],
        bonus: { houg: 1, tyku: 2, kaih: 2 },
      },
      {
        shipClass: [56],
        num: 1,
        bonusAR: { tyku: 2, kaih: 2 },
      },
      {
        shipX: [979],
        bonus: { tyku: 2, kaih: 3 },
      },
    ],
  },
  {
    ids: [39],
    bonuses: [
      {
        shipX: [979],
        level: 8,
        bonus: { kaih: 1 },
      },
      {
        shipX: [979],
        level: 9,
        bonus: { tyku: 2 },
      },
      {
        shipX: [979],
        level: 10,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [40],
    bonuses: [
      {
        shipX: [979],
        level: 9,
        bonus: { tyku: 2 },
      },
      {
        shipX: [979],
        level: 10,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [49],
    bonuses: [
      {
        shipX: [979],
        bonus: { kaih: 2 },
      },
      {
        shipX: [979],
        level: 6,
        bonus: { houm: 1 },
      },
      {
        shipX: [979],
        level: 7,
        bonus: { tyku: 1 },
      },
      {
        shipX: [979],
        level: 8,
        bonus: { kaih: 1 },
      },
      {
        shipX: [979],
        level: 9,
        bonus: { tyku: 1 },
      },
      {
        shipX: [979],
        level: 10,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [131],
    bonuses: [
      {
        shipX: [979],
        level: 10,
        bonus: { tyku: 2 },
      },
    ],
  },
  {
    ids: [44, 45, 287, 288],
    bonuses: [
      {
        shipClass: [56],
        bonus: { kaih: 2, tais: 3 },
      },
    ],
  },
  {
    ids: [46, 47, 132, 149, 438],
    bonuses: [
      {
        shipClass: [56],
        num: 1,
        bonus: { kaih: 3, tais: 2 },
      },
    ],
  },
  {
    ids: [47, 438],
    bonuses: [
      {
        shipS: [43, 425, 471, 473, 457, 122],
        bonus: { houg: 1, kaih: 2, tais: 3 },
      },
      {
        shipS: [16, 36, 414, 167, 170, 527],
        bonus: { kaih: 2, tais: 2 },
      },
    ],
  },
  {
    ids: [50],
    bonuses: [
      {
        shipClass: [7, 13],
        bonus: { houg: 1 },
      },
      {
        shipClass: [7, 13],
        num: 1,
        bonusSR: { houg: 1, raig: 1, kaih: 1 },
      },
      {
        shipClass: [7, 13],
        requires: [90],
        num: 1,
        bonusSR: { houg: -1, raig: -1, kaih: -1 },
      },
      {
        shipClass: [8, 9, 29, 31],
        bonus: { houg: 2, kaih: 1 },
      },
      {
        shipClass: [8, 9, 29, 31],
        num: 1,
        bonusSR: { houg: 3, raig: 2, kaih: 2 },
      },
      {
        shipClass: [9, 31],
        requires: [50],
        num: 2,
        bonus: { houg: 1 },
      },
      {
        shipX: [501, 502, 506, 507],
        bonus: { houg: 1 },
      },
      {
        shipX: [501, 506],
        num: 1,
        bonusSR: { houg: 1, kaih: 1 },
      },
      {
        shipX: [501, 502, 506, 507],
        requires: [30, 410],
        num: 1,
        bonus: { houg: 1, tyku: 3, kaih: 2 },
      },
      {
        shipX: [501, 502, 506, 507],
        requires: [410],
        num: 1,
        bonus: { houg: 2 },
      },
    ],
  },
  {
    ids: [58],
    bonuses: [
      {
        shipClass: [22, 54],
        bonus: { raig: 1 },
      },
      {
        shipType: [4],
        bonus: { raig: 1 },
      },
    ],
  },
  {
    ids: [59],
    bonuses: [
      {
        shipX: [501, 502, 506, 507],
        num: 1,
        bonus: { tyku: 1, kaih: 1 },
      },
    ],
  },
  {
    ids: [60, 154, 219],
    bonuses: [
      {
        shipS: [75, 92, 102, 103, 116],
        bonus: { houg: 1, tyku: 1, kaih: 1 },
      },
      {
        shipX: [185, 282, 318],
        bonus: { houg: 1, tyku: 1, kaih: 1 },
      },
      {
        shipX: [883, 888],
        bonus: { houg: 2, tyku: 1, kaih: 2 },
      },
    ],
  },
  {
    ids: [61],
    bonuses: [
      {
        shipX: [553],
        num: 1,
        bonus: { houg: 3, souk: 1, kaih: 2, houm: 5, leng: 1 },
      },
      {
        shipX: [554],
        num: 1,
        bonus: { houg: 3, souk: 3, kaih: 3, houm: 5, leng: 1 },
      },
      {
        shipX: [196, 197],
        num: 1,
        bonus: { houm: 5, leng: 1 },
      },
      {
        shipS: [90],
        level: 1,
        num: 1,
        bonus: { houg: 3, saku: 3 },
      },
      {
        shipS: [91],
        level: 1,
        num: 1,
        bonus: { houg: 2, saku: 2 },
      },
      {
        shipX: [508, 509, 560],
        level: 1,
        num: 1,
        bonus: { houg: 1, saku: 1 },
      },
      {
        shipX: [197],
        level: 8,
        num: 1,
        bonus: { houg: 1, saku: 1 },
      },
    ],
  },
  {
    ids: [63],
    bonuses: [
      {
        shipClass: [1, 5, 10],
        bonus: { tyku: 1 },
      },
      {
        shipS: [45],
        bonus: { houg: 1, tyku: 1, kaih: 2 },
      },
      {
        shipX: [144],
        bonus: { raig: 1 },
      },
      {
        shipX: [145, 627, 961],
        bonus: { houg: 1 },
      },
      {
        shipX: [242, 244, 497, 498, 975],
        bonus: { kaih: 1 },
      },
      {
        shipX: [469],
        bonus: { kaih: 2 },
      },
      {
        shipX: [903, 908],
        bonus: { houg: 2 },
      },
    ],
  },
  {
    ids: [66, 220],
    bonuses: [
      {
        shipX: [662, 663, 668],
        bonus: { tyku: 2, kaih: 1 },
      },
      {
        shipX: [501, 502, 506, 507],
        bonus: { houg: 1, tyku: 2, kaih: 2 },
      },
      {
        shipX: [501, 502, 506, 507, 662, 663, 668],
        num: 1,
        bonusAR: { tyku: 1, kaih: 2 },
      },
    ],
  },
  {
    ids: [220],
    bonuses: [
      {
        shipX: [501, 502, 506, 507, 662, 663, 668],
        bonus: { houg: 1, tyku: 3, kaih: 2 },
      },
      {
        shipX: [501, 502, 506, 507, 662, 663, 668, 894, 899],
        num: 1,
        bonusAR: { tyku: 3, kaih: 3 },
      },
      {
        shipX: [894, 899],
        bonus: { tyku: 2, kaih: 2 },
      },
      {
        shipX: [894, 899],
        level: 10,
        bonus: { houg: 1, tyku: 1, kaih: 1 },
      },
    ],
  },
  {
    ids: [67],
    bonuses: [
      {
        bonus: { raig: -5 },
      },
      {
        shipType: [13, 14],
        bonus: { raig: 5 },
      },
    ],
  },
  {
    ids: [69],
    bonuses: [
      {
        shipX: [554, 646],
        bonus: { houg: 1, tais: 2 },
      },
      {
        shipX: [553],
        bonus: { houg: 1, tais: 1 },
      },
    ],
  },
  {
    ids: [78],
    bonuses: [
      {
        shipClass: [48],
        bonus: { houg: 1, kaih: 1 },
      },
      {
        shipClass: [48],
        num: 1,
        bonusSR: { houg: 2, raig: 2, kaih: 2 },
      },
      {
        shipClass: [48],
        level: 7,
        bonus: { houg: 1 },
      },
      {
        shipClass: [48],
        level: 10,
        bonus: { souk: 1 },
      },
    ],
  },
  {
    ids: [79, 81],
    bonuses: [
      {
        shipX: [553, 554],
        bonus: { houg: 3 },
      },
      {
        shipX: [82, 88, 411, 412],
        bonus: { houg: 2 },
      },
    ],
  },
  {
    ids: [82],
    bonuses: [
      {
        shipClass: [76],
        bonus: { kaih: 1, tais: 1 },
      },
    ],
  },
  {
    ids: [87],
    bonuses: [
      {
        shipX: [591, 592, 593, 954],
        num: 1,
        bonus: { raig: 1, kaih: 2 },
      },
      {
        shipX: [591, 592, 593, 954],
        level: 6,
        num: 1,
        bonus: { kaih: 1 },
      },
      {
        shipX: [591, 592, 593, 954],
        level: 8,
        num: 1,
        bonus: { raig: 1 },
      },
      {
        shipX: [591, 592, 593, 954],
        level: 10,
        num: 1,
        bonus: { houg: 1 },
      },
      {
        shipX: [951],
        bonus: { houg: 1, raig: 1, kaih: 1, houm: 1 },
      },
      {
        shipX: [951],
        level: 6,
        bonus: { tyku: 1 },
      },
      {
        shipX: [951],
        level: 7,
        bonus: { kaih: 1 },
      },
      {
        shipX: [951],
        level: 8,
        bonus: { raig: 1 },
      },
      {
        shipX: [951],
        level: 9,
        bonus: { houg: 1 },
      },
      {
        shipX: [951],
        level: 10,
        bonus: { houm: 1 },
      },
      {
        shipX: [50, 181, 229, 316, 961],
        level: 6,
        bonus: { kaih: 1 },
      },
      {
        shipX: [50, 181, 229, 316, 961],
        level: 7,
        bonus: { raig: 1 },
      },
      {
        shipX: [50, 181, 229, 316, 961],
        level: 8,
        bonus: { houg: 1 },
      },
      {
        shipX: [50, 181, 229, 316, 961],
        level: 9,
        bonus: { houm: 1 },
      },
      {
        shipX: [50, 181, 229, 316, 961],
        level: 10,
        bonus: { kaih: 1 },
      },
      {
        shipClass: [38, 54, 101],
        level: 7,
        bonus: { kaih: 1 },
      },
      {
        shipClass: [38, 54, 101],
        level: 8,
        bonus: { raig: 1 },
      },
      {
        shipClass: [38, 54, 101],
        level: 10,
        bonus: { houm: 1 },
      },
    ],
  },
  {
    ids: [90],
    bonuses: [
      {
        shipX: [142],
        bonus: { houg: 2, kaih: 1 },
      },
      {
        shipX: [295, 416, 417],
        bonus: { houg: 1 },
      },
      {
        shipX: [264],
        bonus: { houg: 1, tyku: 1 },
      },
      {
        shipClass: [7, 8, 9, 13, 29, 31],
        bonus: { houg: 1 },
      },
      {
        shipS: [61],
        num: 1,
        bonusAR: { tyku: 5, kaih: 2 },
      },
      {
        shipClass: [7, 13],
        num: 1,
        bonusSR: { houg: 3, raig: 2, kaih: 2 },
      },
      {
        shipX: [501, 502, 506, 507],
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [93],
    bonuses: [
      {
        shipS: [90],
        num: 1,
        bonus: { houg: 1 },
      },
      {
        shipS: [91],
        num: 1,
        bonus: { houg: 3 },
      },
    ],
  },
  {
    ids: [94],
    bonuses: [
      {
        shipX: [197],
        num: 1,
        bonus: { houg: 3 },
      },
      {
        shipX: [196],
        num: 1,
        bonus: { houg: 7 },
      },
    ],
  },
  {
    ids: [99],
    bonuses: [
      {
        shipS: [90],
        num: 1,
        bonus: { houg: 4 },
      },
      {
        shipS: [91],
        num: 1,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [100],
    bonuses: [
      {
        shipX: [197],
        num: 1,
        bonus: { houg: 6 },
      },
      {
        shipX: [196],
        num: 1,
        bonus: { houg: 3 },
      },
      {
        shipX: [553, 554],
        bonus: { houg: 4 },
      },
    ],
  },
  {
    ids: [104],
    bonuses: [
      {
        shipX: [149, 591],
        bonus: { houg: 2 },
      },
      {
        shipX: [150, 152, 592],
        bonus: { houg: 1 },
      },
      {
        shipX: [151, 593, 954],
        bonus: { houg: 2, tyku: 1, kaih: 2 },
      },
    ],
  },
  {
    ids: [106, 450],
    bonuses: [
      {
        shipX: [145, 151, 407, 419, 541, 593, 911, 916, 954, 961, 975],
        bonus: { houg: 1, tyku: 2, souk: 1, kaih: 3 },
      },
      {
        shipS: [35, 183, 465],
        bonus: { tyku: 1, souk: 1, kaih: 3 },
      },
      {
        shipS: [20, 49, 139, 167, 170, 425, 532],
        bonus: { tyku: 2, souk: 1, kaih: 2 },
      },
      {
        shipX: [663, 668],
        num: 1,
        bonus: { houg: 1, tyku: 1, souk: 1, kaih: 1 },
      },
      {
        shipX: [668],
        num: 1,
        bonus: { tyku: 1, kaih: 1 },
      },
    ],
  },
  {
    ids: [450],
    bonuses: [
      {
        shipClass: [101],
        bonus: { houg: 1, tyku: 2, souk: 1, kaih: 3 },
      },
      {
        shipType: [1],
        bonus: { tyku: 1, souk: 1, kaih: 2 },
      },
      {
        shipX: [955, 960],
        level: 4,
        num: 1,
        bonus: { houg: 1, tyku: 1, kaih: 2, houm: 1 },
      },
    ],
  },
  {
    ids: [115],
    bonuses: [
      {
        shipClass: [47, 55],
        bonus: { houg: 2, kaih: 1, saku: 2 },
      },
      {
        shipClass: [47, 55],
        level: 10,
        bonus: { houg: 1, kaih: 1 },
      },
    ],
  },
  {
    ids: [118],
    bonuses: [
      {
        shipClass: [52],
        bonus: { houg: 1, kaih: 2, saku: 2 },
      },
      {
        shipClass: [52],
        level: 10,
        bonus: { houg: 2, saku: 1 },
      },
      {
        shipX: [507],
        bonus: { houg: 3, kaih: 1, saku: 2 },
      },
      {
        shipX: [507],
        level: 2,
        bonus: { houm: 1 },
      },
      {
        shipX: [507],
        level: 5,
        bonus: { kaih: 1 },
      },
      {
        shipX: [507],
        level: 7,
        bonus: { houg: 1 },
      },
      {
        shipX: [507],
        level: 10,
        bonus: { houg: 1, raig: 1, tyku: 1, kaih: 1, saku: 1 },
      },
    ],
  },
  {
    ids: [119],
    bonuses: [
      {
        shipClass: [34, 56],
        bonus: { houg: 1 },
      },
      {
        shipClass: [90],
        bonus: { houg: 2, raig: 1 },
      },
    ],
  },
  {
    ids: [121],
    bonuses: [
      {
        shipClass: [54],
        num: 1,
        bonus: { tyku: 4, kaih: 2 },
      },
      {
        shipClass: [54],
        num: 1,
        bonusAR: { tyku: 2, kaih: 2 },
      },
      {
        shipX: [968],
        bonus: { houg: 1, tyku: 1, kaih: 1 },
      },
      {
        shipX: [968],
        bonusAR: { houg: 1, houm: 1 },
      },
    ],
  },
  {
    ids: [122],
    bonuses: [
      {
        shipX: [656],
        level: 4,
        bonus: { houg: 5, tyku: 3, kaih: 2 },
      },
      {
        shipX: [656],
        level: 4,
        num: 1,
        bonusSR: { houg: 4, kaih: 3 },
      },
      {
        shipX: [656],
        level: 4,
        num: 1,
        bonusAR: { tyku: 4, kaih: 3 },
      },
      {
        shipClass: [54],
        level: 6,
        bonus: { kaih: 1 },
      },
      {
        shipClass: [54],
        level: 7,
        bonus: { tyku: 1 },
      },
      {
        shipClass: [54],
        level: 8,
        bonus: { houm: 1 },
      },
      {
        shipClass: [54],
        level: 9,
        bonus: { kaih: 1 },
      },
      {
        shipClass: [54],
        level: 10,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [129],
    bonuses: [
      {
        shipClass: [1, 5, 10, 12, 18, 22, 23, 28, 30, 38, 54, 66, 101],
        bonus: { houg: 1, raig: 2, kaih: 2, tais: 2, saku: 1 },
      },
      {
        shipClass: [4, 16, 20, 21, 34, 41, 52, 56],
        bonus: { houg: 1, raig: 2, kaih: 2, saku: 3 },
      },
      {
        shipClass: [7, 8, 9, 13, 29, 31],
        bonus: { houg: 1, kaih: 2, saku: 3 },
      },
    ],
  },
  {
    ids: [139],
    bonuses: [
      {
        shipX: [662, 663, 668],
        bonus: { houg: 2, tyku: 1 },
      },
    ],
  },
  {
    ids: [143],
    bonuses: [
      {
        shipS: [83],
        num: 1,
        bonus: { houg: 3 },
      },
      {
        shipS: [84, 110],
        num: 1,
        bonus: { houg: 2 },
      },
      {
        shipS: [76, 111],
        num: 1,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [144],
    bonuses: [
      {
        shipS: [83],
        num: 1,
        bonus: { houg: 3 },
      },
      {
        shipS: [84, 110],
        num: 1,
        bonus: { houg: 2 },
      },
      {
        shipX: [461, 466],
        num: 1,
        bonus: { houg: 2 },
      },
      {
        shipS: [76, 111],
        num: 1,
        bonus: { houg: 1 },
      },
      {
        shipX: [462, 467],
        num: 1,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [147],
    bonuses: [
      {
        shipClass: [61],
        bonus: { houg: 1, kaih: 1 },
      },
    ],
  },
  {
    ids: [149],
    bonuses: [
      {
        shipX: [141, 160, 488, 622, 623, 656, 961],
        num: 1,
        bonus: { kaih: 3, tais: 1 },
      },
      {
        shipX: [624],
        num: 1,
        bonus: { kaih: 5, tais: 3 },
      },
      {
        shipX: [662],
        num: 1,
        bonus: { kaih: 4, tais: 2 },
      },
      {
        shipClass: [54],
        num: 1,
        bonus: { kaih: 2, tais: 1 },
      },
    ],
  },
  {
    ids: [165, 216],
    bonuses: [
      {
        shipX: [501, 502, 506, 507],
        num: 1,
        bonus: { tyku: 2, kaih: 2 },
      },
    ],
  },
  {
    ids: [171],
    bonuses: [
      {
        shipNationality: [4],
        level: 5,
        num: 1,
        bonus: { kaih: 1 },
      },
      {
        shipNationality: [4],
        level: 10,
        num: 1,
        bonus: { houg: 1 },
      },
      {
        shipClass: [65, 93, 102, 107, 125],
        num: 1,
        bonus: { houg: 1, saku: 1 },
      },
      {
        shipClass: [65, 93, 102, 107, 125],
        level: 3,
        num: 1,
        bonus: { saku: 1 },
      },
      {
        shipClass: [65, 93, 102, 107, 125],
        level: 8,
        num: 1,
        bonus: { saku: 1 },
      },
    ],
  },
  {
    ids: [174],
    bonuses: [
      {
        shipClass: [66],
        bonus: { raig: 1, kaih: 2 },
      },
      {
        shipX: [591, 592, 954],
        bonus: { raig: 6, kaih: 3 },
      },
      {
        shipX: [593],
        bonus: { raig: 5, kaih: 2 },
      },
      {
        shipX: [488, 622, 623, 624],
        bonus: { houg: 2, raig: 4, kaih: 4 },
      },
    ],
  },
  {
    ids: [179],
    bonuses: [
      {
        shipClass: [54],
        bonus: { raig: 1 },
      },
    ],
  },
  {
    ids: [184],
    bonuses: [
      {
        shipClass: [68],
        bonus: { houg: 1, tyku: 2, kaih: 3 },
      },
    ],
  },
  {
    ids: [188],
    bonuses: [
      {
        shipClass: [68],
        bonus: { houg: 3, tyku: 1, kaih: 1 },
      },
    ],
  },
  {
    ids: [189],
    bonuses: [
      {
        shipClass: [63, 68],
        bonus: { tyku: 1, kaih: 2 },
      },
    ],
  },
  {
    ids: [194],
    bonuses: [
      {
        shipClass: [70],
        bonus: { houg: 3, kaih: 2, saku: 2 },
      },
      {
        shipClass: [62, 72],
        bonus: { kaih: 1, saku: 2 },
      },
      {
        shipX: [392],
        bonus: { houg: 1, kaih: 2, saku: 2 },
      },
    ],
  },
  {
    ids: [204],
    bonuses: [
      {
        shipX: [591, 592, 593, 954],
        num: 1,
        bonus: { raig: 1, souk: 1 },
      },
      {
        shipX: [591, 592, 593, 954],
        level: 7,
        num: 1,
        bonus: { souk: 1 },
      },
      {
        shipX: [591, 592, 593, 954],
        level: 10,
        num: 1,
        bonus: { raig: 1 },
      },
    ],
  },
  {
    ids: [217],
    bonuses: [
      {
        shipX: [501, 506],
        bonus: { houg: 1, tyku: 5, kaih: 3 },
      },
      {
        shipX: [502, 507],
        bonus: { houg: 1, tyku: 4, kaih: 2 },
      },
    ],
  },
  {
    ids: [228],
    bonuses: [
      {
        shipS: [89],
        bonus: { houg: 3, tyku: 3, kaih: 4, tais: 4 },
      },
      {
        shipX: [894, 899],
        bonus: { houg: 1, tyku: 1, kaih: 2, tais: 2 },
      },
      {
        shipClass: [75, 76],
        bonus: { houg: 2, tyku: 1, kaih: 1, tais: 5 },
      },
      {
        shipType: [7],
        bonus: { tyku: 1, kaih: 1, tais: 2 },
      },
    ],
  },
  {
    ids: [229],
    bonuses: [
      {
        shipX: [622, 623, 624],
        bonus: { houg: 1, tyku: 1 },
      },
      {
        shipX: [622, 623, 624],
        num: 1,
        bonusSR: { houg: 1, kaih: 1 },
      },
      {
        shipX: [622, 623, 624],
        num: 1,
        bonusAR: { tyku: 2, kaih: 2 },
      },
      {
        shipX: [656],
        bonus: { houg: 2, tyku: 3, tais: 2 },
      },
      {
        shipX: [656],
        num: 1,
        bonusSR: { houg: 2, kaih: 2 },
      },
      {
        shipX: [656],
        num: 1,
        bonusAR: { tyku: 3, kaih: 2 },
      },
      {
        shipX: [160, 487, 488],
        level: 7,
        bonus: { tyku: 2 },
      },
      {
        shipX: [160, 487, 488],
        level: 7,
        num: 1,
        bonusSR: { houg: 3, kaih: 2 },
      },
      {
        shipX: [220],
        level: 7,
        bonus: { tyku: 2 },
      },
      {
        shipX: [23, 224, 289, 488],
        level: 7,
        bonus: { tyku: 1 },
      },
      {
        shipClass: [28, 66],
        level: 7,
        bonus: { houg: 1, tyku: 1 },
      },
      {
        shipClass: [28, 66],
        level: 7,
        num: 1,
        bonusSR: { houg: 2, kaih: 3 },
      },
      {
        shipType: [1],
        level: 7,
        bonus: { houg: 1, tyku: 1 },
      },
      {
        shipType: [1],
        level: 7,
        num: 1,
        bonusSR: { houg: 1, kaih: 4 },
      },
      {
        shipS: [23, 56, 113],
        level: 7,
        bonus: { houg: 2 },
      },
    ],
  },
  {
    ids: [235],
    bonuses: [
      {
        shipClass: [9, 52],
        bonus: { houg: 2, tyku: 1 },
      },
      {
        shipX: [321],
        bonus: { houg: 1, kaih: 1 },
      },
      {
        shipX: [321],
        num: 1,
        bonusSR: { houg: 3, kaih: 2 },
      },
      {
        shipX: [321],
        num: 1,
        bonusAR: { tyku: 3, kaih: 3 },
      },
    ],
  },
  {
    ids: [237],
    bonuses: [
      {
        shipX: [553, 554],
        bonus: { houg: 4, kaih: 2 },
      },
      {
        shipX: [82, 88],
        bonus: { houg: 3, kaih: 1 },
      },
      {
        shipX: [411, 412],
        bonus: { houg: 2 },
      },
    ],
  },
  {
    ids: [237, 322, 323, 490],
    bonuses: [
      {
        shipX: [662],
        num: 1,
        bonus: { houg: 3, kaih: 1 },
      },
      {
        shipX: [501, 506, 553, 554, 663, 668],
        bonus: { houg: 3, tyku: 1, kaih: 2 },
      },
      {
        shipX: [502, 507],
        bonus: { houg: 2, tyku: 1, kaih: 2 },
      },
    ],
  },
  {
    ids: [238, 239],
    bonuses: [
      {
        shipX: [501, 502, 506, 507],
        num: 1,
        bonus: { raig: 1, kaih: 1 },
      },
    ],
  },
  {
    ids: [242],
    bonuses: [
      {
        shipClass: [78],
        bonus: { houg: 2, kaih: 1 },
      },
      {
        shipS: [89],
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [243],
    bonuses: [
      {
        shipClass: [78],
        bonus: { houg: 3, kaih: 1 },
      },
      {
        shipS: [89],
        bonus: { houg: 2 },
      },
    ],
  },
  {
    ids: [244],
    bonuses: [
      {
        shipClass: [78],
        bonus: { houg: 4, kaih: 2 },
      },
      {
        shipS: [89],
        bonus: { houg: 3 },
      },
      {
        shipClass: [78],
        level: 3,
        bonus: { houg: 1 },
      },
      {
        shipClass: [78],
        level: 5,
        bonus: { houm: 1 },
      },
      {
        shipClass: [78],
        level: 7,
        bonus: { houg: 1 },
      },
      {
        shipClass: [78],
        level: 8,
        bonus: { kaih: 1 },
      },
      {
        shipClass: [78],
        level: 9,
        bonus: { houm: 1 },
      },
      {
        shipClass: [78],
        level: 10,
        bonus: { houg: 1 },
      },
      {
        shipS: [89],
        level: 3,
        bonus: { kaih: 1 },
      },
      {
        shipS: [89],
        level: 7,
        bonus: { houg: 1 },
      },
      {
        shipS: [89],
        level: 9,
        bonus: { houm: 1 },
      },
      {
        shipS: [89],
        level: 10,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [266],
    bonuses: [
      {
        shipX: [566, 567, 568, 656, 670, 915, 951],
        num: 1,
        bonus: { houg: 1 },
      },
      {
        shipX: [566, 567, 568, 656, 670, 915, 951],
        num: 2,
        bonus: { houg: 2 },
      },
      {
        shipClass: [18, 23],
        bonus: { houg: 1 },
      },
      {
        shipClass: [18, 23],
        num: 1,
        bonusSR: { houg: 1, raig: 3, kaih: 1 },
      },
      {
        shipClass: [30],
        bonus: { houg: 1 },
      },
      {
        shipClass: [30],
        num: 1,
        bonusSR: { houg: 2, raig: 3, kaih: 1 },
      },
      {
        shipS: [20, 43, 167],
        bonus: { kaih: 1 },
      },
      {
        shipX: [961],
        bonus: { houg: 1, kaih: 1, houm: 1 },
      },
    ],
  },
  {
    ids: [267],
    bonuses: [
      {
        shipClass: [22, 38],
        bonus: { houg: 2, kaih: 1 },
      },
      {
        shipClass: [30],
        bonus: { houg: 1, kaih: 1 },
      },
      {
        shipX: [566, 567, 568, 656, 670, 915, 951],
        num: 1,
        bonus: { houg: 1 },
      },
      {
        shipX: [542, 543, 563, 564, 569, 578],
        bonus: { houg: 1 },
      },
      {
        shipX: [229, 542, 543, 563, 564, 569, 578, 648, 649, 955, 960],
        num: 1,
        bonusSR: { houg: 1, raig: 3, kaih: 2 },
      },
      {
        shipClass: [38],
        num: 1,
        bonusSR: { houg: 2, raig: 3, kaih: 1 },
      },
      {
        shipX: [955],
        num: 1,
        bonusSR: { raig: -1 },
      },
      {
        shipX: [960],
        num: 1,
        bonusSR: { raig: -2 },
      },
      {
        shipX: [648, 649, 955, 960, 961],
        bonus: { houg: 2 },
      },
      {
        shipX: [648],
        num: 1,
        bonusSR: { houg: 2, raig: 3, kaih: 1 },
      },
    ],
  },
  {
    ids: [366],
    bonuses: [
      {
        shipClass: [22, 38],
        bonus: { houg: 2, kaih: 1 },
      },
      {
        shipClass: [30],
        bonus: { houg: 1, kaih: 1 },
      },
      {
        shipX: [566, 567, 568, 656, 670, 915, 951],
        num: 1,
        bonus: { houg: 1, tyku: 2 },
      },
      {
        shipX: [566, 567, 568, 656, 670, 915, 951],
        num: 2,
        bonus: { houg: 1, tyku: 2 },
      },
      {
        shipX: [542, 543, 563, 564, 569, 578],
        bonus: { houg: 1 },
      },
      {
        shipX: [648, 649, 955, 960, 961],
        bonus: { houg: 2 },
      },
      {
        shipX: [229, 542, 543, 563, 564, 569, 578, 648, 649, 955, 960, 961],
        num: 1,
        bonus: { houg: 1, tyku: 3, houm: 1 },
      },
      {
        shipX: [229, 542, 543, 563, 564, 569, 578, 648, 649, 955, 960, 961],
        num: 1,
        bonusSR: { houg: 2, raig: 4, kaih: 2, houm: 2 },
      },
      {
        shipX: [960],
        num: 1,
        bonusSR: { houg: 1, raig: -1 },
      },
      {
        shipX: [229, 542, 543, 563, 564, 569, 578, 648, 649, 955, 960, 961],
        num: 1,
        bonusAR: { houg: 1, tyku: 5, kaih: 3, houm: 1 },
      },
      {
        shipX: [229, 542, 543, 563, 564, 569, 578, 648, 649, 955, 960, 961],
        num: 2,
        bonus: { houg: 2, tyku: 2 },
      },
      {
        shipX: [955],
        num: 2,
        bonus: { houg: 1 },
      },
      {
        shipX: [229, 542, 543, 563, 564, 569, 578, 648, 649, 955, 960, 961],
        level: 5,
        bonus: { houm: 1 },
      },
      {
        shipX: [229, 542, 543, 563, 564, 569, 578, 648, 649, 955, 960, 961],
        level: 8,
        bonus: { houg: 1 },
      },
      {
        shipX: [229, 542, 543, 563, 564, 569, 578, 648, 649, 955, 960, 961],
        level: 10,
        bonus: { houm: 1 },
      },
      {
        shipX: [569, 648],
        num: 1,
        bonus: { houg: 1, tyku: 2 },
      },
    ],
  },
  {
    ids: [267, 366],
    bonuses: [
      {
        shipX: [648, 961],
        requires: [129, 412],
        num: 1,
        bonus: { houg: 2, tyku: 2, kaih: 3 },
      },
      {
        shipX: [648, 961],
        requires: [74],
        num: 1,
        bonus: { houg: 3, kaih: -3 },
      },
    ],
  },
  {
    ids: [268],
    bonuses: [
      {
        shipS: [100, 101],
        num: 1,
        bonus: { souk: 2, kaih: 7 },
      },
    ],
  },
  {
    ids: [278],
    bonuses: [
      {
        shipNationality: [4],
        num: 1,
        bonus: { tyku: 1, kaih: 3, saku: 1 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        num: 1,
        bonus: { tyku: 1, kaih: 2 },
      },
      {
        shipClass: [96],
        num: 1,
        bonus: { tyku: 1, kaih: 1 },
      },
    ],
  },
  {
    ids: [279],
    bonuses: [
      {
        shipNationality: [4],
        num: 1,
        bonus: { houg: 2, tyku: 2, kaih: 3, saku: 2 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        num: 1,
        bonus: { houg: 1, tyku: 1, kaih: 2, saku: 1 },
      },
      {
        shipClass: [96],
        num: 1,
        bonus: { houg: 1, tyku: 1, kaih: 1 },
      },
    ],
  },
  {
    ids: [282],
    bonuses: [
      {
        shipClass: [73, 81],
        bonus: { houg: 2, souk: 1 },
      },
      {
        shipX: [147],
        bonus: { houg: 2, souk: 1 },
      },
      {
        shipS: [115],
        bonus: { houg: 2, souk: 1 },
      },
    ],
  },
  {
    ids: [283],
    bonuses: [
      {
        shipClass: [73, 81],
        bonus: { houg: 1, raig: 3, souk: 1 },
      },
      {
        shipX: [147],
        bonus: { houg: 1, raig: 3, souk: 1 },
      },
    ],
  },
  {
    ids: [285],
    bonuses: [
      {
        shipX: [
          147, 195, 326, 407, 419, 420, 426, 437, 627, 647, 665, 666, 903, 908,
          959,
        ],
        num: 1,
        bonus: { raig: 2, kaih: 1 },
      },
      {
        shipX: [
          147, 195, 326, 407, 419, 420, 426, 437, 627, 647, 665, 666, 903, 908,
          959,
        ],
        num: 2,
        bonus: { raig: 2, kaih: 1 },
      },
      {
        shipX: [
          147, 195, 326, 407, 419, 420, 426, 437, 627, 647, 665, 666, 903, 908,
          959,
        ],
        level: 10,
        num: 1,
        bonus: { houg: 1, raig: 1 },
      },
      {
        shipX: [
          147, 195, 326, 407, 419, 420, 426, 437, 627, 647, 665, 666, 903, 908,
          959,
        ],
        level: 10,
        num: 2,
        bonus: { houg: 1 },
      },
      {
        shipX: [
          147, 195, 326, 407, 419, 420, 426, 437, 627, 647, 665, 666, 903, 908,
          959,
        ],
        level: 10,
        num: 3,
        bonus: { raig: 3 },
      },
      {
        shipX: [903],
        num: 2,
        bonus: { raig: 2 },
      },
      {
        shipX: [903],
        num: 3,
        bonus: { raig: 2 },
      },
      {
        shipX: [908, 959],
        num: 2,
        bonus: { raig: 1 },
      },
      {
        shipX: [908, 959],
        num: 3,
        bonus: { raig: 1 },
      },
    ],
  },
  {
    ids: [286],
    bonuses: [
      {
        shipX: [
          144, 145, 198, 199, 463, 464, 468, 469, 470, 489, 490, 497, 498, 542,
          543, 563, 564, 566, 567, 568, 569, 578, 587, 588, 648, 649, 651, 656,
          667, 670, 915, 951, 955, 960, 961, 975,
        ],
        num: 1,
        bonus: { raig: 2, kaih: 1 },
      },
      {
        shipX: [
          144, 145, 198, 199, 463, 464, 468, 469, 470, 489, 490, 497, 498, 542,
          543, 563, 564, 566, 567, 568, 569, 578, 587, 588, 648, 649, 651, 656,
          667, 670, 915, 951, 955, 960, 961, 975,
        ],
        num: 2,
        bonus: { raig: 2, kaih: 1 },
      },
      {
        shipX: [
          144, 145, 198, 199, 463, 464, 468, 469, 470, 489, 490, 497, 498, 542,
          543, 563, 564, 566, 567, 568, 569, 578, 587, 588, 648, 649, 651, 656,
          667, 670, 915, 951, 955, 960, 961, 975,
        ],
        level: 10,
        num: 1,
        bonus: { houg: 1 },
      },
      {
        shipX: [
          144, 145, 198, 199, 463, 464, 468, 469, 470, 489, 490, 497, 498, 542,
          543, 563, 564, 566, 567, 568, 569, 578, 587, 588, 648, 649, 651, 656,
          667, 670, 915, 951, 955, 960, 961, 975,
        ],
        level: 10,
        num: 2,
        bonus: { houg: 1 },
      },
      {
        shipClass: [30],
        shipX: [
          144, 145, 198, 199, 463, 464, 468, 469, 470, 489, 490, 497, 498, 542,
          543, 563, 564, 566, 567, 568, 569, 578, 587, 588, 648, 649, 651, 656,
          667, 670, 915, 951, 955, 960, 961, 975,
        ],
        level: 5,
        num: 1,
        bonus: { raig: 1 },
      },
      {
        shipClass: [30],
        shipX: [
          144, 145, 198, 199, 463, 464, 468, 469, 470, 489, 490, 497, 498, 542,
          543, 563, 564, 566, 567, 568, 569, 578, 587, 588, 648, 649, 651, 656,
          667, 670, 915, 951, 955, 960, 961, 975,
        ],
        level: 5,
        num: 2,
        bonus: { raig: 1 },
      },
      {
        shipX: [961],
        level: 5,
        num: 1,
        bonus: { raig: 1 },
      },
      {
        shipX: [961],
        level: 5,
        num: 2,
        bonus: { raig: 1 },
      },
      {
        shipS: [642],
        num: 1,
        bonus: { raig: 7, kaih: 2 },
      },
      {
        shipS: [642],
        level: 7,
        num: 1,
        bonus: { raig: 2 },
      },
      {
        shipS: [642],
        level: 10,
        num: 1,
        bonus: { raig: 2 },
      },
      {
        shipX: [662, 663, 668],
        bonus: { raig: 2 },
      },
      {
        shipX: [662, 663, 668],
        num: 1,
        bonusSR: { raig: 3, kaih: 2 },
      },
    ],
  },
  {
    ids: [287],
    bonuses: [
      {
        shipX: [141, 160, 488, 624, 656],
        bonus: { kaih: 1, tais: 1 },
      },
      {
        shipX: [662, 961],
        bonus: { tais: 3 },
      },
    ],
  },
  {
    ids: [288],
    bonuses: [
      {
        shipX: [141, 160, 488, 656],
        bonus: { kaih: 1, tais: 2 },
      },
      {
        shipX: [624],
        bonus: { houg: 1, kaih: 2, tais: 3 },
      },
      {
        shipX: [662, 961],
        bonus: { kaih: 1, tais: 4 },
      },
    ],
  },
  {
    ids: [289],
    bonuses: [
      {
        shipX: [149, 591],
        bonus: { houg: 2, tyku: 1 },
      },
      {
        shipX: [150, 152, 592],
        bonus: { houg: 1 },
      },
      {
        shipX: [151, 593, 954],
        bonus: { houg: 2, tyku: 2, kaih: 2 },
      },
      {
        shipX: [149, 151, 591, 593, 954],
        num: 1,
        bonusSR: { houg: 2, kaih: 2 },
      },
      {
        shipX: [151, 593, 954],
        level: 1,
        bonus: { kaih: 1 },
      },
      {
        shipX: [151, 593, 954],
        level: 3,
        bonus: { tyku: 1 },
      },
      {
        shipX: [151, 593, 954],
        level: 5,
        bonus: { houg: 1 },
      },
      {
        shipX: [151, 593, 954],
        level: 7,
        bonus: { kaih: 1 },
      },
      {
        shipX: [151, 593, 954],
        level: 8,
        bonus: { tyku: 1 },
      },
      {
        shipX: [151, 593, 954],
        level: 9,
        bonus: { houg: 1 },
      },
      {
        shipX: [151, 593, 954],
        level: 10,
        bonus: { kaih: 1 },
      },
      {
        shipX: [591],
        level: 4,
        bonus: { tyku: 1 },
      },
      {
        shipX: [591],
        level: 6,
        bonus: { kaih: 1 },
      },
      {
        shipX: [591],
        level: 8,
        bonus: { houg: 1 },
      },
      {
        shipX: [591],
        level: 10,
        bonus: { kaih: 1 },
      },
      {
        shipX: [149, 150, 152, 592],
        level: 7,
        bonus: { tyku: 1 },
      },
      {
        shipX: [149, 150, 152, 592],
        level: 9,
        bonus: { houg: 1 },
      },
      {
        shipX: [149, 150, 152, 592],
        level: 10,
        bonus: { kaih: 1 },
      },
    ],
  },
  {
    ids: [290],
    bonuses: [
      {
        shipX: [553, 554],
        bonus: { houg: 3, tyku: 2, kaih: 1, houm: 3 },
      },
      {
        shipX: [554],
        bonus: { kaih: 1 },
      },
      {
        shipX: [82, 88],
        bonus: { houg: 2, tyku: 2, kaih: 1 },
      },
      {
        shipX: [82, 88, 553, 554],
        num: 1,
        bonusAR: { tyku: 2, kaih: 3 },
      },
      {
        shipX: [411, 412],
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [291],
    bonuses: [
      {
        shipX: [553, 554],
        bonus: { houg: 6, kaih: 1 },
      },
    ],
  },
  {
    ids: [292],
    bonuses: [
      {
        shipX: [553, 554],
        bonus: { houg: 8, tyku: 1, kaih: 2 },
      },
    ],
  },
  {
    ids: [293],
    bonuses: [
      {
        shipClass: [28, 66],
        bonus: { houg: 2, tyku: 1, kaih: 3 },
      },
      {
        shipClass: [28, 66],
        num: 1,
        bonusSR: { houg: 2, raig: 1, kaih: 3 },
      },
      {
        shipClass: [28, 66],
        requires: [174],
        num: 1,
        bonus: { houg: 2, raig: 4 },
      },
      {
        shipClass: [28, 66],
        requires: [174],
        num: 2,
        bonus: { houg: 1, raig: 3 },
      },
      {
        shipClass: [74, 77],
        bonus: { houg: 1, tyku: 1, kaih: 2 },
      },
      {
        shipClass: [74, 77],
        num: 1,
        bonusSR: { houg: 2, kaih: 3, tais: 1 },
      },
    ],
  },
  {
    ids: [294],
    bonuses: [
      {
        shipClass: [1, 5, 12],
        bonus: { houg: 1 },
      },
      {
        shipClass: [1, 5, 12],
        num: 1,
        bonusSR: { houg: 3, raig: 1, kaih: 2 },
      },
      {
        shipClass: [1, 5, 12],
        requires: [13, 125, 285],
        num: 1,
        bonus: { houg: 1, raig: 3 },
      },
      {
        shipClass: [1, 5, 12],
        requires: [13, 125, 285],
        num: 2,
        bonus: { houg: 1, raig: 2 },
      },
      {
        shipClass: [1, 5, 12],
        requires: [285],
        num: 1,
        bonus: { raig: 1 },
      },
      {
        shipX: [959],
        bonus: { houg: 1 },
      },
      {
        shipX: [959],
        num: 2,
        bonus: { houg: 2 },
      },
      {
        shipX: [959],
        num: 3,
        bonus: { houg: 3 },
      },
      {
        shipX: [959],
        level: 6,
        bonus: { houm: 4 },
      },
      {
        shipX: [959],
        level: 7,
        bonus: { houg: 6 },
      },
      {
        shipX: [959],
        level: 8,
        bonus: { houg: 1 },
      },
      {
        shipX: [959],
        level: 9,
        bonus: { houg: 1 },
      },
      {
        shipX: [959],
        level: 10,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [295],
    bonuses: [
      {
        shipClass: [1, 5, 12],
        bonus: { houg: 2, tyku: 2 },
      },
      {
        shipClass: [1, 5, 12],
        num: 1,
        bonusSR: { houg: 3, raig: 1, kaih: 2 },
      },
      {
        shipClass: [1, 5, 12],
        num: 1,
        bonusAR: { tyku: 6 },
      },
      {
        shipX: [666],
        bonus: { houg: 1, tyku: 1, tais: 1 },
      },
      {
        shipClass: [1, 5, 12],
        requires: [13, 125, 285],
        num: 1,
        bonus: { houg: 1, raig: 3 },
      },
      {
        shipClass: [1, 5, 12],
        requires: [13, 125, 285],
        num: 2,
        bonus: { houg: 1, raig: 2 },
      },
      {
        shipClass: [1, 5, 12],
        requires: [285],
        num: 1,
        bonus: { raig: 1 },
      },
      {
        shipX: [959],
        bonus: { houg: 2 },
      },
      {
        shipX: [959],
        num: 2,
        bonus: { houg: 2 },
      },
      {
        shipX: [959],
        num: 3,
        bonus: { houg: 3 },
      },
    ],
  },
  {
    ids: [296],
    bonuses: [
      {
        shipClass: [1, 5, 10],
        bonus: { houg: 1 },
      },
      {
        shipClass: [1, 5, 10],
        num: 1,
        bonusSR: { houg: 1, raig: 2, kaih: 2 },
      },
      {
        shipClass: [1, 5, 10],
        num: 1,
        bonusAR: { tyku: 5 },
      },
      {
        shipClass: [10],
        bonus: { kaih: 1 },
      },
      {
        shipClass: [23],
        bonus: { houg: 1, kaih: 1 },
      },
      {
        shipClass: [23],
        num: 1,
        bonusSR: { houg: 1, raig: 3, kaih: 2 },
      },
      {
        shipClass: [23],
        num: 1,
        bonusAR: { tyku: 6 },
      },
      {
        shipX: [145, 961],
        bonus: { houg: 1, tyku: 1 },
      },
      {
        shipX: [144],
        bonus: { houg: 1, raig: 1 },
      },
      {
        shipX: [242, 244, 469, 587, 588, 667],
        bonus: { kaih: 1 },
      },
      {
        shipX: [497],
        bonus: { houg: 1, kaih: 1 },
      },
      {
        shipX: [498, 975],
        bonus: { tyku: 1, kaih: 1 },
      },
      {
        shipX: [627],
        bonus: { houg: 2, raig: 1 },
      },
      {
        shipClass: [1, 5, 10],
        requires: [125, 285],
        num: 1,
        bonus: { houg: 1, raig: 3 },
      },
      {
        shipClass: [23],
        requires: [15, 286],
        num: 1,
        bonus: { houg: 1, raig: 3 },
      },
      {
        shipX: [903, 908],
        bonus: { houg: 3 },
      },
    ],
  },
  {
    ids: [297],
    bonuses: [
      {
        shipClass: [12],
        bonus: { kaih: 2 },
      },
      {
        shipClass: [1, 5],
        bonus: { kaih: 1 },
      },
    ],
  },
  {
    ids: [298, 299, 300],
    bonuses: [
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        bonus: { houg: 2, souk: 1 },
      },
      {
        shipClass: [67],
        bonus: { kaih: -2 },
      },
      {
        shipX: [149, 150, 151, 152],
        bonus: { houg: 1, souk: 1, kaih: -3 },
      },
      {
        shipX: [591, 592],
        bonus: { houg: 2, souk: 1, kaih: -2 },
      },
      {
        shipX: [593, 954],
        bonus: { houg: 1, souk: 1, kaih: -1 },
      },
    ],
  },
  {
    ids: [301],
    bonuses: [
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        bonus: { tyku: 2, souk: 1, kaih: 1 },
      },
    ],
  },
  {
    ids: [302],
    bonuses: [
      {
        shipClass: [76],
        bonus: { kaih: 1, tais: 1 },
      },
    ],
  },
  {
    ids: [303],
    bonuses: [
      {
        shipClass: [4, 16, 20, 41],
        bonus: { houg: 1, tyku: 1 },
      },
      {
        shipClass: [89],
        bonus: { houg: 1, tyku: 2, kaih: 1 },
      },
    ],
  },
  {
    ids: [304],
    bonuses: [
      {
        shipClass: [4, 16, 20, 41],
        bonus: { houg: 1, kaih: 1, tais: 1 },
      },
      {
        shipClass: [89],
        bonus: { houg: 1, kaih: 2, tais: 2 },
      },
    ],
  },
  {
    ids: [305, 306],
    bonuses: [
      {
        shipClass: [76],
        bonus: { kaih: 1, tais: 1 },
      },
      {
        shipS: [534],
        bonus: { kaih: 1, tais: 2 },
      },
      {
        shipS: [432, 444],
        bonus: { houg: 1, kaih: 1 },
      },
    ],
  },
  {
    ids: [307],
    bonuses: [
      {
        shipNationality: [4],
        bonus: { houg: 1, tyku: 1, kaih: 1 },
      },
    ],
  },
  {
    ids: [308],
    bonuses: [
      {
        shipNationality: [4],
        bonus: { houg: 1, tyku: 1, kaih: 1 },
      },
      {
        shipType: [2],
        bonus: { houg: 1 },
      },
      {
        shipType: [1],
        bonus: { tyku: 1, kaih: 1 },
      },
      {
        shipX: [651, 656],
        bonus: { houg: 1, tyku: 1, kaih: 1 },
      },
    ],
  },
  {
    ids: [310, 518],
    bonuses: [
      {
        shipClass: [34],
        bonus: { houg: 2, tyku: 1, kaih: 1 },
      },
      {
        shipClass: [34],
        level: 10,
        bonus: { houg: 2 },
      },
      {
        shipClass: [56],
        bonus: { houg: 2, kaih: 1 },
      },
      {
        shipClass: [56],
        level: 10,
        bonus: { houg: 2, kaih: 2 },
      },
      {
        shipClass: [90],
        bonus: { houg: 3, raig: 2, tyku: 1, kaih: 1 },
      },
      {
        shipClass: [90],
        level: 10,
        bonus: { houg: 1, raig: 1 },
      },
      {
        shipX: [622, 623, 624],
        bonus: { houg: 2, kaih: 1, tais: 1 },
      },
      {
        shipX: [622, 623, 624],
        num: 1,
        bonusSR: { houg: 3, raig: 2, kaih: 2 },
      },
      {
        shipX: [622, 623, 624],
        level: 7,
        bonus: { houg: 1, raig: 1 },
      },
    ],
  },
  {
    ids: [518],
    bonuses: [
      {
        shipClass: [34, 56],
        bonus: { houg: 1, tyku: 1, kaih: 1, tais: 1 },
      },
      {
        shipType: [16],
        bonus: { houg: 1, raig: 1, kaih: 1 },
      },
      {
        shipX: [622, 623, 624],
        bonus: { houg: 1 },
      },
      {
        shipX: [622, 624],
        bonus: { tyku: 1 },
      },
      {
        shipX: [624],
        bonus: { tais: 2 },
      },
    ],
  },
  {
    ids: [313],
    bonuses: [
      {
        shipClass: [87, 91],
        bonus: { houg: 2, tyku: 2, souk: 1, kaih: 1 },
      },
      {
        shipX: [651, 656],
        bonus: { houg: 2, tyku: 2, souk: 1, kaih: 1 },
      },
    ],
  },
  {
    ids: [314],
    bonuses: [
      {
        shipClass: [87, 91],
        bonus: { houg: 1, raig: 3 },
      },
    ],
  },
  {
    ids: [315],
    bonuses: [
      {
        shipNationality: [4],
        bonus: { houg: 2, kaih: 3, saku: 4 },
      },
      {
        shipClass: [87, 91],
        bonus: { houg: 1 },
      },
      {
        shipClass: [87, 91],
        num: 1,
        bonus: { leng: 1 },
      },
      {
        shipX: [651, 656],
        num: 1,
        bonus: { houg: 2, kaih: 2, saku: 3, leng: 1 },
      },
    ],
  },
  {
    ids: [316],
    bonuses: [
      {
        shipClass: [68],
        bonus: { houg: 4, tyku: 1, kaih: 1 },
      },
    ],
  },
  {
    ids: [317],
    bonuses: [
      {
        shipClass: [6],
        num: 1,
        bonus: { houg: 2, tyku: 1 },
      },
      {
        shipClass: [6],
        level: 8,
        num: 1,
        bonus: { houm: 1 },
      },
      {
        shipClass: [2],
        num: 1,
        bonus: { houg: 1, tyku: 1, kaih: 1 },
      },
      {
        shipClass: [2],
        level: 10,
        num: 1,
        bonus: { houm: 1 },
      },
      {
        shipX: [149, 591, 592],
        num: 1,
        bonus: { houg: 2, tyku: 2 },
      },
      {
        shipX: [150],
        num: 1,
        bonus: { houg: 1, tyku: 1 },
      },
      {
        shipX: [151],
        num: 1,
        bonus: { houg: 1, tyku: 1, kaih: 1 },
      },
      {
        shipX: [593],
        num: 1,
        bonus: { houg: 1, tyku: 3, kaih: 2 },
      },
      {
        shipX: [954],
        num: 1,
        bonus: { houg: 2, tyku: 2, kaih: 1 },
      },
      {
        shipX: [152],
        num: 1,
        bonus: { houg: 2, tyku: 1 },
      },
      {
        shipX: [541],
        num: 1,
        bonus: { houg: 1, tyku: 2 },
      },
      {
        shipX: [573],
        num: 1,
        bonus: { houg: 2, tyku: 2, kaih: 1 },
      },
    ],
  },
  {
    ids: [318],
    bonuses: [
      {
        shipX: [411, 412],
        bonus: { houg: 1 },
      },
      {
        shipX: [82, 88],
        bonus: { houg: 2, tyku: 2, kaih: 2 },
      },
      {
        shipX: [553],
        bonus: { houg: 2, tyku: 2, kaih: 2, houm: 3 },
      },
      {
        shipX: [553],
        requires: [290],
        num: 1,
        bonus: { souk: 1, kaih: 2 },
      },
      {
        shipX: [554],
        bonus: { houg: 3, tyku: 2, kaih: 2, houm: 3 },
      },
      {
        shipX: [554],
        requires: [290],
        num: 1,
        bonus: { houg: 1, souk: 1, kaih: 2, houm: 1 },
      },
      {
        shipX: [82, 88, 553, 554],
        num: 1,
        bonusAR: { tyku: 2, kaih: 3, houm: 1 },
      },
      {
        shipX: [82, 88, 553, 554],
        requires: [290],
        num: 1,
        bonusAR: { tyku: -2, kaih: -3, houm: -1 },
      },
      {
        shipX: [541, 573],
        bonus: { houg: 3, tyku: 2, kaih: 1, houm: 2 },
      },
      {
        shipX: [541, 573],
        requires: [290],
        num: 1,
        bonus: { houg: 2, souk: 1, kaih: 2, houm: 1 },
      },
    ],
  },
  {
    ids: [319],
    bonuses: [
      {
        shipX: [553, 554],
        bonus: { houg: 7, tyku: 3, kaih: 2 },
      },
    ],
  },
  {
    ids: [320],
    bonuses: [
      {
        shipX: [553],
        bonus: { houg: 2 },
      },
      {
        shipX: [196, 197],
        bonus: { houg: 3 },
      },
      {
        shipX: [508, 509, 554],
        bonus: { houg: 4 },
      },
    ],
  },
  {
    ids: [322],
    bonuses: [
      {
        shipX: [553, 554],
        bonus: { houg: 5, tyku: 2, kaih: 2, tais: 1 },
      },
    ],
  },
  {
    ids: [323],
    bonuses: [
      {
        shipX: [553, 554],
        bonus: { houg: 6, tyku: 3, kaih: 3, tais: 2 },
      },
    ],
  },
  {
    ids: [324, 325],
    bonuses: [
      {
        shipX: [554, 646],
        bonus: { houg: 2, kaih: 1, tais: 3 },
      },
      {
        shipX: [553],
        bonus: { houg: 1, kaih: 1, tais: 2 },
      },
    ],
  },
  {
    ids: [326],
    bonuses: [
      {
        shipX: [646],
        bonus: { houg: 3, kaih: 3, tais: 5 },
      },
      {
        shipX: [554],
        bonus: { houg: 3, kaih: 2, tais: 4 },
      },
      {
        shipX: [553],
        bonus: { houg: 1, kaih: 1, tais: 3 },
      },
    ],
  },
  {
    ids: [327],
    bonuses: [
      {
        shipX: [646],
        bonus: { houg: 5, kaih: 4, tais: 6 },
      },
      {
        shipX: [554],
        bonus: { houg: 4, kaih: 2, tais: 5 },
      },
      {
        shipX: [553],
        bonus: { houg: 2, kaih: 1, tais: 4 },
      },
    ],
  },
  {
    ids: [328],
    bonuses: [
      {
        shipS: [78, 79, 85, 86],
        bonus: { houg: 1, kaih: 1 },
      },
      {
        shipX: [149, 150, 151, 152, 209, 210, 211, 212],
        bonus: { houg: 1 },
      },
      {
        shipX: [591],
        bonus: { houg: 2, raig: 1 },
      },
      {
        shipX: [592, 954],
        bonus: { houg: 2, tyku: 1 },
      },
      {
        shipX: [593],
        bonus: { houg: 1, tyku: 2 },
      },
      {
        shipS: [26, 27, 77, 87],
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [329],
    bonuses: [
      {
        shipS: [78, 79, 85, 86],
        bonus: { houg: 1, kaih: 1 },
      },
      {
        shipX: [209, 210, 211, 212],
        bonus: { houg: 1 },
      },
      {
        shipX: [149, 150, 151, 152],
        bonus: { houg: 2, tyku: 1 },
      },
      {
        shipX: [591, 592, 954],
        bonus: { houg: 3, raig: 2, tyku: 1 },
      },
      {
        shipX: [593],
        bonus: { houg: 2, raig: 1, tyku: 3 },
      },
      {
        shipS: [26, 27, 77, 87],
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [330],
    bonuses: [
      {
        shipClass: [93],
        bonus: { houg: 1 },
      },
      {
        shipClass: [19, 88],
        bonus: { houg: 1 },
      },
      {
        shipX: [541, 573, 576],
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [331],
    bonuses: [
      {
        shipClass: [93],
        bonus: { houg: 1 },
      },
      {
        shipX: [918, 1496],
        bonus: { houg: 1, kaih: 1 },
      },
      {
        shipClass: [19, 88],
        bonus: { houg: 1 },
      },
      {
        shipX: [541, 573, 576],
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [332],
    bonuses: [
      {
        shipClass: [93],
        bonus: { houg: 1 },
      },
      {
        shipX: [918, 1496],
        bonus: { houg: 1, tyku: 1, kaih: 1 },
      },
      {
        shipClass: [19, 88],
        bonus: { houg: 1 },
      },
      {
        shipX: [541, 573, 576],
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [335],
    bonuses: [
      {
        shipX: [277, 278],
        bonus: { tyku: 1, kaih: 1 },
      },
      {
        shipX: [594, 599, 610, 646, 698],
        bonus: { tyku: 2, kaih: 1 },
      },
    ],
  },
  {
    ids: [336],
    bonuses: [
      {
        shipX: [277, 278],
        bonus: { houg: 1, tyku: 1, kaih: 1 },
      },
      {
        shipX: [594, 599, 610, 646, 698],
        bonus: { houg: 1, tyku: 2, kaih: 1 },
      },
    ],
  },
  {
    ids: [337],
    bonuses: [
      {
        shipX: [277, 278],
        bonus: { houg: 1, tyku: 1, kaih: 1 },
      },
      {
        shipX: [594, 599, 610, 646, 698],
        bonus: { houg: 2, tyku: 2, kaih: 1 },
      },
    ],
  },
  {
    ids: [338],
    bonuses: [
      {
        shipX: [277, 278],
        bonus: { houg: 1, tyku: 1, kaih: 2 },
      },
      {
        shipX: [594, 646, 698],
        bonus: { houg: 1, tyku: 2, kaih: 3 },
      },
      {
        shipX: [599, 610],
        bonus: { houg: 4, tyku: 3, kaih: 4 },
      },
    ],
  },
  {
    ids: [339],
    bonuses: [
      {
        shipX: [277, 278],
        bonus: { houg: 1, tyku: 2, kaih: 2 },
      },
      {
        shipX: [594, 646, 698],
        bonus: { houg: 1, tyku: 3, kaih: 4 },
      },
      {
        shipX: [599, 610],
        bonus: { houg: 6, tyku: 4, kaih: 5 },
      },
    ],
  },
  {
    ids: [340],
    bonuses: [
      {
        shipS: [589, 590],
        bonus: { houg: 1, tyku: 1, kaih: 1 },
      },
    ],
  },
  {
    ids: [341],
    bonuses: [
      {
        shipS: [589, 590],
        bonus: { houg: 2, tyku: 1, kaih: 1 },
      },
      {
        shipS: [574],
        bonus: { houg: 1, tyku: 1, kaih: 1 },
      },
    ],
  },
  {
    ids: [342],
    bonuses: [
      {
        shipX: [277, 278, 461, 462, 466, 467],
        bonus: { houg: 1 },
      },
      {
        shipX: [594, 646, 698],
        bonus: { houg: 2, tyku: 1, kaih: 1 },
      },
      {
        shipX: [599, 610],
        bonus: { houg: 3, tyku: 2, kaih: 2 },
      },
    ],
  },
  {
    ids: [343],
    bonuses: [
      {
        shipX: [277, 278],
        bonus: { houg: 2 },
      },
      {
        shipX: [461, 462, 466, 467],
        bonus: { houg: 1 },
      },
      {
        shipX: [594, 646, 698],
        bonus: { houg: 3, tyku: 2, kaih: 1 },
      },
      {
        shipX: [599, 610],
        bonus: { houg: 5, tyku: 3, kaih: 3 },
      },
    ],
  },
  {
    ids: [344],
    bonuses: [
      {
        shipX: [599, 610],
        bonus: { houg: 3 },
      },
      {
        shipX: [555, 560],
        bonus: { houg: 2, tais: 2 },
      },
      {
        shipX: [318],
        bonus: { houg: 4, tais: 1 },
      },
      {
        shipX: [282],
        bonus: { houg: 2, tais: 1 },
      },
      {
        shipX: [888],
        bonus: { houg: 4, tais: 2 },
      },
      {
        shipX: [883],
        bonus: { houg: 5, tais: 2 },
      },
    ],
  },
  {
    ids: [345],
    bonuses: [
      {
        shipX: [599, 610],
        bonus: { houg: 3, kaih: 1 },
      },
      {
        shipX: [555, 560],
        bonus: { houg: 3, kaih: 2, tais: 2 },
      },
      {
        shipX: [318],
        bonus: { houg: 5, kaih: 2, tais: 1 },
      },
      {
        shipX: [282],
        bonus: { houg: 3, kaih: 1, tais: 1 },
      },
      {
        shipX: [888],
        bonus: { houg: 4, kaih: 2, tais: 2 },
      },
      {
        shipX: [883],
        bonus: { houg: 5, kaih: 3, tais: 2 },
      },
    ],
  },
  {
    ids: [356, 357],
    bonuses: [
      {
        shipClass: [95],
        bonus: { houg: 2 },
      },
      {
        shipClass: [9],
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [358],
    bonuses: [
      {
        shipNationality: [4],
        bonus: { houg: 1, tyku: 1, kaih: 1 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        bonus: { houg: 1, tyku: 1, kaih: 1 },
      },
      {
        shipClass: [95],
        bonus: { houg: 1, tyku: 2, kaih: 2 },
      },
    ],
  },
  {
    ids: [359],
    bonuses: [
      {
        shipS: [613],
        bonus: { houg: 2, tyku: 2, kaih: 1 },
      },
      {
        shipS: [115],
        bonus: { houg: 1, tyku: 1, kaih: 1 },
      },
      {
        shipX: [622, 623, 624],
        bonus: { houg: 1, tyku: 1 },
      },
    ],
  },
  {
    ids: [360, 361],
    bonuses: [
      {
        shipS: [604],
        bonus: { houg: 2, tyku: 2, kaih: 1 },
      },
      {
        shipS: [574],
        bonus: { houg: 2, tyku: 1, kaih: 1 },
      },
      {
        shipClass: [41],
        bonus: { houg: 1, tyku: 1 },
      },
    ],
  },
  {
    ids: [362, 363],
    bonuses: [
      {
        shipClass: [99],
        bonus: { houg: 1, tyku: 2, kaih: 1 },
      },
      {
        shipClass: [21, 34],
        bonus: { houg: -3, tyku: -3, kaih: -8 },
      },
      {
        shipClass: [4, 16, 20],
        bonus: { houg: -3, tyku: -2, kaih: -6 },
      },
      {
        shipClass: [56, 89],
        bonus: { houg: -2, tyku: -1, kaih: -4 },
      },
      {
        shipClass: [41, 52, 98],
        bonus: { tyku: -1, kaih: -2 },
      },
      {
        shipNationality: [4],
        bonus: { tyku: 1, kaih: 1 },
      },
    ],
  },
  {
    ids: [364],
    bonuses: [
      {
        shipX: [118, 119, 506, 507, 586, 623, 657, 668],
        bonus: { houg: 1, raig: 1, kaih: 5 },
      },
      {
        shipX: [119],
        bonus: { raig: 1 },
      },
      {
        shipX: [507],
        bonus: { raig: 2 },
      },
      {
        shipX: [623],
        bonus: { houg: 1, raig: 3 },
      },
      {
        bonus: { houg: -1, kaih: -7 },
      },
    ],
  },
  {
    ids: [365],
    bonuses: [
      {
        shipClass: [2, 6, 19, 26, 37],
        num: 1,
        bonus: { houg: 1 },
      },
      {
        shipX: [136, 148, 541, 546, 573, 593, 911, 916],
        num: 1,
        bonus: { houg: 1 },
      },
      {
        shipX: [591, 592, 954],
        num: 1,
        bonus: { houg: 2 },
      },
    ],
  },
  {
    ids: [367],
    bonuses: [
      {
        shipS: [574],
        bonus: { houg: 2, kaih: 1, tais: 1, saku: 1 },
      },
      {
        shipClass: [70],
        bonus: { houg: 1, kaih: 1, tais: 1, saku: 1 },
      },
      {
        shipClass: [62, 72],
        bonus: { houg: 1, kaih: 1, saku: 1 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        bonus: { houg: 2, kaih: 2, saku: 2 },
      },
    ],
  },
  {
    ids: [368],
    bonuses: [
      {
        shipS: [574],
        bonus: { houg: 4, kaih: 2, tais: 3, saku: 3 },
      },
      {
        shipX: [630],
        num: 1,
        bonus: { houg: 2, raig: 2, kaih: 1, saku: 1 },
      },
      {
        shipClass: [70],
        bonus: { houg: 2, kaih: 1, tais: 3, saku: 2 },
      },
      {
        shipClass: [62, 72],
        bonus: { houg: 1, kaih: 1, tais: 2, saku: 2 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        bonus: { houg: 2, kaih: 2, tais: 2, saku: 2 },
      },
    ],
  },
  {
    ids: [369],
    bonuses: [
      {
        shipS: [574],
        bonus: { houg: 5, kaih: 4, tais: 4, saku: 3 },
      },
      {
        shipX: [630],
        num: 1,
        bonus: { houg: 3, raig: 3, kaih: 2, saku: 2 },
      },
      {
        shipClass: [70],
        bonus: { houg: 3, kaih: 2, tais: 3, saku: 3 },
      },
      {
        shipClass: [62, 72],
        bonus: { houg: 2, kaih: 1, tais: 2, saku: 2 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        bonus: { houg: 2, kaih: 2, tais: 2, saku: 2 },
      },
    ],
  },
  {
    ids: [370],
    bonuses: [
      {
        shipS: [574],
        bonus: { houg: 1, kaih: 1, tais: 3, saku: 2 },
      },
      {
        shipClass: [70],
        bonus: { houg: 1, kaih: 1, tais: 3, saku: 1 },
      },
      {
        shipClass: [62, 72],
        bonus: { houg: 1, kaih: 1, tais: 2, saku: 1 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        bonus: { houg: 2, kaih: 2, tais: 3, saku: 2 },
      },
      {
        shipS: [439],
        num: 1,
        bonus: { houg: 4, kaih: 1, saku: 1 },
      },
    ],
  },
  {
    ids: [371],
    bonuses: [
      {
        shipS: [574],
        bonus: { houg: 4, kaih: 3, tais: 2, saku: 6 },
      },
      {
        shipX: [630],
        num: 1,
        bonus: { houg: 2, kaih: 2, saku: 3 },
      },
      {
        shipClass: [70],
        bonus: { houg: 2, kaih: 2, tais: 1, saku: 4 },
      },
      {
        shipClass: [79],
        bonus: { houg: 2, kaih: 1, saku: 3 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        bonus: { houg: 3, kaih: 2, tais: 1, saku: 3 },
      },
      {
        shipClass: [88],
        num: 1,
        bonus: { houg: 3, kaih: 2, saku: 2 },
      },
    ],
  },
  {
    ids: [372],
    bonuses: [
      {
        shipS: [75, 92, 110, 111, 153],
        bonus: { houg: 1 },
      },
      {
        shipS: [110, 111, 153],
        num: 1,
        bonus: { raig: 1 },
      },
      {
        shipX: [108, 109, 291, 292, 296, 297, 508, 509],
        bonus: { houg: 1 },
      },
      {
        shipX: [74, 116, 117, 185, 282, 318, 555, 560],
        bonus: { tais: 1 },
      },
      {
        shipX: [318, 555, 560],
        num: 1,
        bonus: { raig: 1 },
      },
      {
        shipX: [883, 888],
        bonus: { houg: 2, tais: 1 },
      },
      {
        shipX: [883, 888],
        num: 1,
        bonus: { raig: 2 },
      },
    ],
  },
  {
    ids: [373],
    bonuses: [
      {
        shipS: [110],
        bonus: { houg: 2 },
      },
      {
        shipS: [75, 92, 111, 153],
        bonus: { houg: 1 },
      },
      {
        shipS: [110, 153],
        num: 1,
        bonus: { raig: 2, kaih: 2 },
      },
      {
        shipS: [111],
        num: 1,
        bonus: { raig: 2, kaih: 3 },
      },
      {
        shipS: [75, 92],
        num: 1,
        bonus: { raig: 1, kaih: 1 },
      },
      {
        shipX: [108, 109, 291, 292, 296, 297, 508, 509],
        bonus: { houg: 1 },
      },
      {
        shipX: [74, 116],
        bonus: { tais: 1 },
      },
      {
        shipX: [117, 185, 282],
        bonus: { houg: 1, tais: 1 },
      },
      {
        shipX: [318, 555, 560, 883],
        bonus: { houg: 1, tais: 2 },
      },
      {
        shipX: [888],
        bonus: { houg: 2, tais: 2 },
      },
      {
        shipX: [117, 185, 282, 291, 292],
        num: 1,
        bonus: { raig: 1 },
      },
      {
        shipX: [296, 297, 318, 555, 560],
        num: 1,
        bonus: { raig: 1, kaih: 1 },
      },
      {
        shipX: [508, 509, 888],
        num: 1,
        bonus: { raig: 2, kaih: 2 },
      },
      {
        shipX: [883],
        num: 1,
        bonus: { raig: 3, kaih: 4 },
      },
    ],
  },
  {
    ids: [374],
    bonuses: [
      {
        shipS: [110],
        bonus: { houg: 3 },
      },
      {
        shipS: [111, 153],
        bonus: { houg: 2 },
      },
      {
        shipS: [75, 92],
        bonus: { houg: 1 },
      },
      {
        shipS: [110],
        num: 1,
        bonus: { raig: 3, kaih: 3 },
      },
      {
        shipS: [111],
        num: 1,
        bonus: { raig: 3, kaih: 4 },
      },
      {
        shipS: [153],
        num: 1,
        bonus: { raig: 3, kaih: 2 },
      },
      {
        shipS: [75, 92],
        num: 1,
        bonus: { raig: 2, kaih: 2 },
      },
      {
        shipX: [108, 109],
        bonus: { houg: 1 },
      },
      {
        shipX: [74, 116, 291, 292, 296, 297],
        bonus: { houg: 1, tais: 1 },
      },
      {
        shipX: [117, 185, 282, 508, 509],
        bonus: { houg: 1, tais: 2 },
      },
      {
        shipX: [318, 555, 560],
        bonus: { houg: 1, tais: 3 },
      },
      {
        shipX: [883],
        bonus: { houg: 2, tais: 3 },
      },
      {
        shipX: [888],
        bonus: { houg: 3, tais: 3 },
      },
      {
        shipX: [108, 109, 291, 292],
        num: 1,
        bonus: { raig: 1 },
      },
      {
        shipX: [117, 185, 282, 296, 297],
        num: 1,
        bonus: { raig: 1, kaih: 1 },
      },
      {
        shipX: [318, 555, 560],
        num: 1,
        bonus: { raig: 1, kaih: 2 },
      },
      {
        shipX: [508, 509, 888],
        num: 1,
        bonus: { raig: 2, kaih: 3 },
      },
      {
        shipX: [883],
        num: 1,
        bonus: { raig: 3, kaih: 5 },
      },
    ],
  },
  {
    ids: [375],
    bonuses: [
      {
        shipClass: [69, 83, 84, 105, 116, 118],
        bonus: { houg: 3, tyku: 3, kaih: 3, tais: 3 },
      },
      {
        shipS: [84],
        bonus: { houg: 1, tyku: 1, kaih: 1, tais: 1 },
      },
    ],
  },
  {
    ids: [376],
    bonuses: [
      {
        shipNationality: [4],
        bonus: { houg: 2, raig: 4 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        bonus: { houg: 1, raig: 2 },
      },
      {
        shipClass: [96],
        bonus: { houg: 1, raig: 1 },
      },
    ],
  },
  {
    ids: [377],
    bonuses: [
      {
        shipNationality: [4],
        num: 1,
        bonus: { kaih: 1, tais: 2 },
      },
      {
        shipX: [629, 651, 656],
        num: 1,
        bonus: { kaih: 2, tais: 1 },
      },
      {
        shipClass: [67, 78, 82, 88, 96, 108, 112],
        num: 1,
        bonus: { kaih: 1, tais: 1 },
      },
    ],
  },
  {
    ids: [378],
    bonuses: [
      {
        shipNationality: [4],
        num: 1,
        bonus: { kaih: 1, tais: 3 },
      },
      {
        shipX: [629, 651, 656],
        num: 1,
        bonus: { kaih: 1, tais: 1 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        num: 1,
        bonus: { kaih: 1, tais: 2 },
      },
      {
        shipClass: [96],
        num: 1,
        bonus: { kaih: 1, tais: 1 },
      },
    ],
  },
  {
    ids: [379],
    bonuses: [
      {
        shipType: [1],
        bonus: { houg: 1, tyku: 2 },
      },
      {
        shipType: [16, 21],
        bonus: { houg: 1, tyku: 1 },
      },
      {
        shipClass: [28, 66, 101],
        bonus: { houg: 1, tyku: 2 },
      },
      {
        shipClass: [101],
        num: 1,
        bonus: { houg: 2, tyku: 2 },
      },
      {
        shipS: [22, 23, 56, 113],
        bonus: { houg: 2 },
      },
      {
        shipS: [24, 25],
        bonus: { houg: 2, tyku: 2 },
      },
      {
        shipS: [22, 23, 56, 113, 115],
        bonus: { tais: 1 },
      },
      {
        shipS: [51, 52, 115],
        bonus: { houg: 1 },
      },
      {
        shipX: [488],
        bonus: { tyku: 4 },
      },
      {
        shipX: [141, 160, 220, 487],
        bonus: { tyku: 3 },
      },
      {
        shipX: [22, 23, 56, 113, 219, 224, 289],
        bonus: { tyku: 2 },
      },
      {
        shipX: [651, 656],
        bonus: { houg: 3, tyku: 3 },
      },
      {
        shipX: [656],
        bonus: { kaih: 3, tais: 2 },
      },
      {
        shipX: [141, 160, 487, 488],
        bonus: { tais: 1 },
      },
      {
        shipX: [477, 478, 624],
        bonus: { tais: 2 },
      },
      {
        shipX: [477, 478, 622, 624],
        bonus: { tyku: 2 },
      },
      {
        shipX: [146, 547, 652, 657],
        num: 1,
        bonus: { houg: 2, tyku: 2 },
      },
      {
        shipType: [3, 4, 16, 21],
        num: 1,
        bonusSR: { houg: 1, kaih: 2 },
      },
      {
        shipType: [1],
        num: 1,
        bonusSR: { houg: 1, kaih: 4 },
      },
      {
        shipClass: [21, 28, 34, 66],
        num: 1,
        bonusSR: { houg: 2, kaih: 3 },
      },
      {
        shipClass: [101],
        num: 1,
        bonusSR: { houg: 4, kaih: 3 },
      },
      {
        shipX: [488, 651, 656],
        num: 1,
        bonusSR: { houg: 2, kaih: 2 },
      },
      {
        shipX: [118, 119, 141, 146, 160, 487, 547, 652, 657],
        num: 1,
        bonusSR: { houg: 1, kaih: 1 },
      },
      {
        shipX: [656],
        num: 1,
        bonusAR: { tyku: 3, kaih: 2 },
      },
    ],
  },
  {
    ids: [380],
    bonuses: [
      {
        shipType: [16, 21],
        bonus: { houg: 1, tyku: 2 },
      },
      {
        shipClass: [101],
        bonus: { houg: 1, tyku: 2 },
      },
      {
        shipClass: [101],
        num: 1,
        bonus: { houg: 2, tyku: 2 },
      },
      {
        shipS: [22, 23, 56, 113],
        bonus: { houg: 2 },
      },
      {
        shipS: [24, 25],
        bonus: { houg: 3, tyku: 2 },
      },
      {
        shipS: [22, 23, 56, 113, 115],
        bonus: { tais: 1 },
      },
      {
        shipS: [51, 52, 115],
        bonus: { houg: 1 },
      },
      {
        shipX: [488],
        bonus: { tyku: 4 },
      },
      {
        shipX: [141, 160, 220, 487],
        bonus: { tyku: 3 },
      },
      {
        shipX: [22, 23, 56, 113, 219, 224, 289],
        bonus: { tyku: 2 },
      },
      {
        shipX: [651, 656],
        bonus: { houg: 3, tyku: 3 },
      },
      {
        shipX: [407, 665],
        bonus: { houg: 2, tyku: 2 },
      },
      {
        shipX: [407, 665],
        num: 1,
        bonus: { houg: 1, tyku: 1, kaih: 2 },
      },
      {
        shipX: [141, 160, 487, 488],
        bonus: { tais: 1 },
      },
      {
        shipX: [477, 478, 624],
        bonus: { tais: 2 },
      },
      {
        shipX: [477, 478, 622, 624],
        bonus: { tyku: 2 },
      },
      {
        shipX: [652, 657],
        bonus: { houg: 3 },
      },
      {
        shipX: [146, 547],
        num: 1,
        bonus: { houg: 2 },
      },
      {
        shipX: [146, 547, 652, 657],
        num: 1,
        bonus: { tyku: 2 },
      },
      {
        shipType: [3, 4, 16, 21],
        num: 1,
        bonusSR: { houg: 2, kaih: 1 },
      },
      {
        shipClass: [101],
        num: 1,
        bonusSR: { houg: 4, kaih: 3 },
      },
      {
        shipX: [118, 119, 141, 160, 487, 488, 651, 656],
        num: 1,
        bonusSR: { houg: 1, kaih: 2 },
      },
      {
        shipX: [146, 547, 652, 657],
        num: 1,
        bonusSR: { houg: 1, kaih: 3 },
      },
      {
        shipX: [407, 665],
        num: 1,
        bonusSR: { houg: 2, kaih: 1 },
      },
      {
        shipX: [407, 665],
        requiresType: [21],
        requiresNumType: 1,
        num: 1,
        bonus: { houg: 1, tyku: 2, kaih: 1 },
      },
    ],
  },
  {
    ids: [381],
    bonuses: [
      {
        shipNationality: [4],
        bonus: { houg: 1 },
      },
      {
        shipClass: [102],
        bonus: { houg: 1 },
      },
      {
        shipNationality: [4],
        level: 6,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [382, 509],
    bonuses: [
      {
        shipType: [1],
        bonus: { tyku: 2, kaih: 2, tais: 1 },
      },
      {
        shipType: [1],
        num: 1,
        bonusSR: { houg: 2, kaih: 3 },
      },
      {
        shipType: [1],
        num: 1,
        bonusAR: { tyku: 2, kaih: 3 },
      },
      {
        shipClass: [28, 66, 101],
        bonus: { tyku: 2, kaih: 1 },
      },
      {
        shipClass: [28, 66, 101],
        num: 1,
        bonusSR: { houg: 1, kaih: 2 },
      },
      {
        shipClass: [28, 66, 101],
        num: 1,
        bonusAR: { tyku: 2, kaih: 2 },
      },
      {
        shipS: [23, 56, 113],
        bonus: { tyku: 1 },
      },
      {
        shipX: [220, 224, 289],
        bonus: { kaih: 1 },
      },
      {
        shipX: [160, 487, 488],
        bonus: { kaih: 1 },
      },
      {
        shipX: [160, 487, 488],
        num: 1,
        bonusSR: { houg: 1, kaih: 1 },
      },
      {
        shipX: [160, 487, 488],
        num: 1,
        bonusAR: { tyku: 2, kaih: 2 },
      },
      {
        shipX: [656],
        bonus: { tyku: 3, kaih: 2 },
      },
      {
        shipX: [656],
        num: 1,
        bonusSR: { houg: 2, kaih: 2 },
      },
      {
        shipX: [656],
        num: 1,
        bonusAR: { tyku: 3, kaih: 2 },
      },
      {
        shipX: [979],
        bonus: { houg: 1, tyku: 1, kaih: 1, houm: 1 },
      },
    ],
  },
  {
    ids: [509],
    bonuses: [
      {
        level: 2,
        bonus: { tyku: 1 },
      },
      {
        level: 4,
        bonus: { kaih: 2 },
      },
      {
        level: 6,
        bonus: { houg: 1 },
      },
      {
        level: 8,
        bonus: { tyku: 1 },
      },
      {
        level: 10,
        bonus: { houm: 1 },
      },
      {
        shipType: [1],
        level: 1,
        bonus: { tyku: 1 },
      },
      {
        shipType: [1],
        level: 2,
        bonus: { tyku: -1, kaih: 2 },
      },
      {
        shipType: [1],
        level: 4,
        bonus: { houg: 1, kaih: -2 },
      },
      {
        shipType: [1],
        level: 6,
        bonus: { houg: -1, tyku: 1 },
      },
      {
        shipType: [1],
        level: 8,
        bonus: { tyku: -1, houm: 1 },
      },
      {
        shipType: [1],
        level: 10,
        bonus: { tyku: 1, houm: -1 },
      },
      {
        shipClass: [28, 66, 101],
        level: 1,
        bonus: { tyku: 1 },
      },
      {
        shipClass: [28, 66, 101],
        level: 2,
        bonus: { tyku: -1, kaih: 2 },
      },
      {
        shipClass: [28, 66, 101],
        level: 4,
        bonus: { houg: 1, kaih: -2 },
      },
      {
        shipClass: [28, 66, 101],
        level: 6,
        bonus: { houg: -1, tyku: 1 },
      },
      {
        shipClass: [28, 66, 101],
        level: 8,
        bonus: { tyku: -1, houm: 1 },
      },
      {
        shipClass: [28, 66, 101],
        level: 10,
        bonus: { tyku: 1, houm: -1 },
      },
      {
        shipX: [145, 488, 656, 961],
        level: 1,
        bonus: { tyku: 1 },
      },
      {
        shipX: [145, 488, 656, 961],
        level: 2,
        bonus: { tyku: -1, kaih: 2 },
      },
      {
        shipX: [145, 488, 656, 961],
        level: 4,
        bonus: { houg: 1, kaih: -2 },
      },
      {
        shipX: [145, 488, 656, 961],
        level: 6,
        bonus: { houg: -1, tyku: 1 },
      },
      {
        shipX: [145, 488, 656, 961],
        level: 8,
        bonus: { tyku: -1, houm: 1 },
      },
      {
        shipX: [145, 488, 656, 961],
        level: 10,
        bonus: { tyku: 1, houm: -1 },
      },
      {
        shipType: [3, 4, 21],
        level: 2,
        num: 1,
        bonusSR: { houg: 1, kaih: 1 },
      },
      {
        shipType: [3, 4, 21],
        level: 2,
        num: 1,
        bonusAR: { tyku: 2, kaih: 1 },
      },
      {
        shipX: [145],
        level: 2,
        num: 1,
        bonusSR: { houg: 1, tyku: 1, kaih: 2 },
      },
      {
        shipX: [145],
        level: 2,
        num: 1,
        bonusAR: { tyku: 4, kaih: 2 },
      },
      {
        shipX: [961, 979],
        num: 1,
        bonusSR: { houg: 2, tyku: 2, kaih: 3 },
      },
      {
        shipX: [961, 979],
        num: 1,
        bonusAR: { houg: 1, tyku: 5, kaih: 3 },
      },
      {
        shipX: [979],
        bonus: { houm: 1 },
      },
      {
        shipX: [979],
        level: 3,
        bonus: { kaih: 1 },
      },
      {
        shipX: [979],
        level: 5,
        bonus: { houg: 1 },
      },
      {
        shipX: [979],
        level: 7,
        bonus: { tyku: 2 },
      },
      {
        shipX: [979],
        level: 9,
        bonus: { houm: 1 },
      },
      {
        shipX: [979],
        level: 10,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [383],
    bonuses: [
      {
        shipClass: [44],
        bonus: { raig: 2 },
      },
      {
        shipS: [127],
        bonus: { raig: 1 },
      },
      {
        shipX: [636],
        bonus: { raig: 3 },
      },
      {
        shipX: [607],
        bonus: { raig: 4 },
      },
      {
        shipClass: [44],
        level: 4,
        num: 1,
        bonus: { raig: 1 },
      },
      {
        shipClass: [44],
        level: 6,
        num: 1,
        bonus: { houm: 1 },
      },
      {
        level: 8,
        num: 1,
        bonus: { raig: 1 },
      },
      {
        level: 10,
        num: 1,
        bonus: { houm: 1 },
      },
      {
        shipS: [127, 636],
        level: 5,
        num: 1,
        bonus: { houm: 1 },
      },
    ],
  },
  {
    ids: [384],
    bonuses: [
      {
        shipClass: [44],
        bonus: { kaih: 3 },
      },
      {
        shipS: [127],
        bonus: { kaih: 2 },
      },
      {
        shipX: [636],
        bonus: { kaih: 3 },
      },
      {
        shipX: [607],
        bonus: { kaih: 4 },
      },
      {
        requires: [213, 214, 383],
        num: 1,
        bonus: { raig: 3, kaih: 2 },
      },
    ],
  },
  {
    ids: [385],
    bonuses: [
      {
        shipNationality: [4],
        bonus: { houg: 1 },
      },
      {
        shipNationality: [4],
        level: 6,
        bonus: { houg: 1 },
      },
      {
        shipNationality: [4],
        level: 10,
        bonus: { souk: 1 },
      },
      {
        shipClass: [102, 107],
        bonus: { houg: 1, souk: 1 },
      },
      {
        shipClass: [93],
        bonus: { houg: 1 },
      },
      {
        shipType: [8],
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [386, 387],
    bonuses: [
      {
        shipNationality: [4],
        bonus: { houg: 1 },
      },
      {
        shipNationality: [4],
        level: 2,
        bonus: { houg: 1 },
      },
      {
        shipNationality: [4],
        level: 7,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [389],
    bonuses: [
      {
        shipX: [594, 599],
        bonus: { houg: 2, kaih: 2 },
      },
      {
        shipX: [610, 698],
        bonus: { houg: 3, kaih: 2 },
      },
      {
        shipX: [646],
        bonus: { houg: 4, kaih: 3, tais: 4 },
      },
      {
        shipX: [646],
        requiresType: [25],
        requiresNumType: 1,
        num: 1,
        bonus: { houg: 3, tais: 6 },
      },
      {
        shipX: [646],
        requires: [326, 327],
        num: 1,
        bonus: { houg: 5, tais: 4 },
      },
      {
        shipNationality: [4],
        bonus: { houg: 2, kaih: 1, tais: 3 },
      },
    ],
  },
  {
    ids: [390],
    bonuses: [
      {
        shipNationality: [4],
        bonus: { houg: 1 },
      },
      {
        shipNationality: [4],
        level: 3,
        bonus: { houg: 1 },
      },
      {
        shipNationality: [4],
        level: 6,
        bonus: { kaih: 1 },
      },
      {
        shipNationality: [4],
        level: 10,
        bonus: { souk: 1 },
      },
      {
        shipClass: [102, 107],
        bonus: { houg: 1, souk: 1 },
      },
      {
        shipClass: [93],
        bonus: { houg: 1 },
      },
      {
        shipType: [8],
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [391],
    bonuses: [
      {
        shipS: [75, 92, 110, 111],
        bonus: { houg: 1 },
      },
      {
        shipX: [116, 117, 185, 282, 318, 883, 888],
        bonus: { houg: 1 },
      },
      {
        shipX: [117, 318, 883, 888],
        num: 1,
        bonus: { kaih: 1 },
      },
      {
        shipX: [555, 560],
        bonus: { houg: 1, kaih: 1 },
      },
    ],
  },
  {
    ids: [392],
    bonuses: [
      {
        shipS: [110, 111],
        bonus: { houg: 2, kaih: 1 },
      },
      {
        shipS: [75, 92],
        bonus: { houg: 1, kaih: 1 },
      },
      {
        shipX: [116, 185, 282],
        bonus: { houg: 2, kaih: 1 },
      },
      {
        shipX: [117, 318, 883, 888],
        bonus: { houg: 2, kaih: 2 },
      },
      {
        shipX: [555, 560],
        bonus: { houg: 3, kaih: 2 },
      },
    ],
  },
  {
    ids: [393],
    bonuses: [
      {
        shipClass: [61],
        bonus: { houg: 2, tyku: 1, kaih: 1 },
      },
    ],
  },
  {
    ids: [394],
    bonuses: [
      {
        shipClass: [61],
        bonus: { houg: 2, tyku: 1, kaih: 2 },
      },
      {
        shipS: [614],
        bonus: { kaih: 1 },
      },
      {
        shipClass: [61],
        level: 7,
        bonus: { houm: 1 },
      },
      {
        shipS: [614],
        level: 7,
        bonus: { houg: 1 },
      },
      {
        shipClass: [61],
        level: 8,
        bonus: { houg: 1 },
      },
      {
        shipClass: [61],
        level: 9,
        bonus: { houm: 1 },
      },
      {
        shipClass: [61],
        level: 10,
        bonus: { houg: 1 },
      },
      {
        shipS: [614],
        level: 10,
        bonus: { kaih: 1 },
      },
    ],
  },
  {
    ids: [397],
    bonuses: [
      {
        shipX: [651],
        bonus: { houg: 5, tyku: 2, kaih: 1 },
      },
      {
        shipX: [651],
        level: 4,
        bonus: { houg: 4, kaih: 1 },
      },
      {
        shipX: [656],
        bonus: { houg: 3, tyku: 1, kaih: 1 },
      },
      {
        shipX: [651, 656],
        num: 1,
        bonusSR: { houg: 3, kaih: 3 },
      },
    ],
  },
  {
    ids: [398],
    bonuses: [
      {
        shipX: [651],
        bonus: { houg: 4, tyku: 4, kaih: 2 },
      },
      {
        shipX: [651],
        level: 4,
        bonus: { houg: 3, kaih: 2 },
      },
      {
        shipX: [656],
        bonus: { houg: 3, tyku: 2, kaih: 2 },
      },
      {
        shipX: [656],
        level: 4,
        bonus: { houg: 2, kaih: 1 },
      },
      {
        shipX: [651, 656],
        num: 1,
        bonusSR: { houg: 3, kaih: 3 },
      },
      {
        shipX: [651, 656],
        num: 1,
        bonusAR: { tyku: 3, kaih: 3 },
      },
    ],
  },
  {
    ids: [399],
    bonuses: [
      {
        shipClass: [108],
        bonus: { houg: 1, kaih: 2 },
      },
      {
        shipClass: [108],
        level: 3,
        bonus: { houg: 1 },
      },
      {
        shipClass: [108],
        level: 5,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [400],
    bonuses: [
      {
        shipX: [147],
        bonus: { houg: 1, raig: 5, souk: 1, kaih: 2 },
      },
      {
        shipX: [147],
        requires: [282],
        num: 1,
        bonus: { houg: 2 },
      },
      {
        shipClass: [73, 81],
        bonus: { houg: 1, raig: 5, souk: 1, kaih: 2 },
      },
      {
        shipClass: [73, 81],
        requires: [282],
        num: 1,
        bonus: { houg: 2 },
      },
    ],
  },
  {
    ids: [407],
    bonuses: [
      {
        shipX: [662, 663, 668],
        bonus: { houg: 4, tyku: 2, kaih: 1 },
      },
      {
        shipX: [662, 663, 668],
        num: 1,
        bonusSR: { houg: 2, raig: 2, kaih: 2 },
      },
      {
        shipX: [662, 663, 668],
        num: 1,
        bonusAR: { tyku: 2, kaih: 3 },
      },
    ],
  },
  {
    ids: [408],
    bonuses: [
      {
        shipS: [621],
        bonus: { houg: 2, kaih: 2, saku: 2 },
      },
      {
        shipS: [161],
        bonus: { houg: 1, kaih: 1, tais: 1, saku: 1 },
      },
      {
        shipType: [2],
        bonus: { houg: 1, kaih: -5, saku: 1 },
      },
    ],
  },
  {
    ids: [409],
    bonuses: [
      {
        shipS: [621],
        bonus: { houg: 1, tyku: 2, kaih: 3 },
      },
      {
        shipS: [161],
        bonus: { houg: 1, tyku: 1, kaih: 2, tais: 1 },
      },
    ],
  },
  {
    ids: [411],
    bonuses: [
      {
        shipType: [2],
        bonus: { kaih: -9 },
      },
      {
        shipType: [3, 4],
        bonus: { kaih: -7 },
      },
      {
        shipType: [21],
        bonus: { kaih: -6 },
      },
      {
        shipType: [5, 6],
        bonus: { kaih: -5 },
      },
      {
        shipX: [593],
        num: 1,
        bonus: { houg: 1, tyku: 2, kaih: 3 },
      },
      {
        shipX: [151, 411, 412, 593, 954],
        num: 1,
        bonus: { houg: 3, tyku: 4 },
      },
      {
        shipX: [541, 553, 554, 573],
        num: 1,
        bonus: { houg: 2, tyku: 2 },
      },
      {
        shipX: [151, 411, 412, 541, 553, 554, 573, 593, 954],
        level: 4,
        num: 1,
        bonus: { houg: 1, tyku: 1 },
      },
      {
        shipX: [151, 411, 412, 541, 553, 554, 573, 593, 954],
        level: 10,
        num: 1,
        bonus: { houg: 1, tyku: 1 },
      },
    ],
  },
  {
    ids: [412],
    bonuses: [
      {
        shipClass: [1, 5, 10, 12, 18, 22, 23, 28, 30, 38, 54, 66, 101],
        num: 1,
        bonus: { houg: 2, raig: 4, tais: 2 },
      },
      {
        shipClass: [1, 5, 10, 12, 18, 22, 23, 28, 30, 38, 54, 66, 101],
        bonus: { kaih: 3, saku: 1 },
      },
      {
        shipClass: [4, 16, 20, 21, 34, 41, 52, 56],
        num: 1,
        bonus: { houg: 3, raig: 3 },
      },
      {
        shipClass: [4, 16, 20, 21, 34, 41, 52, 56],
        bonus: { kaih: 2, saku: 3 },
      },
      {
        shipClass: [7, 8, 9, 13, 29, 31],
        num: 1,
        bonus: { houg: 1 },
      },
      {
        shipClass: [7, 8, 9, 13, 29, 31],
        bonus: { kaih: 1, saku: 1 },
      },
      {
        shipClass: [
          1, 5, 10, 12, 18, 22, 23, 28, 30, 38, 54, 66, 101, 4, 16, 20, 21, 34,
          41, 52, 56,
        ],
        level: 4,
        num: 1,
        bonus: { houg: 1 },
      },
      {
        shipClass: [
          1, 5, 10, 12, 18, 22, 23, 28, 30, 38, 54, 66, 101, 4, 16, 20, 21, 34,
          41, 52, 56,
        ],
        level: 8,
        num: 1,
        bonus: { raig: 1 },
      },
    ],
  },
  {
    ids: [413],
    bonuses: [
      {
        shipClass: [1, 5, 10, 12, 18, 22, 23, 28, 30, 38, 54, 66, 101],
        num: 1,
        bonus: { houg: 2, raig: 2, kaih: 4 },
      },
      {
        shipClass: [4, 16, 20, 21, 34, 41, 52, 56],
        num: 1,
        bonus: { houg: 4, raig: 2, kaih: 2 },
      },
      {
        shipClass: [38, 54],
        num: 1,
        bonus: { houg: 2, raig: 3, kaih: 3 },
      },
      {
        shipClass: [4, 16, 20, 41, 52],
        num: 1,
        bonus: { houg: 1, raig: 2, kaih: 2 },
      },
      {
        shipClass: [21, 34],
        num: 1,
        bonus: { raig: 1, tyku: 2, kaih: 1 },
      },
      {
        shipS: [23, 41, 50, 56, 138, 139, 410, 484],
        num: 1,
        bonus: { tyku: 1, kaih: 1 },
      },
      {
        shipS: [54, 55, 135, 422],
        num: 1,
        bonus: { houg: 1, raig: 1 },
      },
      {
        shipX: [543],
        num: 1,
        bonus: { houg: 1, kaih: 1 },
      },
      {
        shipX: [159],
        num: 1,
        bonus: { houg: 2 },
      },
    ],
  },
  {
    ids: [414],
    bonuses: [
      {
        shipNationality: [4],
        num: 1,
        bonus: { saku: 1 },
      },
      {
        shipClass: [95, 99, 106, 110, 121],
        num: 1,
        bonus: { houg: 1, saku: 1 },
      },
      {
        shipNationality: [4],
        level: 5,
        num: 1,
        bonus: { kaih: 1 },
      },
      {
        shipClass: [95, 99, 106, 110, 121],
        level: 3,
        num: 1,
        bonus: { saku: 1 },
      },
      {
        shipClass: [95, 99, 106, 110, 121],
        level: 8,
        num: 1,
        bonus: { kaih: 1 },
      },
      {
        shipClass: [95, 99, 106, 110, 121],
        level: 10,
        num: 1,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [415],
    bonuses: [
      {
        shipNationality: [4],
        num: 1,
        bonus: { tais: 1, saku: 1 },
      },
      {
        shipNationality: [4],
        level: 5,
        num: 1,
        bonus: { kaih: 1 },
      },
      {
        shipClass: [95, 99, 106, 110, 121],
        num: 1,
        bonus: { houg: 1 },
      },
      {
        shipClass: [95, 99, 106, 110, 121],
        level: 3,
        num: 1,
        bonus: { kaih: 1 },
      },
      {
        shipClass: [95, 99, 106, 110, 121],
        level: 8,
        num: 1,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [195],
    bonuses: [
      {
        shipNationality: [4],
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [419],
    bonuses: [
      {
        shipNationality: [4],
        bonus: { houg: 2 },
      },
      {
        shipNationality: [4],
        level: 2,
        bonus: { houg: 1 },
      },
      {
        shipNationality: [4],
        level: 7,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [420],
    bonuses: [
      {
        shipNationality: [4],
        bonus: { houg: 1 },
      },
      {
        shipNationality: [4],
        level: 3,
        bonus: { houg: 1 },
      },
      {
        shipNationality: [4],
        level: 7,
        bonus: { houm: 1 },
      },
      {
        shipNationality: [4],
        level: 8,
        bonus: { houg: 1 },
      },
      {
        shipNationality: [4],
        level: 9,
        bonus: { houm: 1 },
      },
      {
        shipNationality: [4],
        level: 10,
        bonus: { houg: 1 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        bonus: { houg: 1 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        level: 3,
        bonus: { houg: 1 },
      },
      {
        shipClass: [84],
        bonus: { houg: 1 },
      },
      {
        shipClass: [78],
        bonus: { houg: -1 },
      },
      {
        shipType: [7],
        bonus: { houg: -2, souk: -2, kaih: -1 },
      },
    ],
  },
  {
    ids: [421],
    bonuses: [
      {
        shipNationality: [4],
        bonus: { houg: 2 },
      },
      {
        shipNationality: [4],
        level: 5,
        bonus: { houg: 1 },
      },
      {
        shipNationality: [4],
        level: 6,
        bonus: { houm: 1 },
      },
      {
        shipNationality: [4],
        level: 7,
        bonus: { houg: 1 },
      },
      {
        shipNationality: [4],
        level: 8,
        bonus: { houm: 1 },
      },
      {
        shipNationality: [4],
        level: 9,
        bonus: { houg: 1 },
      },
      {
        shipNationality: [4],
        level: 10,
        bonus: { houm: 1 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        bonus: { houg: 2 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        level: 5,
        bonus: { houg: 1 },
      },
      {
        shipClass: [84],
        bonus: { houg: 1 },
      },
      {
        shipClass: [78],
        bonus: { houg: -1 },
      },
      {
        shipType: [7],
        bonus: { houg: -2, souk: -2, kaih: -1 },
      },
    ],
  },
  {
    ids: [277],
    bonuses: [
      {
        shipNationality: [4],
        bonus: { houg: 1, kaih: 1 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        bonus: { houg: 1, kaih: 1 },
      },
      {
        shipClass: [83],
        bonus: { houg: 1, tyku: 1, kaih: 1 },
      },
    ],
  },
  {
    ids: [422],
    bonuses: [
      {
        shipNationality: [4],
        bonus: { houg: 1, kaih: 1 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        bonus: { houg: 1, kaih: 1 },
      },
      {
        shipClass: [84],
        bonus: { houg: 1, tyku: 1 },
      },
      {
        shipX: [707],
        bonus: { houg: 2, tyku: 2, kaih: 2 },
      },
    ],
  },
  {
    ids: [423],
    bonuses: [
      {
        shipClass: [78, 112],
        bonus: { houg: 2, tyku: 2, kaih: 2, saku: 2 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        bonus: { houg: 2, tyku: 2, kaih: 2, saku: 2 },
      },
      {
        shipNationality: [4],
        bonus: { houg: 1, tyku: 1, kaih: 1, saku: 1 },
      },
    ],
  },
  {
    ids: [424],
    bonuses: [
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        bonus: { houg: 2, raig: 3 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        level: 2,
        bonus: { houg: 1 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        level: 6,
        bonus: { houg: 1 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        level: 8,
        bonus: { houm: 1 },
      },
      {
        level: 10,
        bonus: { houm: 1 },
      },
    ],
  },
  {
    ids: [425],
    bonuses: [
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        bonus: { houg: 2, raig: 1, tais: 2, saku: 1 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        level: 2,
        bonus: { tais: 1 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        level: 4,
        bonus: { houg: 1 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        level: 6,
        bonus: { tais: 1 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        level: 7,
        bonus: { houm: 1 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        level: 8,
        bonus: { raig: 1 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        level: 9,
        bonus: { houg: 1 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        level: 10,
        bonus: { tais: 1 },
      },
      {
        level: 7,
        bonus: { houg: 1 },
      },
      {
        level: 8,
        bonus: { tais: 1 },
      },
      {
        level: 9,
        bonus: { houm: 1 },
      },
      {
        level: 10,
        bonus: { houm: 1 },
      },
    ],
  },
  {
    ids: [430],
    bonuses: [
      {
        shipClass: [113],
        bonus: { tyku: 1, kaih: 1 },
      },
      {
        shipClass: [58, 61, 64, 68, 80, 92, 113, 124],
        bonus: { tyku: 2, kaih: 1 },
      },
      {
        shipClass: [58, 61, 64, 68, 80, 92, 113, 124],
        level: 2,
        bonus: { kaih: 1 },
      },
      {
        shipClass: [58, 61, 64, 68, 80, 92, 113, 124],
        level: 4,
        bonus: { tyku: 1 },
      },
      {
        shipClass: [58, 61, 64, 68, 80, 92, 113, 124],
        level: 7,
        bonus: { kaih: 1 },
      },
      {
        shipClass: [58, 61, 64, 68, 80, 92, 113, 124],
        level: 10,
        bonus: { tyku: 1 },
      },
    ],
  },
  {
    ids: [426],
    bonuses: [
      {
        shipClass: [113],
        bonus: { houg: 3, kaih: 1 },
      },
      {
        shipClass: [73],
        bonus: { houg: 2, kaih: 1 },
      },
      {
        shipClass: [113],
        requires: [426, 427],
        num: 2,
        bonus: { houg: 1, kaih: 1 },
      },
      {
        shipClass: [73],
        requires: [426, 427],
        num: 2,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [428],
    bonuses: [
      {
        shipClass: [113],
        bonus: { houg: 3, kaih: 1 },
      },
      {
        shipClass: [73],
        bonus: { houg: 2, kaih: 1 },
      },
      {
        shipClass: [58],
        bonus: { houg: 1, kaih: 2 },
      },
      {
        shipClass: [58, 113],
        requires: [428, 429],
        num: 2,
        bonus: { houg: 2, kaih: 1 },
      },
      {
        shipClass: [73],
        requires: [428, 429],
        num: 2,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [427, 429],
    bonuses: [
      {
        shipClass: [113],
        bonus: { houg: 2 },
      },
      {
        shipClass: [73],
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [434, 435],
    bonuses: [
      {
        shipClass: [112],
        bonus: { houg: 1, tyku: 1, kaih: 2 },
      },
      {
        shipClass: [67, 78, 82, 88, 108, 112],
        bonus: { houg: 1, tyku: 2, kaih: 3 },
      },
      {
        shipNationality: [4],
        bonus: { houg: 1, tyku: 1, kaih: 2 },
      },
    ],
  },
  {
    ids: [437],
    bonuses: [
      {
        shipX: [285],
        bonus: { houg: 3, tyku: 3, kaih: 4 },
      },
      {
        shipX: [894, 899],
        bonus: { houg: 4, tyku: 4, kaih: 4 },
      },
      {
        shipX: [196, 197],
        bonus: { houg: 2, tyku: 2, kaih: 3 },
      },
      {
        shipX: [508, 509, 646],
        bonus: { houg: 2, tyku: 2, kaih: 2 },
      },
      {
        shipX: [888, 883, 553, 554],
        bonus: { houg: 1, tyku: 2, kaih: 2 },
      },
    ],
  },
  {
    ids: [271],
    bonuses: [
      {
        shipX: [508, 509, 888, 883],
        level: 4,
        bonus: { houg: 1 },
      },
      {
        shipX: [508, 509, 888, 883],
        level: 6,
        bonus: { tyku: 2 },
      },
      {
        shipX: [508, 509, 888, 883],
        level: 8,
        bonus: { kaih: 2 },
      },
      {
        shipX: [508, 509, 888, 883],
        level: 10,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [438],
    bonuses: [
      {
        shipClass: [66, 28, 12, 1, 5, 10, 23, 18, 30, 38, 22, 54, 101],
        num: 1,
        bonus: { kaih: 1, tais: 1 },
      },
      {
        shipX: [141, 160, 488],
        num: 1,
        bonus: { kaih: 1, tais: 1 },
      },
      {
        shipX: [145, 363, 476, 578, 588, 667, 961],
        level: 4,
        num: 1,
        bonus: { tais: 1 },
      },
      {
        shipX: [145, 363, 476, 578, 588, 667, 961],
        level: 6,
        num: 1,
        bonus: { kaih: 1 },
      },
      {
        shipX: [145, 363, 476, 578, 588, 667, 961],
        level: 8,
        num: 1,
        bonus: { tais: 1 },
      },
      {
        shipX: [145, 363, 476, 578, 588, 667, 961],
        level: 10,
        num: 1,
        bonus: { kaih: 1 },
      },
      {
        shipS: [16, 36, 47, 122, 167, 170, 414, 458, 459],
        num: 1,
        bonus: { tais: 1 },
      },
      {
        shipS: [43, 457, 471, 473, 585, 611],
        num: 1,
        bonus: { kaih: 1, tais: 1 },
      },
    ],
  },
  {
    ids: [136],
    bonuses: [
      {
        shipClass: [58, 61, 64, 68, 80, 92, 113, 124],
        num: 1,
        bonus: { souk: 2, kaih: 1 },
      },
      {
        shipX: [879],
        num: 1,
        bonus: { souk: 1, kaih: 1 },
      },
      {
        shipClass: [58, 61, 64, 68, 80, 92, 113, 124],
        level: 3,
        bonus: { souk: 1 },
      },
      {
        shipClass: [58, 61, 64, 68, 80, 92, 113, 124],
        level: 6,
        bonus: { souk: 1 },
      },
      {
        shipClass: [58, 61, 64, 68, 80, 92, 113, 124],
        level: 10,
        bonus: { souk: 1 },
      },
    ],
  },
  {
    ids: [439],
    bonuses: [
      {
        shipType: [1, 2, 3, 21],
        num: 1,
        bonus: { kaih: 1, tais: 1 },
      },
      {
        shipType: [1],
        num: 1,
        bonus: { tais: 1 },
      },
      {
        shipClass: [101],
        num: 1,
        bonus: { tais: 1 },
      },
      {
        shipNationality: [4, 5],
        num: 1,
        bonus: { tais: 2 },
      },
    ],
  },
  {
    ids: [440, 441],
    bonuses: [
      {
        shipClass: [114],
        num: 1,
        bonus: { raig: 2 },
      },
    ],
  },
  {
    ids: [442, 443],
    bonuses: [
      {
        shipClass: [114],
        num: 1,
        bonus: { raig: 2 },
      },
      {
        shipClass: [122],
        num: 1,
        bonus: { raig: 1, kaih: 2 },
      },
    ],
  },
  {
    ids: [447],
    bonuses: [
      {
        level: 2,
        bonus: { houg: 1 },
      },
      {
        level: 4,
        bonus: { tyku: 1 },
      },
      {
        level: 6,
        bonus: { tais: 1 },
      },
      {
        level: 8,
        bonus: { kaih: 1 },
      },
      {
        level: 10,
        bonus: { tais: 1 },
      },
      {
        shipClass: [76],
        bonus: { houg: 1, kaih: 2, tais: 1 },
      },
      {
        shipS: [522],
        bonus: { houg: 1, kaih: 1, tais: 1 },
      },
      {
        shipS: [89, 184],
        bonus: { houg: 1, kaih: 1, tais: 2 },
      },
      {
        shipX: [894, 899],
        bonus: { houg: 1, tyku: 1, kaih: 1, tais: 1 },
      },
    ],
  },
  {
    ids: [84],
    bonuses: [
      {
        level: 4,
        bonus: { tyku: 1, kaih: 1 },
      },
      {
        level: 4,
        num: 1,
        bonusAR: { tyku: 1 },
      },
      {
        shipNationality: [2, 3],
        level: 4,
        bonus: { tyku: 1, kaih: 1 },
      },
      {
        level: 7,
        bonus: { houg: 1, tyku: 1 },
      },
      {
        level: 10,
        bonus: { tyku: 1, kaih: 1 },
      },
      {
        shipNationality: [2, 3],
        level: 10,
        num: 1,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [70],
    bonuses: [
      {
        shipS: [900],
        bonus: { houg: 1, tais: 1 },
      },
    ],
  },
  {
    ids: [346],
    bonuses: [
      {
        shipS: [900],
        num: 1,
        bonus: { kaih: 1, tais: 1 },
      },
    ],
  },
  {
    ids: [347],
    bonuses: [
      {
        shipS: [900],
        num: 1,
        bonus: { kaih: 2, tais: 2 },
      },
    ],
  },
  {
    ids: [451],
    bonuses: [
      {
        shipS: [161],
        bonus: { houg: 1, tais: 2 },
      },
      {
        shipX: [166],
        level: 1,
        bonus: { houg: 1 },
      },
      {
        shipX: [166],
        level: 3,
        bonus: { tais: 1 },
      },
      {
        shipX: [166],
        level: 5,
        bonus: { houm: 1 },
      },
      {
        shipX: [166],
        level: 7,
        bonus: { tais: 1 },
      },
      {
        shipX: [166],
        level: 10,
        bonus: { houg: 1 },
      },
      {
        shipS: [900],
        bonus: { houg: 1, tais: 3 },
      },
      {
        shipS: [900],
        level: 1,
        bonus: { houg: 2 },
      },
      {
        shipS: [900],
        level: 2,
        bonus: { houm: 1 },
      },
      {
        shipS: [900],
        level: 3,
        bonus: { tais: 1 },
      },
      {
        shipS: [900],
        level: 4,
        bonus: { houg: 1 },
      },
      {
        shipS: [900],
        level: 6,
        bonus: { houm: 1 },
      },
      {
        shipS: [900],
        level: 8,
        bonus: { tais: 1 },
      },
      {
        shipS: [900],
        level: 10,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [455],
    bonuses: [
      {
        shipClass: [1, 5, 12],
        bonus: { houg: 2, tyku: 1 },
      },
      {
        shipClass: [1, 5, 12],
        num: 1,
        bonusSR: { houg: 3, raig: 1, kaih: 2 },
      },
      {
        shipClass: [1, 5, 12],
        num: 1,
        bonusAR: { tyku: 4 },
      },
      {
        shipClass: [12],
        bonus: { houg: 1 },
      },
      {
        shipS: [486],
        bonus: { houg: 1 },
      },
      {
        shipX: [647],
        bonus: { houg: 1, raig: 1, kaih: 1, tais: 1 },
      },
      {
        shipX: [666],
        bonus: { houg: 1, tais: 1 },
      },
      {
        shipClass: [1, 5, 12],
        requires: [13, 125, 285],
        num: 1,
        bonus: { houg: 1, raig: 3 },
      },
      {
        shipClass: [1, 5, 12],
        requires: [13, 125, 285],
        num: 2,
        bonus: { houg: 1, raig: 2 },
      },
      {
        shipClass: [1, 5, 12],
        requires: [285],
        num: 1,
        bonus: { raig: 1 },
      },
      {
        shipX: [959],
        bonus: { houg: 2 },
      },
      {
        shipX: [959],
        num: 2,
        bonus: { houg: 2 },
      },
      {
        shipX: [959],
        num: 3,
        bonus: { houg: 3 },
      },
    ],
  },
  {
    ids: [456],
    bonuses: [
      {
        shipNationality: [4],
        bonus: { houg: 3, kaih: 4, saku: 4 },
      },
      {
        shipNationality: [4],
        num: 1,
        bonus: { houm: 3 },
      },
      {
        shipNationality: [5, 10],
        bonus: { houg: 2, kaih: 2, saku: 2 },
      },
      {
        shipNationality: [5, 10],
        num: 1,
        bonus: { houm: 2 },
      },
      {
        shipClass: [87, 91],
        bonus: { houg: 1 },
      },
      {
        shipClass: [87, 91],
        num: 1,
        bonus: { leng: 1 },
      },
      {
        shipX: [651, 656],
        num: 1,
        bonus: { houg: 2, kaih: 2, saku: 3, houm: 2, leng: 1 },
      },
    ],
  },
  {
    ids: [457, 461],
    bonuses: [
      {
        shipClass: [109],
        num: 1,
        bonus: { raig: 3, kaih: 3 },
      },
      {
        shipClass: [71, 103],
        num: 1,
        bonus: { raig: 2, kaih: 2 },
      },
      {
        shipClass: [44],
        num: 1,
        bonus: { raig: 1, kaih: 4 },
      },
    ],
  },
  {
    ids: [461],
    bonuses: [
      {
        shipClass: [109],
        level: 2,
        bonus: { raig: 1 },
      },
      {
        shipClass: [71, 103, 109],
        level: 3,
        bonus: { kaih: 1 },
      },
      {
        shipClass: [44, 71, 103, 109],
        level: 4,
        bonus: { raig: 1 },
      },
      {
        shipClass: [109],
        level: 5,
        bonus: { houm: 1 },
      },
      {
        shipClass: [44, 71, 103, 109],
        level: 6,
        bonus: { raig: 1 },
      },
      {
        shipClass: [44, 71, 103, 109],
        level: 8,
        bonus: { raig: 1 },
      },
      {
        shipClass: [44, 71, 103, 109],
        level: 10,
        bonus: { houm: 1 },
      },
    ],
  },
  {
    ids: [458],
    bonuses: [
      {
        shipClass: [109],
        num: 1,
        bonus: { raig: 3, kaih: 6 },
      },
      {
        shipClass: [71, 103],
        num: 1,
        bonus: { raig: 3, kaih: 4 },
      },
      {
        shipClass: [44],
        num: 1,
        bonus: { raig: 3, kaih: 3 },
      },
      {
        shipClass: [44, 71, 103, 109],
        level: 4,
        bonus: { houm: 1 },
      },
      {
        shipClass: [44, 71, 103, 109],
        level: 6,
        bonus: { kaih: 1 },
      },
      {
        shipClass: [44, 71, 103, 109],
        level: 8,
        bonus: { raig: 1 },
      },
      {
        shipType: [13, 14],
        level: 3,
        bonus: { kaih: 1 },
      },
      {
        shipType: [13, 14],
        level: 5,
        bonus: { raig: 1 },
      },
      {
        shipType: [13, 14],
        level: 10,
        bonus: { houm: 1 },
      },
      {
        shipType: [13, 14],
        requires: [461],
        requiresLevel: 4,
        level: 2,
        num: 1,
        bonus: { raig: 7, houm: 5 },
      },
    ],
  },
  {
    ids: [465],
    bonuses: [
      {
        shipX: [916],
        bonus: { houg: 2, kaih: 8, houm: 2 },
      },
      {
        shipX: [916],
        requires: [460],
        num: 1,
        bonus: { kaih: 2, houm: 1 },
      },
      {
        shipX: [546, 911],
        bonus: { houg: 1, kaih: 2, houm: 1 },
      },
      {
        shipX: [546, 911],
        requires: [460],
        num: 1,
        bonus: { kaih: 1, houm: 1 },
      },
      {
        shipClass: [37],
        requires: [142, 460],
        num: 1,
        bonus: { houg: 2, houm: 2 },
      },
    ],
  },
  {
    ids: [464],
    bonuses: [
      {
        shipClass: [37],
        bonus: { tyku: 3, kaih: 2 },
      },
      {
        shipClass: [37],
        requires: [142, 460],
        num: 1,
        bonus: { tyku: 2, kaih: 1, houm: 1 },
      },
      {
        shipClass: [6, 73, 113],
        bonus: { tyku: -2, kaih: -2 },
      },
      {
        shipX: [546, 593, 911, 916, 954],
        bonus: { tyku: 2, kaih: 2 },
      },
      {
        shipX: [546, 593, 911, 916, 954],
        requires: [460],
        num: 1,
        bonus: { houg: 2, tyku: 2, kaih: 2, houm: 3 },
      },
    ],
  },
  {
    ids: [463],
    bonuses: [
      {
        shipClass: [37],
        bonus: { houg: 1, tyku: 2, kaih: 1, houm: 1 },
      },
      {
        shipClass: [37],
        requires: [142, 460],
        num: 1,
        bonus: { tyku: 1, kaih: 1, houm: 1 },
      },
      {
        shipX: [546, 911, 916],
        bonus: { houg: 1, kaih: 1, houm: 2 },
      },
      {
        shipX: [546, 911, 916],
        requires: [460],
        num: 1,
        bonus: { houg: 1, kaih: 1, houm: 2 },
      },
    ],
  },
  {
    ids: [12],
    bonuses: [
      {
        shipClass: [37],
        bonus: { houg: 1, kaih: 1, houm: 1 },
      },
      {
        shipClass: [37],
        requires: [142, 460],
        num: 1,
        bonus: { kaih: 1, houm: 1 },
      },
    ],
  },
  {
    ids: [234],
    bonuses: [
      {
        shipClass: [37],
        bonus: { houg: 1, tyku: 1, kaih: 1, houm: 1 },
      },
      {
        shipClass: [37],
        requires: [142, 460],
        num: 1,
        bonus: { tyku: 1, kaih: 1, houm: 1 },
      },
    ],
  },
  {
    ids: [128, 281],
    bonuses: [
      {
        shipX: [546, 911, 916],
        bonus: { houg: 1, houm: 1 },
      },
      {
        shipX: [546, 911, 916],
        requires: [460],
        num: 1,
        bonus: { kaih: 1, houm: 1 },
      },
      {
        shipClass: [37],
        requires: [142, 460],
        num: 1,
        bonus: { houg: 1, houm: 2 },
      },
    ],
  },
  {
    ids: [466],
    bonuses: [
      {
        shipX: [112, 156, 277, 278, 279, 280, 288],
        bonus: { houg: 1, houm: 1 },
      },
      {
        shipX: [461, 462, 466, 467],
        bonus: { houg: 2, kaih: 2, houm: 1 },
      },
      {
        shipX: [196, 197, 594, 599, 610, 646, 698],
        bonus: { houg: 1, kaih: 1, houm: 2 },
      },
    ],
  },
  {
    ids: [467],
    bonuses: [
      {
        shipNationality: [4],
        bonus: { houg: 1, tyku: 1, kaih: 2 },
      },
      {
        shipNationality: [4],
        requires: [279, 307, 315, 456],
        num: 1,
        bonus: { houg: 1, tyku: 1, kaih: 1, houm: 2 },
      },
      {
        shipNationality: [4],
        requires: [278, 279],
        num: 1,
        bonus: { tyku: 2, kaih: 2 },
      },
      {
        shipClass: [65, 93, 102, 107, 125],
        bonus: { tyku: 2, kaih: 1 },
      },
    ],
  },
  {
    ids: [247],
    bonuses: [
      {
        shipNationality: [6],
        bonus: { houg: 2, houm: 2 },
      },
      {
        shipNationality: [6],
        level: 4,
        bonus: { houg: 1, houm: 1 },
      },
      {
        shipNationality: [6],
        level: 8,
        bonus: { houg: 1, kaih: 1, houm: 1 },
      },
      {
        shipNationality: [6],
        level: 10,
        bonus: { kaih: 1, houm: 1 },
      },
      {
        shipClass: [79],
        requires: [245, 246, 468],
        bonus: { houg: 2, kaih: 2, houm: 2 },
      },
      {
        shipClass: [79],
        requires: [468],
        requiresLevel: 9,
        bonus: { kaih: 1, houm: 1 },
      },
      {
        shipClass: [79],
        requires: [468],
        requiresLevel: 10,
        bonus: { houg: 1, kaih: 1, houm: 1 },
      },
    ],
  },
  {
    ids: [245, 246],
    bonuses: [
      {
        shipClass: [79],
        bonus: { houg: 2, houm: 1 },
      },
    ],
  },
  {
    ids: [468],
    bonuses: [
      {
        shipClass: [79],
        bonus: { houg: 3, houm: 1 },
      },
      {
        shipClass: [79],
        level: 4,
        bonus: { houg: 1, houm: 1 },
      },
      {
        shipClass: [79],
        level: 8,
        bonus: { houg: 1, houm: 1 },
      },
      {
        shipClass: [79],
        level: 9,
        bonus: { tyku: 1 },
      },
      {
        shipClass: [79],
        level: 10,
        bonus: { houm: 1 },
      },
    ],
  },
  {
    ids: [470, 529],
    bonuses: [
      {
        shipClass: [18, 23],
        bonus: { houg: 1 },
      },
      {
        shipClass: [18, 23],
        num: 1,
        bonusSR: { houg: 1, raig: 3, kaih: 1, houm: 1 },
      },
      {
        shipClass: [30],
        bonus: { houg: 2 },
      },
      {
        shipClass: [30],
        num: 1,
        bonusSR: { houg: 2, raig: 3, kaih: 1, houm: 3 },
      },
      {
        shipS: [20, 43, 167],
        bonus: { kaih: 2 },
      },
      {
        shipX: [961],
        bonus: { houg: 3, kaih: 2, houm: 3 },
      },
      {
        shipX: [145, 566, 567, 568, 651, 656, 670, 915, 951, 961],
        num: 1,
        bonus: { houg: 1, houm: 2 },
      },
      {
        shipX: [145, 566, 567, 568, 651, 656, 670, 915, 951, 961],
        num: 2,
        bonus: { houg: 2 },
      },
      {
        shipX: [145, 566, 567, 568, 651, 656, 670, 915, 951, 961],
        level: 5,
        bonus: { houm: 1 },
      },
      {
        shipX: [145, 566, 567, 568, 651, 656, 670, 915, 951, 961],
        level: 8,
        bonus: { houg: 1 },
      },
      {
        shipX: [145, 566, 567, 568, 651, 656, 670, 915, 951, 961],
        level: 10,
        bonus: { houm: 1 },
      },
    ],
  },
  {
    ids: [529],
    bonuses: [
      {
        shipX: [144, 145, 246, 405, 497],
        bonus: { houg: 1, tyku: 1, kaih: 1, houm: 1 },
      },
      {
        shipX: [144, 145, 246, 405, 497],
        num: 2,
        bonus: { houg: 1 },
      },
      {
        shipX: [144, 145, 246, 405, 497, 323, 498, 961],
        num: 3,
        bonus: { houg: 2 },
      },
      {
        shipX: [144, 145, 246, 405, 497],
        level: 8,
        bonus: { tyku: 1 },
      },
      {
        shipX: [144, 145, 246, 405, 497],
        level: 10,
        bonus: { houg: 1 },
      },
      {
        shipX: [323, 498, 961],
        bonus: { houg: 2, tyku: 2, kaih: 1, houm: 1 },
      },
      {
        shipX: [323, 498, 961],
        num: 2,
        bonus: { houg: 2 },
      },
      {
        shipX: [323, 498, 961],
        level: 6,
        bonus: { tyku: 1 },
      },
      {
        shipX: [323, 498, 961],
        level: 8,
        bonus: { houm: 1 },
      },
      {
        shipX: [323, 498, 961],
        level: 10,
        bonus: { houg: 1 },
      },
      {
        shipX: [975],
        bonus: { houg: 3, tyku: 3, kaih: 2, houm: 2 },
      },
      {
        shipX: [975],
        num: 2,
        bonus: { houg: 3 },
      },
      {
        shipX: [975],
        num: 3,
        bonus: { houg: 3 },
      },
      {
        shipX: [975],
        level: 4,
        bonus: { tyku: 1 },
      },
      {
        shipX: [975],
        level: 6,
        bonus: { houg: 1 },
      },
      {
        shipX: [975],
        level: 8,
        bonus: { houm: 1 },
      },
      {
        shipX: [975],
        level: 10,
        bonus: { houg: 1 },
      },
      {
        num: 1,
        bonusAR: { tyku: 2, kaih: 2 },
      },
      {
        num: 2,
        bonusAR: { tyku: 2 },
      },
      {
        num: 3,
        bonusAR: { tyku: 2 },
      },
    ],
  },
  {
    ids: [471],
    bonuses: [
      {
        shipNationality: [6],
        bonus: { houg: 2, kaih: 2, houm: 2 },
      },
      {
        shipClass: [79],
        bonus: { houg: 2, houm: 1 },
      },
      {
        shipNationality: [6],
        level: 6,
        bonus: { kaih: 1, houm: 1 },
      },
      {
        shipNationality: [6],
        level: 8,
        bonus: { houg: 1, kaih: 1, houm: 1 },
      },
      {
        shipNationality: [6],
        level: 10,
        bonus: { houg: 1, houm: 1 },
      },
      {
        shipClass: [79],
        requires: [468],
        requiresLevel: 9,
        bonus: { houm: 2 },
      },
      {
        shipClass: [79],
        requires: [468],
        requiresLevel: 10,
        bonus: { houm: 1 },
      },
      {
        shipClass: [79],
        requires: [468],
        requiresLevel: 10,
        level: 7,
        bonus: { houm: 1 },
      },
      {
        shipClass: [79],
        requires: [468],
        requiresLevel: 10,
        level: 9,
        bonus: { kaih: 1 },
      },
    ],
  },
  {
    ids: [472],
    bonuses: [
      {
        shipNationality: [4],
        bonus: { tais: 2 },
      },
      {
        shipNationality: [5],
        bonus: { tais: 1 },
      },
      {
        shipType: [1],
        bonus: { kaih: 1 },
      },
      {
        shipX: [920],
        num: 1,
        bonus: { kaih: 1, tais: 1, houm: 1 },
      },
    ],
  },
  {
    ids: [227],
    bonuses: [
      {
        level: 8,
        bonus: { tais: 1 },
      },
      {
        level: 10,
        bonus: { tais: 1 },
      },
    ],
  },
  {
    ids: [132],
    bonuses: [
      {
        level: 3,
        num: 1,
        bonus: { kaih: 1 },
      },
      {
        level: 5,
        num: 1,
        bonus: { tais: 1 },
      },
      {
        level: 7,
        num: 1,
        bonus: { kaih: 1 },
      },
      {
        level: 8,
        num: 1,
        bonus: { tais: 1 },
      },
      {
        level: 9,
        num: 1,
        bonus: { houm: 1 },
      },
      {
        level: 10,
        num: 1,
        bonus: { tais: 1 },
      },
      {
        shipX: [546, 911, 916],
        num: 1,
        bonus: { kaih: 1 },
      },
      {
        shipX: [156, 461, 462, 466, 467],
        num: 1,
        bonus: { kaih: 2 },
      },
    ],
  },
  {
    ids: [473],
    bonuses: [
      {
        shipNationality: [4],
        bonus: { houg: 1, tyku: 1, kaih: 1 },
      },
      {
        shipNationality: [5],
        bonus: { houg: 1, kaih: 1 },
      },
    ],
  },
  {
    ids: [474],
    bonuses: [
      {
        shipNationality: [4],
        bonus: { houg: 2, tyku: 1, kaih: 1 },
      },
      {
        shipNationality: [5],
        bonus: { houg: 1, tyku: 1, kaih: 1 },
      },
      {
        shipNationality: [6],
        bonus: { houg: 1, tyku: 1 },
      },
      {
        shipX: [707, 930],
        bonus: { houg: 1, kaih: 1 },
      },
    ],
  },
  {
    ids: [478],
    bonuses: [
      {
        level: 1,
        num: 1,
        bonus: { houg: 1 },
      },
      {
        level: 2,
        num: 1,
        bonus: { houm: 1 },
      },
      {
        level: 3,
        num: 1,
        bonus: { kaih: 1 },
      },
      {
        level: 4,
        num: 1,
        bonus: { baku: 1 },
      },
      {
        level: 5,
        num: 1,
        bonus: { raig: 1 },
      },
      {
        level: 6,
        num: 1,
        bonus: { tyku: 1 },
      },
      {
        level: 7,
        num: 1,
        bonus: { houg: 1 },
      },
      {
        level: 8,
        num: 1,
        bonus: { houm: 1 },
      },
      {
        level: 9,
        num: 1,
        bonus: { kaih: 1 },
      },
      {
        level: 10,
        num: 1,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [483],
    bonuses: [
      {
        shipClass: [6],
        num: 1,
        bonus: { houg: 2, tyku: 3, houm: 1 },
      },
      {
        shipClass: [6],
        level: 6,
        num: 1,
        bonus: { houm: 1 },
      },
      {
        shipClass: [6],
        level: 10,
        num: 1,
        bonus: { houm: 1 },
      },
      {
        shipClass: [2],
        num: 1,
        bonus: { houg: 1, tyku: 2, kaih: 2, houm: 1 },
      },
      {
        shipClass: [2],
        level: 5,
        num: 1,
        bonus: { kaih: 1 },
      },
      {
        shipClass: [2],
        level: 6,
        num: 1,
        bonus: { houm: 1 },
      },
      {
        shipClass: [2],
        level: 10,
        num: 1,
        bonus: { kaih: 1 },
      },
      {
        shipClass: [37],
        level: 6,
        num: 1,
        bonus: { houm: 1 },
      },
      {
        shipClass: [37],
        level: 10,
        num: 1,
        bonus: { kaih: 1 },
      },
      {
        shipX: [149],
        num: 1,
        bonus: { houg: 2, tyku: 2 },
      },
      {
        shipX: [591],
        num: 1,
        bonus: { houg: 3, tyku: 3, kaih: 1 },
      },
      {
        shipX: [150],
        num: 1,
        bonus: { houg: 1, tyku: 1 },
      },
      {
        shipX: [592],
        num: 1,
        bonus: { houg: 2, tyku: 2, kaih: 2 },
      },
      {
        shipX: [151],
        num: 1,
        bonus: { houg: 1, tyku: 2, kaih: 2 },
      },
      {
        shipX: [593],
        num: 1,
        bonus: { houg: 2, tyku: 5, kaih: 3 },
      },
      {
        shipX: [954],
        num: 1,
        bonus: { houg: 2, tyku: 4, kaih: 2 },
      },
      {
        shipX: [152],
        num: 1,
        bonus: { houg: 2, tyku: 2 },
      },
      {
        shipX: [546, 911, 916],
        num: 1,
        bonus: { houg: 2, tyku: 2, kaih: 2 },
      },
      {
        shipX: [546, 911, 916],
        level: 5,
        num: 1,
        bonus: { houm: 1 },
      },
      {
        shipX: [553, 554],
        num: 1,
        bonus: { houg: 1, tyku: 2, kaih: 1 },
      },
      {
        shipX: [553, 554],
        level: 1,
        num: 1,
        bonus: { houm: 1 },
      },
      {
        shipX: [553, 554],
        level: 3,
        num: 1,
        bonus: { houm: 1 },
      },
      {
        shipX: [541, 411, 412],
        num: 1,
        bonus: { houg: 1, tyku: 2 },
      },
      {
        shipX: [573],
        num: 1,
        bonus: { houg: 2, tyku: 2, kaih: 1 },
      },
      {
        shipType: [8, 9, 10],
        level: 2,
        num: 1,
        bonus: { tyku: 1 },
      },
      {
        shipType: [8, 9, 10],
        level: 4,
        num: 1,
        bonus: { houg: 1 },
      },
      {
        shipType: [8, 9, 10],
        level: 7,
        num: 1,
        bonus: { kaih: 1 },
      },
      {
        shipType: [8, 9, 10],
        level: 8,
        num: 1,
        bonus: { tyku: 1 },
      },
      {
        shipType: [8, 9, 10],
        level: 9,
        num: 1,
        bonus: { houg: 1 },
      },
      {
        shipType: [5, 6],
        level: 2,
        num: 1,
        bonus: { tyku: 1 },
      },
      {
        shipType: [5, 6],
        level: 4,
        num: 1,
        bonus: { houg: 1 },
      },
      {
        shipType: [5, 6],
        level: 6,
        num: 1,
        bonus: { kaih: 1 },
      },
      {
        shipType: [5, 6],
        level: 8,
        num: 1,
        bonus: { houm: 1 },
      },
      {
        shipType: [5, 6],
        level: 10,
        num: 1,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [485],
    bonuses: [
      {
        shipClass: [9],
        bonus: { houg: 1, tyku: 3, kaih: 2 },
      },
      {
        shipX: [501, 506],
        bonus: { tyku: 2, kaih: 1, houm: 1 },
      },
      {
        shipX: [502, 507],
        bonus: { tyku: 1, kaih: 1, houm: 1 },
      },
      {
        level: 3,
        bonus: { houg: 1 },
      },
      {
        level: 5,
        bonus: { tyku: 1 },
      },
      {
        level: 7,
        bonus: { kaih: 1 },
      },
      {
        level: 10,
        bonus: { houm: 1 },
      },
    ],
  },
  {
    ids: [275],
    bonuses: [
      {
        shipX: [894, 899],
        bonus: { houg: 1, tyku: 3, kaih: 2 },
      },
      {
        shipX: [894, 899],
        num: 1,
        bonusAR: { tyku: 3, kaih: 3 },
      },
      {
        shipX: [894, 899],
        level: 7,
        bonus: { tyku: 1, kaih: 1 },
      },
      {
        shipX: [894, 899],
        level: 10,
        bonus: { houg: 1, tyku: 1, houm: 1 },
      },
    ],
  },
  {
    ids: [486],
    bonuses: [
      {
        shipX: [894, 899],
        bonus: { houg: 4, tyku: 4, kaih: 3, houm: 2 },
      },
      {
        shipX: [883, 888],
        bonus: { houg: 2, tyku: 2, kaih: 2, houm: 1 },
      },
      {
        level: 6,
        bonus: { kaih: 1, houm: 1 },
      },
      {
        level: 8,
        bonus: { tyku: 1, kaih: 1 },
      },
      {
        level: 10,
        bonus: { houg: 1, houm: 1 },
      },
    ],
  },
  {
    ids: [487],
    bonuses: [
      {
        shipX: [894, 899],
        bonus: { houg: 5, tyku: 3, kaih: 2, houm: 4 },
      },
      {
        shipX: [883, 888],
        bonus: { houg: 3, tyku: 1, kaih: 1, houm: 2 },
      },
      {
        level: 6,
        bonus: { houg: 1, kaih: 1 },
      },
      {
        level: 8,
        bonus: { tyku: 1, houm: 1 },
      },
      {
        level: 10,
        bonus: { houg: 1, houm: 1 },
      },
    ],
  },
  {
    ids: [488],
    bonuses: [
      {
        shipType: [2],
        shipNationality: [1],
        bonus: { kaih: 1, tais: 1 },
      },
      {
        shipClass: [74, 77, 85, 104, 117],
        bonus: { kaih: 1, tais: 1 },
      },
      {
        shipX: [145, 961],
        bonus: { kaih: 4, tais: 5, houm: 2 },
      },
      {
        shipX: [228, 243, 557, 558, 651, 656],
        bonus: { kaih: 1, tais: 2, houm: 1 },
      },
      {
        shipX: [43, 235, 407, 411, 412, 419, 537, 538, 663, 668],
        bonus: { tais: 1 },
      },
      {
        shipX: [145, 961],
        level: 3,
        bonus: { kaih: 1 },
      },
      {
        shipX: [145, 961],
        level: 5,
        bonus: { tais: 1 },
      },
      {
        shipX: [145, 961],
        level: 7,
        bonus: { houm: 1 },
      },
      {
        shipX: [145, 961],
        level: 8,
        bonus: { kaih: 1 },
      },
      {
        shipX: [145, 961],
        level: 9,
        bonus: { tais: 1 },
      },
      {
        shipX: [145, 961],
        level: 10,
        bonus: { tais: 1 },
      },
      {
        shipX: [
          228, 243, 557, 558, 651, 656, 43, 235, 407, 411, 412, 419, 537, 538,
          663, 668,
        ],
        level: 5,
        bonus: { tais: 1 },
      },
      {
        shipX: [
          228, 243, 557, 558, 651, 656, 43, 235, 407, 411, 412, 419, 537, 538,
          663, 668,
        ],
        level: 7,
        bonus: { kaih: 1 },
      },
      {
        shipX: [
          228, 243, 557, 558, 651, 656, 43, 235, 407, 411, 412, 419, 537, 538,
          663, 668,
        ],
        level: 9,
        bonus: { houm: 1 },
      },
      {
        shipX: [
          228, 243, 557, 558, 651, 656, 43, 235, 407, 411, 412, 419, 537, 538,
          663, 668,
        ],
        level: 10,
        bonus: { tais: 1 },
      },
    ],
  },
  {
    ids: [489, 491],
    bonuses: [
      {
        shipS: [161, 900, 943],
        bonus: { houg: 1, tyku: 2, kaih: 1, tais: 1, houm: 1 },
      },
      {
        shipX: [717, 948],
        bonus: { houg: 2, tyku: 2, kaih: 2, tais: 1, houm: 1 },
      },
      {
        level: 3,
        bonus: { kaih: 1 },
      },
      {
        level: 6,
        bonus: { tais: 1 },
      },
      {
        level: 8,
        bonus: { houm: 1 },
      },
      {
        level: 10,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [500, 501],
    bonuses: [
      {
        shipX: [959],
        bonus: { kaih: 4 },
      },
      {
        shipS: [14, 54, 61, 471, 473, 486, 561, 562],
        bonus: { kaih: 3 },
      },
      {
        shipS: [9, 37, 41, 49, 65, 67, 479, 484],
        bonus: { kaih: 2 },
      },
    ],
  },
  {
    ids: [502],
    bonuses: [
      {
        shipX: [593],
        bonus: { houg: 5, tyku: 4, kaih: 3 },
      },
      {
        shipX: [954],
        bonus: { houg: 3, tyku: 3, kaih: 3 },
      },
      {
        shipX: [151],
        bonus: { houg: 2, tyku: 2, kaih: 1 },
      },
      {
        shipX: [591],
        bonus: { houg: 2, tyku: 1, kaih: 1 },
      },
      {
        shipX: [149],
        bonus: { houg: 2, tyku: 1 },
      },
      {
        shipX: [592],
        bonus: { houg: 1, tyku: 1 },
      },
      {
        shipX: [150, 152],
        bonus: { houg: 1 },
      },
      {
        shipX: [593, 954],
        level: 1,
        bonus: { kaih: 1 },
      },
      {
        shipX: [593, 954],
        level: 3,
        bonus: { tyku: 1 },
      },
      {
        shipX: [593, 954],
        level: 5,
        bonus: { houg: 1 },
      },
      {
        shipX: [593, 954],
        level: 7,
        bonus: { kaih: 1 },
      },
      {
        shipX: [593, 954],
        level: 8,
        bonus: { tyku: 1 },
      },
      {
        shipX: [593, 954],
        level: 9,
        bonus: { houg: 1 },
      },
      {
        shipX: [593, 954],
        level: 10,
        bonus: { tyku: 1 },
      },
      {
        shipX: [151],
        level: 2,
        bonus: { kaih: 1 },
      },
      {
        shipX: [151, 591],
        level: 4,
        bonus: { tyku: 1 },
      },
      {
        shipX: [151, 591],
        level: 6,
        bonus: { houg: 1 },
      },
      {
        shipX: [151, 591],
        level: 8,
        bonus: { kaih: 1 },
      },
      {
        shipX: [151, 591],
        level: 10,
        bonus: { tyku: 1 },
      },
      {
        shipX: [149, 150, 152, 592],
        level: 5,
        bonus: { kaih: 1 },
      },
      {
        shipX: [149, 150, 152, 592],
        level: 8,
        bonus: { houg: 1 },
      },
      {
        shipX: [149, 150, 152, 592],
        level: 10,
        bonus: { tyku: 1 },
      },
      {
        shipX: [593],
        num: 1,
        bonusSR: { houg: 3, kaih: 4 },
      },
      {
        shipX: [149, 151, 591, 954],
        num: 1,
        bonusSR: { houg: 2, kaih: 2 },
      },
      {
        shipX: [151, 593, 954],
        requires: [410],
        num: 1,
        bonus: { tyku: 1 },
      },
      {
        shipX: [151, 593, 954],
        requires: [410],
        requiresLevel: 7,
        num: 1,
        bonus: { houg: 1 },
      },
      {
        shipX: [151, 593, 954],
        requires: [410],
        requiresLevel: 10,
        num: 1,
        bonus: { kaih: 1 },
      },
      {
        shipX: [151, 593, 954],
        requires: [411],
        num: 1,
        bonus: { tyku: 2 },
      },
      {
        shipX: [151, 593, 954],
        requires: [411],
        requiresLevel: 2,
        num: 1,
        bonus: { houg: 1 },
      },
      {
        shipX: [151, 593, 954],
        requires: [411],
        requiresLevel: 4,
        num: 1,
        bonus: { kaih: 1 },
      },
      {
        shipX: [151, 593, 954],
        requires: [411],
        requiresLevel: 6,
        num: 1,
        bonus: { houm: 1 },
      },
      {
        shipX: [151, 593, 954],
        requires: [411],
        requiresLevel: 8,
        num: 1,
        bonus: { tyku: 1 },
      },
      {
        shipX: [151, 593, 954],
        requires: [411],
        requiresLevel: 10,
        num: 1,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [503],
    bonuses: [
      {
        shipX: [593],
        bonus: { houg: 4, tyku: 4, houm: 2 },
      },
      {
        shipX: [954],
        bonus: { houg: 4, tyku: 3, houm: 2 },
      },
      {
        shipX: [151],
        bonus: { houg: 2, tyku: 2, houm: 1 },
      },
      {
        shipX: [591, 592],
        bonus: { houg: 3, tyku: 1, houm: 1 },
      },
      {
        shipX: [149],
        bonus: { houg: 2, tyku: 1 },
      },
      {
        shipX: [150, 152],
        bonus: { houg: 2 },
      },
      {
        shipX: [593, 954],
        level: 1,
        bonus: { houg: 1 },
      },
      {
        shipX: [593, 954],
        level: 2,
        bonus: { tyku: 1 },
      },
      {
        shipX: [593, 954],
        level: 4,
        bonus: { houm: 1 },
      },
      {
        shipX: [593, 954],
        level: 6,
        bonus: { houg: 1 },
      },
      {
        shipX: [593, 954],
        level: 8,
        bonus: { tyku: 1 },
      },
      {
        shipX: [593, 954],
        level: 10,
        bonus: { houm: 1 },
      },
      {
        shipX: [151, 591, 592],
        level: 2,
        bonus: { houg: 1 },
      },
      {
        shipX: [151, 591, 592],
        level: 4,
        bonus: { tyku: 1 },
      },
      {
        shipX: [151, 591, 592],
        level: 6,
        bonus: { houm: 1 },
      },
      {
        shipX: [151, 591, 592],
        level: 8,
        bonus: { houg: 1 },
      },
      {
        shipX: [151, 591, 592],
        level: 10,
        bonus: { houm: 1 },
      },
      {
        shipX: [149, 150, 152],
        level: 4,
        bonus: { houm: 1 },
      },
      {
        shipX: [149, 150, 152],
        level: 7,
        bonus: { houg: 1 },
      },
      {
        shipX: [149, 150, 152],
        level: 10,
        bonus: { tyku: 1 },
      },
      {
        shipX: [954],
        num: 1,
        bonusSR: { houg: 3, kaih: 2, houm: 3 },
      },
      {
        shipX: [151, 591, 592, 593],
        num: 1,
        bonusSR: { houg: 2, kaih: 1, houm: 2 },
      },
      {
        shipX: [591, 592, 593, 954],
        requires: [174],
        num: 1,
        bonus: { raig: 4 },
      },
      {
        shipX: [591, 592, 593, 954],
        requires: [174],
        requiresLevel: 6,
        num: 1,
        bonus: { raig: 1 },
      },
      {
        shipX: [591, 592, 593, 954],
        requires: [174],
        requiresLevel: 8,
        num: 1,
        bonus: { houm: 1 },
      },
      {
        shipX: [591, 592, 593, 954],
        requires: [174],
        requiresLevel: 10,
        num: 1,
        bonus: { houg: 1 },
      },
      {
        shipX: [591, 592, 593, 954],
        num: 1,
        bonusAccR: { houg: 2, kaih: 2, houm: 2 },
      },
      {
        shipX: [591],
        num: 1,
        bonusAccR: { houg: 1 },
      },
      {
        shipX: [954],
        num: 1,
        bonusAccR: { houg: 2 },
      },
    ],
  },
  {
    ids: [505],
    bonuses: [
      {
        shipType: [2],
        bonus: { houg: 1, tyku: 2, kaih: 2 },
      },
      {
        shipType: [1],
        bonus: { houg: 1, tyku: 1, kaih: 1 },
      },
      {
        shipType: [3, 4, 21],
        bonus: { tyku: 1, kaih: 2 },
      },
      {
        shipType: [5, 6, 16],
        bonus: { tyku: 1, kaih: 1 },
      },
      {
        shipX: [961],
        num: 1,
        bonus: { houg: 2, tyku: 3, kaih: 4 },
      },
      {
        shipX: [145, 497, 656, 668, 951, 975],
        num: 1,
        bonus: { houg: 1, tyku: 2, kaih: 3 },
      },
      {
        shipX: [144, 228, 242, 243, 498, 651],
        num: 1,
        bonus: { tyku: 2, kaih: 2 },
      },
      {
        shipX: [244, 245, 323],
        num: 1,
        bonus: { tyku: 1, kaih: 2 },
      },
      {
        shipX: [147, 235, 407, 419, 464, 470, 557, 558, 578, 955, 960],
        num: 1,
        bonus: { houg: 1, tyku: 1, kaih: 1 },
      },
      {
        shipX: [961],
        num: 1,
        bonusAR: { houg: 1, tyku: 2, kaih: 3 },
      },
      {
        shipX: [145, 419, 497, 656, 951, 975],
        num: 1,
        bonusAR: { tyku: 2, kaih: 2 },
      },
      {
        shipX: [656, 951, 961, 975],
        num: 1,
        bonusSR: { houg: 1, kaih: 1 },
      },
    ],
  },
  {
    ids: [506],
    bonuses: [
      {
        shipX: [961],
        num: 1,
        bonus: { houg: 2, tyku: 2, kaih: 4, houm: 3 },
      },
      {
        shipX: [145, 497, 557, 558, 656, 951, 975],
        num: 1,
        bonus: { houg: 1, tyku: 1, kaih: 3, houm: 2 },
      },
      {
        shipX: [147, 235, 407, 419, 464, 470, 537, 538, 578, 955, 960],
        num: 1,
        bonus: { houg: 1, tyku: 1, kaih: 2, houm: 1 },
      },
    ],
  },
  {
    ids: [507, 508],
    bonuses: [
      {
        shipClass: [125],
        bonus: { houg: 1, kaih: 1, houm: 1 },
      },
      {
        shipType: [8, 9, 10],
        shipNationality: [4],
        bonus: { houg: 2, kaih: 1, houm: 1 },
      },
      {
        shipType: [8, 9, 10],
        shipNationality: [4],
        requires: [279, 307, 315, 456],
        num: 1,
        bonus: { houg: 1, kaih: 1, houm: 2 },
      },
      {
        shipClass: [2, 6, 26],
        num: 1,
        bonus: { kaih: 1, houm: 1 },
      },
      {
        shipNationality: [5],
        num: 1,
        bonus: { kaih: 1, houm: 1 },
      },
      {
        level: 3,
        bonus: { houg: 1 },
      },
      {
        level: 6,
        bonus: { souk: 1 },
      },
      {
        level: 9,
        bonus: { houm: 1 },
      },
    ],
  },
  {
    ids: [508],
    bonuses: [
      {
        shipClass: [125],
        requires: [507],
        num: 1,
        bonus: { houg: 1, houm: 1 },
      },
      {
        shipType: [8, 9, 10],
        shipNationality: [4],
        requires: [507],
        num: 1,
        bonus: { houg: 1, kaih: 2, houm: 1 },
      },
      {
        shipClass: [2, 6, 26],
        requires: [507],
        num: 1,
        bonus: { houg: 1, kaih: 1, houm: 1 },
      },
      {
        shipNationality: [5],
        requires: [507],
        num: 1,
        bonus: { houg: 1, kaih: 1, houm: 1 },
      },
    ],
  },
  {
    ids: [510],
    bonuses: [
      {
        shipNationality: [5],
        bonus: { houg: 2, kaih: 2, tais: 3, saku: 2 },
      },
      {
        shipClass: [88],
        bonus: { saku: 3, houm: 2 },
      },
      {
        shipClass: [88],
        num: 1,
        bonus: { houg: 4, kaih: 2 },
      },
    ],
  },
  {
    ids: [511, 512],
    bonuses: [
      {
        shipClass: [122],
        num: 1,
        bonus: { raig: 3, kaih: 4 },
      },
      {
        shipClass: [114],
        num: 1,
        bonus: { raig: 1, kaih: 2 },
      },
    ],
  },
  {
    ids: [517],
    bonuses: [
      {
        shipClass: [
          1, 5, 10, 12, 18, 22, 23, 28, 30, 38, 54, 66, 101, 74, 77, 85, 104,
          117,
        ],
        num: 1,
        bonus: { kaih: 1, saku: 1, houm: 1 },
      },
      {
        shipClass: [38],
        num: 1,
        bonus: { houg: 1, houm: 1 },
      },
      {
        shipX: [960],
        num: 1,
        bonus: { houg: 2, kaih: 3, saku: 2, houm: 1 },
      },
      {
        shipX: [147, 235, 407, 419, 464, 470, 578, 656, 955, 961, 975],
        num: 1,
        bonus: { houg: 1, kaih: 2, saku: 1, houm: 1 },
      },
      {
        requires: [267, 366],
        requiresLevel: 3,
        num: 1,
        bonus: { houg: 1, houm: 1 },
      },
      {
        shipClass: [38],
        requires: [267, 366],
        requiresLevel: 3,
        num: 1,
        bonus: { houg: 1, houm: 1 },
      },
      {
        requires: [450],
        requiresLevel: 4,
        num: 1,
        bonus: { houg: 1, tyku: 4, kaih: 3, houm: 1 },
      },
      {
        level: 7,
        num: 1,
        bonus: { houm: 1 },
      },
      {
        level: 8,
        num: 1,
        bonus: { kaih: 1 },
      },
      {
        level: 9,
        num: 1,
        bonus: { houg: 1 },
      },
      {
        level: 10,
        num: 1,
        bonus: { houm: 1 },
      },
    ],
  },
  {
    ids: [85],
    bonuses: [
      {
        level: 6,
        bonus: { tyku: 1, kaih: 1 },
      },
      {
        level: 6,
        num: 1,
        bonusAR: { tyku: 2 },
      },
      {
        level: 8,
        bonus: { houg: 1 },
      },
      {
        shipNationality: [2, 3],
        level: 8,
        bonus: { tyku: 1, kaih: 1 },
      },
      {
        level: 10,
        bonus: { kaih: 1, houm: 1 },
      },
      {
        shipNationality: [2, 3],
        level: 10,
        num: 1,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [519],
    bonuses: [
      {
        shipClass: [122],
        num: 1,
        bonus: { kaih: 2, houm: 2 },
      },
      {
        shipClass: [114],
        num: 1,
        bonus: { raig: 1, kaih: 2, houm: 2 },
      },
    ],
  },
  {
    ids: [520],
    bonuses: [
      {
        shipClass: [7, 13],
        bonus: { houg: 1 },
      },
      {
        shipClass: [8, 29],
        bonus: { houg: 2, kaih: 1 },
      },
      {
        shipClass: [9, 31],
        bonus: { houg: 3, kaih: 1, houm: 1 },
      },
      {
        shipClass: [9, 31],
        num: 2,
        bonus: { houg: 2 },
      },
      {
        shipClass: [9, 31],
        num: 3,
        bonus: { houg: 2 },
      },
      {
        shipClass: [7, 13],
        num: 1,
        bonusSR: { houg: 2, raig: 2, kaih: 1, houm: 1 },
      },
      {
        shipClass: [8, 9, 29, 31],
        num: 1,
        bonusSR: { houg: 3, raig: 2, kaih: 2, houm: 1 },
      },
      {
        shipClass: [7, 8, 9, 13, 29, 31],
        requires: [10, 66, 71, 130, 220, 275, 464],
        num: 1,
        bonus: { houg: 1, tyku: 4, kaih: 4, houm: 1 },
      },
      {
        shipX: [265, 269, 319],
        num: 2,
        bonus: { houg: 2 },
      },
      {
        shipX: [265, 269, 319],
        num: 3,
        bonus: { houg: 2 },
      },
      {
        shipX: [501, 502, 503, 504, 506, 507],
        bonus: { houg: 1 },
      },
      {
        shipX: [501, 502, 503, 504, 506, 507],
        num: 1,
        bonusSR: { houg: 1, kaih: 1, houm: 2 },
      },
      {
        shipX: [501, 502, 503, 504, 506, 507],
        requires: [30, 410],
        num: 1,
        bonus: { houg: 1, tyku: 3, kaih: 2, houm: 1 },
      },
      {
        shipX: [501, 502, 503, 504, 506, 507],
        requires: [410],
        num: 1,
        bonus: { houg: 2, tyku: 3, kaih: 2, houm: 1 },
      },
      {
        shipX: [265, 269, 319, 502],
        bonus: { houg: 1, houm: 1 },
      },
      {
        shipX: [507],
        bonus: { houg: 1, tyku: 1, houm: 2 },
      },
      {
        shipX: [501, 502, 503, 504, 506, 507],
        level: 7,
        bonus: { houg: 1 },
      },
      {
        shipX: [501, 502, 503, 504, 506, 507],
        level: 10,
        bonus: { houm: 1 },
      },
    ],
  },
  {
    ids: [521],
    bonuses: [
      {
        shipClass: [52],
        bonus: { houg: 1, kaih: 2, saku: 2 },
      },
      {
        shipX: [507],
        bonus: { houg: 3, kaih: 1, saku: 2 },
      },
      {
        shipX: [183],
        bonus: { houg: 1, kaih: 2, saku: 2, houm: 1 },
      },
      {
        shipX: [321],
        bonus: { houg: 2, kaih: 3, saku: 3, houm: 2 },
      },
      {
        shipX: [507],
        bonus: { houg: 3, tyku: 1, kaih: 2, saku: 2, houm: 3 },
      },
      {
        shipClass: [52],
        level: 1,
        bonus: { houm: 1 },
      },
      {
        shipClass: [52],
        level: 2,
        bonus: { kaih: 1 },
      },
      {
        shipClass: [52],
        level: 3,
        bonus: { raig: 1, saku: 1 },
      },
      {
        shipClass: [52],
        level: 4,
        bonus: { houg: 1 },
      },
      {
        shipClass: [52],
        level: 6,
        bonus: { houm: 1 },
      },
      {
        shipClass: [52],
        level: 8,
        bonus: { saku: 1 },
      },
      {
        shipClass: [52],
        level: 10,
        bonus: { houm: 1 },
      },
      {
        shipX: [507],
        level: 1,
        bonus: { houm: 1 },
      },
      {
        shipX: [507],
        level: 2,
        bonus: { kaih: 1 },
      },
      {
        shipX: [507],
        level: 3,
        bonus: { raig: 1, saku: 1 },
      },
      {
        shipX: [507],
        level: 4,
        bonus: { houg: 1 },
      },
      {
        shipX: [507],
        level: 6,
        bonus: { houm: 1 },
      },
      {
        shipX: [507],
        level: 8,
        bonus: { saku: 1 },
      },
      {
        shipX: [507],
        level: 10,
        bonus: { houm: 1 },
      },
    ],
  },
  {
    ids: [522, 523],
    bonuses: [
      {
        shipType: [14],
        bonus: { raig: 1, kaih: 5, saku: 3, houm: 1 },
      },
      {
        shipType: [14],
        level: 1,
        bonus: { raig: 1 },
      },
      {
        shipType: [14],
        level: 2,
        bonus: { houm: 1 },
      },
      {
        shipType: [14],
        level: 3,
        bonus: { kaih: 1 },
      },
      {
        shipType: [14],
        level: 5,
        bonus: { saku: 1 },
      },
      {
        shipType: [14],
        level: 8,
        bonus: { houm: 1 },
      },
      {
        shipType: [14],
        level: 10,
        bonus: { kaih: 1 },
      },
    ],
  },
  {
    ids: [523],
    bonuses: [
      {
        shipType: [14],
        bonus: { raig: 2, kaih: 1, saku: 1, baku: 2, houm: 1 },
      },
    ],
  },
  {
    ids: [524],
    bonuses: [
      {
        shipType: [17, 19, 20, 21, 22],
        bonus: { houg: 1, tyku: 2, kaih: 2, houm: 1 },
      },
      {
        shipType: [17, 19, 20, 21, 22],
        num: 1,
        bonusAR: { tyku: 2, kaih: 2 },
      },
      {
        shipType: [17, 19, 20, 21, 22],
        level: 1,
        bonus: { kaih: 1 },
      },
      {
        shipType: [17, 19, 20, 21, 22],
        level: 2,
        bonus: { kaih: 1 },
      },
      {
        shipType: [17, 19, 20, 21, 22],
        level: 4,
        bonus: { tyku: 1 },
      },
      {
        shipType: [17, 19, 20, 21, 22],
        level: 6,
        bonus: { kaih: 1 },
      },
      {
        shipType: [17, 19, 20, 21, 22],
        level: 7,
        bonus: { houm: 1 },
      },
      {
        shipType: [17, 19, 20, 21, 22],
        level: 8,
        bonus: { tyku: 1 },
      },
      {
        shipType: [17, 19, 20, 21, 22],
        level: 9,
        bonus: { kaih: 1 },
      },
      {
        shipType: [17, 19, 20, 21, 22],
        level: 10,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [525, 526],
    bonuses: [
      {
        shipType: [13, 14],
        bonus: { houg: 1, raig: 2, kaih: -1 },
      },
      {
        shipS: [971, 972],
        num: 1,
        bonus: { houg: 2, raig: 1, houm: 2 },
      },
      {
        shipType: [13, 14],
        level: 1,
        bonus: { raig: 1 },
      },
      {
        shipType: [13, 14],
        level: 3,
        bonus: { houm: 1 },
      },
      {
        shipType: [13, 14],
        level: 6,
        bonus: { houm: 1 },
      },
      {
        shipType: [13, 14],
        level: 10,
        bonus: { raig: 1 },
      },
    ],
  },
  {
    ids: [526],
    bonuses: [
      {
        shipType: [13, 14],
        bonus: { houg: 1, raig: 1, houm: 1 },
      },
      {
        shipType: [13, 14],
        level: 2,
        bonus: { houg: 1 },
      },
      {
        shipType: [13, 14],
        level: 4,
        bonus: { raig: 1 },
      },
      {
        shipType: [13, 14],
        level: 8,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [527],
    bonuses: [
      {
        shipNationality: [5],
        num: 1,
        bonus: { tyku: 2, kaih: 1, saku: 2, houm: 1 },
      },
      {
        shipClass: [88],
        num: 1,
        bonus: { houg: 2 },
      },
      {
        shipClass: [67],
        num: 1,
        bonus: { houg: 1 },
      },
      {
        shipNationality: [5],
        level: 2,
        num: 1,
        bonus: { tyku: 1 },
      },
      {
        shipNationality: [5],
        level: 4,
        num: 1,
        bonus: { kaih: 1 },
      },
      {
        shipNationality: [5],
        level: 7,
        num: 1,
        bonus: { tyku: 1 },
      },
      {
        shipNationality: [5],
        level: 10,
        num: 1,
        bonus: { houm: 1 },
      },
    ],
  },
  {
    ids: [528],
    bonuses: [
      {
        shipNationality: [5],
        bonus: { houg: 1, kaih: 1, houm: 2 },
      },
      {
        shipClass: [108],
        bonus: { houg: 1, kaih: 1 },
      },
      {
        shipNationality: [5],
        level: 2,
        bonus: { houg: 1 },
      },
      {
        shipNationality: [5],
        level: 4,
        bonus: { houm: 1 },
      },
      {
        shipNationality: [5],
        level: 7,
        bonus: { kaih: 1 },
      },
      {
        shipNationality: [5],
        level: 10,
        bonus: { houm: 1 },
      },
    ],
  },
  {
    ids: [76, 114],
    bonuses: [
      {
        shipNationality: [2],
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [114],
    bonuses: [
      {
        shipNationality: [2],
        level: 7,
        bonus: { houg: 1 },
      },
      {
        shipNationality: [2],
        level: 8,
        bonus: { houm: 1 },
      },
      {
        shipNationality: [2],
        level: 9,
        bonus: { souk: 1 },
      },
      {
        shipNationality: [2],
        level: 10,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [123],
    bonuses: [
      {
        shipNationality: [2],
        level: 5,
        bonus: { houg: 1 },
      },
      {
        shipNationality: [2],
        level: 7,
        bonus: { houm: 1 },
      },
      {
        shipNationality: [2],
        level: 9,
        bonus: { houg: 1 },
      },
      {
        shipNationality: [2],
        level: 10,
        bonus: { houm: 1 },
      },
    ],
  },
  {
    ids: [124],
    bonuses: [
      {
        shipNationality: [2],
        requires: [76, 114, 123],
        bonus: { kaih: 1 },
      },
      {
        shipNationality: [2],
        requires: [123],
        level: 8,
        bonus: { kaih: 1 },
      },
      {
        shipNationality: [2],
        requires: [123],
        level: 10,
        bonus: { houm: 1 },
      },
      {
        shipNationality: [2],
        level: 7,
        bonus: { houm: 1 },
      },
      {
        shipNationality: [2],
        level: 8,
        bonus: { houg: 1 },
      },
      {
        shipNationality: [2],
        level: 9,
        bonus: { tyku: 1 },
      },
      {
        shipNationality: [2],
        level: 10,
        bonus: { houm: 1 },
      },
      {
        shipNationality: [3],
        level: 8,
        bonus: { houm: 1 },
      },
      {
        shipNationality: [3],
        level: 9,
        bonus: { tyku: 1 },
      },
      {
        shipNationality: [3],
        level: 10,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [252],
    bonuses: [
      {
        shipClass: [78, 112],
        level: 4,
        bonus: { kaih: 1 },
      },
      {
        shipClass: [78, 112],
        level: 6,
        bonus: { houm: 1 },
      },
      {
        shipClass: [78, 112],
        level: 7,
        bonus: { houg: 1 },
      },
      {
        shipClass: [78, 112],
        level: 8,
        bonus: { kaih: 1 },
      },
      {
        shipClass: [78, 112],
        level: 9,
        bonus: { houm: 1 },
      },
      {
        shipClass: [78, 112],
        level: 10,
        bonus: { houg: 1 },
      },
    ],
  },
  {
    ids: [530],
    bonuses: [
      {
        shipX: [149, 150, 151, 152, 593],
        bonus: { houg: 2 },
      },
      {
        shipX: [591, 954],
        bonus: { houg: 3 },
      },
      {
        shipX: [592],
        bonus: { houg: 4 },
      },
      {
        shipX: [149, 150, 151, 152],
        bonus: { tyku: 1 },
      },
      {
        shipX: [591, 592, 954],
        bonus: { tyku: 2 },
      },
      {
        shipX: [593],
        bonus: { tyku: 3 },
      },
      {
        shipX: [592],
        bonus: { houg: 1, houm: 2 },
      },
      {
        shipX: [592],
        level: 2,
        bonus: { houm: 1 },
      },
      {
        shipX: [592],
        level: 4,
        bonus: { houg: 1 },
      },
      {
        shipX: [592],
        level: 6,
        bonus: { souk: 1 },
      },
      {
        shipX: [592],
        level: 7,
        bonus: { houm: 1 },
      },
      {
        shipX: [592],
        level: 8,
        bonus: { houg: 1 },
      },
      {
        shipX: [592],
        level: 9,
        bonus: { souk: 1 },
      },
      {
        shipX: [592],
        level: 10,
        bonus: { houm: 1 },
      },
      {
        shipX: [150, 152, 591, 954],
        bonus: { houm: 1 },
      },
      {
        shipX: [150, 152, 591, 954],
        level: 2,
        bonus: { houg: 1 },
      },
      {
        shipX: [150, 152, 591, 954],
        level: 4,
        bonus: { souk: 1 },
      },
      {
        shipX: [150, 152, 591, 954],
        level: 6,
        bonus: { houm: 1 },
      },
      {
        shipX: [150, 152, 591, 954],
        level: 8,
        bonus: { houg: 1 },
      },
      {
        shipX: [150, 152, 591, 954],
        level: 10,
        bonus: { houm: 1 },
      },
      {
        shipX: [149, 151, 593],
        level: 4,
        bonus: { houg: 1 },
      },
      {
        shipX: [149, 151, 593],
        level: 7,
        bonus: { souk: 1 },
      },
      {
        shipX: [149, 151, 593],
        level: 10,
        bonus: { houm: 1 },
      },
      {
        shipX: [592],
        num: 1,
        bonusSR: { houg: 3, kaih: 3, houm: 3 },
      },
      {
        shipX: [592],
        num: 2,
        bonus: { houm: 2 },
      },
      {
        shipX: [592],
        num: 3,
        bonus: { houm: 2 },
      },
      {
        shipX: [592],
        num: 4,
        bonus: { houm: 2 },
      },
      {
        shipX: [149, 150, 151, 152, 591, 593, 954],
        num: 1,
        bonusSR: { houg: 2, kaih: 2, houm: 2 },
      },
      {
        shipX: [152, 591, 592],
        num: 1,
        bonusSR: { houg: 3 },
      },
      {
        shipX: [150, 954],
        num: 1,
        bonusSR: { houg: 2 },
      },
      {
        shipX: [149, 151, 593],
        num: 1,
        bonusSR: { houg: 1 },
      },
      {
        shipX: [149, 150, 151, 152, 591, 592, 593, 954],
        num: 1,
        bonusAccR: { houm: 1 },
      },
      {
        shipX: [591, 592, 593, 954],
        requires: [174],
        num: 1,
        bonus: { raig: 6 },
      },
      {
        shipX: [591, 592, 593, 954],
        requires: [174],
        requiresLevel: 6,
        num: 1,
        bonus: { raig: 1 },
      },
      {
        shipX: [591, 592, 593, 954],
        requires: [174],
        requiresLevel: 8,
        num: 1,
        bonus: { houm: 1 },
      },
      {
        shipX: [591, 592, 593, 954],
        requires: [174],
        requiresLevel: 10,
        num: 1,
        bonus: { houg: 1 },
      },
      {
        shipX: [591, 592, 593, 954],
        num: 1,
        bonusAccR: { houg: 2, raig: 2, kaih: 3, houm: 2 },
      },
      {
        shipX: [591, 592],
        num: 1,
        bonusAccR: { houg: 2 },
      },
      {
        shipX: [593, 954],
        num: 1,
        bonusAccR: { houg: 1 },
      },
      {
        shipX: [591, 592, 593, 954],
        num: 2,
        bonus: { houm: 1 },
      },
    ],
  },
  {
    ids: [130],
    bonuses: [
      {
        shipX: [428],
        level: 1,
        bonus: { tyku: 1 },
      },
      {
        shipX: [428],
        level: 3,
        bonus: { kaih: 1 },
      },
      {
        shipX: [428],
        level: 5,
        bonus: { houm: 1 },
      },
      {
        shipX: [428],
        level: 7,
        bonus: { tyku: 1 },
      },
      {
        shipX: [428],
        level: 8,
        bonus: { kaih: 1 },
      },
      {
        shipX: [428],
        level: 9,
        bonus: { tyku: 1 },
      },
      {
        shipX: [428],
        level: 10,
        bonus: { houg: 1 },
      },
      {
        shipX: [141],
        level: 2,
        bonus: { tyku: 1 },
      },
      {
        shipX: [141],
        level: 4,
        bonus: { kaih: 1 },
      },
      {
        shipX: [141],
        level: 6,
        bonus: { houm: 1 },
      },
      {
        shipX: [141],
        level: 8,
        bonus: { tyku: 1 },
      },
      {
        shipX: [141],
        level: 10,
        bonus: { kaih: 1 },
      },
      {
        shipType: [1],
        level: 3,
        bonus: { tyku: 1 },
      },
      {
        shipType: [1],
        level: 6,
        bonus: { kaih: 1 },
      },
      {
        shipType: [1],
        level: 9,
        bonus: { tyku: 1 },
      },
      {
        shipType: [1],
        level: 10,
        bonus: { kaih: 1 },
      },
    ],
  },
  {
    ids: [533],
    bonuses: [
      {
        shipClass: [54],
        level: 2,
        bonus: { tyku: 1 },
      },
      {
        shipClass: [54],
        level: 4,
        bonus: { houg: 1 },
      },
      {
        shipClass: [54],
        level: 6,
        bonus: { houm: 1 },
      },
      {
        shipClass: [54],
        level: 8,
        bonus: { tyku: 1 },
      },
      {
        shipClass: [54],
        level: 10,
        bonus: { kaih: 1 },
      },
      {
        shipX: [968],
        level: 1,
        bonus: { kaih: 1 },
      },
      {
        shipX: [968],
        level: 3,
        bonus: { tyku: 1 },
      },
      {
        shipX: [968],
        level: 5,
        bonus: { houm: 1 },
      },
      {
        shipX: [968],
        level: 7,
        bonus: { kaih: 1 },
      },
      {
        shipX: [968],
        level: 9,
        bonus: { houg: 1 },
      },
    ],
  },
];
