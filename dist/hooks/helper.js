"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapServiceWithCatch = void 0;
const wrapServiceWithCatch = (service) => {
    return service.catch((e) => Promise.reject(e.errors));
};
exports.wrapServiceWithCatch = wrapServiceWithCatch;
