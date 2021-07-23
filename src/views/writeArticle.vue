<template>
  <div class="write-article">
    <!-- common-header -->
    <div class="header">
      <header-com></header-com>
    </div>
    <!-- article-edit -->
    <div class="article-edit" v-loading="loadingFlag">
      <div class="article-header">
        <el-tabs tab-position="left" v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="首页" name="first">
            <el-col :span="16">
              <el-card class="article-title">
                <div class="title-info flex">
                  <svg class="icon-svg">
                    <use xlink:href="#icon-xinxi"></use>
                  </svg>
                  <span class="title-desc">文章标题</span>
                </div>
                <!-- title-edit -->
                <div class="title-edit">
                  <el-form :model="titleList" :rules="titleRules" ref="titleForm" label-width="60px" class="demo-ruleForm">
                    <el-form-item label="标题" prop="title">
                      <el-input v-model="titleList.title" clearable size="mini"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
              </el-card>
              <div style="margin:8px 0 18px;" class="el-card">
                <mavon-editor
                  ref="md"
                  v-model="articleInfo"
                  @save="handleArticle"
                  style="min-height:700px;z-index:99;"
                  :ishljs="true"
                  :boxShadow="false"
                  :toolbars="markdownOption"
                  defaultOpen="edit"
                  :toolbarsBackground="codeStyle"
                  :previewBackground="codeStyle"
                  :subfield="false"
                  @imgAdd="$imgAdd"
                  @imgDel="$imgDel"
                >
                  <!-- mavon插槽，增加新增文章图标 -->
                  <template v-slot:left-toolbar-after>
                    <button
                      type="button"
                      title="新增文章"
                      class="op-icon"
                      aria-hidden="true"
                      @click="handleAddArticle"
                    >
                      <i class="el-icon-document-add" />
                    </button>
                    <button
                      type="button"
                      title="删除云端图片"
                      class="op-icon"
                      aria-hidden="true"
                      @click="handleDeleteImg"
                    >
                      <i class="el-icon-document-delete" style="color:red;"/>
                    </button>
                  </template>
                </mavon-editor>
              </div>
            </el-col>
            <el-col :span="8" style="padding-left:8px">
              <!-- article-intro -->
              <el-card class="article-title">
                <div class="title-info flex">
                  <svg class="icon-svg">
                    <use xlink:href="#icon-tianjiayonghu"></use>
                  </svg>
                  <span class="title-desc">文章概要</span>
                </div>
                <!-- info-edit -->
                <div class="title-edit">
                  <el-form :model="titleList" :rules="infoRules" ref="infoForm" label-width="60px" class="demo-ruleForm">
                    <el-form-item label="标签" prop="tags">
                      <el-input v-model="titleList.tags" clearable size="mini" :disabled="tagsFlag"></el-input>
                    </el-form-item>
                    <el-form-item label="分类" prop="category">
                      <el-input v-model="titleList.category" clearable size="mini"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
              </el-card>
              <!-- article-list -->
              <el-card class="article-list">
                <div class="list-info flex">
                  <svg class="icon-svg">
                    <use xlink:href="#icon-dingdan"></use>
                  </svg>
                  <span class="list-desc">文章列表</span>
                </div>
                <!-- list-search -->
                <div class="list-search">
                  <el-input placeholder="请输入内容" clearable size="mini" v-model="tableValue">
                    <el-button slot="append" icon="el-icon-search" @click="tableSearch"></el-button>
                  </el-input>
                </div>
                <!-- list-expand -->
                <div class="list-expand">
                  <el-table
                    :data="articleList"
                    stripe
                    style="width: 100%">
                    <el-table-column
                      type="index"
                      min-width="5%">
                    </el-table-column>
                    <el-table-column
                      prop="title"
                      label="标题"
                      show-overflow-tooltip
                      min-width="65%">
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      min-width="30%">
                      <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="handleEditArticle(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="handleDeleteArticle(scope.row)"></el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <!-- pagination -->
                <div class="pagination">
                  <el-pagination
                    layout="total, prev, pager, next"
                    :total="total"
                    @current-change="handleCurrentChange"
                    :page-size="15">
                  </el-pagination>
                </div>
              </el-card>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="归档" name="second">
            22
          </el-tab-pane>
          <el-tab-pane label="创作" name="third">
            33
          </el-tab-pane>
          <el-tab-pane label="友情链接" name="fourth">
            44
          </el-tab-pane>
          <el-tab-pane label="关于我" name="fifth">
            55
          </el-tab-pane>
        </el-tabs>
      </div>
      
    </div>
  </div>
</template>

<script>
import headerCom from "../components/header";
export default {
  components: {  headerCom },
  data() {
    return {
      activeName:'first',
      tableValue:"", // 搜索
      articleInfo: "", // 文章不含html格式
      articleHtml: "", // 文章html格式
      articleEditInfo:{},
      articleList:[], // 文章列表
      categoryList:[
        {
          categoryName:'文章',
          categoryCode:'article',
        },
        {
          categoryName:'说说',
          categoryCode:'moment',
        },
      ],
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
        link: false, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: false, // 展示html源码
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
        // subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      // codeStyle:'', // 工具栏背景色
      titleList:{
        title:'',
        tags:'',
        category:''
      },
      titleRules:{
        title:{required: true, message: '请输入文章标题', trigger: 'blur' },
      },
      infoRules:{
        tags:{required: true, message: '请输入文章标签', trigger: 'blur' },
        category:{required: true, message: '请输入分类(article/hot/moment)', trigger: 'blur' },
      },
      page:1,
      total:0,
      titleFlag:false,
      tagsFlag:false,
      loadingFlag:false,
    };
  },
  computed: {
    // 编辑器背景色
    codeStyle(){
      return this.$store.state.nightModeFlag?'#181c27':''
    },
  },
  methods: {
    // 页码 
    handleCurrentChange(page){
      this.page = page;
      this.queryArticleList();
    },
    // 标签切换时
    handleTabClick(tab){ // 点击tab的时候刷新数据
      console.log(tab);
      // if(tab.$children[0]){
      //   tab.$children[0].tags = '';
      // }
    },
    // 图片上传
    async $imgAdd(pos, $file){
      var formdata = new FormData();
        formdata.append('file', $file);
        await this.$axios.post('/blog-api/upload/imgAdd',formdata,{
          'Content-Type': 'multipart/form-data'
        })
          .then((res)=>{
            if(res.data.code == 0){
              // console.log(res.data.data);
              this.$refs.md.$img2Url(pos,res.data.data);
              this.$notify({
                type:'success',
                position:'top-right',
                message:res.data.msg
              })
            }else{
              this.$notify({
                type:'error',
                position:'top-right',
                message:res.data.msg
              })
            }
          })
          .catch((err)=>{
            this.$notify({
              type:'error',
              position:'top-right',
              message:'网络可能出了点小问题哦'
            })
            console.log(err);
          })
    },
    // 图片删除
    async $imgDel(pos){
      await this.$axios.post('/blog-api/upload/imgDel',{
        filePath:pos[0]
      })
        .then((res)=>{
          // console.log(res);
          if(res.data.code == 0){
            this.$notify({
              type:'success',
              position:'top-right',
              message:res.data.msg
            })
          }else{
            this.$notify({
              type:'error',
              position:'top-right',
              message:res.data.msg
            })
          }
        })
        .catch((err)=>{
          this.$notify({
            type:'error',
            position:'top-right',
            message:'网络可能出了点小问题哦'
          })
          console.log(err);
        })

    },
    // 修改时删除云端图片
    async handleDeleteImg(){
      // 获取鼠标选中内容
      let selectUrl = window.getSelection?window.getSelection().toString():document.selection.createRange().text;
      // 正则校验网址
      let reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/; 
      if((selectUrl != null) && selectUrl.trim()){
        if(selectUrl.match(reg) != null){
          this.$imgDel([selectUrl]); // 删除图片
        }else{
          this.$notify({
            type:'error',
            position:'top-right',
            message:'请确保选中的内容为图片网址'
          })
        }
      }else{
        this.$notify({
          type:'error',
          position:'top-right',
          message:'请选择需要删除的图片链接'
        })
      }
    },
    // 保存 && 修改
    async handleArticle(value, render) {
      this.articleHtml = render;
      await this.$refs.titleForm.validate((valid)=>{
        if(valid){
          this.titleFlag = true;
        }
      });
      await this.$refs.infoForm.validate((valid) => {
        if (valid && this.titleFlag) {
          if(value){
            this.loadingFlag = true;
            // 修改
            if(this.articleEditInfo.article_id){
              this.$axios.post('/blog-api/article/update',{
                article_id:this.articleEditInfo.article_id,
                title:this.titleList.title,
                tags:this.titleList.tags,
                category:this.titleList.category,
                content:this.articleHtml,
                content_info:value
              })
                .then((res)=>{
                  if(res.data.code == 0){
                    this.loadingFlag = false;
                    this.$notify({
                      type:'success',
                      position:'top-right',
                      message:res.data.msg
                    })
                    setTimeout(()=>{
                      location.reload();
                    },1000)
                  }else{
                    this.loadingFlag = false;
                    this.$notify({
                      type:'error',
                      position:'top-right',
                      message:res.data.msg
                    })
                  }
                })
                .catch((err)=>{
                  this.loadingFlag = false;
                  console.log(err);
                })
            // 保存
            }else{
              let articleDesc = {
                title:this.titleList.title,
                tags:this.titleList.tags,
                category:this.titleList.category,
                content:this.articleHtml,
                content_info:value
              };
              // console.log(articleDesc);
              this.$axios.post('/blog-api/article/add',articleDesc)
                .then((res)=>{
                  // console.log(res);
                  if(res.data.code == 0){
                    this.loadingFlag = false;
                    this.$notify({
                      type:'success',
                      position:'top-right',
                      message:res.data.msg
                    })
                    setTimeout(()=>{
                      location.reload();
                    },1000)
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
            }
          }else{
            this.$notify({
              message: '文章内容不能为空哦',
              position:'top-right',
              type:'error'
            });
          }
        } else {
          return false;
        }
      });
    },
    // 新增文章按钮
    handleAddArticle(){
      this.articleEditInfo.article_id = '';
      this.resetForm();
    },
    // // 分类为hot / moment时标签不必输入
    // checkTags(val){
    //   if(val == "hot" || val == "moment"){
    //     this.titleList.tags = "";
    //     this.infoRules.tags.required = false;
    //     this.tagsFlag = true;
    //   }else{
    //     this.infoRules.tags.required = true;
    //     this.tagsFlag = false;
    //   }
    // },
    // 文章概要重置
    resetForm() {
      this.$refs.titleForm.resetFields();
      this.$refs.infoForm.resetFields();
    },
    // 修改文章
    async handleEditArticle(row){
      this.articleEditInfo = row;
      this.titleList.title = row.title;
      this.titleList.tags = row.tags;
      this.titleList.category = row.category;
      this.articleInfo = row.content_info;
    },
    // 删除文章
    async handleDeleteArticle(articleInfo){
      await this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/blog-api/article/delete',{
          article_id:articleInfo.article_id,
        })
          .then((res)=>{
            // console.log(res);
            if(res.data.code == 0){
              this.$notify({
                type:'success',
                position:'top-right',
                message:res.data.msg
              })
              this.queryArticleList();
              // 删除时，若编辑器里的文章id与该文章相同，则清空id
              if(this.articleEditInfo.article_id == articleInfo.article_id){
                this.articleEditInfo.article_id = '';
              }
            }else{
              this.$notify({
                type:'error',
                position:'top-right',
                message:res.data.msg
              })
            }
          })
          .catch((err)=>{
            this.$notify({
              type:'error',
              position:'top-right',
              message:'已取消删除'
            })
            console.log(err);
          })
      }).catch(() => {
        this.$notify({
          type:'info',
          position:'top-right',
          message:'已取消删除'
        })          
      });
    },
    // 列表模糊搜索
    async tableSearch(){
      if(this.tableValue.trim()){
        // console.log(this.tableValue);
        await this.$axios.post('/blog-api/article/likeSearch',{
          likeValue:this.tableValue,
          page:this.page,
          rows:15,
        })
          .then((res)=>{
            if(res.data.code == 0){
              // console.log(res);
              this.articleList = res.data.data.data;
              this.total = res.data.data.records;
            }
          })
          .catch((err)=>{
            console.log(err);
          })
      }else{
        this.queryArticleList();
      }
    },
    // 查询已有文章列表
    async queryArticleList(){
      await this.$axios.post('blog-api/article/list',{
        article_id:"",
        title:"",
        tags:"", 
        create_time:"",
        category:"",
        page:this.page,
        rows:15,
      })
        .then((res)=>{
          if(res.data.code == 0){
            this.articleList = res.data.data.data;
            this.total = res.data.data.records;
            // console.log(this.articleList);
          }
        })
        .catch((err)=>{
          console.log(err);
        })
    },
    // token验证
    async checkToken(){
      await this.$axios.post('/blog-api/user/checkLogin',{
        cookie:sessionStorage.getItem('cookie')
      })
        .then((res)=>{
          if(res.data.code == -1){
            this.$message({
              message: res.data.msg,
              type: "error",
            });
            sessionStorage.setItem('cookie','');
            this.$router.push({path:'/'});
          }
        })
        .catch((err)=>{
          console.log(err);
        })
    },
  },
  created() {
    this.checkToken(); // token验证
    this.queryArticleList(); // 文章列表
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
  @include background_color("background_color7");
}
// article-edit
.article-edit {
  // padding-top:55px;
  width: 100%;
  margin: 55px auto 0;
  transition: 0.5s;
  .v-note-wrapper {
    border: none;
    @include background_color("background_color8");
    /deep/ .content-input-wrapper{
      @include background_color("background_color8");
      .auto-textarea-input{
        @include font_color("text-color");
        @include background_color("background_color8");
      }
    }
    /deep/ pre{
      .hljs{
        background: none;
      }
    }
    /deep/ .v-show-content{
      @include font_color("text-color");
    }
  }
  // el-tabs
  .el-tabs{
    /deep/ .el-tabs__header{
      padding:3px 15px;
      border-radius: 4px;
      margin:8px 0 8px 8px;
      .el-tabs__item{
        // height:24px;
        // line-height:24px;
        // margin:10px 0;
        padding:0 10px 0 0;
        @include font_color("text-color");
      }
      @include background_color("background_color");
      .el-tabs__nav-wrap::after{
        background: none;
      }
      .is-top{
        .el-tabs__item{
          @include font_color("text-color");
        }
      }
      .el-tabs__active-bar{
        margin:0;
      }
    }
    .el-tab-pane{
      overflow: hidden;
      @include font_color("text-color");
      font-size: 14px;
      padding:8px;
      // height:300px;
    }
  }
  .article-title {
    font-size: 14px;
    margin-bottom: 8px;
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
  // article-list
  .article-list{
    font-size: 14px;
    margin-bottom: 8px;
    // list-search
    .list-search{
      margin-top:8px; 
      // el-input 
      .el-input{
        /deep/ .el-input__inner{
          font-size: 12px;
          @include background_color("background_color");
          @include border_style("border_style1");
          &:focus{
            border:1px solid #666 !important;
          }
        }
        /deep/ .el-input-group__append{
          @include background_color("background_color");
          @include border_style("border_style1");
          .el-button{
            transition: .5s;
          }
          &:hover .el-button{
            transform: scale(1.2);
          }
        } 
      }
    }
    .list-info {
      @include border_bottom_style("border_bottom_style");
      padding-bottom: 10px;
      .icon-svg {
        width: 18px;
        height: 18px;
        cursor: default;
      }
      .list-desc {
        margin-left: 10px;
        font-size: 14px;
        line-height: 18px;
        cursor: default;
      }
    }
    // list-expand
    .list-expand{
      .el-table{
        font-size: 12px;
        &::before{
          height:0;
        }
        /deep/ .el-table__header{
          th{
            padding:4px 0;
            @include background_color("background_color8");
            @include border_bottom_style("border_bottom_style");
          }
          tr{
            @include background_color("background_color8");
            @include border_bottom_style("border_bottom_style");
          }
        }
        /deep/ .el-table__body{
          .el-table__row{
            position: relative;
            left:0;
            height:30px;
            transition: .5s;
            cursor: default;
            &:hover{
              left:2px;
            }
            td{
              padding:4px 0;
              @include background_color("background_color8");
              @include border_bottom_style("border_bottom_style");
            }
            .el-button--mini{
              padding:2px;
            }
          }
        }
        /deep/ .cell{
          padding-right: 0;
        }
      }
      /deep/ .el-table__expanded-cell{
        @include background_color("background_color8");
      }
    }
      // pagination
    .pagination{
      // border:1px solid red;
      margin-top:5px;
      text-align: center;
      .el-pagination{
        @include font_color("text-color");
        /deep/ button{
          @include font_color("text-color");
          @include background_color("background_color8");
        }
        /deep/ .el-pager{
          li{
            @include background_color("background_color8");
          }
        }
      }
    }
  }
}
// @media screen and (max-width: 1040px) {
//   .article-edit {
//     width: 98%;
//   }
// }
</style>
<style scoped>
.el-tabs /deep/ .el-tabs__header{
  box-shadow: 0 0 4px rgb(26 26 26 / 10%);
}
</style>
