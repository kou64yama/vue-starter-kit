<template functional>
  <div :class="$style.root">
    <div :class="$style.container">
      <a :class="$style.link" href="https://gitter.im/kou64yama/vue-starter-kit">
        Ask a question
      </a>
      <span :class="$style.spacer">|</span>
      <a :class="$style.link" href="https://github.com/kou64yama/vue-starter-kit/issues/new">
        Report an issue
      </a>
    </div>
  </div>
</template>

<style module src="./AppFeedback.css"></style>
