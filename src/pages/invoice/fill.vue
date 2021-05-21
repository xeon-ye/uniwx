<template>
  <view class="submit-wrap">
    <view class="fill-in-content">
      <view class="content-title">
        <text class="title-text">填写发票信息</text>
        <text class="title-text2">电子发票</text>
      </view>
      <view class="head-type">
        <text class="type-lab">抬头类型</text>
        <view class="type-list">
          <view
            class="type-item"
            :class="{ cur: selectHeadType == 1 }"
            @click="slectheadType(1)"
          >
            <icon
              v-if="selectHeadType == 1"
              class="select-type-icon"
              name="check"
              color="#fff"
              size="32"
              unit="rpx"
            ></icon>
            <text class="item-text">个人/事业单位</text>
          </view>
          <view
            class="type-item"
            :class="{ cur: selectHeadType == 2 }"
            @click="slectheadType(2)"
          >
            <icon
              v-if="selectHeadType == 2"
              class="select-type-icon"
              name="check"
              color="#fff"
              size="32"
              unit="rpx"
            ></icon>
            <text class="item-text">单位</text>
          </view>
        </view>
      </view>
      <view class="fill-in-item">
        <view class="item-lab">
          <text class="must-icon">*</text>
          <text class="lab-text">发票抬头</text>
        </view>
        <input
          type="text"
          placeholder="请填写发票抬头"
          val="invoiceHead"
          @input="fillInInvoiceHead"
        />
      </view>
      <view class="fill-in-item">
        <view class="item-lab">
          <text class="must-icon"></text>
          <text class="lab-text">纳税人识别号</text>
        </view>
        <input
          type="text"
          placeholder="请填写纳税人识别号"
          val="discernNum"
          @input="fillInDiscernNum"
        />
      </view>
      <view class="fill-in-item">
        <view class="item-lab">
          <text class="must-icon">*</text>
          <text class="lab-text">发票金额</text>
        </view>
        <text class="invoice-price">¥{{ invoicePrice }}</text>
      </view>
      <view class="fill-in-item">
        <view class="item-lab">
          <text class="must-icon"></text>
          <text class="lab-text">发送邮箱</text>
        </view>
        <input
          type="text"
          placeholder="请填写接收填写邮箱"
          val="emailText"
          @input="fillIniEmailText"
        />
      </view>
    </view>
    <view class="bottom-text">
      <text class="f"></text><text class="yellow"></text>
    </view>
    <button class="submit-fill-btn" type="submit" @click="submitInvoiceInfo">
      提交开票
    </button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      selectOrderIds: "",//选中订单号
      selectHeadType: 1,
      invoiceHead: "", //抬头
      discernNum: "", //纳税人识别号
      invoicePrice: 0, //发票金额
      emailText: "", //邮箱地址
    };
  },
  onLoad(options) {
      this.invoicePrice = options.price;
      this.selectOrderIds = options.ids;
  },
  onShow() {},
  methods: {
    slectheadType(type) {
      this.selectHeadType = type;
    },
    fillInInvoiceHead(e) {
      this.invoiceHead = e.target.value;
    },
    fillInDiscernNum(e) {
      this.discernNum = e.target.value;
    },
    fillIninvoIcePrice(e) {
      this.invoicePrice = e.target.value;
    },
    fillIniEmailText(e) {
      this.emailText = e.target.value;
    },
    submitInvoiceInfo() {
      var _self = this;
      var data = {
        type: this.selectHeadType, //发票类型
        head: this.invoiceHead, //抬头
        number: this.discernNum, //纳税人识别号
        money: this.invoicePrice, //发票金额
        email: this.emailText, //邮箱地址
        orderId: this.selectOrderIds, //订单号:数组，逗号间隔
      };
      this.$api.aaddInvoice(data).then((res) => {
        if (res.status == 1) {
          _self.$toast("提交成功");
          setTimeout(()=>{
            uni.redirectTo({
              url: '/pages/invoice/index',
            })
          },1000)
        } else {
          _self.$toast(res.info + "，请稍后再试～");
        }
      });
    },
  },
};
</script>

<style lang="scss">
.submit-wrap {
  width: 100%;
  padding-bottom: 220rpx;
  .fill-in-content {
    width: 690rpx;
    margin: 20rpx auto 0;
    padding: 30rpx;
    background: #fff;
    border-radius: 16rpx;
    box-sizing: border-box;
  }
  .content-title {
    display: flex;
    align-items: center;
    .title-text {
      font-size: 32rpx;
      line-height: 44rpx;
      color: #000;
      font-weight: bold;
    }
    .title-text2 {
      margin-left: 80rpx;
      font-size: 28rpx;
      line-height: 40rpx;
      color: #000;
    }
  }
  .head-type {
    margin-top: 30rpx;
    .type-lab {
      font-size: 28rpx;
      line-height: 40rpx;
      color: #000;
    }
    .type-list {
      display: flex;
      margin-top: 18rpx;
      align-items: center;
    }
    .type-item {
      display: flex;
      width: 270rpx;
      height: 80rpx;
      font-size: 28rpx;
      color: #000;
      align-items: center;
      justify-content: center;
      background: #f3f3f3;
      border-radius: 8rpx;
      &.cur {
        color: #fff;
        background: #ff6d00;
      }
      &:last-child {
        margin-left: 80rpx;
      }
    }
    .select-type-icon {
      margin-right: 10rpx;
    }
  }
  .fill-in-item {
    margin-top: 38rpx;
    padding-bottom: 10rpx;
    border-bottom: 2rpx dashed #b1afaf;
    .item-lab {
      display: flex;
      align-items: center;
      .must-icon {
        display: block;
        width: 30rpx;
        font-size: 28rpx;
        color: #ff6d00;
      }
      .lab-text {
        font-size: 32rpx;
        line-height: 44rpx;
        color: #000;
        font-weight: bold;
      }
    }
    input,
    .invoice-price {
      height: 40rpx;
      margin-top: 20rpx;
      padding-left: 30rpx;
      font-size: 28rpx;
      line-height: 40rpx;
      .input-placeholder {
        color: #7b7b7b;
        font-size: 28rpx;
      }
    }
  }
  .submit-fill-btn {
    display: flex;
    position: fixed;
    bottom: 94rpx;
    left: 32rpx;
    align-items: center;
    justify-content: center;
    width: 686rpx;
    height: 80rpx;
    font-size: 32rpx;
    color: #fff;
    border-radius: 50rpx;
    background-image: linear-gradient(45deg, #ff9b00 0%, #ff6c00 100%);
  }
}
</style>