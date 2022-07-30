import * as readline from "readline";
import _ from "underscore";
import { Color } from ".";
import { commands } from "./commands";
import self, { Self } from "./self";

namespace CMD {
  interface LoopOptions {
    prompt: string;
    commands: Commands;
    defaultHandler?: ((self: Self, args: string[]) => void) | undefined;
  }

  export type Commands = {
    readonly [name: string]: {
      readonly description?: string | undefined;
      /**
       * Defines the command
       * @param self
       * @param args
       */
      readonly invoke: (self: Self, args: Array<string>) => void;
    };
  };

  /**
   * Create an own interactive shell
   */
  export class Module {
    private rl: readline.Interface;
    private commands: Commands;
    private prompt: string = "CmdModule$";

    private defaultHandler: ((self: Self, args: string[]) => void) | undefined;

    public constructor(options: LoopOptions) {
      this.prompt = options.prompt;
      this.commands = Object.assign(options.commands, commands);
      this.defaultHandler = options.defaultHandler;

      this.rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: `${this.prompt} `,
      });
      this.rl.prompt();
    }

    public run() {
      this.rl
        .on("line", line => {
          let args: Array<string> = line.split(" ");
          try {
            args = _.compact(args);
            if (_.isEmpty(args)) {
              this.rl.prompt();
            }

            const commandName = args.shift();

            const command = (self: Self, args: Array<string>) => {
              if (commandName && this.commands[commandName]) {
                if (args.includes("--help")) {
                  console.log(this.commands[commandName].description);
                } else {
                  this.commands[commandName].invoke(self, args);
                }
              } else {
                this.defaultHandler ? this.defaultHandler(self, args) : this.commands.noFound.invoke(self, args);
              }
            };

            if (typeof command === "function") {
              command(self, args);
            } else {
              console.error(`${commandName} has no callback function`);
            }
          } catch (error) {
            console.log(`${Color.FgRed}${(error as Error).message}${Color.Reset}`);
          }
          this.rl.prompt();
        })
        .on("close", function() {
          console.log("Exited!");
          process.exit(0);
        });
    }
  }
}

export default CMD;
