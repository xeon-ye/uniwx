<template>
  <view class="wrap">
    <view class="top-num-info">
      <text class="info-lab">订单号:</text>
      <text class="info-val">{{ orderInfo.order_sn }}</text>
      <text class="copy-btn" @click="copyId"></text>
    </view>
    <view class="order-address-from-info order-address">
      <text class="info-icon">寄</text>
      <view class="info-right">
        <view class="person-info">
          <text class="person-name">{{ orderInfo.sender_name }}</text>
          <text class="person-phone">{{ orderInfo.sender_mobile }}</text>
        </view>
        <text class="info-address">{{ orderInfo.sender_addr_info }}</text>
      </view>
    </view>
    <view class="order-address-to-info order-address">
      <text class="info-icon">收</text>
      <view class="info-right">
        <view class="person-info">
          <text class="person-name">{{ orderInfo.addressee_name }}</text>
          <text class="person-phone">{{ orderInfo.addressee_mobile }}</text>
        </view>
        <text class="info-address">{{ orderInfo.addressee_addr_info }}</text>
      </view>
    </view>
    <view class="order-info-list">
      <view class="order-info-item">
        <text class="item-lab">订单金额</text>
        <text class="item-val">¥ {{ orderInfo.total_amount }}</text>
      </view>
      <view class="order-info-item">
        <text class="item-lab">订单时间</text>
        <text class="item-val">{{ orderInfo.created }}</text>
      </view>
    </view>
    <view class="order-addrss-city">
      <text class="city-from">{{ orderInfo.sender_addr }}</text>
      <text class="city-from-icon"></text>
      <text class="city-to">{{ orderInfo.addressee_addr }}</text>
    </view>
    <view class="btn-box"  v-if="orderInfo.order_status == 8">
      <button class="btn-item share-btn" open-type="share">分享给收件人</button>
      <navigator
        class="btn-item"
        :url="`/pages/tabbar-2/shipping?order_id=${orderId}`"
        hover-class="none"
        >查看物流信息</navigator
      >
    </view>
  </view>
</template>

<script>
import { domain } from "../../utils/request.js";
export default {
  data() {
    return {
      orderId: "",
      orderInfo: {},
	  token:""
    };
  },
  onLoad(options) {
    this.orderId = options.order_sn;
	if(options.from == "share") {
		this.token = options.token;
		this.getShareOrder();
	} else {
		this.getDetail();
	}
  },
  onShow() {
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
  methods: {
    getDetail() {
      let _self = this;
      this.$api.getOrderInfo({ order_sn: _self.orderId }).then((res) => {
        if (res.status == 1) {
          _self.orderInfo = res.data;
        } else {
          _self.$toast(res.info);
        }
      });
    },
	getShareOrder() {
		let _this = this;
		uni.showLoading({
		    title: '加载中...'
		});
		let params = {
			order_sn: _this.orderId
		}
		uni.request({
		    url: domain() + "order/getInfo", //仅为示例，并非真实接口地址。
		    data: params,
		    method: "POST",
		    header: {
		        'token': _this.token, //自定义请求头信息
		        'content-type': 'application/x-www-form-urlencoded'
		    },
		    success: (res) => {
				_this.orderInfo = res.data.data;
				uni.hideLoading();
		    },
		    fail: (err) => {
				uni.hideLoading();
		    },
		    complete: () => {
		        uni.hideLoading();
		    }
		});
	},
    copyId() {
      let _self = this;
      uni.setClipboardData({
        data: _self.orderInfo.order_sn,
        success: function () {
          _self.$toast("复制成功～");
        },
        fail: function () {
          _self.$toast("复制失败，请稍后再试～");
        },
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
.wrap {
  width: 690rpx;
  margin: 20rpx auto;
  padding: 20rpx;
  background: #fff;
  border-radius: 16rpx;
  box-sizing: border-box;
}
.top-num-info {
  display: flex;
  align-items: center;
  font-size: 28rpx;
  .info-lab {
    color: #7b7b7b;
  }
  .info-val {
    margin-left: 8rpx;
    color: #000;
  }
  .copy-btn {
    display: block;
    width: 18rpx;
    height: 22rpx;
    margin-left: 14rpx;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAWCAMAAAD6gTxzAAAAV1BMVEUAAAAAAAApKSmgoKAAAADX19cVFRUSEhIVFRUAAAChoaEnJycWFhYAAAAAAAAYGBgAAAD////X19cnJyc3Nzfv7+/W1tYzMzP7+/vJycnx8fHw8PCdnZ3UBMN2AAAAEXRSTlMADu/9A/7o4tZm/vDtYB7caBirf2oAAAB1SURBVBjTzdFJDoAgDEBRW1HBGarF6f7nFMQoxAv4l2/RpG02VvRUdiJztTmbuyKX4IlYPzEGMlov23y1Nj2A8LQcU8gSouw87TaeV3map3geBTIvmb8Qf6itebUpKYkNpSQAekzJBRivHWiok+O4hCqjl6gTQaMYlIhbCf8AAAAASUVORK5CYII=)
      no-repeat center;
    background-size: 100%;
  }
}
.order-address {
  display: flex;
  margin-top: 20rpx;
  padding-bottom: 20rpx;
  align-items: center;
  border-bottom: 2rpx dashed #b1afaf;
  .info-icon {
    display: flex;
    width: 60rpx;
    height: 60rpx;
    font-size: 32rpx;
    color: #fff;
    border-radius: 50%;
    font-weight: bold;
    align-items: center;
    justify-content: center;
  }
  &.order-address-from-info {
    .info-icon {
      background: #ff0000;
    }
  }
  &.order-address-to-info {
    .info-icon {
      background: #4991fe;
    }
  }
  .info-right {
    margin-left: 40rpx;
    font-size: 28rpx;
    color: #000;
    line-height: 40rpx;
    .person-info {
      display: flex;
      align-items: center;
      .person-name {
        margin-right: 20rpx;
      }
    }
    .info-address {
      display: -webkit-box;
      margin-top: 10rpx;
      max-height: 80rpx;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      word-wrap: break-word;
      word-break: break-all;
      white-space: pre-wrap;
    }
  }
}
.order-info-list {
  padding: 16rpx 0 30rpx;
  border-bottom: 2rpx dashed #b1afaf;
  .order-info-item {
    display: flex;
    margin-top: 16rpx;
    align-items: center;
    justify-content: space-between;
    .item-lab {
      font-size: 28rpx;
      color: #7b7b7b;
      line-height: 40rpx;
    }
    .item-val {
      font-size: 36rpx;
      color: #000;
      line-height: 50rpx;
    }
  }
}
.order-addrss-city {
  display: flex;
  padding: 38rpx 0;
  align-items: center;
  border-bottom: 2rpx dashed #b1afaf;
  .city-from,
  .city-to {
    display: block;
    width: 214rpx;
    font-size: 36rpx;
    color: #000;
    line-height: 50rpx;
    font-weight: bold;
  }
  .city-to {
    text-align: end;
  }
  .city-from-icon {
    display: block;
    width: 194rpx;
    height: 20rpx;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAAAUCAMAAADoWBIxAAAAb1BMVEX////9wGr/9+z/8Nr/7NH+3rD9xnj9wm7+4LT+1Zv+z4v9xHP/9eb/7dT+2KL/6cn/47z/4rn+26r/6sz+zIX/5sP+05f9yH3/8+L/7tf/6Mb/5cD+2qb+0ZL/8d7+15/9yoD/687+3a3//fv/+fCnUIBFAAAA3klEQVRIx+3WXa6CQAwF4HYE4SpcxT8GRUSH/a9RoXasovHFqE38NtDTNCcz8PMpzmwMqGayOjo4UMxNIsTcgmZmgYih7jPEEeIwAc1MjYgz3WfIUH0bklp/G0JU34Yk19+GWH8bbHsGfqKb6mRwpWCpF5B9a04mZN1asg2ZnmWd+CJkh86Mlexf2LE/adUZt22w9GNK76QiMhRHkplEGJFDTOeRnS0beQtWk5wMvbEXeSiUDsDZYP/eFUYvW4Ha0FSn+IqvgCW4RjJPJQ/ZvqpvcEdxI+0LHirg5wscASwKQjwSH3+QAAAAAElFTkSuQmCC)
      no-repeat center;
    background-size: 100%;
  }
}
.btn-box {
  display: flex;
  padding-top: 30rpx;
  justify-content: flex-end;
  .btn-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 170rpx;
    height: 50rpx;
    margin: 0;
    padding: 0;
    font-size: 24rpx;
    color: #000;
    border: 1rpx solid #000;
    border-radius: 30rpx;
    box-sizing: border-box;
  }
  .share-btn {
    margin-right: 20rpx;
    color: #ff6c00;
    border-color: #ff6c00;
  }
}
</style>
     <view class="btn-box">
         <navigator :url="`/pages/tabbar-2/shipping?order_id=`" hover-class="none">查看物流信息</navigator>
    </view>