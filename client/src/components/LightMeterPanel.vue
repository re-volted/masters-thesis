<template>
  <div class="panel">
    <h2>Light Meter Panel</h2>
    <span v-text="`${lightLevel} lux`"></span>
  </div>
</template>

<script>
export default {
  name: "LightMeterPanel",
  data() {
    return {
      lightLevel: 0
    };
  },
  sockets: {
    light(data) {
      this.lightLevel = +data;
      console.log("Data from Arduino Uno:", data);
    }
  }
};
</script>
