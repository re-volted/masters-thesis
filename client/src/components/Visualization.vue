<template>
    <div
        class="visualization"
        :style="{
            backgroundImage:
                'url(' +
                require(`@/assets/renders/s0/poz${pos}/blank.jpg`) +
                ')'
        }"
    >
        <div
            class="visualization visualization__layer visualization__layer--day"
            :style="{
                backgroundImage:
                    'url(' +
                    require(`@/assets/renders/s${sun}/poz${pos}/blank.jpg`) +
                    ')'
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
        sun() {
            return this.$store.state.sun;
        },
        pos() {
            return this.$store.state.pos;
        },
        blankPath() {
            return `@/assets/renders/s${this.sun}/poz${this.pos}/blank.png`;
        }
    },
    methods: {
        buildPath(light) {
            return require(`@/assets/renders/s${this.sun}/poz${this.pos}/${light.index}${light.type}.jpg`);
        }
    }
};
</script>
