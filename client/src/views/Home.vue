<template>
  <div class="home">
    <LightMeterPanel />
  </div>
</template>

<script>
// @ is an alias to /src
import LightMeterPanel from "@/components/LightMeterPanel.vue";

export default {
  name: "home",
  components: {
    LightMeterPanel
  }
};
</script>
