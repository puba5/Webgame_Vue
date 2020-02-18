<template>
  <div>
    <div id="screen" v-bind:class="state" @click="onClickScreen">{{message}}</div>
    <div v-show="result.length">
      <div>평균 시간 : {{average}}ms</div>
      <button @click="onReset">리셋</button>
    </div>
  </div>
</template>

<script>
let startTime = 0;
let endTime = 0;
let timeout = null;
export default {
  data() {
    return {
      result: [],
      state: "waiting",
      message: "클릭하여 시작하세요"
    };
  },
  computed: {
    average() {
      return this.result.reduce((a, c) => a + c, 0) / this.result.length || 0;
    }
  },
  methods: {
    onReset() {
      this.result = [];
    },
    onClickScreen() {
      if (this.state === "waiting") {
        this.message = "초록색이 되면 클릭하세요";
        this.state = "ready";
        timeout = setTimeout(() => {
          this.state = "now";
          this.message = "지금 클릭하세요!!";
          startTime = new Date();
        }, Math.floor(Math.random() * 1000) + 2000);
      } else if (this.state === "ready") {
        clearTimeout(timeout);
        this.message = "너무 성급하시네요";
        this.state = "now";
      } else if (this.state === "now") {
        endTime = new Date();
        this.message = "클릭하여 시작하세요";
        this.state = "waiting";
        this.result.push(endTime - startTime);
      }
    }
  }
};
</script>

<style>
#screen {
  width: 300px;
  height: 200px;
  text-align: center;
  user-select: none;
}
#screen.waiting {
  background-color: aqua;
}
#screen.ready {
  background-color: red;
}
#screen.now {
  background-color: greenyellow;
}
</style>
