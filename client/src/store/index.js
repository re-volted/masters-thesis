import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        lightLevel: 0,
        lightsConfig: {
            num: 8,
            types: ["D", "G"]
        },
        sun: 0,
        pos: 2,
        lights: []
    },
    mutations: {
        updateLightLevel(state, data) {
            const dataParsed = JSON.parse(data);
            state.lightLevel = dataParsed.light;
        },
        addLight(state, light) {
            state.lights.push(light);
        }
    },
    actions: {},
    modules: {}
});
