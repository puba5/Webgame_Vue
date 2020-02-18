<template>
  <div>
    <table-component :table-data="tableData"/>
    <div v-if="!winner">{{turns}}의 차례입니다</div>
    <div v-if="winner">{{winner}}님의 승리입니다</div>
  </div>
</template>
<script>
import TableComponent from "./TableComponent";
export default {
  components: {
    TableComponent
  },
  data() {
    return {
      tableData: [["", "", ""], ["", "", ""], ["", "", ""]],
      turns: "O",
      winner: ""
    };
  }
};
</script>

<style>
table {
  border-collapse: collapse;
}
td {
  border: 1px solid black;
  width: 40px;
  height: 40px;
  text-align: center;
}
</style>
