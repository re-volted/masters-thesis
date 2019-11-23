<template>
    <div class="home">
        <LightsController />
        <LightMeterPanel />
        <Visualization />
    </div>
</template>

<script>
import LightsController from "@/components/LightsController.vue";
import LightMeterPanel from "@/components/LightMeterPanel.vue";
import Visualization from "@/components/Visualization.vue";

export default {
    name: "home",
    components: {
        LightsController,
        LightMeterPanel,
        Visualization
    },
    sockets: {
        light(data) {
            this.$store.commit("updateLightLevel", data);
        }
    }
};
</script>
