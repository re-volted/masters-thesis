<template>
    <div
        class="visualization visualization__base"
        :style="{
            backgroundImage: `url(${blankPath})`
        }"
    >
        <div
            class="visualization visualization__layer"
            v-for="light in lights"
            :key="light.index"
            :style="{
                backgroundImage: `url(${buildPath(light)})`
            }"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            sun: 0,
            position: 2,
            type: "D",
            indexes: [1, 2, 3, 4, 5, 6, 7, 8]
        };
    },
    methods: {
        blankPath() {
            return require(`../assets/renders/s${this.sun}/poz${this.position}/blank.png`);
        },
        buildPath(light) {
            return require(`../assets/renders/s${this.sun}/poz${this.position}/${light.index}${light.type}.jpg`);
        }
    },
    computed: {
        lights() {
            return this.indexes.map(i => {
                return {
                    index: i,
                    type: this.type
                };
            });
        }
    }
};
</script>
