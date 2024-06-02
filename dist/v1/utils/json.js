"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeJson = void 0;
class JsonHelper {
    static deserializeAndFlatten(json) {
        const dict = {};
        const token = JSON.parse(json);
        JsonHelper.fillDictionaryFromJToken(dict, token, "");
        return dict;
    }
    static fillDictionaryFromJToken(dict, token, prefix) {
        switch (typeof token) {
            case 'object':
                if (Array.isArray(token)) {
                    for (let i = 0; i < token.length; i++) {
                        JsonHelper.fillDictionaryFromJToken(dict, token[i], JsonHelper.join(prefix, `E${i}`));
                    }
                }
                else {
                    for (const prop in token) {
                        if (token.hasOwnProperty(prop)) {
                            JsonHelper.fillDictionaryFromJToken(dict, token[prop], JsonHelper.join(prefix, prop));
                        }
                    }
                }
                break;
            default:
                dict[prefix] = token;
                break;
        }
    }
    static join(prefix, name) {
        return prefix ? `${prefix}.${name}` : name;
    }
}
const normalizeJson = (data) => {
    const jsonString = JSON.stringify(data);
    const flattened = JsonHelper.deserializeAndFlatten(jsonString);
    Object.keys(flattened).forEach(key => {
        if (flattened[key] && typeof flattened[key] === "string")
            flattened[key] = flattened[key].replace(/#/g, "##");
        else if (flattened[key] === null || flattened[key] === '')
            flattened[key] = "#";
    });
    const sortedObj = {};
    Object.keys(flattened).sort().forEach(item => {
        sortedObj[item] = flattened[item];
    });
    const normalized = Object.keys(sortedObj).map(x => sortedObj[x]).join("#");
    return normalized;
};
exports.normalizeJson = normalizeJson;
//# sourceMappingURL=json.js.map