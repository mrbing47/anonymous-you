class Queue {
	constructor() {
		this.elements = [];
	}
	enqueue(e) {
		this.elements.push(e);
	}
	dequeue() {
		return this.elements.shift();
	}
	dequeueById(id) {
		const delete_idx = this.elements.findIndex((userId) => userId == id);
		if (delete_idx != -1) this.elements.splice(delete_idx, 1);
	}
	isEmpty() {
		return this.elements.length == 0;
	}
	peek() {
		return !this.isEmpty() ? this.elements[0] : undefined;
	}
	length() {
		return this.elements.length;
	}
}

module.exports = Queue;
