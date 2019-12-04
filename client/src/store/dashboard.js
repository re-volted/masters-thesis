export default {
    namespaced: true,
    state: {
        loading: false
    },
    mutations: {
        showLoading(state, duration) {
            state.loading = true;
            setTimeout(() => {
                state.loading = false;
            }, duration);
        }
    },
    actions: {
        showLoading({ commit }, duration) {
            commit("showLoading", duration);
        }
    }
};
