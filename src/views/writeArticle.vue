<template>
  <div class="writeArticle">
    <br />
    <div class="articleEdit">
      <mavon-editor
        ref="md"
        v-model="articleInfo"
        @change="handleArticle"
        style="min-height:600px;"
        :subfield="false"
        :boxShadow="false"
        defaultOpen="preview"
      ></mavon-editor>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  components: { mavonEditor },
  data() {
    return {
      articleInfo: "",
    };
  },
  methods: {
    handleArticle() {
      console.log(this.articleInfo);
    },
  },
  created() {
    // this.$router.push({path:'/'});
  },
};
</script>

<style lang="scss" scoped>
// 编辑器
.articleEdit {
  padding:0 1%;
  margin: 0 auto;
}
</style>
