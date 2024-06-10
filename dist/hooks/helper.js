"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertParamsToArray = exports.wrapServiceWithCatch = void 0;
const wrapServiceWithCatch = (service) => {
    return service.catch((e) => Promise.reject(e.errors));
};
exports.wrapServiceWithCatch = wrapServiceWithCatch;
function convertParamsToArray(params) {
    if (params === undefined) {
        return [];
    }
    return Object.keys(params)
        .map((key) => {
        const typedKey = key;
        return typedKey in params ? params[typedKey] : null;
    })
        .filter(Boolean);
}
exports.convertParamsToArray = convertParamsToArray;
