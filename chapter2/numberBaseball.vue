<template>
  <div>
    <h2>{{result}}</h2>
    <form v-on:submit="onSubmitForm">
      <input ref="answer" minlength="4" maxlength="4" v-model="value">
      <button>입력</button>
    </form>
    <form @submit.prevent="onGiveupBtn">
      <button type="submit">포기</button>
    </form>
    <div>시도 : {{tries.length}}</div>
    <ul>
      <li v-for="t in tries" v-bind:key="t">{{t}}</li>
    </ul>
  </div>
</template>

<script>
const getNumbers = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

export default {
  data() {
    return {
      answer: getNumbers(),
      tries: [],
      value: "",
      result: ""
    };
  },
  methods: {
    onGiveupBtn() {
      this.tries = [];
      alert(`포기하셔서 다음 게임을 시작합니다!! 답은 ${this.answer}`);
      this.result = "포기하셨군요 ㅠㅠ 답은" + this.answer + "였습니다";
      this.answer = getNumbers();
    },
    onSubmitForm(e) {
      e.preventDefault();
      if (this.value === this.answer.join("")) {
        this.tries.push({
          t: this.value,
          result: "홈런"
        });
        this.tries = [];
        alert("다음 게임을 시작합니다");
        this.result = "홈런";
        this.answer = getNumbers();
      } else {
        if (this.tries.length >= 9) {
          this.tries = [];
          alert(`10번 틀려서 다음 게임을 시작합니다!! 답은 ${this.answer}`);
          this.result = "틀렸습니다!! 답은" + this.answer + "였습니다";
          this.answer = getNumbers();
        } else {
          let strike = 0;
          let ball = 0;
          const answerArray = this.value.split("").map(v => parseInt(v));
          for (let i = 0; i < 4; i++) {
            if (answerArray[i] == this.answer[i]) {
              strike++;
            } else if (this.answer.includes(answerArray[i])) {
              ball++;
            }
          }
          this.tries.push({
            try: this.value,
            result: `${strike} 스트라이크, ${ball} 볼`
          });
        }
      }
      this.value = "";
      this.$refs.answer.focus();
    }
  }
};
</script>

<style>
</style>
