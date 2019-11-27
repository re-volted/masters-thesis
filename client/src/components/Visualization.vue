<template>
    <div
        class="visualization"
        :style="{
            backgroundImage:
                'url(' + require(`@/assets/renders/poz${pos}/sun0.jpg`) + ')'
        }"
    >
        <div
            class="visualization visualization__layer visualization__layer--day"
            :style="{
                backgroundImage:
                    'url(' +
                    require(`@/assets/renders/poz${pos}/sun${sunValue}.jpg`) +
                    ')',
                opacity: lightLevel / 700
            }"
        />
        <div
            class="visualization visualization__layer"
            v-for="(light, index) in lights"
            :key="index"
            :style="{
                backgroundImage: `url(${buildPath(light)})`,
                opacity: light.value
            }"
        />
        <Loading />
    </div>
</template>

<script>
import Loading from "@/components/Loading";

export default {
    components: {
        Loading
    },
    computed: {
        lights() {
            return this.$store.state.lights;
        },
        lightLevel() {
            return this.$store.state.lightLevel;
        },
        sunValue() {
            return this.lightLevel < 700 ? 1 : 2;
        },
        pos() {
            return this.$store.state.pos;
        }
    },
    methods: {
        buildPath(light) {
            return require(`@/assets/renders/poz${this.pos}/${light.index}${light.type}.jpg`);
        }
    }
};
</script>
