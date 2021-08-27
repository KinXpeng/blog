<template>
  <div class="friendly-link">
    <!-- link-title -->
    <link-title></link-title>
    <!-- link-intro -->
    <link-intro></link-intro>
    <!-- apply-link -->
    <apply-link></apply-link>
  </div>
</template>

<script>
import ApplyLink from '../components/friendlyLink/applyLink.vue';
import LinkIntro from '../components/friendlyLink/link-intro.vue';
import linkTitle from '../components/friendlyLink/linkTitle.vue';
export default {
  components: { linkTitle, LinkIntro, ApplyLink },
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

</style>
