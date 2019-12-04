import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSocketIOExt from "vue-socket.io-extended";
import $socket from "./utils/socketServer";

Vue.config.productionTip = false;

// Loading styles
require("./assets/scss/main.scss");

Vue.use(VueSocketIOExt, $socket, {
    store,
    format: "json",
    reconnection: true, // (Boolean) whether to reconnect automatically
    reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
    reconnectionDelay: 3000 // (Number) how long to initially wait before attempting a new
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
