import store from "../store";

export function initFillLights() {
    const config = store.state.config;

    for (let num = 1; num <= config.lightsNum; num++) {
        for (
            let typeIndex = 0;
            typeIndex < config.lightsTypes.length;
            typeIndex++
        ) {
            const light = {};
            light.index = num;
            light.type = config.lightsTypes[typeIndex];
            light.value = 0;
            light.auto = true;
            light.row = num % 4 ? num % 4 : 4;

            store.dispatch("addLightToList", light);
        }
    }
}
