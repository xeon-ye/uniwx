<template>
	<view class="app-container">
		<view class="top-part">
			<view class="center-part-wrap">
				<view class="center-part">
					<view class="tui-flex tui-align-between">
						<view class="tui-left tui-col-7">
							<text class="allowed-money">可用余额</text>
							<text class="withdraw-action"@click="apply">申请提现 > </text>
						</view>
						<!-- <view class="tui-right tui-col-5">
							<text class="pay-pass">支付密码管理</text>
						</view> -->
					</view>
					
					<view class="tui-flex tui-align-between mt20 hl60">
						<view class="tui-left tui-col-5">
							<text class="money-tag">¥</text>
							<text class="money-data">{{ moneyData.money }}</text>
						</view>
						<view class="tui-right tui-col-5">
							<text class="chongzhi" @click="invest">充值</text>
						</view>
					</view>
					<view class="tui-flex tui-align-between mt20">
						<view class="tui-left tui-col-5">
							<text class="money-alert">含不可提现：{{ moneyData.not_allow_money }}</text>
						</view>
						<view class="tui-right tui-col-5">
							<text class="money-alert">含推荐收益：{{ moneyData.recommend_money }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="app-body">
			<view class="middle-list">
				<view class="middle-list-tab">
					<tui-tabs :tabs="tabs" sliderWidth="350" padding="-10" sliderBgColor="#FF6C00" selectedColor="#FF6C00" :currentTab="currentTab" itemWidth="50%" @change="changeTab"></tui-tabs>
				</view>
				<view class="middle-list-data">
					<tuiEmpty source="data" v-if="dataList.length == 0"></tuiEmpty>
					<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="handleLoad" v-if="dataList.length > 0">
						<tui-list-view color="#777" unlined="all">
						  <tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="30rpx" color="#000000" v-for="(item, index) in dataList" :key="index">
						    <view class="tui-flex tui-align-between">
						    	<view class="tui-left tui-col-4">{{ item.money_text }}</view>
						    	<view class="tui-right tui-col-4">+{{ item.money }}</view>
						    </view>
						  </tui-list-cell>
						</tui-list-view>
					</scroll-view>
				</view>
			</view>
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
	import tuiTabs from "../../components/tui-tabs/tui-tabs";
	import tuiEmpty from '@/components/tui-empty/tui-empty.vue';
	export default {
		components: {
			tuiTabs,
			tuiEmpty
		},
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				tabs: [{
					name: "收入"
				}, {
					name: "支出"
				}],
				currentTab:0,
				dataList:[],
				freshing:false,
				isEnd:false,
				page:1,
				showModal:false,
				moneyData:{}
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
			invest() {
				uni.navigateTo({
					url:'invest'
				})
			},
			async handleLoad() {
				if (this.isEnd) {
					return;
				}
				if(this.freshing) {
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
				let res = await this.$api.accountRecord(getData)
					
				if(res.data.list.length == 0) {
					this.freshing = false;
					this.isEnd = true;
				}
				if(res.data && res.data.list.length > 0) {
					if(this.dataList.length == 0) {
						this.dataList = res.data.list;
					} else {
						this.dataList.push(res.data.list);
					}
					uni.hideLoading();
				}
				this.freshing = false;
				this.page++;
			}
		},
		async created() {
			this.handleLoad();
		},
		onLoad(e) {
			console.log(e.moneyData);
			if(e.moneyData) {
				this.moneyData = JSON.parse(e.moneyData)
			}
			uni.setNavigationBarTitle({
			    title: '我的余额'
			});
		}
	};
</script>

<style lang='scss' scoped>
	
	.app-container{
		background: #F3F3F3;
		height: 100vh;
		.top-part {
			padding: 20rpx 20rpx;
		}
	}
	.center-part-wrap{
		height: 285rpx;
		width: 710rpx;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-image: url("https://static.51mitui.com/wxMini/static/account.png");
		.center-part{
			padding: 30rpx;
			.allowed-money{
				font-size: 28rpx;
				color: #000000;
				font-weight: 500;
			}
			.withdraw-action{
				color: #707070;
				font-size: 20rpx;
				border-radius: 20rpx;
				margin-left: 30rpx;
				border: 1rpx solid #707070;
				padding: 4rpx 10rpx;
			}
			.pay-pass{
				color: #FF6C00;
				font-size: 28rpx;
				font-weight: 500;
			}
			.money-tag{
				color: #FF6C00;
				font-size: 36rpx;
				font-weight: 600;
			}
			.money-data{
				color: #FF6C00;
				font-size: 70rpx;
				margin-left: 12rpx;
				font-weight: 600;
			}
			.chongzhi{
				margin-top: 20rpx;
				color: #FFFFFF;
				background-color: #FF6C00;
				padding: 10rpx 60rpx;
				border-radius: 10rpx;
			}
			.money-alert{
				color: #7B7B7B;
				font-size: 24rpx;
			}
			.tui-right{
				text-align: right;
			}
		}
	}
	.app-body{
		padding: 20rpx;
		.middle-list{
			background-color: #FFFFFF;
			border-radius: 16rpx;
			width: 710rpx;
			overflow: hidden;
		}
		.tui-right{
			text-align: right;
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
	.mt20{
		margin-top: 40rpx;
	}
	.hl60{
		line-height: 60rpx;
	}
	.scroll-Y {
		height: 700rpx;
	}
</style>
