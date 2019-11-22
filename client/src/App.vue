<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    mounted() {
        document.title = "Master's Thesis";
    },
    sockets: {
        connect() {
            console.log(
                `Connected to socket on port ${process.env
                    .VUE_APP_SOCKET_PORT || 5000}`
            );
        }
    }
};
</script>
