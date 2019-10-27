<template>
  <div>
    <input type="text" v-model="someData" />
    <button @click="clickButton(someData)">Click</button>
  </div>
</template>

<script>
export default {
  name: "LightMeterPanel",
  data() {
    return {
      someData: ""
    };
  },
  methods: {
    clickButton(data) {
      // dummy method for testing socket connection
      this.$socket.emit("sendData", data);
      this.someData = "";
    }
  }
};
</script>
