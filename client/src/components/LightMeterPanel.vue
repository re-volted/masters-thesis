<template>
    <div class="panel">
        <h2>Light Meter Panel</h2>
        <span v-text="`${lightLevel} lux`"></span>
    </div>
</template>

<script>
export default {
    name: "LightMeterPanel",
    computed: {
        lightLevel() {
            return this.$store.state.lightLevel;
        }
    }
};
</script>
