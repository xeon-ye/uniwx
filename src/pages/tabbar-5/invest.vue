<template>
	<view class="app-container">
		<view class="app-body">
			<view class="app-body-tab">
				<view class="tui-flex">
					<view class="tui-center tui-flex-1" :class="currentTab == 1 ? 'tui-left-active' : ''" @click="tab(1)">
						<text class="tab_text" :class="currentTab == 1 ? 'cur' : ''">充值活动</text>
					</view>
					<view class="tui-center tui-flex-1" :class="currentTab == 2 ? 'tui-right-active' : ''" @click="tab(2)">
						<text class="tab_text" :class="currentTab == 2 ? 'cur' : ''">普通充值</text>
					</view>
				</view>
			</view>
			<view class="app-body-data">
				<text class="app-body-data_text">请选择需要充值的金额</text>
				<view class="tui-flex app-body-data_b" v-if="currentTab == 1">
					<block v-for="(item, index) in activityList" :key="index">
						<view class="tui-center app-body-data_b_body" @click="bindTapMoney(item.id, index, 1)" :class="[(index+1)%2==0 ? 'ml20':'',index == currentTypeIndex_1 ? 'cur':'']" >
							<view class="">
								<text class="dollar-text" :class="index==0 ? 'bold' : ''">充</text>
								<text class="dollar" :class="index==0 ? 'bold' : ''">¥</text>
								<text class="dollar-text" :class="index==0 ? 'bold' : ''">{{ item.money }}</text>
							</view>
							<view class="">
								<text class="dollar-text-give">送{{ item.give }}</text>
							</view>
							<view class="dollar-text-absolute">
								<text>赠送</text>
							</view>
						</view>
					</block>
				</view>
				
				<view class="tui-flex app-body-data_b" v-if="currentTab == 2">
					<block  v-for="(item, index) in generalList" :key="index">
						<view class="tui-center app-body-data_b_body" @click="bindTapMoney(item.id, index, 2)" :class="[(index+1)%2==0 ? 'ml20':'',index == currentTypeIndex_2 ? 'cur':'']" >
							<view class="">
								<text class="dollar" :class="index==0 ? 'bold' : ''">¥</text>
								<text class="dollar-text" :class="index==0 ? 'bold' : ''">{{ item.money }}</text>
							</view>
							
						</view>
					</block>
				</view>
			</view>
		</view>
		<view class="app-other" v-if="currentTab == 2">
			<text class="app-other_text">输入其他充值金额</text>
			<view class="app-other-data row">
				<text class="app-other-data_text">¥</text>
				<input placeholder="请输入其他充值金额" type="number" v-model="otherMoney" />
			</view>
		</view>
		<text class="app-bottom_text">支付方式</text>
		<view class="app-bottom">
			<view class="tui-flex">
				<view class="tui-left tui-col-8">
					<tui-icon name="wechat" size="30" color="#28C445"></tui-icon>
					<text>微信支付</text>
				</view>
				<view class="tui-right tui-col-4">
					<tui-icon name="circle-fill" color="#28C445" size="24"></tui-icon>
				</view>
			</view>
		</view>
		<view class="app-alert tui-flex">
			<view class="tui-grid-icon">
				<tui-icon name="news" size="20" color="#FF4848"></tui-icon>
			</view>
			<view class="app-alert-text">
				<text>通过本页面充值可享受额外返现，充值本金及返现金额不支持</text>
				<text>后续提现，可用于支付包裹运费及增值服务费，可叠加优惠券</text>
				<text>所以。</text>
			</view>
			
		</view>
		<view class="bottom-btn-box">
		    <tui-button width="100%" margin="0 auto" height="80rpx" shape="circle" type="warning" @click="submitPay">提交充值</tui-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentTab:1,
				currentType:0,
				currentTypeIndex_1:0,
				currentTypeIndex_2:0,
				activityList:[],
				generalList:[],
				otherMoney:"",
				isPay:false,
			}
		},
		methods:{
			tab(type) {
				if (type == this.currentTab) {
					return
				}
				if(type == 1) {
					this.currentTypeIndex_2 = 0;
				} else {
					this.currentTypeIndex_1 = 0;
				}
				this.currentTab = type;
			},
			
			bindTapMoney(e, index, type) {
				console.log(e);
				this.currentType = e;
				if(type == 1) {
					this.currentTypeIndex_1 = index;
				} else {
					this.currentTypeIndex_2 = index;
				}				
			},
			submitPay() {
				if(this.isPay) {
					return;
				}
				let _this = this;
				let wx_openid = this.$cache.get("openId");
				let amount = 0;
				let recharge_id = 0;
				console.log(this.otherMoney);
				if (this.currentTab == 2) {
					if(this.otherMoney > 0) {
						amount = this.otherMoney;
					} else {
						recharge_id = this.currentType;
					}
				} else {
					recharge_id = this.currentType;
				}
				let postData = {
					wx_openid:wx_openid,
					recharge_id:recharge_id,
					amount:amount
				}
				this.isPay = true;
				uni.showLoading({
					title:"支付中"
				})
				this.$api.payRecharge(postData).then(function(res){
					uni.hideLoading();
					if(res.status == 1) {
						uni.requestPayment({
							provider:"wxpay",
							orderInfo: 'orderInfo',
							timeStamp:res.data.timeStamp,
							nonceStr:res.data.nonceStr,
							package:res.data.package,
							signType:res.data.signType,
							paySign:res.data.paySign,
							success(payRes) {
								_this.isPay = false;
								if(payRes.errMsg == "requestPayment:ok") {
									uni.showToast({
									    title: "支付成功",
									    icon: "success",
									    duration: 2000,
									});
									setTimeout(() => {
									    uni.navigateBack({
									    	delta:1
									    })
									}, 2000);
								}
							},
							fail(payErrRes) {
								_this.isPay = false;
								console.log(payRes);
								_this.$toast("支付失败");
							}
						})
					} else {
						_this.isPay = false;
						_this.$toast(res.info);
						return;
					}
				})
			}
		},
		async created() {
			let res = await this.$api.getMoneyData()
			console.log(res.data);
			if(res.data) {
				this.activityList = res.data.activity;
				this.currentType = res.data.typeId;
				this.generalList = res.data.general;
			}
		}
	}
</script>

<style lang='scss' scoped>
	.app-container {
		background: #f3f3f3;
		padding: 15px;  
		height: 100vh;
		.app-body{
			border-radius: 16rpx;
			background-color: #FFFFFF;
			.app-body-tab{
				height: 104rpx;
				line-height: 104rpx;
				.tui-left-active{
					background-color: #FFF0E5;
					border-bottom-right-radius: 16rpx;
					.cur{
						/* font-size: 28rpx; */
						color: #000000;
						font-weight: bold;
					}
				}
				
				.tui-right-active{
					background-color: #FFF0E5;
					border-bottom-left-radius: 16rpx;
					.cur{
						/* font-size: 28rpx; */
						color: #000000 !important;
						font-weight: bold;
					}
				}
				.tab_text{
					font-size: 32rpx;
					color: #FF6D00;
				}
			}
			.app-body-data{
				padding: 20rpx 30rpx;
				.app-body-data_text{
					font-size: 24rpx;
					color: #000000;
					font-weight: bold;
				}
				.app-body-data_b{
					flex-wrap: wrap;
					padding-bottom: 20rpx;
					.cur{
						background-color: rgba(255,109,0,0.1) !important;
						color: #FF6D00;
					}
					.app-body-data_b_body{
						margin-top: 40rpx;
						width: 300rpx;
						padding: 30rpx 0rpx;
						border-radius: 16rpx;
						background-color: #F3F3F3;
						display: flex;
						flex-direction: column;
						position: relative;
						overflow: hidden;
						.dollar{
							font-size: 28rpx;
							margin: 0rpx 8rpx;
						}
						.dollar-text-give{
							font-size: 28rpx;
						}
						.dollar-text{
							font-size: 36rpx;
						}
						.bold{
							font-weight: bold;
						}
						.dollar-text-absolute{
							position: absolute;
							right: 0;
							bottom: 0;
							width: 58rpx;
							height: 34rpx;
							line-height: 34rpx;
							background-color: #FF6C00;
							text-align: center;
							align-items: center;
							text{
								font-size: 20rpx;
								color: #FFFFFF;
							}
						}
					}
				}
			}
			
		}
		.app-other{
			border-radius: 16rpx;
			margin: 40rpx 0rpx;
			padding: 20rpx 30rpx;
			background-color: #FFFFFF;
			.app-other_text{
				font-size: 32rpx;
				color: #000000;
				font-weight: bold;
			}
			.app-other-data{
				margin-top: 36rpx;
				.app-other-data_text{
					margin-right: 15rpx;
					font-size: 36rpx;
					font-weight: bold;
				}
			}
			.row{
			  display: flex;
			  align-items: center;
			}
		}
		.app-alert{
			display: inline-flex;
			align-items: center;
			margin-top: 20rpx;
			.tui-grid-icon{
				
			}
			.app-alert-text{
				font-size: 24rpx;
				color: #FF4848;
			}
		}
		.app-bottom{
			border-radius: 16rpx;
			padding: 20rpx 30rpx;
			margin-top: 20rpx;
			background-color: #FFFFFF;
			.tui-left{
				display: inline-flex;
				align-items: center;
				text{
					margin-left: 10rpx;
				}
			}
		}
	}
	
	.tui-right{
		text-align: right;
	}
	.ml20{
		margin-left: 40rpx;
	}
	.bottom-btn-box{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20rpx 20rpx;
	}
	.tui-input{
		text-align: right;
	}
</style>
