namespace Css {
  export type Types = Readonly<{
    /**
     * ### Parses an array with string to an string
     *
     * ----
     *
     * **Sample**
     * ```ts
     * const promt = css.array([
     *   css.fg.magenta`CLI`,
     *   "$"
     * ])
     *
     * console.log(promt)
     * ```
     */
    array: (split: string, ary: string[]) => string;
    format: (literals: any, ...substitutions: any) => string;
    custom: (code: number) => (literals: any, ...substitutions: any) => string;
    bright: (literals: any, ...substitutions: any) => string;
    dim: (literals: any, ...substitutions: any) => string;
    underscore: (literals: any, ...substitutions: any) => string;
    blink: (literals: any, ...substitutions: any) => string;
    reverse: (literals: any, ...substitutions: any) => string;
    hidden: (literals: any, ...substitutions: any) => string;
    fg: Readonly<{
      black: (literals: any, ...substitutions: any) => string;
      red: (literals: any, ...substitutions: any) => string;
      green: (literals: any, ...substitutions: any) => string;
      yellow: (literals: any, ...substitutions: any) => string;
      blue: (literals: any, ...substitutions: any) => string;
      magenta: (literals: any, ...substitutions: any) => string;
      cyan: (literals: any, ...substitutions: any) => string;
      white: (literals: any, ...substitutions: any) => string;
    }>;
    bg: Readonly<{
      black: (literals: any, ...substitutions: any) => string;
      red: (literals: any, ...substitutions: any) => string;
      green: (literals: any, ...substitutions: any) => string;
      yellow: (literals: any, ...substitutions: any) => string;
      blue: (literals: any, ...substitutions: any) => string;
      magenta: (literals: any, ...substitutions: any) => string;
      cyan: (literals: any, ...substitutions: any) => string;
      white: (literals: any, ...substitutions: any) => string;
    }>;
  }>;
}

type css = typeof css[keyof typeof css];
const css: Css.Types = {
  array: (split: string, ary: string[]): string => {
    return ary.join(split);
  },
  format: (literals: any, ...substitutions: any): string => {
    let result = "";

    for (let i = 0; i < substitutions.length; i++) {
      result += literals[i];
      result += substitutions[i];
    }
    // add the last literal
    result += literals[literals.length - 1];
    return result;
  },
  custom: (code: number): ((literals: any, ...substitutions: any) => string) => {
    return (literals: any, ...substitutions: any) => {
      return "\x1b[" + code + "m" + css.format(literals, ...substitutions) + "\x1b[0m";
    };
  },
  bright: (literals: any, ...substitutions: any): string => {
    return "\x1b[1m" + css.format(literals, ...substitutions) + "\x1b[0m";
  },

  dim: (literals: any, ...substitutions: any): string => {
    return "\x1b[2m" + css.format(literals, ...substitutions) + "\x1b[0m";
  },

  underscore: (literals: any, ...substitutions: any): string => {
    return "\x1b[4m" + css.format(literals, ...substitutions) + "\x1b[0m";
  },

  blink: (literals: any, ...substitutions: any): string => {
    return "\x1b[5m" + css.format(literals, ...substitutions) + "\x1b[0m";
  },

  reverse: (literals: any, ...substitutions: any): string => {
    return "\x1b[7m" + css.format(literals, ...substitutions) + "\x1b[0m";
  },

  hidden: (literals: any, ...substitutions: any): string => {
    return "\x1b[8m" + css.format(literals, ...substitutions) + "\x1b[0m";
  },
  fg: {
    black: (literals: any, ...substitutions: any): string => {
      return "\x1b[30m" + css.format(literals, ...substitutions) + "\x1b[0m";
    },
    red: (literals: any, ...substitutions: any): string => {
      return "\x1b[31m" + css.format(literals, ...substitutions) + "\x1b[0m";
    },
    green: (literals: any, ...substitutions: any): string => {
      return "\x1b[32m" + css.format(literals, ...substitutions) + "\x1b[0m";
    },
    yellow: (literals: any, ...substitutions: any): string => {
      return "\x1b[33m" + css.format(literals, ...substitutions) + "\x1b[0m";
    },
    blue: (literals: any, ...substitutions: any): string => {
      return "\x1b[34m" + css.format(literals, ...substitutions) + "\x1b[0m";
    },
    magenta: (literals: any, ...substitutions: any): string => {
      return "\x1b[35m" + css.format(literals, ...substitutions) + "\x1b[0m";
    },
    cyan: (literals: any, ...substitutions: any): string => {
      return "\x1b[36m" + css.format(literals, ...substitutions) + "\x1b[0m";
    },
    white: (literals: any, ...substitutions: any): string => {
      return "\x1b[37m" + css.format(literals, ...substitutions) + "\x1b[0m";
    },
  },
  bg: {
    black: (literals: any, ...substitutions: any): string => {
      return "\x1b[40m" + css.format(literals, ...substitutions) + "\x1b[0m";
    },
    red: (literals: any, ...substitutions: any): string => {
      return "\x1b[41m" + css.format(literals, ...substitutions) + "\x1b[0m";
    },
    green: (literals: any, ...substitutions: any): string => {
      return "\x1b[42m" + css.format(literals, ...substitutions) + "\x1b[0m";
    },
    yellow: (literals: any, ...substitutions: any): string => {
      return "\x1b[43m" + css.format(literals, ...substitutions) + "\x1b[0m";
    },
    blue: (literals: any, ...substitutions: any): string => {
      return "\x1b[44m" + css.format(literals, ...substitutions) + "\x1b[0m";
    },
    magenta: (literals: any, ...substitutions: any): string => {
      return "\x1b[45m" + css.format(literals, ...substitutions) + "\x1b[0m";
    },
    cyan: (literals: any, ...substitutions: any): string => {
      return "\x1b[46m" + css.format(literals, ...substitutions) + "\x1b[0m";
    },
    white: (literals: any, ...substitutions: any): string => {
      return "\x1b[47m" + css.format(literals, ...substitutions) + "\x1b[0m";
    },
  },
} as const;

export { css, Css };
