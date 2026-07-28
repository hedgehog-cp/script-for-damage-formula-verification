namespace kcv {
  /**
   * @see https://x.com/Divinity_123/status/1854937456086311200
   * @see https://docs.google.com/spreadsheets/d/1pXwnNTIYkMYXwJqYA1-J2TQNyr_MF9eSdOr8r_guZY4/edit?gid=787357589#gid=787357589
   * @param { kcv.ship } attacker 攻撃艦
   */
  export function temporarily_unknown_modify(attacker: kcv.ship): void {
    // 偵察機
    {
      const rank = [522, 523, 238, 239, 521, 118, 369, 368];

      // 522: 零式小型水上機
      // 523: 零式小型水上機(熟練)
      // self-stackable
      if (
        attacker.equipments.some((e) => e && [522, 523].includes(e.mst.api_id))
      ) {
        const low_rank_equipments = rank.slice(
          rank.findIndex((e) => e === 238),
        );
        for (let e of attacker.equipments) {
          if (e && low_rank_equipments.includes(e.mst.api_id)) e = undefined;
        }
        return;
      }

      // 238: 零式水上偵察機11型乙
      // 239: 零式水上偵察機11型乙(熟練)
      // no self-stackable
      if (
        attacker.equipments.some((e) => e && [238, 239].includes(e.mst.api_id))
      ) {
        let max_level = -Infinity;
        let index = 0;
        for (let i = 0, len = attacker.equipments.length; i < len; i++) {
          const e = attacker.equipments[i];
          if (e && [238, 239].includes(e.mst.api_id) && e.level > max_level) {
            max_level = e.level;
            index = i;
          }
        }

        const low_rank_equipments = rank.slice(
          rank.findIndex((e) => e === 238),
        );
        for (let i = 0, len = attacker.equipments.length; i < len; i++) {
          const e = attacker.equipments[i];
          if (e && low_rank_equipments.includes(e.mst.api_id) && i !== index) {
            attacker.equipments[i] = undefined;
          }
        }

        return;
      }

      // 521: 紫雲(熟練)
      // self-stackable
      if (attacker.equipments.some((e) => e && [521].includes(e.mst.api_id))) {
        const low_rank_equipments = rank.slice(
          rank.findIndex((e) => e === 118),
        );
        for (let e of attacker.equipments) {
          if (e && low_rank_equipments.includes(e.mst.api_id)) e = undefined;
        }

        return;
      }

      // 118: 紫雲
      // self-stackable
      if (attacker.equipments.some((e) => e && [118].includes(e.mst.api_id))) {
        const low_rank_equipments = rank.slice(
          rank.findIndex((e) => e === 369),
        );
        for (let e of attacker.equipments) {
          if (e && low_rank_equipments.includes(e.mst.api_id)) e = undefined;
        }

        return;
      }

      // 369: Swordfish Mk.III改(水上機型/熟練)
      // no self-stackable
      if (attacker.equipments.some((e) => e && [369].includes(e.mst.api_id))) {
        let max_level = -Infinity;
        let index = 0;
        for (let i = 0, len = attacker.equipments.length; i < len; i++) {
          const e = attacker.equipments[i];
          if (e && [369].includes(e.mst.api_id) && e.level > max_level) {
            max_level = e.level;
            index = i;
          }
        }

        const low_rank_equipments = rank.slice(
          rank.findIndex((e) => e === 369),
        );
        for (let i = 0, len = attacker.equipments.length; i < len; i++) {
          const e = attacker.equipments[i];
          if (e && low_rank_equipments.includes(e.mst.api_id) && i !== index) {
            attacker.equipments[i] = undefined;
          }
        }

        return;
      }

      // 368: Swordfish Mk.III改(水上機型)
      // no self-stackable
      if (attacker.equipments.some((e) => e && [368].includes(e.mst.api_id))) {
        let max_level = -Infinity;
        let index = 0;
        for (let i = 0, len = attacker.equipments.length; i < len; i++) {
          const e = attacker.equipments[i];
          if (e && [368].includes(e.mst.api_id) && e.level > max_level) {
            max_level = e.level;
            index = i;
          }
        }

        const low_rank_equipments = rank.slice(
          rank.findIndex((e) => e === 368),
        );
        for (let i = 0, len = attacker.equipments.length; i < len; i++) {
          const e = attacker.equipments[i];
          if (e && low_rank_equipments.includes(e.mst.api_id) && i !== index) {
            attacker.equipments[i] = undefined;
          }
        }

        return;
      }
    }

    // 艦攻
    {
      const rank = [372, 373, 374, 425, 424];

      // 372: 天山一二型甲
      // no self-stackable
      if (attacker.equipments.some((e) => e && [372].includes(e.mst.api_id))) {
        let max_level = -Infinity;
        let index = 0;
        for (let i = 0, len = attacker.equipments.length; i < len; i++) {
          const e = attacker.equipments[i];
          if (e && [372].includes(e.mst.api_id) && e.level > max_level) {
            max_level = e.level;
            index = i;
          }
        }

        const low_rank_equipments = rank.slice(
          rank.findIndex((e) => e === 372),
        );
        for (let i = 0, len = attacker.equipments.length; i < len; i++) {
          const e = attacker.equipments[i];
          if (e && low_rank_equipments.includes(e.mst.api_id) && i !== index) {
            attacker.equipments[i] = undefined;
          }
        }

        return;
      }

      // 373: 天山一二型甲改(空六号電探改装備機)
      // no self-stackable
      if (attacker.equipments.some((e) => e && [373].includes(e.mst.api_id))) {
        let max_level = -Infinity;
        let index = 0;
        for (let i = 0, len = attacker.equipments.length; i < len; i++) {
          const e = attacker.equipments[i];
          if (e && [373].includes(e.mst.api_id) && e.level > max_level) {
            max_level = e.level;
            index = i;
          }
        }

        const low_rank_equipments = rank.slice(
          rank.findIndex((e) => e === 373),
        );
        for (let i = 0, len = attacker.equipments.length; i < len; i++) {
          const e = attacker.equipments[i];
          if (e && low_rank_equipments.includes(e.mst.api_id) && i !== index) {
            attacker.equipments[i] = undefined;
          }
        }

        return;
      }

      // 374: 天山一二型甲改(熟練/空六号電探改装備機)
      // no self-stackable
      if (attacker.equipments.some((e) => e && [374].includes(e.mst.api_id))) {
        let max_level = -Infinity;
        let index = 0;
        for (let i = 0, len = attacker.equipments.length; i < len; i++) {
          const e = attacker.equipments[i];
          if (e && [374].includes(e.mst.api_id) && e.level > max_level) {
            max_level = e.level;
            index = i;
          }
        }

        const low_rank_equipments = rank.slice(
          rank.findIndex((e) => e === 374),
        );
        for (let i = 0, len = attacker.equipments.length; i < len; i++) {
          const e = attacker.equipments[i];
          if (e && low_rank_equipments.includes(e.mst.api_id) && i !== index) {
            attacker.equipments[i] = undefined;
          }
        }

        return;
      }

      // 425: Barracuda Mk.III
      // self-stackable
      if (attacker.equipments.some((e) => e && [425].includes(e.mst.api_id))) {
        const low_rank_equipments = rank.slice(
          rank.findIndex((e) => e === 424),
        );
        for (let e of attacker.equipments) {
          if (e && low_rank_equipments.includes(e.mst.api_id)) e = undefined;
        }

        return;
      }

      // 424: Barracuda Mk.II
      // self-stackable
      if (attacker.equipments.some((e) => e && [425].includes(e.mst.api_id))) {
        //   const low_rank_equipments = rank.slice(rank.findIndex((e) => e === 0));
        //   for (let e of attacker.equipments) {
        //     if (e && low_rank_equipments.includes(e.mst.api_id)) e = undefined;
        //   }

        return;
      }
    }
  }
} // namespace kcv
