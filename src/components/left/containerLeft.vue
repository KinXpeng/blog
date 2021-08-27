<template>
  <div class="container-left">
    <!-- avatarInfo -->
    <avatar-info></avatar-info>
    <!-- foreverLove -->
    <forever-love v-show="false"></forever-love>
    <!-- tagsCloud -->
    <tags-cloud ref="leftCom"></tags-cloud>
  </div>
</template>

<script>
import avatarInfo from './avatarInfo.vue';
import ForeverLove from './foreverLove.vue';
import TagsCloud from './tagsCloud.vue';
export default {
  components: { avatarInfo, TagsCloud, ForeverLove },
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
      if(this.$refs.leftCom){
        let leftNode = this.$refs.leftCom.$el;
        let scrollT = document.documentElement.scrollTop;
        this.scrollFunc();
        if(scrollT >= 476){
          leftNode.style.position = "absolute";
          leftNode.style.top = scrollT + "px";
        }else if(scrollT > 476 && scrollT <= 484){
          leftNode.style.position = "relative";
          leftNode.style.top = scrollT + 8 + "px";
        }else{
          leftNode.style.position = "relative";
          leftNode.style.top = 0;
        }
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
.container-left{
  position: relative;
  max-width: 300px;
  min-width: 200px;
  margin-bottom: 10px;
}
</style>
