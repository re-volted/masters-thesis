import Vue from "vue";
import Vuex from "vuex";
import dashboard from "./dashboard";
import { updateLightsValues } from "../utils/lights";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        config: {
            cameraPositions: [1, 2],
            lightsNum: 8,
            lightsTypes: ["D", "G"],
            autoAdjustLights: [true, false]
        },
        sunLevel: 1,
        pos: 1,
        direction: ["D"],
        lights: [],
        lightLevel: 0,
        currentScenario: -1,
        scenarios: [
            {
                title: "Sala konferencyjna",
                values: [
                    0,
                    100,
                    0,
                    50,
                    0,
                    50,
                    0,
                    100,
                    0,
                    100,
                    0,
                    50,
                    0,
                    50,
                    0,
                    100
                ]
            },
            {
                title: "Zajęcia na środku sali",
                values: [
                    50,
                    0,
                    100,
                    0,
                    100,
                    0,
                    50,
                    0,
                    50,
                    0,
                    100,
                    0,
                    100,
                    0,
                    50,
                    0
                ]
            }
        ]
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
        toggleDir(state, dir) {
            const dirIndex = state.direction.indexOf(dir);

            dirIndex === -1
                ? state.direction.push(dir)
                : state.direction.splice(dirIndex, 1);
        },
        switchAutoAdjust(state, value) {
            if (value) {
                state.lights.forEach(light => (light.auto = true));
                console.log("switched on auto");
            } else {
                state.lights.forEach(light => (light.auto = false));
                console.log("switched off auto");
            }
        },
        chooseScenario(state, values) {
            state.lights.forEach((light, index) => {
                light.value = values[index];
            });

            setTimeout(() => {
                this._vm.$socket.client.emit("updateRealLights", values);
            }, 1100);
        },
        updateVisualization(state) {
            console.log("updated");
            const lightsValues = updateLightsValues(state.lightLevel);

            for (let i = 0; i < lightsValues.length; i++) {
                state.lights[i].value = lightsValues[i];
            }

            this._vm.$socket.client.emit("updateRealLights", lightsValues);
        }
    },
    actions: {
        updateLightLevel({ commit }, data) {
            commit("updateLightLevel", data);
        },
        addLightToList({ commit }, light) {
            commit("addLightToList", light);
        },
        switchPos({ commit }, pos) {
            commit("showLoading", 500);
            commit("switchPos", pos);
        },
        toggleDir({ commit }, dir) {
            commit("toggleDir", dir);
            commit("updateVisualization");
        },
        switchAutoAdjust({ commit }, value) {
            commit("switchAutoAdjust", value);
            commit("updateVisualization");
        },
        chooseScenario({ commit }, values) {
            commit("switchAutoAdjust", false);
            commit("chooseScenario", values);
        },
        updateVisualization({ commit }) {
            commit("updateVisualization");
        }
    },
    modules: { dashboard }
});
