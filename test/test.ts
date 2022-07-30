import Cmd, { Color } from "./../src";

const cmd = new Cmd.Module({
  prompt: `${Color.FgGreen}CLI${Color.Reset}$`,
  commands: {
    testArgs: {
      callback: args => {
        console.log(args);
      },
    },
    echo: {
      callback: args => {
        console.log(args[0]);
      },
    },
  },

  //   defaultHandler: () =>{

  //   }
});

// Build the shell
cmd.run();
