<template>
  <view class="app-container">
    <view class="rece-wrap">
      <view class="title">领券专区</view>
	  <tuiEmpty source="coupon" emptyText="暂无优惠券" v-if="couponList.length == 0"></tuiEmpty>
      <view class="coupon-part-list" v-if="couponList.length > 0">
        <view
          class="coupon-item"
          :class="[item.status != 3 ? 'use-item' : 'no-use-item']"
          v-for="(item, index) in couponList"
          :key="index"
        >
          <view class="coupon-top">
            <view class="money-num" v-if="item.coupon_type == 1">
              <text>￥</text><text class="num">{{ item.money }}</text>
            </view>
            <view class="money-num" v-else>
              <text class="num">{{ item.discount }}</text
              ><text>折</text>
            </view>
            <view class="coupon-desc">
              <view>{{ item.name }}</view>
              <view>仅限国际线路使用</view>
            </view>
          </view>
          <view class="coupon-bottom">
            <view class="coupon-time"> 有效期：{{ item.end_time }}前 </view>
            <view class="coupon-btn use-btn" v-if="item.is_receive === 0" @click="handleRece(item.coupon_id)">立即领取</view>
            <view class="coupon-btn no-use-btn" v-else-if="item.is_receive === 1">
              已领取
            </view>
          </view>
        </view>
      </view>
    </view>
	<view class="app-more">
		<view class="app-more_title">
			<text>更多活动</text>
		</view>
		<view class="app-more_data">
			<view class="tui-flex mt20" v-for="(item, index) in welfare" :key="index">
				<view class="app-more_data-imgbox tui-col-12">
					<image class="welfare-image" :src="item.pic_url" mode="widthFix" @click="toWeb(item.link)"></image>
				</view>
			</view>
		</view>
	</view>
  </view>
</template>

<script>
import tuiEmpty from '@/components/tui-empty/tui-empty.vue';	
export default {
  components: {
	  tuiEmpty
  },
  data() {
    return {
        couponList:[],
		welfare:[],
    };
  },
  methods: {
      async handleRece(coupon_id){
          let res = await this.$api.getCouponReceive({coupon_id});
          this.$toast(res.info);
      },
	  toWeb(e) {
		  uni.navigateTo({
		  	url:'webview?src='+e
		  })
	  }
  },
 async created() {
      let res = await this.$api.getCouponList({page:1,size:30});
      this.couponList = res.data.list;
      let welfare = await this.$api.getWelfare();
      this.welfare = welfare.data;

  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
.app-container {
    background: #f3f3f3;
    min-height: 100vh;
    padding: 20rpx 20rpx 0;
  .rece-wrap {
      background: #fff;
      padding: 30rpx;
      border-radius: 16rpx;
      .title{
          margin-bottom: 20rpx;
      }
    .coupon-part-list {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .coupon-item {
        width: 640rpx;
        height: 103px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-bottom: 40rpx;
        .coupon-top {
          height: 66px;
          display: flex;
          align-items: center;
          color: #fff;
          font-size: 14px;
          .money-num {
            width: 220rpx;
            text-align: center;
            .num {
              font-size: 48rpx;
              font-weight: bold;
            }
          }
          .coupon-desc {
            padding-left: 40rpx;
          }
        }
        .coupon-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 30px;
          padding: 0 50rpx;
          font-size: 12px;
          .coupon-btn {
            height: 40rpx;
            line-height: 40rpx;
            border-radius: 20rpx;
            border: 1px solid;
            padding: 0 7px;
          }
          .use-btn {
            color: #fe5108;
            border-color: #fe5108;
          }
          .no-use-btn {
            color: #7b7b7b;
            border-color: #7b7b7b;
          }
        }
      }
      .use-item {
        background-image: url("../../static/coupon-1.png");
      }
      .no-use-item {
        background-image: url("../../static/coupon-2.png");
      }
    }
  }
  .app-more{
	  margin-top: 20rpx;
	  .app-more_title{
		  text-align: center;
		  margin-bottom: 20rpx;
		  text{
			  font-size: 32rpx;
			  font-weight: bold;
		  }
	  }
	  .app-more_data{
		  width: 100%;
		  border-radius: 8rpx;
      .app-more_data-imgbox{
        height: 150rpx;
        border-radius: 16rpx;
        overflow: hidden;
      }
	  }
	  .welfare-image{
		  height: 180rpx;
		  width: 100%;
		  display: block;
		  overflow: hidden;
	  }
  }
}
.mt20{
	margin-bottom: 20rpx;
}
</style>