import { Version1 } from "../../types/version1";
class JsonHelper {
    public static deserializeAndFlatten(json: string): Version1.Dictionary<any> {
        const dict: Version1.Dictionary<any> = {};
        const token = JSON.parse(json);
        JsonHelper.fillDictionaryFromJToken(dict, token, "");
        return dict;
    }

    private static fillDictionaryFromJToken(
        dict: Version1.Dictionary<any>,
        token: any,
        prefix: string
    ): void {
        switch (typeof token) {
            case 'object':
                if (Array.isArray(token)) {
                    for (let i = 0; i < token.length; i++) {
                        JsonHelper.fillDictionaryFromJToken(
                            dict,
                            token[i],
                            JsonHelper.join(prefix, `E${i}`)
                        );
                    }
                } else {
                    for (const prop in token) {
                        if (token.hasOwnProperty(prop)) {
                            JsonHelper.fillDictionaryFromJToken(
                                dict,
                                token[prop],
                                JsonHelper.join(prefix, prop)
                            );
                        }
                    }
                }
                break;
            default:
                dict[prefix] = token;
                break;
        }
    }

    private static join(prefix: string, name: string): string {
        return prefix ? `${prefix}.${name}` : name;
    }
}

export const normalizeJson = (data: Version1.Dictionary<any>) => {
    const jsonString = JSON.stringify(data);
    const flattened = JsonHelper.deserializeAndFlatten(jsonString);

    Object.keys(flattened).forEach(key => {
        if (flattened[key] && typeof flattened[key] === "string") flattened[key] = flattened[key].replace(/#/g, "##")
        else if (flattened[key] === null || flattened[key] === '') flattened[key] = "#";
    })

    const sortedObj: Version1.Dictionary<string> = {};
    Object.keys(flattened).sort().forEach(item => {
        sortedObj[item] = flattened[item];
    });


    const normalized = Object.keys(sortedObj).map(x => sortedObj[x]).join("#")

    return normalized
}