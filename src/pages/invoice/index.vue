<template>
  <view class="wrap">
    <view v-if="orderlist.length > 0" class="invoice-list">
      <invoiceitem
        v-for="orderItem in orderlist"
        :key="orderItem.order_sn"
        :selectordersns="selectOrderIds"
        @select="selectItem"
        :item="orderItem"
      ></invoiceitem>
      <uni-load-more
        :status="loadingType"
      ></uni-load-more>
    </view>
    <view v-else-if="pageLoad" class="empty-box">
      <image
        style="width: 440rpx; height: 440rpx"
        mode="aspectFit"
        src="https://static.51mitui.com/wxMini/static/empty-data.png"
      ></image>
      <text class="empty-text">暂无数据</text>
    </view>
    <view class="torecord-btn" @click="toRecord">
      <text class="btn-icon"></text>
      <text class="btn-text">开票记录</text>
    </view>
    <view v-if="orderlist.length > 0 && canInvoiceNum > 0" class="page-bottom">
      <view class="select-box" @click="setAllSelect">
        <icon
          v-if="allSelect"
          name="circle-fill"
          size="40"
          unit="rpx"
          class="item-selct-icon"
          color="#2cb241"
        ></icon>
        <icon
          v-else
          name="circle"
          size="40"
          unit="rpx"
          class="item-noselct-icon"
        ></icon>
        <text class="select-lab">全选</text>
      </view>
      <view class="price-box">
        <text class="price-lab">合计</text>
        <text class="price-icon">¥</text>
        <text class="price-val">{{ totalPrice }}</text>
      </view>
      <button class="submit-btn" type="submit" @click="applyinvoice">
        申请发票
      </button>
    </view>
  </view>
</template>

<script>
import icon from "@/components/tui-icon/tui-icon.vue";
import invoiceitem from "@/components/invoice-item/invoice-item.vue";
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
export default {
  components: {
    invoiceitem,
    icon,
    uniLoadMore
  },
  data() {
    return {
      pageNum: 1,
      allSelect: false,
      totalPrice: 0, //发票总金额
      pageLoad: false,
      orderTotal: 10,
      getorderListLock: false,
      orderlist: [],
      selectOrderIds: [], //选中订单号
      loadingType: "more",
      canInvoiceNum: "",//当前列表可申请开发票的订单数量
    };
  },
  onLoad(options) {},
  onShow() {
    this.pageNum = 1;
    this.getList();
  },
  computed: {},
  onReachBottom() {},
  methods: {
    getList() {
      var _self = this;
      if (_self.getorderListLock ||  _self.loadingType == "noMore") {
        return;
      }
      _self.getorderListLock = true;
      _self.loadingType = "loading";
      var param = {
        size: 10,
        page: _self.pageNum,
        order_status: 4,
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
          _self.allSelect = _self.isSelectAll();;
        } else {
          _self.$toast("加载失败，请重试");
        }
        uni.hideLoading();
        _self.getorderListLock = false;
        _self.pageLoad = true;
      });
    },
    selectItem(item) {
      let index = this.selectOrderIds.indexOf(item.order_sn);
      let isSelect = index > -1;
      if (isSelect) {
        this.selectOrderIds.splice(index, 1);
      } else {
        this.selectOrderIds.push(item.order_sn);
      }
      this.allSelect = this.isSelectAll();
      this.computedPrice(this.selectOrderIds);
    },
    setAllSelect() {
      let orderIdArr = [];
      this.allSelect = !this.allSelect;
      if (this.allSelect) {
        this.orderlist.forEach((orderItem) => {
          if (orderItem.is_invoice == 0) {
            orderIdArr.push(orderItem.order_sn);
          }
        });
      }
      this.selectOrderIds = orderIdArr;
      this.computedPrice(orderIdArr);
    },
    computedPrice(orders) {
      let price = 0;
      let list = this.orderlist;
      list.forEach((orderItem) => {
        let index = orders.indexOf(orderItem.order_sn);
        if (index > -1) {
          price += orderItem.total_amount;
        }
      });
      this.totalPrice = price;
    },
    isSelectAll() {
      let num = 0;
      this.orderlist.forEach((item) => {
        if (item.is_invoice == 0) {
          num++;
        }
      });
      this.canInvoiceNum = num;
      return num > 0 && this.selectOrderIds.length >= num;
    },
    applyinvoice() {
      //申请发票点击
      let ids = "";
      if (this.selectOrderIds.length <= 0) {
        this.$toast("请先选择订单～");
        return;
      }
      ids = this.selectOrderIds.join(",");
      uni.navigateTo({
        url: `/pages/invoice/fill?price=${this.totalPrice}&ids=${ids}`,
      });
    },
    toRecord() {
      console.log(345);
      uni.navigateTo({
        url: "/pages/invoice/record",
      });
    },
  },
};
</script>

<style lang="scss">
html,
body {
  min-height: 100%;
  background-color: #f3f3f3;
}
.wrap {
  width: 100%;
  padding-bottom: 290rpx;
}
.empty-box {
  width: 100%;
  padding-top: 224rpx;
  image {
    display: block;
    margin: 0 auto;
  }
  .empty-text {
    display: block;
    width: 100%;
    font-size: 32rpx;
    color: #ff6c00;
    text-align: center;
    line-height: 44rpx;
  }
}
.invoice-list {
  width: 690rpx;
  margin: 0 auto;
}
.torecord-btn {
  display: flex;
  position: fixed;
  bottom: 298rpx;
  right: 0;
  height: 78rpx;
  padding: 0 20rpx;
  align-items: center;
  background-color: #fff;
  border-radius: 16rpx 0 0 16rpx;
  z-index: 100;
  box-shadow: 0px 0px 6rpx 0px rgba(0, 0, 0, 0.1);
  .btn-icon {
    display: block;
    width: 46rpx;
    height: 46rpx;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAmVBMVEUAAADn/fDj+/Hk+vHl+vHk+vDl+/Dl+vHl+vHl+/Hl+/Hg/PTk+vHk+vHk+vDk+/Dl/PPl+/Hl+vDk+vDk+vDj+fDk+vDh+O/k+vDk+/Dk++/k+vARyo3///8Uyo7R9efK9OQgzZQrz5pI1qeZ6M6t7Nh44b4/1aPc+OzW9+m379un69SL5cdX2a4x0ZzD8eGD48Jr3rdg27LqpBrgAAAAG3RSTlMADR/cVPJP4te46ArIv4l3HLGemcyEW0vVeXLAHKc0AAABgElEQVRIx5XV2XaCMBCA4ckCCIrgXjuKFa2Iu77/w1XKwcgksvw33nzmDMkJAC2Uk8GXhWh1BhMZQmXMdrGUa7OPuBs4qOUEXbOeddBYZ2aaY4QfG2kT8R5W1ONEC6xMcKprfKg062FtPbVBI2zQqNA25u2TtaEkxbxZrrvFfq+ihamfYv/zcQJsxvE708xryr3stCQ25Wg/uV/myR7/2xq4C8CxzE/LPIx0jiFIwte7vM3CwCX0sfns2AeX8GijiikfgCB8t1QdKP8Ci/DHGz9S7gHS2WNVRLlFOIly1Ia5HH9fnfXVO9oxqa6UCxjQ1bcqbXUXJu2OSbbhUwjbcA7gN+d+u+shn5w5rS4fzN958Y/o9aN4oL04LodTnN2R2/UcZVflkCguGHktbe4pYnqLdytEPCaPJ0zvyV5d7LwhNmgIRWxcr8cMXnGnTjscgPhK3eZjM+ZAYsOKp2SgZwszFjYYY3NPx17A4FNM+mXsS4JpfNp3hYVoCbc/1Z7wD6c9tJK3+pFTAAAAAElFTkSuQmCC)
      no-repeat center;
    background-size: 100%;
  }
  .btn-icon {
    margin-left: 10rpx;
    font-size: 24rpx;
    color: #000;
    line-height: 34rpx;
  }
}
.page-bottom {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 146rpx;
  align-items: center;
  background: #fff;
  .select-box {
    display: flex;
    margin-left: 30rpx;
    align-items: center;
    .select-lab {
      margin-left: 10rpx;
      font-size: 28rpx;
      line-height: 40rpx;
      color: #000;
    }
  }
  .price-box {
    display: flex;
    margin-left: 52rpx;
    align-items: center;
    color: #ff6d00;
    .price-lab {
      font-size: 28rpx;
      line-height: 40rpx;
      color: #000;
    }
    .price-icon {
      margin: 0 6rpx 0 10rpx;
      font-size: 36rpx;
      line-height: 50rpx;
    }
    .price-val {
      font-size: 44rpx;
      line-height: 60rpx;
    }
  }
  .submit-btn {
    display: flex;
    width: 240rpx;
    height: 80rpx;
    font-size: 30rpx;
    color: #fff;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    background: #ff6c00;
    border-radius: 10rpx;
  }
}
</style>