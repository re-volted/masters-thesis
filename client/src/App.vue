<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import { initFillLights } from "./utils/init";

export default {
    mounted() {
        document.title = "Master's Thesis";
        initFillLights();
        this.$store.dispatch("updateVisualization");
    },
    sockets: {
        connect() {
            console.log(
                `Connected to socket on port ${process.env
                    .VUE_APP_SOCKET_PORT || 5000}`
            );
        },
        disconnect() {
            console.log(
                `Socket disconnected from port ${process.env
                    .VUE_APP_SOCKET_PORT || 5000}`
            );
        }
    }
};
</script>
