// https://json2ts.vercel.app/

namespace fit_bonuses {
  type bonus_equipment = {
    readonly types?: number[];
    readonly bonuses: bonus_data[];
    readonly ids?: number[];
  };

  type bonus_data = {
    readonly shipType?: number[];
    readonly level?: number;
    readonly num?: number;
    readonly bonus?: bonus_value;
    readonly shipX?: number[];
    readonly bonusAR?: bonus_if_anti_air_radar;
    readonly shipS?: number[];
    readonly requires?: number[];
    readonly shipClass?: number[];
    readonly bonusSR?: bonus_if_surface_radar;
    readonly shipNationality?: number[];
    /** api_type[2]? */
    readonly requiresType?: number[];
    readonly requiresNumType?: number;
    readonly requiresLevel?: number;
    readonly requiresNum?: number;
    readonly bonusAccR?: bonus_if_accuracy_radar;
  };

  type bonus_if_accuracy_radar = {
    readonly houg?: number;
    readonly raig?: number;
    readonly kaih?: number;
    readonly houm?: number;
  };

  type bonus_if_surface_radar = {
    readonly houg?: number;
    readonly raig?: number;
    readonly kaih?: number;
    readonly houm?: number;
    readonly tais?: number;
    readonly tyku?: number;
  };

  type bonus_if_anti_air_radar = {
    readonly kaih?: number;
    readonly houm?: number;
    readonly tyku?: number;
    readonly houg?: number;
  };

  type bonus_value = {
    readonly houg?: number;
    readonly tyku?: number;
    readonly kaih?: number;
    readonly souk?: number;
    readonly houm?: number;
    readonly tais?: number;
    readonly raig?: number;
    readonly saku?: number;
    readonly leng?: number;
    readonly baku?: number;
  };
} // namespace fit_bonuses
