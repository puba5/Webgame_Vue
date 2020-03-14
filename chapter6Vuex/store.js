import Vue from "vue";
import Vuex from "vuex"; //vuex 라이브러리를 import한다
import "vue-use-vuex";

Vue.use(Vuex); // this.$store 생성

export const SETWINNER = "SETWINNER";
export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURE = "CHANGE_TURE";
export const RESET_GAME = "RESET_GAME";
export const NO_WINNER = "NO_WINNER";

export default new Vuex.Store({
  state: {
    tableData: [["", "", ""], ["", "", ""], ["", "", ""]],
    turns: "O",
    winner: ""
  }, //vue의 data와 비슷
  mutations: {
    [SETWINNER](state, winner) {
      state.winner = winner;
    },
    [CLICK_CELL](state, { row, cell }) {
      Vue.set(state.tableData[row], cell, state.turns);
    },
    [CHANGE_TURE](state) {
      state.turns = state.turns === "O" ? "X" : "O";
    },
    [RESET_GAME](state) {
      state.turns = "O";
      state.tableData = [["", "", ""], ["", "", ""], ["", "", ""]];
    },
    [NO_WINNER](state) {
      state.winner = "";
    }
  }, // state를 수정할 때 사용, 동기적으로 하나씩 혹은 하나의 그룹을 바꾼다
  getters: {}, // vue의 computed와 비슷
  actions: {} // 비동기를 사용할 때, 또는 여러 뮤테이션을 연달아 실행할 때
});
