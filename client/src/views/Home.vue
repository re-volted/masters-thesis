<template>
    <div class="home">
        <div class="dashboard">
            <div class="dashboard__header">
                <p>Dashboard</p>
                <div class="dashboard__time">
                    <p>{{ currentTime.time }}</p>
                    <p>{{ currentTime.date }}</p>
                </div>
            </div>
            <Visualization />
        </div>
        <LightsController />
    </div>
</template>

<script>
import LightsController from "@/components/LightsController.vue";
import Visualization from "@/components/Visualization.vue";

export default {
    name: "home",
    data() {
        return {
            currentTime: {
                time: "",
                date: "",
                interval: 0
            }
        };
    },
    mounted() {
        this.$store.dispatch("showLoading", 1000);
        this.clockInterval();
    },
    beforeDestroy() {
        clearInterval(this.currentTime.interval);
    },
    components: {
        LightsController,
        Visualization
    },
    methods: {
        clockInterval() {
            this.updateClock();
            this.currentTime.interval = setTimeout(this.clockInterval, 1000);
        },
        updateClock() {
            this.currentTime.time = new Date().toLocaleTimeString("pl");
            this.currentTime.date = new Date().toLocaleDateString("pl");
        }
    },
    sockets: {
        light(data) {
            this.$store.dispatch("updateLightLevel", data);
            this.$store.dispatch("updateVisualization");
        }
    }
};
</script>
