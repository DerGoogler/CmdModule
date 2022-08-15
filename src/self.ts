type Self = {
  print(data: string): void;
  quit(code?: number): void;
  /**
   * Get the name of the current command
   */
  name: string;
};

type self = typeof self[keyof typeof self];
const self: Self = {
  name: "",
  print(data: any): void {
    for (const str of data) {
      process.stdout.write(str);
    }
    process.stdout.write("\n");
  },
  quit(code?: number): void {
    process.exit(code ? code : 1);
  },
} as const;
export { self, Self };
