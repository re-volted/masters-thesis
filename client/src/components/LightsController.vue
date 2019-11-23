<template>
    <div v-if="false" class="controller">
        <div class="controller__header">
            <div class="controller__item">
                Light no.
            </div>
            <div class="controller__item">
                State down
            </div>
            <div class="controller__item">
                State up
            </div>
        </div>
        <div
            class="controller__content"
            v-for="(light, index) in lights"
            :key="index"
        >
            <div class="controller__item">
                {{ light.index }}
            </div>
            <div class="controller__item">
                {{ light.state }}
            </div>
            <div class="controller__item">
                {{ light.value }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        lights() {
            return this.$store.state.lights;
        }
    }
};
</script>

<style></style>
