<template>
  <div class="write-article">
    <!-- common-header -->
    <div class="header">
      <header-com></header-com>
    </div>
    <!-- article-edit -->
    <div class="article-edit" v-loading="loadingFlag">
      <el-col :span="18" class="el-card">
        <mavon-editor
          ref="md"
          v-model="articleInfo"
          @save="handleArticle"
          style="min-height:600px;"
          :ishljs="true"
          :boxShadow="false"
          :toolbars="markdownOption"
          defaultOpen="edit"
        ></mavon-editor>
      </el-col>
      <el-col :span="6" style="padding-left:8px">
        <el-card class="article-title">
          <div class="title-info flex">
            <svg class="icon-svg">
              <use xlink:href="#icon-tianjiayonghu"></use>
            </svg>
            <span class="title-desc">文章概要</span>
          </div>
          <!-- title-edit -->
          <div class="title-edit">
            <el-form :model="titleList" :rules="titleRules" ref="titleForm" label-width="60px" class="demo-ruleForm">
              <el-form-item label="标题" prop="title">
                <el-input v-model="titleList.title" clearable size="mini"></el-input>
              </el-form-item>
              <el-form-item label="标签" prop="tags">
                <el-input v-model="titleList.tags" clearable size="mini"></el-input>
              </el-form-item>
              <el-form-item label="分类" prop="category">
                <el-input v-model="titleList.category" clearable size="mini"></el-input>
              </el-form-item>
            </el-form>
            <!-- submit-form -->
            <div class="submit-form" v-if="false">
              <el-button type="primary" size="mini">确定</el-button>
              <el-button type="warning" size="mini" @click="resetForm">重置</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </div>
  </div>
</template>

<script>
import headerCom from "../components/header";
export default {
  components: {  headerCom },
  data() {
    return {
      articleInfo: "",
      articleHtml: "",
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: false, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: false, // 单双栏模式
        preview: true, // 预览
      },
      titleList:{
        title:'',
        tags:'',
        category:''
      },
      titleRules:{
        title:{required: true, message: '请输入文章标题', trigger: 'blur' },
        tags:{required: true, message: '请输入文章标签', trigger: 'blur' },
        category:{required: true, message: '请输入文章分类', trigger: 'blur' },
      },
      loadingFlag:false,
    };
  },
  computed: {
  },
  methods: {
    // 保存
    async handleArticle(value, render) {
      this.articleHtml = render;
      await this.$refs.titleForm.validate((valid) => {
        if (valid) {
          if(value){
            let articleDesc = {
              title:this.titleList.title,
              tags:this.titleList.tags,
              category:this.titleList.category,
              content:this.articleHtml
            };
            // console.log(articleDesc);
            this.loadingFlag = true;
            this.$axios.post('/blog-api/article/add',articleDesc)
              .then((res)=>{
                console.log(res);
                if(res.data.code == 0){
                  this.loadingFlag = false;
                  this.$notify({
                    type:'success',
                    position:'top-right',
                    message:res.data.msg
                  })
                  location.reload();
                }else{
                  this.loadingFlag = false;
                  this.$notify.error({
                    position:'top-right',
                    message:res.data.msg
                  })
                }
              })
              .catch((err)=>{
                this.loadingFlag = false;
                console.log(err);
              })
          }else{
            this.$notify({
              message: '文章内容不能为空哦',
              position:'top-right',
              type:'warning'
            });
          }
        } else {
          return false;
        }
      });
    },
    // 文章概要重置
    resetForm() {
      this.$refs.titleForm.resetFields();
    }
  },
  created() {
    // this.$router.push({path:'/'});
  },
  mounted(){

  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/dark.scss";
// header
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 800px;
  height: 40px;
  z-index: 999;
  @include font_color("text-color");
  @include box_shadow("box_shadow");
  @include background_color("background_color");
}
// article-edit
.article-edit {
  // padding-top:55px;
  width: 92%;
  margin: 55px auto 0;
  transition: 0.5s;
  .v-note-wrapper {
    border: none;
  }
  .article-title {
    font-size: 14px;
    .title-info {
      @include border_bottom_style("border_bottom_style");
      padding-bottom: 10px;
      .icon-svg {
        width: 18px;
        height: 18px;
        cursor: default;
      }
      .title-desc {
        margin-left: 10px;
        font-size: 14px;
        line-height: 18px;
        cursor: default;
      }
    }
    // title-edit
    .title-edit{
      // el-input 
      .el-input{
        /deep/.el-input__inner{
          @include background_color("background_color");
          @include border_style("border_style1");
          &:focus{
            border:1px solid #666 !important;
          }
        }
      }
      .el-form-item{
        margin-bottom:0;
        /deep/ .el-form-item__label{
          font-size: 12px;
        }
        /deep/ .el-form-item__content{
          height:30px;
          .el-input__inner{
            height:20px;
          }
        } 
      }
    }
    // submit-form
    .submit-form{
      text-align: center;
      text-indent: 20px;
      .el-button{
        width:45px;
        height:20px;
        text-align: center;
        line-height:20px;
        padding:0;
        font-size: 12px !important;
        font-weight: normal;
      }
    }
  }
}
@media screen and (max-width: 1040px) {
  .article-edit {
    width: 98%;
  }
}
</style>
