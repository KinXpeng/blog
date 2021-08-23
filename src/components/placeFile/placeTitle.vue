<template>
  <div class="place-title el-card">
    <!-- 背景部分 -->
    <div class="title-bg">
      
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
  </div>
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
  .title-bg{
    height:50px;
  }
  // 归档历史
  .timeLine{
    padding-left: 100px;
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
