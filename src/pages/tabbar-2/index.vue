<template>
  <view class="content">
    <view class="navbar">
      <view
        v-for="(item, index) in navList"
        :key="index"
        class="nav-item"
        :class="{ current: tabCurrentStatus == item.status }"
        @click="tabClick(item)"
      >
        {{ item.text }}
      </view>
    </view>
    <view v-if="tabCurrentStatus == 2 && messageboxShow" class="message-box">
      <icon
        class="close-icon"
        name="shut"
        :size="40"
        unit="rpx"
        color="#000000"
        index="1"
        @click="messagePopClose"
      ></icon>
      <icon
        class="news-icon"
        name="news"
        :size="32"
        unit="rpx"
        color="#ffffff"
      ></icon>
      <view class="message-info">
        <text class="message-title">重要提示</text>
        <text class="message-text"
          >支付完成前可更改提货自提/派送到门，单独寄送/合箱寄送，支付后不可更改</text
        >
      </view>
    </view>

    <view class="order-list">
      <!-- 空白页 -->
      <empty v-if="orderlist.length == 0 && loadingType == 'noMore'"></empty>

      <!-- 订单列表 -->
      <orderItem
        v-for="(orderitem, orderindex) in orderlist"
        :item="orderitem"
        :key="orderindex"
        :payorderid="payOrderId"
        v-on:setitempay="toPay"
        @cancelorder="cancelOrderItem"
      ></orderItem>

      <uni-load-more
        :status="loadingType"
      ></uni-load-more>
    </view>
    <!-- <view v-if="payOrderId != ''" class="bttom-pay">
      <view class="price-box">
        <text class="price-lab">应付金额:</text>
        <text class="price-num">¥{{ toglePrice }}</text>
      </view>
      <text class="pay-btn" @click="toPay">立即支付</text>
    </view> -->
  </view>
</template> 
<script>
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
import empty from "@/components/empty";
import orderItem from "@/components/order-item/order-item.vue";
import icon from "@/components/tui-icon/tui-icon.vue";
import { get } from "@/utils/cache";
export default {
  components: {
    uniLoadMore,
    empty,
    icon,
    orderItem,
  },
  data() {
    return {
      messageboxShow: true,
      pageNum: 1,
      loadingType: "more",
      tabCurrentStatus: -1,
      getorderListLock: false,
      orderTotal: 10,
      navList: [
        {
          status: -1,
          text: "全部订单",
          loadingType: "more",
          orderList: [],
          pageNo: 1,
          pageSize: 10,
          totalPage: 1,
        },
        {
          status: 6,
          text: "待揽收",
          loadingType: "more",
          orderList: [],
          pageNo: 1,
          pageSize: 10,
          totalPage: 1,
        },
        {
          status: 7,
          text: "待处理",
          loadingType: "more",
          orderList: [],
          pageNo: 1,
          pageSize: 10,
          totalPage: 1,
        },
        {
          status: 0,
          text: "待支付",
          loadingType: "more",
          orderList: [],
          pageNo: 1,
          pageSize: 10,
          totalPage: 1,
        },
        {
          status: 8,
          text: "运输中",
          loadingType: "more",
          orderList: [],
          pageNo: 1,
          pageSize: 10,
          totalPage: 1,
        },
        {
          status: 4,
          text: "已签收",
          loadingType: "more",
          orderList: [],
          pageNo: 1,
          pageSize: 10,
          totalPage: 1,
        },
      ],
      orderlist: {},
      toglePrice: 0,
      payOrderId: "",//当前选中需要支付的订单id,暂时禁用
    };
  },
  onLoad(options) {
    let token = get("token");
    //别的操作
    if (token) {
      this.loadData();
    } else {
      uni.redirectTo({
        url: "/pages/login/index",
      });
    }
  },
  onShow() {},
  onReachBottom() {
    this.loadData();
  },
  methods: {
    //获取订单列表
    loadData(source) {
      var _self = this;
      if (_self.getorderListLock || _self.loadingType == "noMore") {
        return;
      }
      _self.getorderListLock = true;
      _self.loadingType = "loading";
      var param = {
        size: 10,
        page: _self.pageNum,
        order_status: _self.tabCurrentStatus,
      };
      this.$api.getAllOrderList(param).then(function (res) {
        if (res.status === 1) {
          let orderTotal = res.data.total;
          _self.orderlist =
            _self.pageNum == 1
              ? res.data.list
              : _self.orderlist.concat(res.data.list);

          _self.pageNum++;
          _self.loadingType = (_self.orderlist.length >= orderTotal || res.data.list.length == 0) ?  "noMore" : "more";
        } else {
          _self.$toast("加载失败，请重试");
        }
        uni.hideLoading();
        _self.getorderListLock = false;
      });
    },
    //顶部tab点击
    tabClick(item) {
      this.tabCurrentStatus = item.status;
      this.pageNum = 1;
      this.payOrderId = "";
      this.loadingType = "more";
      this.orderlist = [];
      this.loadData("tabChange");
    },
    messagePopClose(pro) {
      this.messageboxShow = false;
    },
    //删除订单
    cancelOrderItem() {
      this.pageNum = 1;
      this.payOrderId = "";
      this.loadingType = "more";
      this.orderlist = [];
      this.loadData();
    },
    // setOrderPay(item) {
    //   if (this.payOrderId == item.order_sn) {
    //     this.payOrderId = "";
    //     this.toglePrice = 0;
    //     return;
    //   }
    //   this.toglePrice = item.total_amount;
    //   this.payOrderId = item.order_sn;
    // },
    toPay(item) {
      let _self = this;
      let wx_openid = this.$cache.get("openId");
      let proData = {
        openId: wx_openid,
        order_sn: item.order_sn,
      };
      this.$api.orderPay(proData).then((res) => {
        if (res.status == 1) {
          uni.requestPayment({
            provider: "wxpay",
            orderInfo: "orderInfo",
            timeStamp: res.data.timeStamp,
            nonceStr: res.data.nonceStr,
            package: res.data.package,
            signType: res.data.signType,
            paySign: res.data.paySign,
            success(payRes) {
              if (payRes.errMsg == "requestPayment:ok") {
                uni.showToast({
                  title: "支付成功",
                  icon: "success",
                  duration: 2000,
                });
                setTimeout(() => {
                  _self.pageNum = 1;
                  _self.loadData();
                }, 2000);
              }
            },
            fail(payErrRes) {
              console.log(payRes);
              _self.$toast("支付失败");
            },
          });
        } else {
          _self.$toast(res.info);
          return;
        }
      });
    },
  },
};
</script>

<style lang="scss">
html,
body,
page {
  background: #f3f3f3;
}
.content {
  padding-top: 80rpx;
  background: #f3f3f3;
}

.navbar {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80rpx;
  padding: 0 10rpx 0 20rpx;
  background: #fff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
  z-index: 50;
  .nav-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 120rpx;
    // font-weight: bold;
    font-size: 28rpx;
    color: #303133;
    position: relative;
    &.current {
      color: #ff6c00;
      &:after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 120rpx;
        height: 0;
        border-bottom: 2px solid #ff6c00;
      }
    }
  }
}
.message-box {
  display: flex;
  position: relative;
  width: 690rpx;
  height: 128rpx;
  margin: 20rpx auto 0;
  background-color: rgba(255, 217, 188, 0.8);
  align-items: center;
  border-radius: 20rpx;
  .news-icon {
    margin-left: 14rpx;
    background-color: #ff4848;
    margin-top: -8px;
    border-radius: 50%;
  }
  .close-icon {
    position: absolute;
    top: 10rpx;
    right: 16rpx;
  }
  .message-info {
    width: 550rpx;
    margin-left: 16rpx;
    color: #000;
    font-weight: 600;
  }
  .message-title {
    display: block;
    height: 40rpx;
    font-size: 28rpx;
    line-height: 40rpx;
  }
  .message-text {
    display: block;
    font-size: 24rpx;
    line-height: 34rpx;
  }
}

.order-list {
  padding: 20rpx 30rpx 120rpx;
}

/* load-more */
.uni-load-more {
  display: flex;
  flex-direction: row;
  height: 80upx;
  align-items: center;
  justify-content: center;
}

.uni-load-more__text {
  font-size: 28upx;
  color: #999;
}

.uni-load-more__img {
  height: 24px;
  width: 24px;
  margin-right: 10px;
}

.uni-load-more__img > view {
  position: absolute;
}

.uni-load-more__img > view view {
  width: 6px;
  height: 2px;
  border-top-left-radius: 1px;
  border-bottom-left-radius: 1px;
  background: #999;
  position: absolute;
  opacity: 0.2;
  transform-origin: 50%;
  animation: load 1.56s ease infinite;
}

.uni-load-more__img > view view:nth-child(1) {
  transform: rotate(90deg);
  top: 2px;
  left: 9px;
}

.uni-load-more__img > view view:nth-child(2) {
  transform: rotate(180deg);
  top: 11px;
  right: 0;
}

.uni-load-more__img > view view:nth-child(3) {
  transform: rotate(270deg);
  bottom: 2px;
  left: 9px;
}

.uni-load-more__img > view view:nth-child(4) {
  top: 11px;
  left: 0;
}

.load1,
.load2,
.load3 {
  height: 24px;
  width: 24px;
}

.load2 {
  transform: rotate(30deg);
}

.load3 {
  transform: rotate(60deg);
}

.load1 view:nth-child(1) {
  animation-delay: 0s;
}

.load2 view:nth-child(1) {
  animation-delay: 0.13s;
}

.load3 view:nth-child(1) {
  animation-delay: 0.26s;
}

.load1 view:nth-child(2) {
  animation-delay: 0.39s;
}

.load2 view:nth-child(2) {
  animation-delay: 0.52s;
}

.load3 view:nth-child(2) {
  animation-delay: 0.65s;
}

.load1 view:nth-child(3) {
  animation-delay: 0.78s;
}

.load2 view:nth-child(3) {
  animation-delay: 0.91s;
}

.load3 view:nth-child(3) {
  animation-delay: 1.04s;
}

.load1 view:nth-child(4) {
  animation-delay: 1.17s;
}

.load2 view:nth-child(4) {
  animation-delay: 1.3s;
}

.load3 view:nth-child(4) {
  animation-delay: 1.43s;
}

@-webkit-keyframes load {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0.2;
  }
}
.bttom-pay {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120rpx;
  background-color: #fff;
  padding: 0 28rpx;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 16rpx 16rpx 0 0;
  z-index: 50;
  .price-box {
    display: flex;
    align-items: center;
    .price-lab {
      font-size: 32rpx;
      color: #000;
      font-weight: bold;
    }
    .price-num {
      margin-left: 18px;
      font-size: 44rpx;
      color: #ff0000;
      font-weight: bold;
    }
  }
  .pay-btn {
    display: flex;
    width: 290rpx;
    height: 80rpx;
    font-size: 36rpx;
    color: #fff;
    align-items: center;
    justify-content: center;
    border-radius: 50rpx;
    background-image: linear-gradient(45deg, #ff9b00 0%, #ff6c00 100%);
  }
}
</style>