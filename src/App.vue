<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/dark.scss';
body{
  height:100%;
  @include background_color("background_color5");
}
#app{
  min-width: 1000px;
}
</style>
