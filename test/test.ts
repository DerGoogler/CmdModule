import Cmd, { Color } from "./../src";

const cmd = new Cmd.Module({
  prompt: `${Color.FgGreen}CLI${Color.Reset}$`,
  commands: {
    testArg: {
      invoke: (self, args) => {
        self.print(args[0]);
      },
    },
    echo: {
      invoke: (self, args) => {
        self.print(args[0]);
      },
    },
    run: {
      invoke: (self, args) => {
        self.spawn("npm", ["run", args[0]])((code)=> {
          cmd.rl.prompt()
        })
      },
    },
  },

  //   defaultHandler: () =>{

  //   }
});

// Build the shell
cmd.run();
