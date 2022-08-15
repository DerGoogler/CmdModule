import * as readline from "readline";
import _ from "underscore";
// import { commands } from "./commands";
import { self, Self } from "./self";
import { css } from "./util/css";
import { spawn } from "child_process";

namespace CMD {
  interface LoopOptions {
    prompt: string;
    commands: Commands;
    /**
     * Default command handle. Such as unknown commands.
     */
    defaultHandler?: ((self: Self, args: string[]) => void) | undefined;
  }

  export type SpawnCallback = (code: number | null) => void;
  export type SpawnOptions = {
    workingDirectory?: string;
  };

  export type Commands = Record<
    string,
    Readonly<{
      description?: string | undefined;
      disableReprompt?: boolean;
      /**
       * Defines the command
       * @param self
       * @param args
       */
      invoke: (self: Self, args: Array<string>) => void;
    }>
  >;

  /**
   * Create an own interactive shell
   */
  export class Module {
    private rl: readline.Interface;
    private commands: Commands;
    private promptName: string = css.array("", [css.fg.green`CmdModule`, "$ "]);

    private defaultHandler: ((self: Self, args: string[]) => void) | undefined;

    public constructor(options: LoopOptions) {
      this.promptName = options.prompt;
      this.commands = options.commands;
      this.defaultHandler = options.defaultHandler;

      this.rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: this.promptName,
      });
      this.rl.prompt();
    }

    public run() {
      this.rl
        .on("line", line => {
          let args: Array<string> = line.split(" ");
          const commandName = args.shift();

          if (commandName && this.commands[commandName]) {
            try {
              args = _.compact(args);
              if (_.isEmpty(args)) {
                this.rl.prompt();
              }

              if (typeof this.commands[commandName].invoke === "function") {
                self.name = commandName;
                this.commands[commandName].invoke(self, args);
              } else {
                console.error(`${commandName} has no callback function`);
              }
            } catch (error) {
              console.log(css.fg.red`${(error as Error).message}`);
            }
          } else {
            if (this.defaultHandler) {
              self.name = commandName!;
              this.defaultHandler(self, args);
            } else {
              self.print(`${commandName} command not found`);
            }
          }
          if (commandName && this.commands[commandName]) {
            if (!this.commands[commandName].disableReprompt) {
              this.rl.prompt();
            }
          } else {
            this.rl.prompt();
          }
        })
        .on("close", function() {
          console.log("Exited!");
          process.exit(0);
        });
    }

    public spawn(command: string, args: ReadonlyArray<string>, options?: SpawnOptions): void {
      let ls = spawn(command, args, { cwd: options?.workingDirectory, stdio: "inherit" });
      ls.on("data", data => {
        self.print(data.toString());
      });

      ls.on("exit", code => {
        this.rl.prompt();
      });
    }
  }
}

export default CMD;
