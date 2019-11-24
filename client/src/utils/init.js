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
            light.value = +Math.random().toFixed(2);
            light.state = false;

            store.dispatch("addLightToList", light);
            // store.dispatch("addLightToStructure", light);
        }
    }
}
