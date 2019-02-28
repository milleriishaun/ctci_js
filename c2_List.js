class List {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(value) {
    const node = { value: value, next: null };
    if (!this.head) this.head = node;
    if (this.tail) this.tail.next = node;

    this.tail = node;
  }

  removeHead() {
    const temp = this.head;
    this.head = this.head.next;
    return temp;
  }

  print() {
    let current = this.head;
    console.log(current.value);

    while (current.next) {
      console.log(current.next.value);
      current = current.next;
    }
  }

  find(value) {
    let current = this.head;

    while (current) {
      if (current.value === value) return current;

      current = current.next;
    }

    return null;
  }
}

module.exports = List;
