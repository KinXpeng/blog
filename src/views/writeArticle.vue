<template>
  <div class="writeArticle">

    <div class="articleEdit">
      <mavon-editor v-model="articleInfo" @change="handleArticle" style="min-height:600px;"></mavon-editor>
    </div>
  </div>
</template>

<script>
import {mavonEditor} from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  components: {mavonEditor}, 
  data() {
    return {
      articleInfo:'',
    };
  },
  methods:{
    handleArticle(){
      console.log(this.articleInfo);
    },
  },
  created(){
  },
};
</script>

<style lang='scss' scoped>
// 编辑器
.articleEdit{
  width:80%;
  margin:0 auto;
}
</style>
