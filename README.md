# CmdModule

TODO: Add description

> This library is in development, everything can CHANGE!

## Quickstart

```ts
import CmdModule, { css } from "cmdmodule";

const shell = new CmdModule({
  prompt: css.array("", [css.fg.green`CLI`, "$ "]),
});

shell.on("echo", (self, args) => {
  if (args.includes("--name")) {
    return self.print(self.name);
  }
  return self.print(args[0]);
});

shell.on("arg", (self, args) => {
  self.print(args.join(","));
});

shell.on(
  "run",
  (self, args) => {
    shell.spawn("npm", ["run", args[0]], {
      workingDirectory: "./",
    });
  },
  {
    disableReprompt: true,
  }
);

shell.default(self => {
  self.print(css.array(" ", [css.fg.red`${self.name}`, css.fg.yellow`command not found`]));
});

// Build the shell
shell.run();
```

> Run it by `npx ts-node cli.ts`
