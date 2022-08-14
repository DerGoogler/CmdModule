import { spawn } from "child_process";

interface Self {
  print(data: string): void;
  quit(): void;
  spawn(command: string, args: ReadonlyArray<string>): (callback: SpawnCallback) => void;
}

type SpawnCallback = (code: number | null) => void;
type SpawnOptions = {
  workingDirectory?: string;
};

class Self {
  public print(data: any): void {
    for (const str of data) {
      process.stdout.write(str);
    }
    process.stdout.write("\n");
  }
  public quit(code?: number): void {
    process.exit(code ? code : 1);
  }
  public spawn(command: string, args: ReadonlyArray<string>, options?: SpawnOptions): (callback: SpawnCallback) => void {
    let ls = spawn(command, args, { cwd: options?.workingDirectory });
    ls.stdout.on("data", data => {
      this.print(data.toString());
    });
    ls.stderr.on("data", data => {
      this.print(data.toString());
    });

    return (callback: SpawnCallback) => {
      ls.on("exit", code => {
        callback(code);
      });
    };
  }
}

export { Self };
type self = typeof self[keyof typeof self];
const self: Self = new Self();
export default self;
