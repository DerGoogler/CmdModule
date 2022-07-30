import Cmd, { Color } from "./../src";

const cmd = new Cmd.Module({
  prompt: `${Color.FgGreen}CLI${Color.Reset}$`,
  commands: {
    testArgs: {
      invoke: (self, args) => {
        self.print(args);
      },
    },
    echo: {
      invoke: (self, args) => {
        self.print(args[0]);
      },
    },
  },

  //   defaultHandler: () =>{

  //   }
});

// Build the shell
cmd.run();
