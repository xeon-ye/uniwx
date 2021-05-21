<template>
  <view class="app-container">
    <view class="top-part">
      <view class="info-box">
        <view class="header-img">
          <image
            :src="memberInfo.avator || '../../static/index-1.png'"
            mode=""
          />
        </view>
        <view class="info-line" v-if="memberInfo">
          <view class="name">{{ memberInfo.nick_name }}</view>
          <view class="mobile font-sizes">{{ memberInfo.mobile }}</view>
          <view class="code">
            <view class="code-left font-sizes">会员编号：{{ memberInfo.member_no }}</view>
			<view class="tui-right tui-col-4 mr">
				<text class="copy-text" @click="copyData()" style="position: absolute;margin: 1px 1px;font-size: 22rpx;">复制</text>
			</view>
            <view class="code-right"@click="navTo('/pages/tabbar-5/info')">
              <text class="font-sizes">修改</text>
              <image src="../../static/white-arrow.png" mode="" />
            </view>
          </view>
        </view>
        <view class="info-line" v-else @click="handleLogin">
          <view class="name font-size">登录 | 注册</view> 
          <view class="mobile font-size">hello,欢迎来到赫德物流</view>
        </view>
      </view>
      <view class="info-show-box">
        <view class="left-box box" @click="toAccount()">
          <view class="num">{{ moneyData.money }}</view>
          <view class="desc font-sizes">余额</view>
        </view>
        <view class="center-box box" @click="navTo('/pages/invite/index')">
          <view class="num">{{ moneyData.income  }}</view>
          <view class="desc font-sizes">累计收益</view>
        </view>
        <navigator class="right-box box" @click="navTo('/pages/coupon/index')">
          <view class="num">{{ moneyData.couponTotal }}</view>
          <view class="desc font-sizes">优惠劵</view>
        </navigator>
      </view>
    </view>
    <view class="center-part-wrap">
      <view class="center-part">
        <view class="center-box" @click="navTo('/pages/address/index')">
          <img src="https://static.51mitui.com/wxMini/static/center-1.png" alt="" />
          <text class="font-size">地址簿</text>
        </view>
        <view class="center-box" @click="navTo('/pages/freight/index')">
          <img src="https://static.51mitui.com/wxMini/static/center-2.png" alt="" />
          <text class="font-size">运费与实效</text>
        </view>
        <view class="center-box" @click="navTo('/pages/contraband/index')">
          <img src="https://static.51mitui.com/wxMini/static/center-3.png" alt="" />
          <text class="font-size">违禁品</text>
        </view>
        <view class="center-box" @click="navTo('/pages/invoice/index')">
          <img src="https://static.51mitui.com/wxMini/static/center-4.png" alt="" />
          <text class="font-size">申请发票</text>
        </view>
      </view>
    </view>
    <view class="item-list-wrap">
		<view class="item-list-wrap_data">
			<tui-list-view color="#777">
			<!--  <tui-list-cell arrow padding="30rpx" color="#000000" @click="navTo('/pages/coupon/index')">
			    邀请下单 test
			  </tui-list-cell> -->
			 <!-- <tui-list-cell arrow padding="30rpx" color="#000000" @click="navTo('/pages/coupon/index')">
			    我的运费
			  </tui-list-cell> -->
			 <!-- <tui-list-cell arrow padding="30rpx" color="#000000" @click="navTo('/pages/coupon/index')">
			    我的运单
			  </tui-list-cell> -->
			  <tui-list-cell arrow padding="30rpx" color="#000000" @click="navTo('/pages/tabbar-5/warehouse')">
			    自寄到仓地址
			  </tui-list-cell>
			 <!-- <tui-list-cell arrow padding="30rpx" color="#000000" @click="navTo('/pages/coupon/index')">
			    自提点查询
			  </tui-list-cell> -->
			  <tui-list-cell arrow padding="30rpx" color="#000000" @click="navTo('/pages/invite/index')">
			    我的推荐
			  </tui-list-cell>
					<tui-list-cell arrow padding="30rpx" color="#000000">
					  <button open-type="contact" class="contact-btn">
						  <view class="contact-btn-text">在线客服</view>
					  </button>
					</tui-list-cell>
			  <tui-list-cell arrow padding="30rpx" color="#000000" @click="navTo('/pages/feedback/index')">
			    投诉建议
			  </tui-list-cell>
			  <tui-list-cell arrow padding="30rpx" color="#000000" v-if="isLogin" @click="handleExit">
			    退出
			  </tui-list-cell>
			</tui-list-view>
		</view>
      
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      memberInfo: null,
      isLogin:false,
	  moneyData:{
		  money:"0.00",
		  income:"0.00",
		  couponTotal:0,
		  not_allow_money:"0.00",
		  recommend_money:"0.00"
	  }
    };
  },
  methods: {
	  copyData() {
	  	uni.setClipboardData({
	  	    data: this.memberInfo.member_no,
	  	    success: function () {
	  	        uni.showToast({
	  	        	title:"编码已复制"
	  	        })
	  	    }
	  	});
	  },
    async initData(){
      this.isLogin = this.$cache.get("token") ? true : false;
      if (this.$cache.get("token")) {
        let res = await this.$api.getMemberInfo();
        this.memberInfo = res.data.userInfo;
		this.moneyData = {
			money:res.data.money,
			income:res.data.income,
			not_allow_money:res.data.not_allow_money,
			recommend_money:res.data.recommend_money,
			couponTotal:res.data.couponTotal
		}
      }
    },
    handleLogin(){
        this.$href.navigateTo({ url: "/pages/login/index" });
    },
    navTo(url) {
		console.log(url);
        this.$href.navigateTo({ url: url });
    },
	
	toAccount() {
		let url = "/pages/tabbar-5/account?moneyData="+JSON.stringify(this.moneyData);
		this.$href.navigateTo({ url: url });
	},
    // 退出登录
    handleExit(){
      const _this = this;
      this.$alert({
            content: "确定退出登录吗？",
            showCancel:true,
            success: () => {
                this.$cache.remove("token");
				this.$cache.remove("userInfo");
                _this.memberInfo = null;
				_this.moneyData = {
					  money:"0.00",
					  income:"0.00",
					  couponTotal:0,
					  not_allow_money:"0.00",
					  recommend_money:"0.00"
				  }
            },

        });
    }
  },
  onShow() {
  	this.initData();
  },
  onLoad() {
     // this.initData();
  },
  async created() {
   
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
.app-container {
  background: #f3f3f3;
  height: 100vh;
  .font-size{
	 font-size: 26rpx;
	 font-weight: 900;
  }
  .font-sizes{
	  font-size: 24rpx;
  }
  .top-part {
    height: 225px;
    background-image: linear-gradient(to right, #ff9900, #ff7100);
    border-bottom-right-radius: 50rpx;
    border-bottom-left-radius: 50rpx;
    color: #fff;
    padding-top: 100rpx;
    padding-left: 44rpx;
    .info-box {
      display: flex;
      align-items: center;
      .header-img {
        width: 122rpx;
        height: 122rpx;
        border-radius: 65rpx;
        margin-top: 28rpx;
        margin-right: 22rpx;
        border: 6rpx solid #ffc880;
        image {
          width: 100%;
          height: 100%;
          border-radius: 65rpx;
        }
      }
      .info-line {
        width: calc(100% - 160rpx);
        padding-top: 12rpx;
        padding-right: 30rpx;
        .name {
          font-size: 40rpx;
        }
        .code {
          display: flex;
          justify-content: space-between;
          image {
            width: 12rpx;
            height: 20rpx;
          }
          .code-right {
            > text {
              margin-right: 10rpx;
            }
          }
        }
      }
    }
    .info-show-box {
      display: flex;
      text-align: center;
      margin-top: 50rpx;
      .box {
        width: 33%;
        .num {
          margin-bottom: 10rpx;
        }
      }
      .center-box {
        position: relative;
        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 30%;
          border-left: 1px solid #fff;
          height: 40rpx;
        }
        &::after {
          content: "";
          position: absolute;
          right: 0;
          top: 30%;
          border-left: 1px solid #fff;
          height: 40rpx;
        }
      }
    }
  }
  .center-part-wrap {
	  
    padding: 0 30rpx;
    .center-part {
		box-shadow:0px 0px 20px 2px rgba(255,108,0,0.1);
      position: relative;
      bottom: 51px;
      display: flex;
      justify-content: space-between;
      background: #fff;
      padding: 20px 30px;
      border-radius: 16rpx;
      .center-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 75rpx;
          height: 75rpx;
          margin-bottom: 10rpx;
        }
      }
    }
  }
  .item-list-wrap {
    position: relative;
    bottom: 70rpx;
    padding: 0 30rpx;
    
	.item-list-wrap_data{
		border-radius: 16rpx;
		overflow: hidden;
		box-shadow:0px 0px 20px 2px rgba(255,108,0,0.1);
	}
  }
}
.contact-btn{
	padding: 0rpx;
	margin: 0rpx;
	line-height: inherit;
	background-color: rgba(255, 255, 255, 0);
}
.contact-btn::after{
	border: 0px;
	
}
.contact-btn-text{
	text-align: left;
	color: #000000;
	font-size: 28rpx;
}
</style>