<template>
  <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
export default {
  props: {
    cellData: String,
    rowIndex: Number,
    cellIndex: Number
  },
  methods: {
    onClickTd() {
      let rootData = this.$root.$data;

      if (rootData.tableData[this.rowIndex][this.cellIndex] != "") {
        return;
      }
      this.$set(
        rootData.tableData[this.rowIndex],
        this.cellIndex,
        rootData.turns
      );
      var win = false;
      var all = true;
      if (
        rootData.tableData[0][this.cellIndex] ==
          rootData.tableData[1][this.cellIndex] &&
        rootData.tableData[1][this.cellIndex] ==
          rootData.tableData[2][this.cellIndex] &&
        rootData.tableData[2][this.cellIndex] == rootData.turns
      ) {
        win = true;
      }
      if (
        rootData.tableData[this.rowIndex][0] ==
          rootData.tableData[this.rowIndex][1] &&
        rootData.tableData[this.rowIndex][1] ==
          rootData.tableData[this.rowIndex][2] &&
        rootData.tableData[this.rowIndex][2] == rootData.turns
      ) {
        win = true;
      }
      if (
        rootData.tableData[0][0] == rootData.tableData[1][1] &&
        rootData.tableData[1][1] == rootData.tableData[2][2] &&
        rootData.tableData[0][0] == rootData.turns
      ) {
        win = true;
      }
      if (
        rootData.tableData[0][2] === rootData.tableData[1][1] &&
        rootData.tableData[1][1] == rootData.tableData[2][0] &&
        rootData.tableData[0][2] == rootData.turns
      ) {
        win = true;
      }
      if (win) {
        rootData.winner = rootData.turns;
        rootData.turns = "O";
        rootData.tableData = [["", "", ""], ["", "", ""], ["", "", ""]];
      } else {
        rootData.tableData.forEach(row => {
          row.forEach(cell => {
            if (!cell) {
              all = false;
            }
          });
        });
        if (all) {
          //무승부인 경우
          rootData.winner = "";
          rootData.turns = "O";
          rootData.tableData = [["", "", ""], ["", "", ""], ["", "", ""]];
        }
      }

      rootData.turns = rootData.turns === "O" ? "X" : "O";
    }
  }
};
</script>
