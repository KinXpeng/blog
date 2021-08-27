<template>
  <el-card class="place-title">
    <p class="link-title">时光轴</p>
    <div class="link-line">
      <p class="link-line-border"></p>
    </div>
    <!-- 归档历史 -->
    <div class="timeLine">
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in timeLineList"
          :key="index"
          :timestamp="item.createTime"
          icon="el-icon-time"
        >
          <span v-if="index==0">{{ item.lineTitle }}</span>
          <span v-else class="lineTitle">{{ item.lineTitle }}</span>
        </el-timeline-item>
      </el-timeline>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      timeLineList:[
        {
          createTime:'',
          lineTitle:'共计10条记录',
          creatorName:'',
        },
        {
          createTime:'2021-08-23',
          lineTitle:'这是第一个归档',
          creatorName:'123',
        },
        {
          createTime:'2021-08-23',
          lineTitle:'这是第一个归档',
          creatorName:'123',
        },
        {
          createTime:'2021-08-23',
          lineTitle:'这是第一个归档',
          creatorName:'123',
        },
        {
          createTime:'2021-08-23',
          lineTitle:'这是第一个归档',
          creatorName:'123',
        },
        {
          createTime:'2021-08-23',
          lineTitle:'这是第一个归档',
          creatorName:'123',
        },
        {
          createTime:'2021-08-23',
          lineTitle:'这是第一个归档',
          creatorName:'123',
        },
        {
          createTime:'2021-08-23',
          lineTitle:'这是第一个归档',
          creatorName:'123',
        },
        {
          createTime:'2021-08-23',
          lineTitle:'这是第一个归档',
          creatorName:'123',
        },
        {
          createTime:'2021-08-23',
          lineTitle:'这是第一个归档',
          creatorName:'123',
        },
        {
          createTime:'2021-08-23',
          lineTitle:'这是第一个归档',
          creatorName:'123',
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
.place-title{
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
  // 归档历史
  .timeLine{
    padding:15px 10px;
    .el-timeline{
      margin-left:150px;
    }
    .lineTitle{
      color:#6ca3f0;
      cursor: pointer;
      &:hover{
        color:#317adf;
        text-decoration: underline;
      }
    }
  }
}
</style>
