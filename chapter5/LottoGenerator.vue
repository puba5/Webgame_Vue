<template>
  <div>
    <div>당첨 숫자</div>
    <div id="결과창">
      <lotto-ball v-for="ball in winBalls" v-bind:number="ball" v-bind:key="ball"></lotto-ball>
    </div>
    <div>보너스</div>
    <div v-if="redo">
      <lotto-ball v-bind:number="bonus"></lotto-ball>
      <button @click="onClickRedo">한 번 더!</button>
    </div>
  </div>
</template>

<script>
import LottoBall from "./LottoBall";

function getWinNumbers() {
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const timeout = [];
export default {
  components: {
    "lotto-ball": LottoBall
  },
  data() {
    return {
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false
    };
  },
  computed: {},
  methods: {
    onClickRedo() {
      this.winNumbers = getWinNumbers();
      this.winBalls = [];
      this.bonus = null;
      this.redo = false;
    },
    showBalls() {
      for (let i = 0; i < this.winNumbers.length - 1; i++) {
        timeout[i] = setTimeout(() => {
          this.winBalls.push(this.winNumbers[i]);
        }, 1000 * (i + 1));
      }
      timeout[6] = setTimeout(() => {
        this.bonus = this.winNumbers[6];
        this.redo = true;
      }, 7000);
    }
  },
  watch: "",
  mounted() {
    this.showBalls();
  },
  beforeDestory() {
    timeout.forEach(t => {
      clearTimeout(t);
    });
  },
  watch: {
    winBalls(val, oldVal) {
      if (val.length === 0) {
        this.showBalls();
      }
    }
  }
};
</script>

<style>
</style>
