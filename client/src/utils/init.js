import store from "../store";

export function initFillLights() {
    const lightsConfig = store.state.lightsConfig;

    for (let num = 1; num <= lightsConfig.num; num++) {
        for (
            let typeIndex = 0;
            typeIndex < lightsConfig.types.length;
            typeIndex++
        ) {
            const light = {};
            light.index = num;
            light.type = lightsConfig.types[typeIndex];
            light.value = 0;
            light.state = false;
            light.row = num % 4 ? num % 4 : 4;

            store.dispatch("addLightToList", light);
        }
    }
}
