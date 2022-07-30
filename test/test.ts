import Cmd, { Color } from "./../src";

const cmd = new Cmd.Module({
  prompt: `${Color.FgGreen}CLI${Color.Reset}$`,
  commands: {
    testArgs: {
      callback: (self, args) => {
        self.print(args);
      },
    },
    echo: {
      callback: (self, args) => {
        self.print(args[0]);
      },
    },
    add: {
      callback(self, args) {
        self.exec(["bun", "add", args[0]]);
      },
    },
  },

  //   defaultHandler: () =>{

  //   }
});

// Build the shell
cmd.run();
