import { exec, ExecOptions } from "child_process";
import { Color } from ".";

interface Self {
  print(message?: any, ...optionalParams: any[]): void;
  exec(command: Array<string>, options?: ExecOptions | undefined): void;
}

interface SelfOptions {
  execCallback?: () => void;
}

class Self {
  private execCallback: (() => void) | undefined;

  public constructor(options: SelfOptions) {
    this.execCallback = options.execCallback;
  }

  public print(message?: any, ...optionalParams: any[]): void {
    console.log(message, ...optionalParams);
  }

  public exec(command: Array<string>, options?: ExecOptions | undefined): void {
    exec(command.join(" "), options, (error, stdout, stderror) => {
      // if any error while executing
      if (error) {
        this.print(`${Color.FgRed}${error}${Color.Reset}`);
        return;
      }

      this.print(stdout);
      this.execCallback;
    });
  }
}

export { Self };
