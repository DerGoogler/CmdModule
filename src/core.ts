import * as readline from "readline";
import _ from "underscore";
import { Color } from ".";

namespace Cmd {
  interface LoopOptions {
    prompt: string;
    commands: Commands;
    defaultHandler?: ((args: string[]) => void) | undefined;
  }

  type Commands = {
    readonly [name: string]: {
      /**
       * Defines the command
       * @param args
       */
      callback: (args: Array<string>) => void;
    };
  };

  /**
   * Create an own interactive shell
   */
  export class Module {
    private rl: readline.Interface;
    private commands: Commands;
    private prompt: string = "CmdModule$";

    private defaultHandler: ((args: string[]) => void) | undefined;

    public constructor(options: LoopOptions) {
      this.prompt = options.prompt;
      this.commands = Object.assign(options.commands, {
        noFound: {
          callback(args: any[]) {
            console.log(`${Color.FgYellow}${args[0]} command not found${Color.Reset}`);
          },
        },
      });
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

            const command = (args: Array<string>) => {
              if (commandName && this.commands[commandName]) {
                this.commands[commandName].callback(args);
              } else {
                this.defaultHandler ? this.defaultHandler(args) : this.commands.noFound.callback(args);
              }
            };

            if (typeof command === "function") {
              command(args);
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

export default Cmd;