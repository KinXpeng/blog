<template>
  <div class="music el-card flex">
    <div class="music-img">
      <div class="music-play" @click="play()">播放
        <svg class="icon-svg">
          <use xlink:href="#icon-bofang"></use>
        </svg>
      </div>
      <div class="music-pause" @click="pause()">暂停</div>
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
      <div class="music-slider">
        <el-slider v-model="value3" :max="maxLength" :show-tooltip="false" @input="handleProgress"></el-slider>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value3:0,
      songs: [
        {
          id: 1,
          name: "河图",
          title: "第三十八年夏至",
          src: "../../assets/music/38year-summer.mp3",
        },
      ],
      maxLength:0,
    };
  },
  methods: {
    // 暂停
    pause(){
      this.$refs.audio.pause();
    },
    // 播放
    play(){
      this.$refs.audio.play();
    },
    // 实时播放时间
    onTimeupdate(res){
      console.log(res.target.currentTime);
    },
    // 音乐总长
    onLoadedmetadata(res){
      console.log(res.target.duration);
      this.maxLength = res.target.duration;
    },
    // 进度条
    handleProgress(val){
      console.log(val);
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
  // img
  .music-img {
    position: relative;
    width:65px;
    min-width: 25%;
    background: url('../../assets/images/38year-summer.jpeg') center/cover;
    .music-play{
      position: absolute;
      cursor: pointer;
      text-align:center;
      .icon-svg{
        width:16px;
        height:16px;
      }
    }
    .music-pause{
      position: absolute;
      bottom:0;
      cursor: pointer;
    }
  }
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
      .el-slider{

      }
    }
  }
}
</style>
