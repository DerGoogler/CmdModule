import { Color } from ".";
import CMD from "./core";
import { Self } from "./self";

export const commands: CMD.Commands = {
  noFound: {
    invoke: (self, args) => {
      self.print(`${Color.FgYellow}${args[0]} command not found${Color.Reset}`);
    },
  },
  echo: {
    description: "Returns your entered string",
    invoke: (self, args) => {
      self.print(args[0]);
    },
  },
  exit: {
    invoke: (self, args) => {
      self.quit();
    },
  },
};
