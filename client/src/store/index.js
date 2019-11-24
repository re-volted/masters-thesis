import Vue from "vue";
import Vuex from "vuex";
import interfaceModule from "./interface";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        envConfig: {
            pos: [1, 2],
            sun: [0, 1]
        },
        lightLevel: 0,
        lightsConfig: {
            num: 8,
            types: ["D", "G"]
        },
        sun: 0,
        pos: 2,
        lightsList: [],
        lights: {}
    },
    mutations: {
        updateLightLevel(state, data) {
            const dataParsed = JSON.parse(data);
            state.lightLevel = dataParsed.light;
        },
        addLightToList(state, light) {
            state.lightsList.push(light);
        },
        addLightToStructure(state, light) {
            if (state.lights[light.index] === undefined) {
                state.lights[light.index] = {};
            }
            state.lights[light.index][light.type] = light;
        },
        switchPos(state, pos) {
            state.pos = pos;
        },
        switchSun(state, sun) {
            state.sun = sun;
        }
    },
    actions: {
        updateLightLevel(context, data) {
            context.commit("updateLightLevel", data);
        },
        addLightToList(context, light) {
            context.commit("addLightToList", light);
        },
        addLightToStructure(context, light) {
            context.commit("addLightToStructure", light);
        },
        switchPos(context, pos) {
            context.commit("showLoading", 1000);
            context.commit("switchPos", pos);
        },
        switchSun(context, sun) {
            context.commit("showLoading", 500);
            context.commit("switchSun", sun);
        }
    },
    modules: { interfaceModule }
});
