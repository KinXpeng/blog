<template>
  <div class="music el-card flex">
    <div class="music-img">
      <div v-show="isPlay" class="music-play" @click="play()">
        <svg class="icon-svg">
          <use xlink:href="#icon-bofang"></use>
        </svg>
      </div>
      <div v-show="!isPlay" class="music-pause" @click="pause()">
        <svg class="icon-svg">
          <use xlink:href="#icon-zanting"></use>
        </svg>
      </div>
    </div>
    <div class="music-info">
      <audio
        v-show="false"
        ref="audio" 
        @timeupdate="onTimeupdate" 
        @loadedmetadata="onLoadedmetadata"
        src="../../assets/music/38year-summer.mp3"
        loop
        controls="controls"
      ></audio>
      <div class="music-desc">
        <span class="desc-title" title="第三十八年夏至河图">第三十八年夏至</span> - <span>河图</span>
      </div>
      <div class="music-slider flex">
        <el-slider v-model="sliderTime" :max="maxLength" :show-tooltip="false" @input="handleProgress"></el-slider>
        <div class="silder-info">{{currentTime}} / {{durationTime}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songs: [
        {
          id: 1,
          name: "河图",
          title: "第三十八年夏至",
          src: "../../assets/music/38year-summer.mp3",
        },
      ],
      maxLength:0,
      isPlay:true,
      currentTime:'00:00',
      durationTime:'04:30',
      sliderTime:0,
    };
  },
  methods: {
    // 暂停
    pause(){
      this.$refs.audio.pause();
      this.isPlay = true;
    },
    // 播放
    play(){
      this.$refs.audio.play();
      this.isPlay = false;
    },
    // 实时播放时间
    onTimeupdate(res){
      let nowTime = parseInt(res.target.currentTime);
      let min = parseInt(nowTime / 60); // 分钟
      min = min<10?'0'+min:min;
      let second = parseInt(nowTime-min*60); // 秒
      second = second<10?'0'+second:second;
      this.currentTime = min + ':' + second; // 总时长，格式为 04:22
      this.sliderTime = nowTime;
    },
    // 音乐总长
    onLoadedmetadata(res){
      this.maxLength = res.target.duration;
      let min = parseInt(res.target.duration / 60); // 分钟
      min = min<10?'0'+min:min;
      let second = parseInt(res.target.duration-min*60); // 秒
      second = second<10?'0'+second:second;
      this.durationTime = min + ':' + second; // 总时长，格式为 04:22
    },
    // 进度条
    handleProgress(val){
      this.$refs.audio.currentTime = val;
      this.sliderTime = val;
      let min = parseInt(val / 60); // 分钟
      min = min<10?'0'+min:min;
      let second = parseInt(val-min*60); // 秒
      second = second<10?'0'+second:second;
      this.currentTime = min + ':' + second; // 总时长，格式为 04:22
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/dark.scss';
.music {
  margin-bottom: 6px;
  font-size: 12px;
  height: 65px;
  // img以及按钮
  .music-img {
    position: relative;
    width:65px;
    min-width: 25%;
    background: url('../../assets/images/38year-summer.jpeg') center/cover;
    .music-play{
      position: absolute;
      top:50%;
      left:50%;
      width:20px;
      height:20px;
      cursor: pointer;
      margin:-10px 0 0 -10px;
      text-align: center;
      border-radius: 50%;
      box-shadow: 0 0 2px #fff;
      .icon-svg{
        width:20px;
        height:20px;
        transition: .5s;
        &:hover{
          transform: scale(1.2);
        }
      }
    }
    .music-pause{
      position: absolute;
      right:5px;
      bottom:0;
      cursor: pointer;
      border-radius: 50%;
      .icon-svg{
        width:16px;
        height:16px;
      }
    }
  }
  // 右侧info
  .music-info {
    width: 75%;
    padding:10px;
    audio {
      width: 100%;
    }
    .music-desc{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .desc-title{
        @include font_color("text-color1");
      }
    }
    // slider
    .music-slider{
      justify-content: space-around;
      // 滑块
      /deep/.el-slider{
        width:50%;
        padding-right: 3px;
        .el-slider__runway{
          height:3px;
          .el-slider__bar{
            height:3px;
          }
          .el-slider__button-wrapper{
            width:12px;
            height:12px;
            line-height: 12px;
            top:-5px;
            .el-slider__button{
              width:7px;
              height:7px;
            }
          }
        }
      }
      // 音乐时间进度
      .silder-info{
        height: 35px;
        font-size: 12px;
        text-align: center;
        line-height: 35px;
      }
    }
  }
}
// 监听页面缩小时进度条的长度变化
@media screen and (max-width:1300px) {
  .music-info{
    .music-slider{
      /deep/ .el-slider{
        width: 40% !important;
      }
    }
  }
}
@media screen and (max-width:1130px) {
  .music-info{
    .music-slider{
      /deep/ .el-slider{
        width: 35% !important;
      }
    }
  }
}
</style>
