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
            <!-- SETTINGS TAB -->
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
                            v-for="choice in config.cameraPositions"
                            :key="choice"
                            class="choice"
                            :class="{ 'choice--active': choice === pos }"
                            @click="switchPos(choice)"
                            >{{ choice }}</span
                        >
                    </div>
                </div>
                <div class="controller__field">
                    <p class="title">
                        Kierunek świecenia:
                    </p>
                    <div class="choices">
                        <span
                            v-for="choice in config.lightsTypes"
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
                <div class="controller__field">
                    <p class="title">
                        Sterowanie automatyczne:
                    </p>
                    <div class="choices">
                        <span
                            v-for="choice in config.autoAdjustLights"
                            :key="choice"
                            class="choice choice--md"
                            :class="{
                                'choice--active':
                                    (choice && areAllAuto) ||
                                    (!choice && noneIsAuto)
                            }"
                            @click="switchAutoAdjust(choice)"
                            >{{ choice ? "ON" : "OFF" }}</span
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
            <!-- LIGHTS TAB -->
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
                    <input
                        type="number"
                        :name="`light-${light.index}${light.type}`"
                        :id="`${light.index}${light.type}`"
                        v-model.lazy="light.value"
                        @focus="light.auto = false"
                        @change="updateVisualization"
                    /><span>%</span>
                </div>
            </div>
            <!-- SCENARIOS TAB -->
            <div
                v-else-if="tabs.scenarios"
                key="scenarios"
                class="controller__column controller__tab customYscroll"
            >
                <div class="controller__field">
                    Dostępne scenariusze:
                </div>
                <div
                    v-for="(scenario, index) in scenarios"
                    :key="index"
                    class="controller__field"
                >
                    <p class="title">{{ scenario.title }}</p>
                    <div class="choices">
                        <span
                            class="choice choice--wider choice--sm"
                            @click="chooseScenario(scenario.values)"
                            >WŁĄCZ</span
                        >
                    </div>
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
                lights: false,
                scenarios: false
            }
        };
    },
    computed: {
        config() {
            return this.$store.state.config;
        },
        pos() {
            return this.$store.state.pos;
        },
        direction() {
            return this.$store.state.direction;
        },
        lights() {
            return this.$store.state.lights;
        },
        scenarios() {
            return this.$store.state.scenarios;
        },
        lightLevel() {
            return this.$store.state.lightLevel;
        },
        areAllAuto() {
            return this.lights.every(el => el.auto === true);
        },
        noneIsAuto() {
            return this.lights.every(el => el.auto === false);
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
        toggleDir(dir) {
            this.$store.dispatch("toggleDir", dir);
        },
        switchAutoAdjust(value) {
            this.$store.dispatch("switchAutoAdjust", value);
        },
        resolveSrcPath(tab) {
            return require(`@/assets/img/svg/${tab}.svg`);
        },
        updateVisualization() {
            this.$store.dispatch("dashboard/showLoading", 500);
            this.$store.dispatch("updateVisualization");
        },
        chooseScenario(values) {
            this.$store.dispatch("dashboard/showLoading", 1500);
            this.$store.dispatch("chooseScenario", values);
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

    &--wider {
        width: 60px;
    }

    &--md {
        font-size: 1.1rem;
    }

    &--sm {
        font-size: 0.8rem;
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
    padding: 0.5rem;
    font-style: italic;

    & p {
        color: #aaa;
        font-size: 0.75rem;
        text-align: right;
    }
}
</style>
