export class Tree {
  constructor(public value: string, public children: Tree[] = []) {}

  // This method is recursive, because it calls itself.
  // It's also a generator, because it uses the "yield" keyword.
  *traverse(): Generator<string> {
    yield this.value;
    for (const child of this.children) {
      yield* child.traverse();
    }
  }
}

export class BinaryTree {
  constructor(public value: string, public left: BinaryTree | null = null, public right: BinaryTree | null = null) {}

  // This method is recursive, because it calls itself.
  // It's also a generator, because it uses the "yield" keyword.
  *traverse(): Generator<string> {
    yield this.value;
    if (this.left) {
      yield* this.left.traverse();
    }
    if (this.right) {
      yield* this.right.traverse();
    }
  }
}

export class TernaryTree {
  constructor(
    public value: string,
    public left: TernaryTree | null = null,
    public middle: TernaryTree | null = null,
    public right: TernaryTree | null = null
  ) {}

  // This method is recursive, because it calls itself.
  // It's also a generator, because it uses the "yield" keyword.
  *traverse(): Generator<string> {
    yield this.value;
    if (this.left) {
      yield* this.left.traverse();
    }
    if (this.middle) {
      yield* this.middle.traverse();
    }
    if (this.right) {
      yield* this.right.traverse();
    }
  }
}

export class GenericTree {
  constructor(public value: string, public children: GenericTree[] = []) {}

  // This method is recursive, because it calls itself.
  // It's also a generator, because it uses the "yield" keyword.
  *traverse(): Generator<string> {
    yield this.value;
    for (const child of this.children) {
      yield* child.traverse();
    }
  }
}
