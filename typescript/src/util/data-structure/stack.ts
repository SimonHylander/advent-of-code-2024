export class Stack {
  private _stack: any[] = [];

  public push(item: any) {
    this._stack.push(item);
  }

  public pop(): any {
    return this._stack.pop();
  }

  public isEmpty(): boolean {
    return this._stack.length === 0;
  }

  public peek(): any {
    return !this.isEmpty() ? this._stack[this._stack.length - 1] : undefined;
  }

  public length(): number {
    return this._stack.length;
  }

  public clear() {
    this._stack = [];
  }

  public print() {
    console.log(this._stack);
  }
}
