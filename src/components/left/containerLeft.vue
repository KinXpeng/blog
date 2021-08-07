<template>
  <div class="container-left" :style="'top:'+ topNum +'px'">
    <!-- avatarInfo -->
    <avatar-info></avatar-info>
    <!-- navList -->
    <nav-list></nav-list>
    <!-- tagsCloud -->
    <tags-cloud></tags-cloud>
    <!-- 计算高度 -->
    <div class="calcHeight" ref="leftCom"></div>
  </div>
</template>

<script>
import avatarInfo from './avatarInfo.vue';
import NavList from './navList.vue';
import TagsCloud from './tagsCloud.vue';
export default {
  components: { avatarInfo, NavList, TagsCloud },
  data() {
    return {
      totalHeight:null, // 页面总高度
      topNum:0, // 相对定位值
      scrollNum:0,
      scrollNum1:0,
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
      let top = this.$refs.leftCom.getBoundingClientRect().bottom;
      let scrollT = document.documentElement.scrollTop;
      this.scrollFunc();
      if(this.scrollDirection == 'down'){ // 向下
        if(top < this.totalHeight){
          this.topNum = scrollT - this.scrollNum;
          this.scrollNum1 =  JSON.parse(JSON.stringify(scrollT));
        }else{
          this.scrollNum = JSON.parse(JSON.stringify(scrollT));
        }
      }
      else if(this.scrollDirection == 'up'){ // 向上
        if(top < this.totalHeight){
          this.scrollNum =  JSON.parse(JSON.stringify(scrollT));
        }else{
          this.scrollNum1 = JSON.parse(JSON.stringify(scrollT));
          this.topNum = this.scrollNum1 - scrollT;
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
    this.totalHeight = window.innerHeight - 55;
    // window.addEventListener("scroll",this.handleScroll); 
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
  transition: .5s;
}
</style>
