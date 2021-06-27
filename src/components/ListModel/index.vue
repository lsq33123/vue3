<template>
  <div class="top-wrap">
    <slot name="top"></slot>
  </div>
  <div class="center-wrap">
    <slot name="center"></slot>
  </div>
  <div class="bottom-wrap">
    <slot name="bottom"></slot>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.top-wrap {
  height: 50px;
  width: 100%;
}
.center-wrap {
  height: calc(100vh - 60px - 50px - 50px);
}
</style>
