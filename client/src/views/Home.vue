<template>
    <div class="home">
        <Visualization />
        <LightsController />
    </div>
</template>

<script>
import LightsController from "@/components/LightsController.vue";
import Visualization from "@/components/Visualization.vue";

export default {
    name: "home",
    mounted() {
        this.$store.dispatch("showLoading", 1000);
    },
    components: {
        LightsController,
        Visualization
    },
    sockets: {
        light(data) {
            this.$store.dispatch("updateLightLevel", data);
        }
    }
};
</script>
