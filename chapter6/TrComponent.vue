<template>
  <tr>
    <td-component
      v-for="(cellData, index) in rowData"
      :row-data="rowData"
      :row-index="rowIndex"
      :cell-data="cellData"
      :cell-index="index"
      :key="index"
    ></td-component>
  </tr>
</template>

<script>
import TdComponent from "./TdComponent";

export default {
  components: {
    TdComponent
  },
  props: {
    rowData: Array,
    rowIndex: Number
  }
};
</script>

