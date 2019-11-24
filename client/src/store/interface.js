export default {
    namespaced: false,
    state: {
        loading: false
    },
    mutations: {
        showLoading(state, time) {
            state.loading = true;
            setTimeout(() => {
                state.loading = false;
            }, time);
        }
    },
    actions: {
        showLoading(context, time) {
            context.commit("showLoading", time);
        }
    }
};
