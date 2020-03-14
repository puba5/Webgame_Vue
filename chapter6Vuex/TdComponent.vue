<template>
  <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
import EventBus from "./Eventbus";
import {
  CLICK_CELL,
  SETWINNER,
  CHANGE_TURE,
  RESET_GAME,
  NO_WINNER
} from "./store";
export default {
  props: {
    rowIndex: Number,
    cellIndex: Number
  },
  computed: {
    cellData() {
      return this.$store.state.tableData[this.rowIndex][this.cellIndex];
    },
    tableData() {
      return this.$store.state.tableData;
    },
    turns() {
      return this.$store.state.turns;
    }
  },
  methods: {
    onClickTd() {
      if (this.tableData[this.rowIndex][this.cellIndex] != "") {
        return;
      }
      this.$store.commit(CLICK_CELL, {
        row: this.rowIndex,
        cell: this.cellIndex
      });
      this.$set(this.tableData[this.rowIndex], this.cellIndex, this.turns);
      var win = false;
      var all = true;
      if (
        this.tableData[0][this.cellIndex] ==
          this.tableData[1][this.cellIndex] &&
        this.tableData[1][this.cellIndex] ==
          this.tableData[2][this.cellIndex] &&
        this.tableData[2][this.cellIndex] == this.turns
      ) {
        win = true;
      }
      if (
        this.tableData[this.rowIndex][0] == this.tableData[this.rowIndex][1] &&
        this.tableData[this.rowIndex][1] == this.tableData[this.rowIndex][2] &&
        this.tableData[this.rowIndex][2] == this.turns
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
        this.$store.commit(SETWINNER, this.turns);
        var timeout = setTimeout(() => {
          this.$store.commit(RESET_GAME);
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
          this.$store.commit(NO_WINNER);
          //무승부인 경우
          this.$store.commit(RESET_GAME);

          return;
        }
      }
      this.$store.commit(CHANGE_TURE);
    },
    beforeDestory() {
      clearTimeout(timeout);
    }
  }
};
</script>
