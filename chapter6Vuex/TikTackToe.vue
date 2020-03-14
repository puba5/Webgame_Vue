<template>
  <div>
    <table-component :table-data="tableData"/>
    <div v-if="!winner">{{turns}}의 차례입니다</div>
    <div v-if="winner">{{winner}}님이 승리하셨습니다!! 2초 뒤 새 게임이 시작됩니다</div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import store from "./store";
import TableComponent from "./TableComponent";
import EventBus from "./Eventbus";
export default {
  store,
  components: {
    TableComponent
  },
  computed: {
    ...mapState(["winner", "turns"])
    // winner() {
    //   return this.$store.state.winner;
    // },
    // turns() {
    //   return this.$store.state.turns;
    // }
  },
  data() {
    return {
      tableData: [["", "", ""], ["", "", ""], ["", "", ""]]
    };
  },
  methods: {
    onclickTd(rowIndex, cellIndex) {}
  },
  created() {}
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
