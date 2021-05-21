<template>
	<view class="app-container">
		<view class="app-body">
			<view class="top-part">
				<view class="center-part-wrap tui-flex ">
					<view class="center-part-wrap_data tui-center tui-flex-1">
						<view class="title">剩余返现金额</view>
						<view class="money_block">
							<text class="money-tag">¥</text>
							<text class="money-data">{{ inviteData.withdrawable }}</text>
						</view>
						<view class="apply" @click="apply">申请提现</view>
					</view>
					<view class="center-part-wrap_data tui-center tui-flex-1">
						<view class="title">累计返现收益</view>
						<view class="money_block">
							<text class="money-tag">¥</text>
							<text class="money-data">{{ inviteData.withdrawn }}</text>
						</view>
						<view class="apply_hidden">xxx</view>
					</view>
				</view>
			</view>
			<view class="middle-part">
				<view class="middle-part-wrap tui-flex">
					<view class="middle-part-wrap_data tui-center tui-flex-1">
						<view class="middle-part-number">{{ inviteData.group_total }}</view>
						<view class="middle-part-text">已推荐好友</view>
					</view>
					<view class="middle-part-wrap_data tui-center tui-flex-1">
						<view class="middle-part-number">{{ inviteData.order_total }}</view>
						<view class="middle-part-text">累计返利订单</view>
					</view>
					<view class="middle-part-wrap_data tui-center tui-flex-1">
						<view class="middle-part-number">{{ inviteData.coupon_total }}</view>
						<view class="middle-part-text">累计返劵数</view>
					</view>
				</view>
			</view>
			<view class="middle-list">
				<view class="middle-list-tab">
					<tui-tabs :tabs="tabs" sliderWidth="210" width="390" padding="10" sliderBgColor="#FF6C00" selectedColor="#FF6C00" :currentTab="currentTab" itemWidth="33.33%" @change="changeTab"></tui-tabs>
				</view>
				<view class="middle-list-data">
					<tuiEmpty source="data" v-if="dataList.length == 0"></tuiEmpty>
					<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="handleLoad" v-if="dataList.length > 0">
						<tui-list-view color="#777" unlined="all">
						  <tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="30rpx" color="#000000" v-for="(item, index) in dataList" :key="index">
							  
						    <view class="tui-flex tui-align-between" v-if="currentTab ==0" >
								<view class=""><image style="width: 130rpx; height: 130rpx;border-radius: 73rpx;"
									:src="item.avator || '../../static/index-1.png'"
									mode="" 
								  /></view>
						    	<view class="">会员{{item.id}}({{item.mobile}})</view>
						    	<view class="">注册日期：{{item.created}}</view>
						    </view>
							
							<view class="tui-flex tui-align-between" v-if="currentTab ==1" >
								<view class="tui-left tui-col-4">{{item.comment}}</view>
								<view class="tui-right tui-col-4">{{item.created}}</view>
								<view class="tui-right tui-col-4">+{{item.amount}}</view> 
							</view>
							
							<view class="tui-flex tui-align-between" v-if="currentTab ==2" >
								<view class="tui-left tui-col-4">{{item.comment}}</view>
								<view class="tui-right tui-col-4">{{item.created}}</view>
								<view class="tui-right tui-col-4">+1</view>
							</view>
							
						  </tui-list-cell>
						</tui-list-view>
					</scroll-view>
				</view>
			</view>
		</view>
		<view class="bottom-btn-box">
		    <tui-button width="100%" margin="0 auto" height="80rpx" shape="circle" type="warning" @click="goShare">去推荐</tui-button>
		</view>
		<tui-modal :show="showModal" @cancel="hideModal" :custom="true">
			<view class="tui-modal-custom row">
				<text class="title1">申请提现</text>
				<text class="title2">目前暂时仅支持以下方式申请提现:</text>
				<text class="title3">点击小程序首页【客服】浮窗，提供以下信息给客服人员：</text>
				<text class="title4">1.提现金额</text>
				<text class="title5">(最低5元)</text>
				<text class="title4">2.提现账号</text>
				<text class="title5">(目前仅支持提现至支付宝账户)</text>
				<text class="title4">3.提现账号对应姓名</text>
				<text class="title6">(提现将在15个工作日内到账，请耐心等待)</text>
				<tui-button width="100%" margin="0 auto" height="72rpx" :size="28" type="warning" shape="circle" @click="handleClick">确定</tui-button>
			</view>
		</tui-modal>
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
	      dataList:[],
		  inviteData:[],
		  showModal:false,
		  currentTab:0,
		  freshing:false,
		  isEnd:false,
		  page:1,
		  tabs: [{
		  	name: "推荐明细"
		  }, {
		  	name: "返现明细"
		  },{
			name:"返券明细"
		  }]
	    };
	  },
	  methods: {
		changeTab(e) {
			if(e.index == this.currentTab) {
				return;
			}
			this.currentTab = e.index;
			this.dataList = [];
			this.page = 1;
			this.isEnd = false;
			this.handleLoad();
		},
		apply(e) {
			this.showModal = true;
		},
		hideModal() {
			this.showModal = false;
		},
		handleClick() {
			this.hideModal();
		},
		goShare() {
			uni.navigateTo({
				url:'share'
			})
		},
		async handleLoad() {
			if (this.isEnd) {
				return;
			}
			let getData = {
				type:this.currentTab + 1,
				page:this.page
			};
			this.freshing = true;
			
			uni.showLoading({
				title:"加载中"
			})
			let res = await this.$api.SellerInfo(getData)
			if(res.data.length == 0) {
				this.freshing = false;
				this.isEnd = true;
			}
			if(res.data && res.data.length > 0) {
				if(this.dataList.length == 0) {
					this.dataList = res.data;
				} else {
					this.dataList.push(res.data);
				}
				uni.hideLoading();
			}
			this.freshing = false;
			this.page++;
		},
		async init() {
			let _this = this;
			await this.$api.getSellerInfo().then(function(res){
				if(res.data) {
					_this.inviteData = res.data;
				}
			})
		}
	  },
	  async created() {
		  this.init();
		  this.handleLoad();
		  
	  },
	  mounted() {},
	};
</script>

<style lang='scss' scoped>
	.app-container{
		background: #F3F3F3;
		height: 100vh;
		.app-body{
			padding: 20rpx 20rpx;
		}
		.top-part {
			height: 210rpx;
			width: 710rpx;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			background-image: url(https://static.51mitui.com/wxMini/static/invite_bg.png);
			.center-part-wrap{
				padding: 20rpx;
				vertical-align: middle;
			}
			.center-part-wrap_data{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content:center
				.title{
					font-size: 28rpx;
					color: #000000;
					font-weight: bold;
				}
				.money_block{
					margin: 10rpx 0rpx;
					.money-tag{
						font-size: 36rpx;
						color: #FF6D00;
						margin-right: 16rpx;
						font-weight: bold;
					}
					.money-data{
						font-size: 60rpx;
						color: #FF6D00;
						font-weight: bold;
					}
				}
				.apply{
					font-size: 24rpx;
					color: #707070;
				}
				.apply_hidden{
					font-size: 24rpx;
					color: #707070;
					opacity: 0;
					/* background-color: rgba(255,255,255,0); */
				}
			}
		}
		.middle-part{
			margin: 20rpx 0rpx;
			height: 152rpx;
			width: 710rpx;
			background-color: #FFFFFF;
			border-radius: 16rpx;
			.middle-part-wrap{
				align-items: center;
				justify-content:center;
				.middle-part-wrap_data{
					height: 152rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content:center;
					.middle-part-number{
						color: #FF6D00;
						font-size: 44rpx;
						font-weight: bold;
					}
					.middle-part-text{
						margin-top: 8rpx;
						font-weight: bold;
						color: #000000;
						font-size: 28rpx;
					}
				}
			}
		}
		.middle-list{
			background-color: #FFFFFF;
			border-radius: 16rpx;
			width: 710rpx;
			height: 640rpx;
			overflow: hidden;
			
		}
	}
	
	.tui-modal-custom{
		text{
			font-size: 26rpx;;
		}
		.title1{
			font-weight: bold;
			font-size: 32rpx;
			color: #000000;
		}
		.title2{
			margin: 30rpx 0rpx;
		}
		.title5{
			color: #7B7B7B;
		}
		.title4{
			font-weight: bold;
		}
		.title6{
			margin: 40rpx 0rpx;
		}
	}
	.row{
		display: flex;
		flex-direction: column;
	}
	
	.scroll-Y {
		height: 540rpx;
	}
	.bottom-btn-box{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20rpx 20rpx;
	}
	.tui-right{
		text-align: right;
	}
	
	
</style>
