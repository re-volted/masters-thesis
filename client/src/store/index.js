import Vue from "vue";
import Vuex from "vuex";
import dashboard from "./dashboard";
import { updateLightsValues, mapLightsLevels } from "../utils/lights";

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
            },
            {
                title: "Oświetlenie wyłączone",
                values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                title: "Prezentacja multimedialna",
                values: [0, 35, 0, 35, 0, 35, 0, 35, 0, 35, 0, 35, 0, 35, 0, 35]
            }
        ]
    },
    mutations: {
        updateLightLevel(state, data) {
            const dataParsed = JSON.parse(data.split("}")[0] + "}");
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
            } else {
                state.lights.forEach(light => (light.auto = false));
            }
        },
        chooseScenario(state, values) {
            state.lights.forEach((light, index) => {
                light.value = values[index];
            });

            setTimeout(() => {
                this._vm.$socket.client.emit(
                    "updateRealLights",
                    mapLightsLevels(values)
                );
            }, 2000);
        },
        manualSetLight(state, index, value) {
            const light = state.lights[index];

            light.auto = false;
            light.value = value > 100 ? 100 : value;
        },
        updateVisualization(state) {
            const lightsValues = updateLightsValues(state.lightLevel);

            for (let i = 0; i < lightsValues.length; i++) {
                state.lights[i].value = lightsValues[i];
            }

            this._vm.$socket.client.emit(
                "updateRealLights",
                mapLightsLevels(lightsValues)
            );
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
            commit("dashboard/showLoading", 500);
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
        manualSetLight({ commit }, index, value) {
            commit("manualSetLight", index, value);
            commit("updateVisualization");
        },
        updateVisualization({ commit }) {
            commit("updateVisualization");
        }
    },
    modules: { dashboard }
});
