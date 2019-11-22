<template>
    <div class="home">
        <LightMeterPanel />
        <Visualization />
    </div>
</template>

<script>
// @ is an alias to /src
import LightMeterPanel from "@/components/LightMeterPanel.vue";
import Visualization from "@/components/Visualization.vue";

export default {
    name: "home",
    components: {
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
