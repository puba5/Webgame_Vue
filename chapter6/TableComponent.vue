<template>
  <table>
    <tr-component
      v-for="(rowData,index) in tableData"
      :row-data="rowData"
      :row-index="index"
      :key="index"
    ></tr-component>
  </table>
</template>

<script>
import TrComponent from "./TrComponent";

export default {
  props: {
    tableData: Array
  },
  components: {
    TrComponent
  }
};
</script>

<style>
</style>
