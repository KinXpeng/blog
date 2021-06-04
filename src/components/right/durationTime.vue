<template>
  <div class="duration-time">
    <el-card>
      <div class="time-info flex">
        <svg class="icon-svg">
          <use xlink:href="#icon-shijian"></use>
        </svg>
        <span class="time-title">运行时间</span>
      </div>
      <div class="time-text" ref="timeDate">{{activeTime}}</div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTime:'加载中...'
    };
  },
  methods:{
    get_time_spent(){
      let time_start = new Date("2017","10","18");
      let clock_start = time_start.getTime();
      let time_now = new Date();
      return ((time_now.getTime() - clock_start));
    },
    get_times(){
      let i_total_secs = Math.round(this.get_time_spent());
      let days = Math.floor(i_total_secs / (24 * 3600 * 1000));
      let leave1 = i_total_secs % (24 * 3600 * 1000);
      let hours = Math.floor(leave1 / (3600 * 1000));
      let leave2 = leave1 % (3600 * 1000);
      let minutes = Math.floor(leave2 / (60 * 1000));
      let leave3 = leave2 % (60 * 1000);
      let seconds = Math.round(leave3 / 1000);
      let sec = seconds<10?'0':'';
      return days + "&nbsp;天&nbsp;" + hours + "&nbsp;小时&nbsp;" + minutes + "&nbsp;分钟&nbsp;" + sec + seconds + "&nbsp;秒";
    },
  },
  created(){
  },
  mounted(){
    let dateTime = this.$refs.timeDate;
    dateTime.innerHTML = this.get_times();
    setInterval(()=>{
      dateTime.innerHTML = this.get_times();
    },1000);
  },
};
</script>

<style lang='scss' scoped>
@import '@/assets/scss/dark.scss';
.duration-time{
  .el-card{
    cursor: s-resize;
  }
  .time-info{
    @include border_bottom_style("border_bottom_style");
    padding-bottom: 10px;
    .icon-svg{
      width:18px;
      height:18px;
      transition: .5s;
      cursor: default;
      &:hover{
        transform: rotate(360deg);
      }
    }
    .time-title{
      margin-left: 10px;
      font-size: 14px;
      line-height: 18px;
      cursor: default;
    }
  }
  .time-text{
    font-size: 12px;
    margin-top:10px;
    cursor: text;
  }
}
</style>
