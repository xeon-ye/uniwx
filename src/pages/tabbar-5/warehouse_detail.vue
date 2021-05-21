<template>
	<view class="app-container">
		<view class="app-body">
			<view class="top-content">
				<text class="uni-title row">自寄到仓地址</text>
			</view>
			<view class="item-list-wrap">
				<tui-list-view color="#fff" unlined="all">
					<tui-list-cell arrow radius=true :lineRight="true" padding="30rpx" color="#000000" :hover="false" :arrow="false">
						<view class="tui-flex tui-align-between">
							<view class="tui-left tui-col-4 mr">收件人</view>
							<view class="tui-left tui-col-4 mr">{{ warehouse.name }}</view>
							<view class="tui-right tui-col-4 mr">
								<text class="copy-text" @click="copyData('name')">复制</text>
							</view>
						</view>
					</tui-list-cell>
					<tui-list-cell arrow radius=true :lineRight="true" padding="30rpx" color="#000000" :hover="false" :arrow="false">
						<view class="tui-flex tui-align-between">
							<view class="tui-left tui-col-4 mr">收件地址</view>
							<view class="tui-left tui-col-4 mr">{{ warehouse.address }}</view>
							<view class="tui-right tui-col-4 mr">
								<text class="copy-text" @click="copyData('address')">复制</text>
							</view>
						</view>
					</tui-list-cell>
					<tui-list-cell arrow radius=true :lineRight="true" padding="30rpx" color="#000000" :hover="false" :arrow="false">
						<view class="tui-flex tui-align-between">
							<view class="tui-left tui-col-4 mr">联系电话</view>
							<view class="tui-left tui-col-4 mr">{{ warehouse.mobile }}</view>
							<view class="tui-right tui-col-4 mr">
								<text class="copy-text" @click="copyData('mobile')">复制</text>
							</view>
						</view>
					</tui-list-cell>
				</tui-list-view>
			</view>
		</view>
		<view class="app-body mt">
			<view class="top-content">
				<text class="">{{ warehouse.name }}, {{ warehouse.address }}, {{ warehouse.mobile }}</text>
			</view>
			<view class="item-list-wrap">
				<tui-list-view color="#fff">
					<tui-list-cell arrow radius=true :lineRight="true" padding="30rpx" color="#000000" :hover="false" :arrow="false">
						<view class="tui-flex tui-align-between">
							<view class="tui-left tui-col-4 mr"></view>
							<view class="tui-left tui-col-4 mr"></view>
							<view class="tui-right tui-col-4 mr">
								<text class="copy-text" @click="copyData('all')">复制</text>
							</view>
						</view>
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
				warehouse: []
			};
		},
		methods: {
			copyData(e) {
				let data = "";
				switch(e) {
					case 'name':
						data = this.warehouse.name;
						break;
					case 'address':
						data = this.warehouse.address;
						break;
					case 'mobile':
						data = this.warehouse.mobile;
						break;
					default:
						data = this.warehouse.name +", "+this.warehouse.address+", "+this.warehouse.mobile
						
				}
				uni.setClipboardData({
				    data: data,
				    success: function () {
				        uni.showToast({
				        	title:"内容已复制"
				        })
				    }
				});
			}
		},
		async created() {

		},
		async onLoad(e) {
			let res = await this.$api.warehouseDetail({country_id:e.id});
			if(res.data) {
			    this.warehouse = res.data;
			}
		}
	};
</script>

<style lang='scss' scoped>
	.app-container {
		background: #f3f3f3;
		padding: 20rpx;
		height: 100vh;
		.app-body{
			border-radius: 10rpx;
			overflow: hidden;
		}
		.top-content {
			background: #fff;
			padding: 24rpx 30rpx;
			.uni-title {
				font-size: 32rpx;
				font-weight: bold;
			}

		}
	}
	.tui-right{
		text-align: right;
		.copy-text{
			font-size: 24rpx;
			color: #FF7900;
			border: 2rpx solid #FF7900;
			padding: 8rpx 40rpx;
			border-radius: 50rpx;
		}
	}
	.mt{
		margin-top: 40rpx;
	}
</style>
