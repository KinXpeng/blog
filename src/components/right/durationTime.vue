<template>
  <div class="duration-time">
    <!-- blog-duration-time -->
    <div v-show="showFlag" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
      <el-card class="blog-card">
        <div class="time-info flex">
          <svg class="icon-svg">
            <use xlink:href="#icon-shijian"></use>
          </svg>
          <span class="time-title">运行时间</span>
        </div>
        <div class="time-text" ref="timeDate">{{activeTime}}</div>
      </el-card>
    </div>
    <!-- other-duration-time -->
    <div v-show="!showFlag" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
      <el-card class="love-card">
        <div class="love-avatar flex">
          <div class="avatar-info">
            <el-image
              style="width: 65px; height: 65px"
              :src="require('../../assets/images/likp.jpg')"
              fit="cover">
            </el-image>
          </div>
          <span class="avatar-icon">
            <svg class="icon-svg">
              <use xlink:href="#icon-aixin"></use>
            </svg>
          </span>
          <div class="avatar-info">
            <el-image
              style="width: 65px; height: 65px"
              :src="require('../../assets/images/suna.jpg')"
              fit="cover">
            </el-image>
          </div>
        </div>
        <p class="love-time" ref="loveDate">{{loveTime}}</p>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTime:'加载中...',
      loveTime:'加载中...',
      showFlag:true,
      startClientY:'', // 鼠标开始按下的位置
    };
  }, 
  methods:{
    // 计时
    get_time_spent(timeArray){
      let time_start = new Date(...timeArray); //"2017","10","18"
      let clock_start = time_start.getTime();
      let time_now = new Date();
      return ((time_now.getTime() - clock_start));
    },
    get_times(timeArray){
      let i_total_secs = Math.round(this.get_time_spent(timeArray));
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
    // 移动卡片
    handleMouseDown(e){
      this.startClientY = e.clientY;
    },
    handleMouseUp(e){
      let moveClientY = e.clientY - this.startClientY;
      if(moveClientY > 50){
        this.showFlag = !this.showFlag;
      }
    },
  },
  created(){
    
  },
  mounted(){
    let dateTime = this.$refs.timeDate;
    let loveTime = this.$refs.loveDate;
    dateTime.innerHTML = this.get_times(["2017","10","18"]);
    loveTime.innerHTML = this.get_times(["2020","10","16"]);
    setInterval(()=>{
      dateTime.innerHTML = this.get_times(["2017","10","18"]);
      loveTime.innerHTML = this.get_times(["2020","10","16"]);
    },1000);
  },
};
</script>

<style lang='scss' scoped>
@import '@/assets/scss/dark.scss';
.duration-time{
  user-select: none;
  // blog-duration-time
  .blog-card{
    cursor: s-resize;
    margin-bottom:6px;
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
  // other-duration-time
  .love-card{
    cursor: s-resize;
    margin-bottom:6px;
    .love-avatar{
      justify-content: space-around;
      .avatar-info{
        width: 40%;
        width:65px;
        height:65px;
        border-radius: 50%;
        cursor: default;
        @include box_shadow("box_shadow");
        .el-image{
          border-radius: 50%;
        }
      }
      .avatar-icon{
        width: 20%;
        line-height: 85px;
        text-align: center;
        .icon-svg{
          width:18px;
          height:18px;
          cursor: default;
          position: relative;
          animation:face 1s infinite ease-in-out;
        }
      }
    }
    .love-time{
      font-size: 12px;
      text-align: center;
      cursor: text;
    }
  }
}
@keyframes face{
  from{top:0px;transform: scale(1);}
  to{top:3px;transform: scale(1.2);}
}
</style>
