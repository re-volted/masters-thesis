<template>
    <div v-show="loading" class="loading">
        <img :src="resolveSrcPath" alt="loading-spinner" />
    </div>
</template>

<script>
export default {
    computed: {
        resolveSrcPath() {
            return require(`@/assets/img/svg/loading.svg`);
        },
        loading() {
            return this.$store.state.dashboard.loading;
        }
    }
};
</script>

<style></style>
