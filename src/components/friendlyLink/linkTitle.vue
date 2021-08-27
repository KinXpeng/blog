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
    <div class="link-card">
      <p class="card-title">万千博友们！</p>
      <ul>
        <li class="link-item" v-for="(item,index) in linkCardList" :key="index">
          <div class="item-desc">
            <p class="item-name">{{item.name}}</p>
            <span class="item-info">这里是描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</span>
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
          desc:'纵有疾风起，人生不言弃！'
        },
        {
          name:'AngelNI’s Blog',
          url:'https://www.kinxpeng.com',
          avatarImg:'https://www.kinxpeng.com/demo/logo.jpeg',
          desc:'纵有疾风起，人生不言弃！'
        },
        {
          name:'Dreamy.WJY',
          url:'https://www.kinxpeng.com',
          avatarImg:'https://www.kinxpeng.com/demo/logo.jpeg',
          desc:'纵有疾风起，人生不言弃！'
        },
        {
          name:'测试测试',
          url:'https://www.kinxpeng.com',
          avatarImg:'https://www.kinxpeng.com/demo/logo.jpeg',
          desc:'纵有疾风起，人生不言弃！'
        },
        {
          name:'测试测试',
          url:'https://www.kinxpeng.com',
          avatarImg:'https://www.kinxpeng.com/demo/logo.jpeg',
          desc:'纵有疾风起，人生不言弃！'
        },
        {
          name:'测试测试',
          url:'https://www.kinxpeng.com',
          avatarImg:'https://www.kinxpeng.com/demo/logo.jpeg',
          desc:'纵有疾风起，人生不言弃！'
        },
        {
          name:'测试测试',
          url:'https://www.kinxpeng.com',
          avatarImg:'https://www.kinxpeng.com/demo/logo.jpeg',
          desc:'纵有疾风起，人生不言弃！'
        },
        {
          name:'测试测试',
          url:'https://www.kinxpeng.com',
          avatarImg:'https://www.kinxpeng.com/demo/logo.jpeg',
          desc:'纵有疾风起，人生不言弃！'
        },
        {
          name:'测试测试',
          url:'https://www.kinxpeng.com',
          avatarImg:'https://www.kinxpeng.com/demo/logo.jpeg',
          desc:'纵有疾风起，人生不言弃！'
        },
        {
          name:'测试测试',
          url:'https://www.kinxpeng.com',
          avatarImg:'https://www.kinxpeng.com/demo/logo.jpeg',
          desc:'纵有疾风起，人生不言弃！'
        },
      ],
    };
  },
  methods:{
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
      border:1px solid red;
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
