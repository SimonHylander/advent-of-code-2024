export class Node<T> {
  constructor(public val: T, public next?: Node<T>) {}
}

export class DoublyNode<T> extends Node<T> {
  constructor(public val: T, public next?: DoublyNode<T>, public prev?: DoublyNode<T>) {
    super(val, next);
  }
}
