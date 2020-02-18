<template>
  <div>
    <table-component :table-data="tableData"/>
    <div v-if="!winner">{{turns}}의 차례입니다</div>
    <div v-if="winner">{{winner}}님이 승리하셨습니다!! 2초 뒤 새 게임이 시작됩니다</div>
  </div>
</template>
<script>
import TableComponent from "./TableComponent";
import EventBus from "./Eventbus";
export default {
  components: {
    TableComponent
  },
  data() {
    return {
      tableData: [["", "", ""], ["", "", ""], ["", "", ""]],
      turns: "O",
      winner: "",
      rowIndex: null,
      cellIndex: null
    };
  },
  methods: {
    onclickTd(rowIndex, cellIndex) {
      if (this.tableData[rowIndex][cellIndex] != "") {
        return;
      }
      this.$set(this.tableData[rowIndex], cellIndex, this.turns);
      var win = false;
      var all = true;
      if (
        this.tableData[0][cellIndex] == this.tableData[1][cellIndex] &&
        this.tableData[1][cellIndex] == this.tableData[2][cellIndex] &&
        this.tableData[2][cellIndex] == this.turns
      ) {
        win = true;
      }
      if (
        this.tableData[rowIndex][0] == this.tableData[rowIndex][1] &&
        this.tableData[rowIndex][1] == this.tableData[rowIndex][2] &&
        this.tableData[rowIndex][2] == this.turns
      ) {
        win = true;
      }
      if (
        this.tableData[0][0] == this.tableData[1][1] &&
        this.tableData[1][1] == this.tableData[2][2] &&
        this.tableData[0][0] == this.turns
      ) {
        win = true;
      }
      if (
        this.tableData[0][2] === this.tableData[1][1] &&
        this.tableData[1][1] == this.tableData[2][0] &&
        this.tableData[0][2] == this.turns
      ) {
        win = true;
      }
      if (win) {
        this.winner = this.turns;
        var timeout = setTimeout(() => {
          this.winner = "";
          this.turns = "O";
          this.tableData = [["", "", ""], ["", "", ""], ["", "", ""]];
        }, 2000);
      } else {
        this.tableData.forEach(row => {
          row.forEach(cell => {
            if (!cell) {
              all = false;
            }
          });
        });
        if (all) {
          //무승부인 경우
          this.winner = "";
          this.turns = "O";
          this.tableData = [["", "", ""], ["", "", ""], ["", "", ""]];
          return;
        }
      }

      this.turns = this.turns === "O" ? "X" : "O";
    }
  },
  created() {
    EventBus.$on("clickTd", this.onclickTd);
  },
  beforeDestory() {
    clearTimeout(timeout);
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
