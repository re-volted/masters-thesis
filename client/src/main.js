import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSocketIO from "vue-socket.io";

Vue.config.productionTip = false;

// Loading styles
require("./assets/scss/main.scss");

Vue.use(
    new VueSocketIO({
        debug: true,
        connection: `http://localhost:${process.env.VUE_APP_SOCKET_PORT ||
            3000}`,
        vuex: {
            store,
            actionPrefix: "SOCKET_",
            mutationPrefix: "SOCKET_"
        }
    })
);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
