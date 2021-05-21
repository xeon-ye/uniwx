<template>
  <view>
    <view v-if="item.order_status==0" class="order-item-waitpay">
      <view class="to-detail" @click="toDetail"></view>
      <view class="orderinfos">
        <view class="order-num">
          <text class="num-title">订单号</text>
          <text class="num-text">{{item.order_sn}}</text>
          <text class="copy-btn" @click="copyOrderId"></text>
        </view>
        <view class="order-data">
          <text class="data-title">下单时间</text>
          <text class="data-text">{{item.created}}</text>
        </view>
      </view>
      <view class="address-info">
        <view class="address-from">
          <text class="address-from-city">{{item.sender_addr}}</text>
          <text class="address-from-person">{{item.sender_name}}</text>
        </view>
        <view class="address-icon">
          <!-- <text class="text">单独寄送</text> -->
        </view>
        <view class="address-to">
          <text class="address-to-text">{{item.addressee_addr}}</text>
          <text class="address-to-person">{{item.addressee_name}}</text>
          <!-- <text class="address-to-remark">(自提点自提)</text> -->
        </view>
      </view>
      <view class="package-detail">
        <text class="package-detail-btn">包裹详情</text>
        <text class="icon"></text>
      </view>
      <view class="price-info-list">
        <view v-for="items in item.orderItems" :key="items.order_id" class="info-item">
          <text class="info-item-lab">{{items.item_name}}</text>
          <text class="info-item-val">¥{{items.item_price}}</text>
        </view>
        <view v-if="item.coupon_info && item.coupon_info.money > 0" class="info-item">
          <text class="info-item-lab">使用优惠券</text>
          <text class="info-item-val">-¥{{item.coupon_info.money}}</text>
        </view>
      </view>
      <view class="pay-btn-box">
        <text class="order-peice">订单金额：¥{{item.total_amount}}</text>
        <button class="btn-item pay" type="submit" @tap="setPay">微信支付</button>
        <text class="btn-item"  @click="cancelOrder(item.order_sn)">删除订单</text>
      </view>
    </view>
    <view v-else class="order-item">
      <view class="to-detail" @click="toDetail"></view>
      <!-- 右上角按钮信息 -->
      <view class="top-right-box">
        <!-- 待处理-功能暂时不上线 -->
        <!-- <view v-if="0" class="info-cancel">
          <text class="info-text">已取消</text>
        </view>
        <view v-if="0" class="info-btn he-xiang">
          <text class="info-text">可合箱</text>
        </view>
        <view v-if="0" class="info-btn kefu">
          <text class="info-kefu-text">需要客服处理</text>
        </view> -->
        <!-- 已签收 -->
        <view v-if="item.order_status==4" class="info-btn qian-shou">
          <text class="info-qianshou-text">成功签收</text>
        </view>
        <view v-if="item.order_status==4" class="info-btn zi-ti">
          <text class="info-ziti-text">到达自提点</text>
        </view>
      </view>
      <!-- 单号信息 -->
      <view class="orderinfos">
        <view class="orderinfo-item">
          <text class="item-lab">订单号:</text>
          <text class="item-val">{{item.order_sn}}</text>
          <text class="copy-btn" @click="copyOrderId"></text>
        </view>
        <view v-if="item.logistics_no
" class="orderinfo-item">
          <text class="item-lab">国内快递单号:</text>
          <text class="item-val">{{item.logistics_no
}}</text>
        </view>
        <view class="orderinfo-item">
          <text class="item-lab">寄件人:</text>
          <text class="item-val">{{item.sender_name}}</text>
        </view>
      </view>
      <!-- 最新物流轨迹 -->
      <view v-if="item.order_status==8 && item.order_trajectory" class="newest-progress-message">
        <text class="message-btn" @click="toexPressDetail">查看物流信息</text>
        <text class="message-tite">最新物流轨迹</text>
        <text class="message-text"
          >{{item.order_trajectory}}</text
        >
      </view>
      <!-- 包裹详情 -->
      <view v-if="item.order_status==8" class="package-detail">
        <text class="detail-tite">包裹详情</text>
        <view class="detail-list" :class="{'down': detailAll}">
          <view v-for="(orderitem) in item.orderItems" :key="orderitem.order_id" class="detail-item">
            <view class="item-info item-name">
              <text class="info-title">包裹1</text>
              <text class="info-val">{{orderitem.item_name}}</text>
            </view>
            <view class="item-info item-price">
              <text class="info-title">价格</text>
              <text class="info-val">{{orderitem.item_price}}</text>
            </view>
            <view class="item-info item-num">
              <text class="info-title">数量</text>
              <text class="info-val">{{orderitem.item_num}}</text>
            </view>
          </view>
        </view>
        <view v-if="item.orderItems.length > 2" class="message-btn-wrap">
          <text class="message-btn" @click="openAllDetail">{{detailOpenBtnText}}</text>
        </view>
      </view>
      <view class="address-info">
        <text class="address-from">{{item.sender_addr}}</text>
        <view class="address-icon">
          <!-- <text class="text">单独寄送</text> -->
        </view>
        <view class="address-to">
          <text class="address-to-text">{{item.addressee_addr}}</text>
          <!-- <text class="address-to-remark">(自提点自提)</text> -->
        </view>
      </view>
      <view class="bottom-data">
        <view class="data-info-box">
          <text v-if="item.order_status==6" class="bottom-data-title">下单时间</text>
          <text class="data-text">{{item.created}}</text>
        </view>
        <!-- <text v-if="item.order_status==7" class="change-btn">更改</text> -->
        <!-- <text class="share-btn">分享给收件人</text> -->
         <navigator v-if="item.order_status==4" class="share-btn" :url="`/pages/tabbar-2/detail?order_sn=${item.order_sn}`">查看包裹详情</navigator>
      </view>
    </view>
    <view v-if="0" class="bottom-wait-pay">
      <view class="content">
        <view class="lab">
          <icon
            class="wx-icon"
            name="wechat"
            size="50"
            color="#2cb241"
            unit="rpx"
          ></icon>
          <text class="lab-text">微信支付</text>
        </view>
        <icon v-if="payorderid == item.order_sn"
          class="btn"
          name="circle-fill"
          size="40"
          color="#2cb241"
          unit="rpx"
          @tap="setPay"
        ></icon>
        <icon v-else
          class="btn"
          name="circle"
          size="40"
          unit="rpx"
          @tap="setPay"
        ></icon>
      </view>
      <button class="bottom-wait-pay-text" type="submit" open-type="contact">微信没钱？请联系客服</button>
    </view>
  </view>
</template>


<script>
import icon from "@/components/tui-icon/tui-icon.vue";
export default {
  components: {
    icon,
  },
  name: "orderItem",
  props: {
    item: {
      type: Object,
      default: {},
    },
    payorderid: { 
      type: String,
      default: "",
    }
  },
  data() {
    return {
      detailAll: false,
      detailOpenBtnText: "查看全部包裹",
    };
  },
  mounted() {
  },
  methods: {
    setPay() {
      this.$emit("setitempay", this.item);
    },
    openAllDetail(){
      this.detailAll = !this.detailAll;
      this.detailOpenBtnText = this.detailAll ? " 收起 " : "查看全部包裹";
    },
    toDetail(){
      uni.navigateTo({
        url: `/pages/tabbar-2/detail?order_sn=${this.item.order_sn}`
      })
    },
    toexPressDetail(){
      uni.navigateTo({
        url: `/pages/tabbar-2/shipping?order_sn=${this.item.order_sn}`
      })
    },
    copyOrderId(){
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
    cancelOrder(e){
      let _self = this;
      uni.showModal({
        title: '确定要删除此订单吗？',
        content: '',
        confirmColor: "#ff7100",
        success: function (res) {
            if (res.confirm) {
                uni.showLoading({
                title: "请稍后",
              });
              _self.$api.delOrder({"order_sn":e}).then((res)=>{
                if(res.status == 1){
                  _self.$emit("cancelorder", _self.item);
                }else{
                  _self.$toast(res.info);
                }
                uni.hideLoading();
              })
            } else if (res.cancel) {
                console.log('用户点击取消');
            }
        }
      });
    },
  },
};
</script>
<style lang="scss">
.to-detail{
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}
.order-item {
  position: relative;
  width: 690rpx;
  padding: 30rpx;
  border-radius: 20rpx;
  background-color: #fff;
  box-sizing: border-box;
  margin-bottom: 20rpx;
  .orderinfo-item {
    display: flex;
    font-size: 28rpx;
    margin-bottom: 10rpx;
    align-items: center;
    .item-val {
      margin-left: 8rpx;
      color: #000;
    }
    .item-lab {
      color: #7b7b7b;
    }
    .copy-btn{
      display: block;
      position: relative;
      width: 46rpx;
      height: 40rpx;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAWCAMAAAD6gTxzAAAAV1BMVEUAAAAAAAApKSmgoKAAAADX19cVFRUSEhIVFRUAAAChoaEnJycWFhYAAAAAAAAYGBgAAAD////X19cnJyc3Nzfv7+/W1tYzMzP7+/vJycnx8fHw8PCdnZ3UBMN2AAAAEXRSTlMADu/9A/7o4tZm/vDtYB7caBirf2oAAAB1SURBVBjTzdFJDoAgDEBRW1HBGarF6f7nFMQoxAv4l2/RpG02VvRUdiJztTmbuyKX4IlYPzEGMlov23y1Nj2A8LQcU8gSouw87TaeV3map3geBTIvmb8Qf6itebUpKYkNpSQAekzJBRivHWiok+O4hCqjl6gTQaMYlIhbCf8AAAAASUVORK5CYII=) no-repeat center;
      background-size: 18rpx 22rpx;
      z-index: 20;
    }
  }
  .address-info {
    display: flex;
    padding-top: 10rpx;
    align-items: flex-start;
    font-size: 36rpx;
    color: #000;
    line-height: 50rpx;
    font-weight: bold;
    justify-content: space-between;
    .address-from {
        max-width: 240rpx;
    }
    .address-to {
      .address-to-text {
        display: block;
        max-width: 240rpx;
        text-align: center;
      }
      .address-to-remark {
        display: block;
        font-size: 28rpx;
        line-height: 40rpx;
        color: #7b7b7b;
        font-weight: 400;
        text-align: center;
      }
    }
    .address-icon {
      display: block;
      width: 194rpx;
      height: 50rpx;
      background: url(@/static/orderlist-address-icon.png) no-repeat left;
      background-size: 194rpx 20rpx;
      .text {   
        display: block;
        width: 194rpx;
        margin-top: 48rpx;
        font-size: 24rpx;
        font-weight: bold;
        color: #000;
        text-align: center;
        line-height: 34rpx;
      }
    }
  }
  .bottom-data {
    display: flex;
    position: relative;
    margin-top: 20rpx;
    padding-top: 20rpx;
    border-top: 2rpx dashed #b1afaf;
    font-size: 28rpx;
    color: #000;
    line-height: 40rpx;
    align-items: center;
    font-weight: bold;
    justify-content: space-between;
    .bottom-data-title {
      margin-right: 20rpx;
    }
    .change-btn {
      display: flex;
      width: 120rpx;
      height: 52rpx;
      font-size: 28rpx;
      color: #000;
      font-weight: 600;
      align-items: center;
      justify-content: center;
      border-radius: 30rpx;
      border: 2rpx solid #000;
    }
    .share-btn {
      display: flex;
      height: 52rpx;
      padding: 0 12rpx;
      font-size: 28rpx;
      color: #ff6c00;
      font-weight: 600;
      align-items: center;
      justify-content: center;
      border-radius: 30rpx;
      border: 2rpx solid #ff6c00;
    }
    &.lanshou {
      justify-content: start;
      .data-text{
        font-size: 36rpx;
      }
    }
  }
  .top-right-box {
    display: block;
    position: absolute;
    top: 30rpx;
    right: 0;
    .get-num {
      padding-right: 28rpx;
      font-weight: 600;
      text-align: center;
      .info-title {
        display: block;
        font-size: 28rpx;
        color: #000;
        line-height: 40rpx;
      }
      .info-text {
        display: block;
        margin-top: 2rpx;
        font-size: 48rpx;
        color: #015ad7;
        line-height: 66rpx;
      }
    }
    .info-cancel {
      padding-right: 30rpx;
      font-weight: 600;
      color: #7b7b7b;
      font-size: 28rpx;
    }
    .info-btn {
      display: flex;
      height: 52rpx;
      margin-right: 30rpx;
      font-weight: 600;
      color: #fff;
      font-size: 24rpx;
      align-items: center;
      justify-content: center;
      border-radius: 30rpx;
      &.he-xiang {
        width: 120rpx;
        height: 52rpx;
        background-color: #2cb241;
      }
      &.kefu {
        height: 52rpx;
        padding: 0 12rpx;
        background-color: #ff0000;
      }
      &.qian-shou {
        margin: 0;
        padding: 0 30rpx;
        background-color: #2cb241;
        border-radius: 30rpx 0 0 30rpx;
      }
      &.zi-ti {
        margin: 0;
        padding: 0 30rpx;
        border-radius: 30rpx 0 0 30rpx;
        background-color: #ff0000;
      }
    }
  }
  .newest-progress-message {
    position: relative;
    padding-top: 18rpx;
    border-top: 2rpx dashed #b1afaf;
    margin-top: 20rpx;
    .message-btn {
      display: flex;
      position: absolute;
      top: 18rpx;
      right: 0;
      padding: 0 12rpx;
      height: 52rpx;
      font-size: 26rpx;
      color: #000;
      border-radius: 30rpx;
      border: 2rpx solid #000;
      align-items: center;
      justify-content: center;
    }
    .message-tite {
      display: block;
      height: 40rpx;
      font-size: 28rpx;
      color: #7b7b7b;
      line-height: 40rpx;
      font-weight: bold;
    }
    .message-text {
      display: -webkit-box;
      min-height: 34rpx;
      max-height: 68rpx;
      width: 440rpx;
      margin-top: 10rpx;
      font-size: 24rpx;
      color: #000;
      line-height: 34rpx;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      word-wrap: break-word;
      word-break: break-all;
      white-space: pre-wrap;
    }
  }
  .package-detail {
    position: relative;
    margin-top: 20rpx;
    padding: 18rpx 0 20rpx;
    border-top: 2rpx dashed #b1afaf;
    border-bottom: 2rpx dashed #b1afaf;
    .message-btn-wrap{
      display: flex;
      margin-top: 24rpx;
      justify-content: flex-end;
    }
    .message-btn {
      display: flex;
      width: 170rpx;
      height: 52rpx;
      font-size: 26rpx;
      color: #000;
      border-radius: 30rpx;
      border: 2rpx solid #000;
      align-items: center;
      justify-content: center;
    }
    .detail-tite {
      display: block;
      height: 40rpx;
      font-size: 28rpx;
      color: #7b7b7b;
      line-height: 40rpx;
      font-weight: bold;
    }
    .detail-list{
      max-height: 100rpx;
      &.down{
        max-height: auto;
      }
    }
    .detail-item {
      display: flex;
      margin-top: 3rpx;
      align-items: center;
      font-size: 28rpx;
      font-weight: bold;
      justify-content: space-between;
    }
    .item-info{
      display: flex;
      align-items: center;
    }
    .info-title {
      margin-right: 12rpx;
      color: #7b7b7b;
    }
    .info-val {
      font-weight: 400;
      color: #000;
    }
  }
}
.order-item-waitpay {
  position: relative;
  width: 690rpx;
  padding: 30rpx;
  border-radius: 20rpx;
  background-color: #fff;
  box-sizing: border-box;
  margin-bottom: 20rpx;
  .orderinfos {
    // display: flex;
    // align-items: center;
    // justify-content: space-between;
    // height: 40rpx;
    .order-num {
      display: flex;
      align-items: center;
    }
    .num-title {
       display: block;
       width: 114rpx;
      margin-right: 8rpx;
      font-size: 28rpx;
      color: #7b7b7b;
    }
    .num-text {
      margin-right: 14rpx;
      font-size: 28rpx;
      color: #000;
    }
    .copy-btn{
      display: block;
      position: relative;
      width: 46rpx;
      height: 40rpx;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAWCAMAAAD6gTxzAAAAV1BMVEUAAAAAAAApKSmgoKAAAADX19cVFRUSEhIVFRUAAAChoaEnJycWFhYAAAAAAAAYGBgAAAD////X19cnJyc3Nzfv7+/W1tYzMzP7+/vJycnx8fHw8PCdnZ3UBMN2AAAAEXRSTlMADu/9A/7o4tZm/vDtYB7caBirf2oAAAB1SURBVBjTzdFJDoAgDEBRW1HBGarF6f7nFMQoxAv4l2/RpG02VvRUdiJztTmbuyKX4IlYPzEGMlov23y1Nj2A8LQcU8gSouw87TaeV3map3geBTIvmb8Qf6itebUpKYkNpSQAekzJBRivHWiok+O4hCqjl6gTQaMYlIhbCf8AAAAASUVORK5CYII=) no-repeat center;
      background-size: 18rpx 22rpx;
      z-index: 20;
    }
    .order-data {
      display: flex;
      margin-top: 8rpx;
      align-items: center;
    }
     .data-title {
       display: block;
       width: 114rpx;
      margin-right: 8rpx;
      font-size: 28rpx;
      color: #7b7b7b;
    }
    .data-text {
      font-size: 28rpx;
      color: #000;
    }
  }
  .address-info {
    display: flex;
    margin-top: 30rpx;
    padding-bottom: 14rpx;
    align-items: flex-start;
    font-size: 36rpx;
    color: #000;
    line-height: 50rpx;
    font-weight: bold;
    justify-content: space-between;
    border-bottom: 2rpx dashed #b1afaf;
    .address-from {
      height: 50rpx;
      .address-from-city {
        display: block;
      }
      .address-from-person {
        display: block;
        font-size: 28rpx;
        color: #7b7b7b;
        line-height: 40rpx;
      }
    }
    .address-to {
      .address-to-text {
        display: block;
        height: 50rpx;
        text-align: center;
      }
      .address-to-remark,
      .address-to-person {
        display: block;
        font-size: 28rpx;
        line-height: 40rpx;
        color: #7b7b7b;
        font-weight: 400;
        text-align: center;
      }
    }
    .address-icon {
      display: block;
      width: 194rpx;
      height: 50rpx;
      margin-top: 35rpx;
      background: url(@/static/orderlist-address-icon.png) no-repeat center;
      background-size: 194rpx 20rpx;
      .text {
        display: block;
        width: 100%;
        margin-top: -28rpx;
        font-size: 28rpx;
        font-weight: bold;
        color: #ff6c00;
        text-align: center;
        line-height: 34rpx;
      }
    }
  }

  .package-detail {
    display: flex;
    padding: 24rpx 0 30rpx;
    align-items: center;
    justify-content: center;
    border-bottom: 2rpx dashed #b1afaf;
    .package-detail-btn {
      position: relative;
      font-size: 32rpx;
      font-weight: bold;
      color: #000;
      &::after {
        display: block;
        position: absolute;
        top: 50%;
        right: -24rpx;
        width: 12rpx;
        height: 24rpx;
        transform: translateY(-50%);
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAMAAACOLiwjAAAAb1BMVEUAAABlZWVwcHBwcHBvb29tbW1ubm5oaGhwcHBvb29wcHBvb29vb29sbGxwcHBvb29vb29vb29vb29vb29vb29tbW1paWlsbGxmZmZwcHBvb29vb29vb29wcHBvb29vb29tbW1tbW1ubm5vb29sbGzJG0uwAAAAJXRSTlMABfXndjpTE/z48Mu0I+LezZ6WjFlLLx4M69HFvLmuk4BuQScaK6idbQAAAG1JREFUGNNVj0UCgDAMBGkqtKW4u/7/jZySQE47h6xEtY74ZNYIgjb3aiDqElvGRP1m15QorqG4iMT5t5GgxMcGyodtZrvQm8n9gVo5adC8chN2TAMEjNWF27GQ4QyhvDSYV0HC88Zw81I9sH4BX6AEVmgVFj0AAAAASUVORK5CYII=)
          no-repeat center;
        background-size: 100%;
        content: "";
      }
    }
  }
  .price-info-list {
    padding: 30rpx 0;
    border-bottom: 2rpx dashed #b1afaf;
    .info-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 32rpx;
      color: #000;
      font-weight: bold;
      .info-item-lab {
        font-weight: 400;
      }
    }
  }
  .pay-btn-box {
    display: flex;
    position: relative;
    margin-top: 28rpx;
    justify-content: flex-end;
    z-index: 20;
    align-items: center;
    .order-peice{
      flex: 1;
      font-size: 28rpx;
      color: #000;
      line-height: 40rpx;
    }
    .btn-item {
      display: flex;
      width: 170rpx;
      height: 52rpx;
      font-size: 28rpx;
      color: #000;
      border-radius: 30rpx;
      border: 2rpx solid #000;
      align-items: center;
      justify-content: center;
      box-sizing: initial;
      &.pay{
        padding: 0;
        margin: 0;
        margin-right: 16rpx;
        border-color: #2cb241;
        color: #2cb241;
      }
    }
  }
}
.bottom-wait-pay{
    width: 690rpx;
    margin: 20rpx auto;
    .content{
        display: flex;
        width: 100%;
        height: 110rpx;
        padding: 0 28rpx;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;
        border-radius: 20rpx;
        box-sizing: border-box;
        .lab{
            display: flex;
            align-items: center;
        }
        .lab-text{
            margin-left: 20rpx;
            font-size: 32rxp;
            font-weight: bold;
            color: #000;
        }
        .btn{
            display: block;
        }
    }
    .bottom-wait-pay-text{
        display: block;
        width: 100%;
        margin-top: 20rpx;
        padding: 0 32rpx;
        font-size: 28rpx;
        font-weight: bold;
        color: #000;
        text-align: end;
        box-sizing: border-box;
        background: transparent;
    }
}
</style>