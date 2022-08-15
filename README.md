# CmdModule

TODO: Add description

## Quickstart

```ts
import Cmd, { css } from "./../src";

const cmd = new Cmd.Module({
  prompt: css.array("", [css.fg.green`CLI`, "$ "]),
  commands: {
    arg: {
      invoke: (self, args) => {
        self.print(args.join(","));
      },
    },
    echo: {
      invoke: (self, args) => {
        if (args.includes("--name")) {
          return self.print(self.name);
        }
        return self.print(args[0]);
      },
    },
    run: {
      disableReprompt: true,
      invoke: (self, args) => {
        cmd.spawn("npm", ["run", args[0]], {
          workingDirectory: "./",
        });
      },
    },
  },
  defaultHandler: (self, args) => {
    self.print(css.array(" ", [css.fg.red`${self.name}`, css.fg.yellow`command not found`]));
  },
});

// Build the shell
cmd.run();
```
