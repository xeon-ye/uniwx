<template>
  <view class="app-container">
    <!-- board -->
    <view class="tui-notice-board">
      <view class="tui-rolling-news">
        <tui-icon name="news-fill" :size="28" color="#FF4848"></tui-icon>
        <swiper vertical autoplay circular interval="3000" class="tui-swiper">
          <swiper-item
            v-for="(item, index) in tipsList"
            :key="index"
            class="tui-swiper-item"
          >
            <view class="tui-news-item" @tap="detail">{{ item.text }}</view>
          </swiper-item>
        </swiper>
      </view>
    </view>
    <!-- success -->
    <view class="order-success-box">
      <view class="row">
        <img src="../../static/success.png" alt="" />
        <text class="black">下单成功</text>
        <text class="gray">快递小哥即将上门取件，请注意接听来电</text>
      </view>
      <view class="tip">
        <img src="../../static/tip.png" alt="" />
        <view
          >小贴士:国际寄件费用为揽收到仓库称重计费后支付
          请勿向快递员支付费用</view
        >
      </view>
     <!-- <view class="code-wrap">
        <text>快递员取件码</text>
        <view class="num-list">
          <view class="num-item">1</view>
          <view class="num-item">4</view>
          <view class="num-item">6</view>
          <view class="num-item">9</view>
          <view class="num-item">9</view>
        </view>
      </view> -->
    </view>
    <view class="order-info-wrap">
      <view class="order-info-box">
        <view class="order-row">
          <view class="left">
            <text class="gray">订    单    号：</text>
            <text>{{ orderInfo.order_sn }}</text>
            <img src="../../static/copy.png" @click="copyData" alt="" />
          </view>
          
        </view>
		<view class="order-row">
		  <view class="left">
		    <text class="gray">下单时间：</text>
		    <text>{{ orderInfo.created }}</text>
		  </view>
		</view>
        <view class="order-site">
          <view class="flex-box left">
            <view class="top">{{ orderInfo.sender_addr }}</view>
            <view class="bottom gray">{{ orderInfo.sender_name }}</view>
          </view>
          <view class="flex-box center">
            <view class="top orange">待揽收</view>
            <img src="../../static/orderlist-address-icon.png" alt="" />
          </view>
          <view class="flex-box right">
            <view class="top">{{ orderInfo.addressee_addr }}</view>
            <view class="bottom gray">{{ orderInfo.sender_name }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="bottom-btn-box">
      <button class="left"  open-type="share">通知收件人</button>
      <button class="right" @click="toOrderList">查看订单</button>
    </view>
  </view>
</template>

<script>
import Api from "../../services/index";
export default {
  components: {},
  data() {
    return {
      tipsList: [], // 提示
	  orderId:"",
	  orderInfo:{}
    };
  },
  async onLoad(options) {
    let tipsRes = await Api.getAlert();
    this.tipsList = tipsRes.data;
    setTimeout(() => {
      this.animation = true;
    }, 600);
	
	this.orderId = options.order_sn;
	let _self = this;
	this.$api.getOrderInfo({ order_sn: _self.orderId }).then((res) => {
	  if (res.status == 1) {
	    _self.orderInfo = res.data;
	  } else {
	    _self.$toast(res.info);
	  }
	});
  },
  methods: {
    navTo(url) {
      this.$href.navigateTo({ url: url });
    },
    toOrderList(){
      uni.navigateTo({
        url: "/pages/tabbar-2/detail?order_sn="+this.orderId,
      })
    },
	copyData() {
		  let data = this.orderId;
		  uni.setClipboardData({
		      data: data,
		      success: function () {
		          uni.showToast({
		          	title:"内容已复制"
		          })
		      }
		  });
	}
  },
  onShareAppMessage(res) {
  	if(res.from == "button") {
  		let token = this.$cache.get('token');
  		return {
  			title:"请查看你的速递信息",
  			path:"pages/tabbar-2/detail?order_sn="+this.orderId+"&from=share&token="+token
  		}
  	}
  },
};
</script>

<style lang="scss">
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx 20rpx;
  background: #f3f3f3;
  .tui-notice-board {
    width: 100%;
    padding-right: 30rpx;
    box-sizing: border-box;
    font-size: 28rpx;
    height: 60rpx;
    background: rgba(255, 217, 188, 0.5);
    display: flex;
    align-items: center;
    border-radius: 16rpx;
    overflow: hidden;
    .tui-rolling-news {
      width: 100%;

      padding: 12rpx 30rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: nowrap;
    }

    .tui-swiper {
      font-size: 28rpx;
      height: 50rpx;
      flex: 1;
    }

    .tui-swiper-item {
      display: flex;
      align-items: center;
    }

    .tui-news-item {
      line-height: 28rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .order-success-box {
    background: #fff;
    padding: 40rpx 30rpx 24rpx;
    border-radius: 8px;
    margin-top: 30rpx;
    .row {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 20rpx;
      > img {
        width: 140rpx;
        height: 140rpx;
      }
      .black {
        color: #000000;
        font-size: 22px;
        line-height: 30px;
        margin: 20rpx 0;
      }
      .gray {
        color: #7b7b7b;
        font-size: 14px;
        line-height: 20px;
      }
    }
    .tip {
      background: #ffecdd;
      border-radius: 8px;
      display: flex;
      align-items: center;
      color: #ff0000;
      font-size: 12px;
      line-height: 17px;
      margin-bottom: 20rpx;
      padding: 10rpx 16rpx;
      img {
        width: 32rpx;
        height: 32rpx;
        margin-right: 20rpx;
      }
      view {
        width: calc(100% - 32rpx);
      }
    }
    .code-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      > text {
        color: #7b7b7b;
        margin-bottom: 5px;
      }
      .num-list {
        display: flex;
        justify-content: space-between;
        width: 60%;
        .num-item {
          width: 60rpx;
          height: 96rpx;
          line-height: 96rpx;
          color: #015ad7;
          background: #e6edfb;
          text-align: center;
          font-size: 68rpx;
          line-height: 96rpx;
        }
      }
    }
  }
  .order-info-wrap {
      width: 100%;
    .order-info-box {
      margin-top: 20px;
      background: #fff;
      border-radius: 8px;
      padding: 30rpx;
      
      .gray {
		  width: 140rpx;
		  display: block;
		  font-size: 28rpx;
        color: #7b7b7b;
      }
      .orange {
        color: #ff6c00;
      }
      .order-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
			display: flex;
          img {
            width: 9px;
            height: 11px;
            margin-left: 10rpx;
			margin-top: 10rpx;
			
          }
        }
      }
      .order-site {
        display: flex;
        justify-content: center;
        margin-top: 30rpx;
        padding-bottom: 30rpx;
        .flex-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
		  text-align: center;
          width: 33.3%;
          .top {
            margin-bottom: 10rpx;
          }
        }
        .center {
          img {
            width: 200rpx;
            height: 20rpx;
          }
        }
      }
      .order-detail-box {
        display: flex;
        justify-content: center;
        padding: 32rpx 0 10rpx 0;
        .order-detail {
          display: flex;
          align-items: center;
          img {
            width: 10px;
            height: 6px;
            margin-left: 8rpx;
          }
        }
      }
    }
  }
  .bottom-btn-box {
    margin-top: 24rpx;
    display: flex;
    justify-content: space-between;
    width: 100%;
    button {
      width: 48%;
      height: 90rpx;
      border-radius: 8px;
    }
    .left {
      border: 1px solid #ff6c00;
      color: #ff6c00;
    }
    .right {
      color: #7b7b7b;
    }
  }
}
</style>
