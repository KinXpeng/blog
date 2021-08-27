<template>
  <!-- <div class="link-title el-card">123</div> -->
  <el-card>
    <p class="link-title">倾风印象</p>
    <div class="link-line">
      <div class="link-info">
        <span>“千里马常有，而伯乐不常有！”</span>
      </div>
      <p class="link-line-border"></p>
    </div>
    <!-- link-card -->
    <!-- 博客链接 -->
    <div class="link-card">
      <p class="card-title">万千博友们！</p>
      <ul>
        <li class="link-item" v-show="item.category=='blog'" v-for="(item,index) in linkCardList" :key="index" :style="'border:2px solid '+CardStyle()">
          <div class="item-desc">
            <p class="item-name">{{item.name}}</p>
            <span class="item-info">{{item.desc}}</span>
          </div>
          <div class="item-avatar">
            <img :src="item.avatarImg" alt="">
          </div>
        </li>
      </ul>
    </div>
    <!-- 达人推荐 -->
    <div class="link-card">
      <p class="card-title">达人推荐</p>
      <ul>
        <li class="link-item" v-show="item.category=='recommend'" v-for="(item,index) in linkCardList" :key="index" :style="'border:2px solid '+CardStyle()">
          <div class="item-desc">
            <p class="item-name">{{item.name}}</p>
            <span class="item-info">{{item.desc}}</span>
          </div>
          <div class="item-avatar">
            <img :src="item.avatarImg" alt="">
          </div>
        </li>
      </ul>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      linkCardList:[
        {
          name:'测试测试',
          url:'https://www.kinxpeng.com',
          avatarImg:'https://www.kinxpeng.com/demo/logo.jpeg',
          desc:'纵有疾风起，人生不言弃！',
          category:'blog'
        },
        {
          name:'AngelNI’s Blog',
          url:'https://www.kinxpeng.com',
          avatarImg:'https://www.kinxpeng.com/demo/logo.jpeg',
          desc:'做事有始有终值得开始的事就值得完成。',
          category:'blog'
        },
        {
          name:'Dreamy.WJY',
          url:'https://www.kinxpeng.com',
          avatarImg:'https://www.kinxpeng.com/demo/logo.jpeg',
          desc:'青，取之于蓝而青于蓝;冰，水为之而寒于水。',
          category:'blog'
        },
        {
          name:'测试测试',
          url:'https://www.kinxpeng.com',
          avatarImg:'https://www.kinxpeng.com/demo/logo.jpeg',
          desc:'业精于勤而荒于嬉，行成于思而毁于随。',
          category:'blog'
        },
        {
          name:'测试测试',
          url:'https://www.kinxpeng.com',
          avatarImg:'https://www.kinxpeng.com/demo/logo.jpeg',
          desc:'困难像弹簧，你弱它就强，你强它就弱。',
          category:'blog'
        },
        {
          name:'测试测试',
          url:'https://www.kinxpeng.com',
          avatarImg:'https://www.kinxpeng.com/demo/logo.jpeg',
          desc:'把意念深潜得下，何理不可得，把志气奋发起，何事不可做！',
          category:'blog'
        },
        {
          name:'测试测试',
          url:'https://www.kinxpeng.com',
          avatarImg:'https://www.kinxpeng.com/demo/logo.jpeg',
          desc:'要想成为强者，决不能绕过挡道的荆棘，也不能回避风雨的冲刷。',
          category:'blog'
        },
        {
          name:'测试测试',
          url:'https://www.kinxpeng.com',
          avatarImg:'https://www.kinxpeng.com/demo/logo.jpeg',
          desc:'接到你的新消息,振动的不是手机,而是心。',
          category:'blog'
        },
        {
          name:'测试测试',
          url:'https://www.kinxpeng.com',
          avatarImg:'https://www.kinxpeng.com/demo/logo.jpeg',
          desc:'不怕在自己的梦想里跌倒,只怕在别人的奇迹中迷路。',
          category:'blog'
        },
        {
          name:'测试测试',
          url:'https://www.kinxpeng.com',
          avatarImg:'https://www.kinxpeng.com/demo/logo.jpeg',
          desc:'早成者未必有成,晚达者未必不达。不可以年少而自恃,不可以年老而自弃。',
          category:'recommend'
        },
        {
          name:'测试测试',
          url:'https://www.kinxpeng.com',
          avatarImg:'https://www.kinxpeng.com/demo/logo.jpeg',
          desc:'早成者未必有成,晚达者未必不达。不可以年少而自恃,不可以年老而自弃。',
          category:'recommend'
        },
        {
          name:'测试测试',
          url:'https://www.kinxpeng.com',
          avatarImg:'https://www.kinxpeng.com/demo/logo.jpeg',
          desc:'早成者未必有成,晚达者未必不达。不可以年少而自恃,不可以年老而自弃。',
          category:'recommend'
        },
        {
          name:'测试测试',
          url:'https://www.kinxpeng.com',
          avatarImg:'https://www.kinxpeng.com/demo/logo.jpeg',
          desc:'早成者未必有成,晚达者未必不达。不可以年少而自恃,不可以年老而自弃。',
          category:'recommend'
        },
        {
          name:'测试测试',
          url:'https://www.kinxpeng.com',
          avatarImg:'https://www.kinxpeng.com/demo/logo.jpeg',
          desc:'早成者未必有成,晚达者未必不达。不可以年少而自恃,不可以年老而自弃。',
          category:'recommend'
        },
        {
          name:'测试测试',
          url:'https://www.kinxpeng.com',
          avatarImg:'https://www.kinxpeng.com/demo/logo.jpeg',
          desc:'早成者未必有成,晚达者未必不达。不可以年少而自恃,不可以年老而自弃。',
          category:'recommend'
        },
      ],
    };
  },
  methods:{
    // card随机色
    CardStyle(){
      let r = Math.round(Math.random()*255);
      let g = Math.round(Math.random()*255);
      let b = Math.round(Math.random()*255);
      let a = JSON.parse((Math.random()*0.8).toFixed(1))+0.2;
      return 'rgba('+r+','+g+','+b+','+a+')';
    },
  },
  created(){
  },
};
</script>

<style lang='scss' scoped>
.link-title{
  font-size: 18px;
  line-height:24px;
  text-align: center;
  font-family:'Chasing-Light';
  color:transparent;
  background-clip: text;
  background-image:  linear-gradient(to right, #091c85, #152ae0,#67b1f7,#3502f0,#11076e);
}
// 标题线寄语
.link-line{
  width:50%;
  margin:10px auto;
  .link-info{
    display: flex;
    white-space: nowrap;
    text-align: center;
    font-family: unset;
    font-size: 14px;
    font-style: italic;
    color:#666;
    text-overflow: hidden;
    justify-content: center;
    span{
      overflow: hidden;
      display: block;
      animation: textShow 5s infinite linear alternate;
    }
  }
  .link-line-border{
    height:2px;
    margin:4px 0;
    background-image:  linear-gradient(to right, #091c85, #152ae0,#67b1f7,#3502f0,#11076e);
  }
}
// link-card
.link-card{ 
  padding:10px 0;
  .card-title{
    height:26px;
    line-height:26px;
    margin:0 10px;
    font-size: 16px;
    text-indent:10px;
    border-left:3px solid #317adf;
  }
  &>ul{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding:10px 0;
    .link-item{
      display: flex;
      width:31%;
      height:100px;
      margin:1%;
      &:hover{
        box-shadow: 0 0px 4px 0 #ccc;
        border-width: 3px !important;
      }
      // 描述
      .item-desc{
        width:70%;
        font-size:14px;
        padding:0 10px;
        .item-name{
          height:40px;
          border-bottom:1px dotted #ccc;
          line-height:40px;
          color:#317adf;
          font-style: italic;
          cursor: pointer;
        }
        .item-info{
          overflow: hidden;
          line-height:18px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          text-overflow: ellipsis;
          font-size:12px;
          font-style: italic;
          color:#999;
        }
      }
      // 头像
      .item-avatar{
        width:30%;
        img{
          width:60px;
          height:60px;
          border-radius: 50%;
          margin:20px 4px 20px -4px;
          border:2px solid #ccc;
          transition: .5s;
          &:hover{
            transform: scale(1.1);
            border-color:#317adf;
          }
        }
      }
    }
  }
}

@keyframes textShow {
  from {width:0;}
  to {width:100%;}
}
</style>
