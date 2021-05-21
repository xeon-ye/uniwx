<template>
  <view class="invoice-item">
    <text v-if="item.is_invoice == 1" class="item-tag">已开发票</text>
    <view class="item-top-info">
      <view class="item-top-left">
        <view class="item-select" @click="setItemSelect">
          <icon
            v-if="itemSelect && item.is_invoice == 0"
            name="circle-fill"
            size="40"
            unit="rpx"
            class="item-selct-icon"
            color="#2cb241"
          ></icon>
          <icon
            v-else-if="item.is_invoice == 0"
            name="circle"
            size="40"
            unit="rpx"
            class="item-noselct-icon"
          ></icon>
        </view>
        <view class="order-num">
          <text class="order-num-lab">订单号：</text>
          <view class="order-num-val">
            <text class="order-num-text">{{ item.order_sn }}</text>
            <text class="order-num-copy-btn" @click="copyOrderNum"></text>
          </view>
        </view>
      </view>
      <view class="item-top-right">
        <view class="get-price">
          <text class="get-price-icon">¥</text>
          <text class="get-price-text">{{item.total_amount}}</text>
        </view>
        <text v-if="item.order_total > 0" class="original-price">¥{{item.order_total}}</text>
      </view>
    </view>
    <view class="addrss-info">
      <view class="address-from">
        <text class="from-city">{{ item.sender_addr }}</text>
        <text class="from-person">{{ item.sender_name }}</text>
      </view>
      <view class="address-date">
        <text class="date-title">寄件时间</text>
        <text class="date-icon"></text>
        <text class="date-val">{{ item.created }}</text>
      </view>
      <view class="address-to">
        <text class="to-city">{{ item.addressee_addr }}</text>
        <text class="to-person">{{ item.addressee_name }}</text>
      </view>
    </view>
    <view v-if="item.coupon_info && item.coupon_info.money > 0" class="coupon-info">
      <text class="info-title">抵扣明细</text>
      <view class="info-conetnt">
        <text class="conetnt-lab">{{item.coupon_name}}</text>
        <text class="conetnt-text">¥{{item.coupon_info.money}}</text>
      </view>
    </view>
  </view>
</template>

<script>
import icon from "@/components/tui-icon/tui-icon.vue";
export default {
  components: {
    icon,
  },
  name: "invoiceitem",
  props: {
    item: {
      type: Object,
      default: {},
    },
    selectordersns: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
    };
  },
  computed: {
    itemSelect() {
      return this.selectordersns.indexOf(this.item.order_sn) > -1;
    },
  },
  onLoad(options) {},
  methods: {
    setItemSelect() {
      if(this.item.is_invoice == 1){//已开过票的禁止点击
        return;
      }
      this.$emit("select", this.item);
    },
    copyOrderNum() {
      let _self = this;
      uni.setClipboardData({
        data: _self.item.order_sn,
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
.invoice-item {
  position: relative;
  width: 690rpx;
  margin-top: 20rpx;
  padding: 16rpx 28rpx 22rpx;
  box-sizing: border-box;
  background: #fff;
  border-radius: 16rpx;
  .item-tag {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    width: 154rpx;
    height: 42rpx;
    font-size: 24rpx;
    font-weight: bold;
    color: #fff;
    align-items: center;
    justify-content: center;
    border-radius: 0 16rpx 0 16rpx;
    background-image: linear-gradient(45deg, #ff9b00 0%, #ff6c00 100%);
  }
}
.item-top-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .item-top-left {
    display: flex;
    align-items: center;
    .item-select {
      display: block;
      width: 40rpx;
      margin-right: 18rpx;
    }
    .order-num {
    }
    .order-num-lab {
      display: block;
      font-size: 24rpx;
      color: #7b7b7b;
      line-height: 34rpx;
      font-weight: bold;
    }
    .order-num-val {
      display: flex;
      margin-top: 4rpx;
      font-size: 24rpx;
      color: #000;
      line-height: 34rpx;
      font-weight: bold;
      align-items: center;
    }
    .order-num-text {
      margin-right: 28rpx;
    }
    .order-num-copy-btn{
      display: block;
      width: 18rpx;
      height: 22rpx;
      margin-left: 14rpx;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAWCAMAAAD6gTxzAAAAV1BMVEUAAAAAAAApKSmgoKAAAADX19cVFRUSEhIVFRUAAAChoaEnJycWFhYAAAAAAAAYGBgAAAD////X19cnJyc3Nzfv7+/W1tYzMzP7+/vJycnx8fHw8PCdnZ3UBMN2AAAAEXRSTlMADu/9A/7o4tZm/vDtYB7caBirf2oAAAB1SURBVBjTzdFJDoAgDEBRW1HBGarF6f7nFMQoxAv4l2/RpG02VvRUdiJztTmbuyKX4IlYPzEGMlov23y1Nj2A8LQcU8gSouw87TaeV3map3geBTIvmb8Qf6itebUpKYkNpSQAekzJBRivHWiok+O4hCqjl6gTQaMYlIhbCf8AAAAASUVORK5CYII=) no-repeat center;
      background-size: 100%;
    }
  }
  .item-top-right {
    text-align: center;
    .get-price {
      height: 50rpx;
      color: #000;
    }
    .get-price-icon {
      font-size: 36rpx;
    }
    .get-price-text {
      font-size: 44rpx;
    }
    .original-price {
      display: block;
      font-size: 24rpx;
      color: #7b7b7b;
      line-height: 34rpx;
	  text-decoration: line-through;
    }
  }
}
.addrss-info {
  display: flex;
  margin-top: 20rpx;
  align-items: center;
  justify-content: space-between;
  .address-from {
    max-width: 260rpx;
    .from-city {
      display: block;
      font-size: 32rpx;
      line-height: 44rpx;
      color: #000;
      text-align: center;
    }
    .from-person {
      display: block;
      margin-top: 2rpx;
      font-size: 28rpx;
      line-height: 40rpx;
      color: #7b7b7b;
      text-align: center;
    }
  }
  .address-to {
    max-width: 260rpx;
    .to-city {
      display: block;
      font-size: 32rpx;
      line-height: 44rpx;
      color: #000;
      text-align: center;
    }
    .to-person {
      display: block;
      margin-top: 2rpx;
      font-size: 28rpx;
      line-height: 40rpx;
      color: #7b7b7b;
      text-align: center;
    }
  }
  .address-date {
    width: 194rpx;
    .date-title {
      display: block;
      font-size: 24rpx;
      line-height: 34rpx;
      color: #7b7b7b;
      text-align: center;
    }
    .date-val {
      display: block;
      margin-top: 2rpx;
      font-size: 20rpx;
      line-height: 28rpx;
      color: #000;
      text-align: center;
    }
    .date-icon {
      display: block;
      width: 194rpx;
      height: 20rpx;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAAAUCAMAAADoWBIxAAAAb1BMVEX////9wGr/9+z/8Nr/7NH+3rD9xnj9wm7+4LT+1Zv+z4v9xHP/9eb/7dT+2KL/6cn/47z/4rn+26r/6sz+zIX/5sP+05f9yH3/8+L/7tf/6Mb/5cD+2qb+0ZL/8d7+15/9yoD/687+3a3//fv/+fCnUIBFAAAA3klEQVRIx+3WXa6CQAwF4HYE4SpcxT8GRUSH/a9RoXasovHFqE38NtDTNCcz8PMpzmwMqGayOjo4UMxNIsTcgmZmgYih7jPEEeIwAc1MjYgz3WfIUH0bklp/G0JU34Yk19+GWH8bbHsGfqKb6mRwpWCpF5B9a04mZN1asg2ZnmWd+CJkh86Mlexf2LE/adUZt22w9GNK76QiMhRHkplEGJFDTOeRnS0beQtWk5wMvbEXeSiUDsDZYP/eFUYvW4Ha0FSn+IqvgCW4RjJPJQ/ZvqpvcEdxI+0LHirg5wscASwKQjwSH3+QAAAAAElFTkSuQmCC)
        no-repeat center;
      background-size: 100%;
    }
  }
}
.coupon-info {
  display: flex;
  padding-top: 22rpx;
  margin-top: 16rpx;
  align-items: center;
  justify-content: space-between;
  border-top: 2rpx dashed #b1afaf;
  .info-title {
    display: block;
    font-size: 24rpx;
    line-height: 34rpx;
    color: #7b7b7b;
  }
  .info-conetnt {
    display: flex;
    align-items: center;
    font-size: 24rpx;
    line-height: 34rpx;
    color: #ff6c00;
    .conetnt-lab {
      display: block;
    }
    .conetnt-text {
      display: block;
      margin-left: 30rpx;
    }
  }
}
</style>