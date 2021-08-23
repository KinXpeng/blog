<template>
  <div class="container-right">
    <!-- duration-time -->
    <duration-time></duration-time>
    <!-- music -->
    <music></music>
    <!-- hot-articles -->
    <hot-articles ref="rightCom"></hot-articles>
  </div>
</template>

<script>
import durationTime from './durationTime.vue';
import HotArticles from './hotArticles.vue';
import Music from './music.vue';
export default {
  components: { durationTime, Music, HotArticles },
  data() {
    return {
      scrollAction:{
        x: 'undefined',
        y: 'undefined'
      },
      scrollDirection:null,
    };
  },
  methods:{
    // 处理滚动
    handleScroll(){
      let rightNode = this.$refs.rightCom.$el;
      let scrollT = document.documentElement.scrollTop;
      this.scrollFunc();
      if(scrollT >= 159){
        rightNode.style.position = "absolute";
        rightNode.style.top = scrollT + "px";
      }else if(scrollT > 159 && scrollT <= 167){
        leftNode.style.position = "relative";
        leftNode.style.top = scrollT + 8 + "px";
      }else{
        rightNode.style.position = "relative";
        rightNode.style.top = 0;
      }
    },
    scrollFunc() {
      if (typeof this.scrollAction.x == 'undefined') {
        this.scrollAction.x = window.pageXOffset;
        this.scrollAction.y = window.pageYOffset;
      }
      var diffX = this.scrollAction.x - window.pageXOffset;
      var diffY = this.scrollAction.y - window.pageYOffset;
      if (diffX < 0) {
        // Scroll right
        this.scrollDirection = 'right';
      } else if (diffX > 0) {
        // Scroll left
        this.scrollDirection = 'left';
      } else if (diffY < 0) {
        // Scroll down
        this.scrollDirection = 'down';
      } else if (diffY > 0) {
        // Scroll up
        this.scrollDirection = 'up';
      } else {
        // First scroll event
      }
      this.scrollAction.x = window.pageXOffset;
      this.scrollAction.y = window.pageYOffset;
    }
  },
  created(){
  },
  mounted(){
    window.addEventListener("scroll",this.handleScroll); 
  },
  destroyed() {
    document.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style lang='scss' scoped>
.container-right{
  position: relative;
  max-width: 300px;
  min-width: 200px;
  margin-bottom: 10px;
}
</style>
