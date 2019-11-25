<template>
    <div class="controller">
        <div class="controller__menu" style="justify-content: flex-end;">
            <div
                v-for="(value, tab, index) in tabs"
                :key="index"
                class="controller__menu-item"
                :class="{ 'controller__menu-item--active': value }"
                @click="switchTab(tab)"
            >
                <img :src="resolveSrcPath(tab)" :alt="tab" />
            </div>
        </div>
        <transition name="fade" mode="out-in">
            <div
                v-if="tabs.settings"
                class="controller__column controller__tab"
                key="settings"
            >
                <div class="controller__field">
                    <p class="title">
                        Natężenie oświetlenia:
                    </p>
                    <p class="value">{{ lightLevel }} lx</p>
                </div>
                <div class="controller__field">
                    <p class="title">
                        Pozycja kamery:
                    </p>
                    <div class="choices">
                        <span
                            v-for="choice in envConfig.pos"
                            :key="choice"
                            class="choice"
                            :class="{ 'choice--active': choice === pos }"
                            @click="switchPos(choice)"
                            >{{ choice }}</span
                        >
                    </div>
                </div>
                <!-- <div class="controller__field">
                    <p class="title">
                        Pozycja słońca:
                    </p>
                    <div class="choices">
                        <span
                            v-for="choice in envConfig.sun"
                            :key="choice"
                            class="choice"
                            :class="{ 'choice--active': choice === sun }"
                            @click="switchSun(choice)"
                            >{{ choice }}</span
                        >
                    </div>
                </div> -->
                <div class="controller__field">
                    <p class="title">
                        Kierunek świecenia:
                    </p>
                    <div class="choices">
                        <span
                            v-for="choice in lightsConfig.types"
                            :key="choice"
                            class="choice"
                            :class="{
                                'choice--active':
                                    direction.indexOf(choice) !== -1
                            }"
                            @click="toggleDir(choice)"
                            >{{ choice }}</span
                        >
                    </div>
                </div>
                <div
                    class="controller__field btn btn--primary"
                    @click="updateVisualization"
                >
                    Odśwież wizualizację
                </div>
                <div class="author">
                    <p>Autor:</p>
                    Bartosz Kowalczyk
                </div>
            </div>
            <div
                v-else-if="tabs.lights"
                key="lights"
                class="controller__column controller__tab customYscroll"
            >
                <div class="controller__field">
                    Oprawy oświetleniowe:
                </div>
                <div
                    class="controller__field controller__field--light"
                    style="background-color: #bbb;"
                >
                    <p>Nr.</p>
                    <p>Typ</p>
                    <p>Poz.</p>
                </div>
                <div
                    v-for="(light, index) in lights"
                    :key="index"
                    class="controller__field controller__field--light"
                >
                    <p>{{ light.type === "D" ? light.index : "" }}</p>
                    <p>{{ light.type }}</p>
                    <p>{{ light.value * 250 }} lx</p>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tabs: {
                settings: true,
                lights: false
            }
        };
    },
    computed: {
        envConfig() {
            return this.$store.state.envConfig;
        },
        lightsConfig() {
            return this.$store.state.lightsConfig;
        },
        pos() {
            return this.$store.state.pos;
        },
        sun() {
            return this.$store.state.sun;
        },
        direction() {
            return this.$store.state.direction;
        },
        lights() {
            return this.$store.state.lights;
        },
        lightLevel() {
            return this.$store.state.lightLevel;
        }
    },
    methods: {
        switchTab(tabName) {
            Object.keys(this.tabs).forEach(tab => (this.tabs[tab] = false));
            this.tabs[tabName] = true;
        },
        switchPos(pos) {
            this.$store.dispatch("switchPos", pos);
        },
        switchSun(sun) {
            this.$store.dispatch("switchSun", sun);
        },
        toggleDir(dir) {
            this.$store.dispatch("toggleDir", dir);
        },
        resolveSrcPath(tab) {
            return require(`@/assets/img/svg/${tab}.svg`);
        },
        updateVisualization() {
            this.$store.dispatch("updateVisualization");
        }
    }
};
</script>

<style lang="scss" scoped>
.title {
    text-align: center;
    padding-bottom: 0.5rem;
    color: #777;
    border-bottom: 1px solid #bbb;
}

.value {
    font-size: 1.5rem;
    color: #333;
    padding-top: 0.5rem;
}

.choices {
    display: flex;
    justify-content: center;
    margin-top: 5px;
}

.choice {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    font-size: 1.5rem;
    color: #333;
    cursor: pointer;
    transition: background 0.3s ease;

    &--active {
        background-color: rgba(100, 100, 100, 0.5);
    }

    &:hover {
        background-color: rgba(180, 180, 180, 0.5);
    }

    &:not(:last-child) {
        margin-right: 0.5rem;
    }
}

.author {
    color: #888;
    align-self: center;
    margin-top: auto;
    padding: 0.5rem 0;

    & p {
        font-style: italic;
        color: #aaa;
        font-size: 0.75rem;
    }
}
</style>
