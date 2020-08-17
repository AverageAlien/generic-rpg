"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputService = void 0;
class InputService {
    constructor() {
        this.inputs = {
            up: 'W',
            down: 'S',
            left: 'A',
            right: 'D'
        };
    }
    getInputKeys(keyboard) {
        return {
            up: keyboard.addKey(this.inputs.up),
            down: keyboard.addKey(this.inputs.down),
            left: keyboard.addKey(this.inputs.left),
            right: keyboard.addKey(this.inputs.right),
        };
    }
}
exports.InputService = InputService;
