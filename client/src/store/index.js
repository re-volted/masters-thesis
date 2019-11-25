import Vue from "vue";
import Vuex from "vuex";
import interfaceModule from "./interface";
import { updateLightsValues } from "../utils/lights";

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
        sunValue: 1,
        sun: 0,
        pos: 2,
        direction: ["D"],
        lights: []
    },
    mutations: {
        updateLightLevel(state, data) {
            const dataParsed = JSON.parse(data);
            state.lightLevel = dataParsed.light;
        },
        addLightToList(state, light) {
            state.lights.push(light);
        },
        switchPos(state, pos) {
            state.pos = pos;
        },
        switchSun(state, sun) {
            state.sun = sun;
        },
        toggleDir(state, dir) {
            const dirIndex = state.direction.indexOf(dir);

            dirIndex === -1
                ? state.direction.push(dir)
                : state.direction.splice(dirIndex, 1);
        },
        updateVisualization(state) {
            const lightsValues = updateLightsValues(state.lightLevel);
            for (let i = 0; i < lightsValues.length; i++) {
                state.lights[i].value = lightsValues[i];
            }
        }
    },
    actions: {
        updateLightLevel(context, data) {
            context.commit("updateLightLevel", data);
        },
        addLightToList(context, light) {
            context.commit("addLightToList", light);
        },
        switchPos(context, pos) {
            context.commit("showLoading", 500);
            context.commit("switchPos", pos);
        },
        switchSun(context, sun) {
            context.commit("showLoading", 500);
            context.commit("switchSun", sun);
        },
        toggleDir(context, dir) {
            context.commit("toggleDir", dir);
            context.commit("updateVisualization");
        },
        updateVisualization(context) {
            context.commit("updateVisualization");
        }
    },
    modules: { interfaceModule }
});
