<template>
  <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
import EventBus from "./Eventbus";
export default {
  props: {
    cellData: String,
    rowIndex: Number,
    cellIndex: Number
  },
  methods: {
    onClickTd() {
      EventBus.$emit("clickTd", this.rowIndex, this.cellIndex);
      console.log("send");
    }
  }
};
</script>
