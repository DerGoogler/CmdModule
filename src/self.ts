interface Self {
  print(data: string): void;
}

class Self {
  public print<T = any>(data: T): void {
    console.log(data);
  }
  public quit(): void {
    process.exit(1);
  }
}

export { Self };
type self = typeof self[keyof typeof self];
const self: Self = new Self();
export default self;
