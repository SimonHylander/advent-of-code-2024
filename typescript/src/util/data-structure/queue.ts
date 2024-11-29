export class Queue {
  private _queue: any[] = [];

  public enqueue(item: any) {
    this._queue.push(item);
  }

  public dequeue(): any {
    return this._queue.shift();
  }

  public isEmpty(): boolean {
    return this._queue.length === 0;
  }

  public peek(): any {
    return !this.isEmpty() ? this._queue[0] : undefined;
  }

  public length(): number {
    return this._queue.length;
  }

  public clear() {
    this._queue = [];
  }

  public print() {
    console.log(this._queue);
  }
}

export class PriorityQueue {
  private _queue: any[] = [];

  public enqueue(item: any, priority: number) {
    const queueElement = { item, priority };
    let added = false;
    for (let i = 0; i < this._queue.length; i++) {
      if (queueElement.priority < this._queue[i].priority) {
        this._queue.splice(i, 0, queueElement);
        added = true;
        break;
      }
    }
    if (!added) {
      this._queue.push(queueElement);
    }
  }

  public dequeue(): any {
    return this._queue.shift();
  }

  public isEmpty(): boolean {
    return this._queue.length === 0;
  }

  public peek(): any {
    return !this.isEmpty() ? this._queue[0] : undefined;
  }

  public length(): number {
    return this._queue.length;
  }

  public clear() {
    this._queue = [];
  }

  public print() {
    console.log(this._queue);
  }
}
