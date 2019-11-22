import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        lightLevel: 0
    },
    mutations: {
        updateLightLevel(state, data) {
            const dataParsed = JSON.parse(data);
            state.lightLevel = dataParsed.light;
        }
    },
    actions: {},
    modules: {}
});
