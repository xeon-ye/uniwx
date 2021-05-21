<template>
  <view class="app-container">
    <view class="item-list-wrap">
      <tui-list-view  color="#777" >
        <tui-list-cell arrow radius=true padding="30rpx" :lineRight="true" color="#000000" v-for="(item, index) in typeList" :key="index" @click="navTo(item)"> {{ item.name }} </tui-list-cell>
      </tui-list-view>
    </view>
  </view>

</template>

<script>
export default {
  components: {},
  data() {
    return {
      typeList:[]
    };
  },
  methods: {
     navTo(e) {
      uni.navigateTo({
          url: '/pages/feedback/form?id='+e.id+"&name="+e.name
      });
    }

  },
  async created() {
    let res = await this.$api.getComplaintType();
    if(res.data && res.data.length > 0) {
        this.typeList = res.data;
    }
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
.app-container {
  background: #f3f3f3;
  padding: 15px;  
  height: 100vh;
  .item-list-wrap{
	  border-radius: 10rpx;
	  overflow: hidden;
  }
}
</style>