"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataNotFoundException = void 0;
class DataNotFoundException extends Error {
    constructor(response) {
        super();
        this.response = response;
        this.initMessage();
    }
    initMessage() {
        if (this.response) {
            this.message = this.response;
        }
    }
}
exports.DataNotFoundException = DataNotFoundException;
//# sourceMappingURL=data-not-found.exception.js.map