<template>
  <div class="link-intro">
    <el-card>
      <p class="link-title">友链格式 & 温馨小提示</p>
      <div class="link-line">
        <p class="link-line-border"></p>
      </div>
      <!-- 友链格式 -->
      <div class="link-format">
        <p class="format-title">友链格式</p>
        <ul class="format-info">
          <li>名称：倾倾倾风</li>
          <li>地址：https://blog.kinxpeng.com</li>
          <li>描述：染指阳光，向日葵永不落！</li>
          <li>头像：https://www.kinxpeng.com/demo/logo.jpeg</li>
        </ul>
      </div>
      <!-- 温馨小提示 -->
      <div class="link-format">
        <p class="format-title">温馨小提示</p>
        <p class="format-rules">
          注意: 确保主页地址和头像的地址有效，申请友链前，请先将本站添加到友链中！
          需要添加/更换友链的小伙伴们，在本页留言即可，看到后将第一时间更新！😋
        </p>
        <ul class="format-info">
          <li>原则上只和博客交换，但不包括含有色情、暴力和政治敏感等内容的网站。</li>
          <li>申请链接前请先添加本博链接，通过留言告知。</li>
          <li>申请请提供：站点名称、站点主页(链接)、站点描述、logo或头像。</li>
          <li>会定期清理不符合要求的友链(站点爆炸或者无法访问达到一个月)，不再另行通知。</li>
          <li>拒绝链接、发布纯科学上网等类站点的申请，技术博客、生活博客优先。</li>
          <li>想要申请友链的小伙伴们请不要着急，在下方填写相关的信息,点击申请友链即可，博主收到会第一时间更新。</li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods:{
  },
  created(){
  },
};
</script>

<style lang='scss' scoped>
@import '@/assets/scss/dark.scss';
.link-intro{
  margin:8px 0;
  .link-title{
    font-size: 18px;
    line-height:24px;
    text-align: center;
    font-family:'Chasing-Light';
    color:transparent;
    background-clip: text;
    background-image:  linear-gradient(to right, #091c85, #152ae0,#67b1f7,#3502f0,#11076e);
  }
  // 标题线
  .link-line{
    width:50%;
    margin:10px auto;
    .link-line-border{
      height:2px;
      margin:4px 0;
      background-image:  linear-gradient(to right, #091c85, #152ae0,#67b1f7,#3502f0,#11076e);
    }
  }
  // 友链格式
  .link-format{
    padding:10px 0;
    .format-title{
      height:26px;
      line-height:26px;
      margin:0 10px;
      font-size: 16px;
      text-indent:10px;
      border-left:3px solid #317adf;
    }
    .format-rules{
      font-size:13px;
      font-style: italic;
      padding:10px 10px 0;
      font-weight: 600;
      line-height: 20px;
    }
    .format-info{
      padding:10px 10px 10px 35px;
      &>li{
        line-height:20px;
        font-size: 12px;
        font-style: italic;
        padding:0 10px;
        list-style: circle;
        @include font_color("text-color3");
      }
      &>li:nth-child(even){
        background:rgba(0,120,231,.05);
      }
    }
  }
}
</style>
