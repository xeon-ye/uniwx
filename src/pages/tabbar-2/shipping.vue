<template>
	<view class="container">
		<view class="tui-order-header">
			<view class="tui-text">订单编号：
				<text class="tui-bold">{{ orderInfo.order_sn }}</text>
			</view>
			<view class="tui-text">下单时间：{{ orderInfo.created }}</view>
			<view class="tui-text">支付时间：{{ orderInfo.pay_time }}</view>
		</view>
		<view class="tui-order-tracking">
			<tui-time-axis v-if="shippingInfo.length > 0">
				<tui-timeaxis-item backgroundColor="transparent" v-for="(item, index) in shippingInfo" :key="index">
					<template v-slot:node>
						<view class="tui-node" :style="{backgroundColor:backgroundColor}" v-if="item.status_name == 'SignIn'">
							<tui-icon name="check" color="#fff" :size="14" :bold="true"></tui-icon>
						</view>
						
						<view class="tui-node" v-else>
							<tui-icon name="transport" color="#fff" :size="13"></tui-icon>
						</view>
					</template>

					<template v-slot:content>
						<view>
							<view class="tui-order-title">{{ item.status_name }}</view>
							<view class="tui-order-desc">{{ item.remark }}</view>
							<view class="tui-order-time tui-gray">{{ item.status_time }}</view>
						</view>
					</template>
				</tui-timeaxis-item>

				<!-- <tui-timeaxis-item backgroundColor="transparent">
					<template v-slot:node>
						<view class="tui-node">
							<tui-icon name="people" color="#fff" :size="13"></tui-icon>
						</view>
					</template>
					<template v-slot:content>
						<view class="tui-order-title tui-gray">派送中</view>
						<view class="tui-order-desc tui-light-gray">您的订单正在配送途中（快递员：echo.，电话：
							<text class='tui-primary'>13822448855</text>），请您耐心等待。</view>
						<view class="tui-order-time tui-gray">2019-05-01 16:29:07</view>
					</template>
				</tui-timeaxis-item>

				<tui-timeaxis-item backgroundColor="transparent">
					<template v-slot:node>
						<view class="tui-node">
							<tui-icon name="transport" color="#fff" :size="13"></tui-icon>
						</view>
					</template>
					<template v-slot:content>
						<view class="tui-order-title tui-gray">运输中</view>
						<view class="tui-order-desc tui-light-gray">您的订单已到达XX【北京XX营业部】</view>
						<view class="tui-order-time tui-gray">2019-05-01 16:17:32</view>
					</template>
				</tui-timeaxis-item>

				<tui-timeaxis-item backgroundColor="transparent">
					<template v-slot:node>
						<view class="tui-node-dot"></view>
					</template>

					<template v-slot:content>
						<view class="tui-order-desc tui-light-gray tui-ptop">您的订单已在XX【北京XX营业部】收货完成</view>
						<view class="tui-order-time tui-gray">2019-05-01 08:40:32</view>
					</template>
				</tui-timeaxis-item>

				<tui-timeaxis-item backgroundColor="transparent">
					<template v-slot:node>
						<view class="tui-node-dot"></view>
					</template>
					<template v-slot:content>
						<view class="tui-order-desc tui-light-gray tui-ptop">您的订单由XXXX送往XX【北京XX营业部】</view>
						<view class="tui-order-time tui-gray">2019-05-01 08:17:32</view>
					</template>
				</tui-timeaxis-item>

				<tui-timeaxis-item backgroundColor="transparent">
					<template v-slot:node>
						<view class="tui-node">
							<tui-icon name="home" color="#fff" :size="12"></tui-icon>
						</view>
					</template>
					<template v-slot:content>
						<view class="tui-order-title tui-gray">仓库处理中</view>
						<view class="tui-order-desc tui-light-gray">打包完成</view>
						<view class="tui-order-time tui-gray">2019-05-01 08:09:16</view>
					</template>
				</tui-timeaxis-item>

				<tui-timeaxis-item backgroundColor="transparent">
					<template v-slot:node>
						<view class="tui-node">
							<tui-icon name="order" color="#fff" :size="12"></tui-icon>
						</view>
					</template>
					<template v-slot:content>
						<view class="tui-order-title tui-gray">已下单</view>
						<view class="tui-order-desc tui-light-gray">您的订单将下传XXX仓库，准备出库</view>
						<view class="tui-order-time tui-gray">2019-05-01 02:09:16</view>
					</template>
				</tui-timeaxis-item>

				<tui-timeaxis-item backgroundColor="transparent">
					<template v-slot:node>
						<view class="tui-node">
							<tui-icon name="notice" color="#fff" :size="12"></tui-icon>
						</view>
					</template>
					<template v-slot:content>
						<view class="tui-order-title tui-gray">温馨提示</view>
						<view class="tui-order-desc tui-light-gray">您的订单预计5月1日送达您手中</view>
						<view class="tui-order-time tui-gray">2019-05-01 02:05:16</view>
					</template>
				</tui-timeaxis-item>

				<tui-timeaxis-item backgroundColor="transparent">
					<template v-slot:node>
						<view class="tui-node">
							<tui-icon name="order" color="#fff" :size="12"></tui-icon>
						</view>
					</template>
					<template v-slot:content>
						<view class="tui-order-title tui-gray">已下单</view>
						<view class="tui-order-desc tui-light-gray">您提交了订单，请等待第三方卖家系统弄确认</view>
						<view class="tui-order-time tui-gray">2019-05-01 02:04:16</view>
					</template>
				</tui-timeaxis-item> -->

			</tui-time-axis>
			<tuiEmpty source="data" emptyText="暂无物流信息" v-if="shippingInfo.length == 0"></tuiEmpty>
		</view>
	</view>
</template>

<script>
	import tuiEmpty from '@/components/tui-empty/tui-empty.vue';
	import tuiTimeAxis from "@/components/tui-time-axis/tui-time-axis"
	export default {
		components:{
			tuiTimeAxis,
			tuiEmpty
		},
		data() {
			return {
				backgroundColor: "#5677fc",
				orderInfo:{},
				shippingInfo:{},
				order_sn:""
			}
		},
		async onLoad(options) {
			let order_sn = options.order_id;
			let res = await this.$api.getShipping({order_sn:order_sn});
			console.log(res.data);
			console.log(res.data.length);
			if(res.data) {
			    this.orderInfo = res.data.order;
				this.shippingInfo = res.data.shipping;
			}
		}
	};
</script>

<style>
	.container{
		 background: #f3f3f3;
	}
	.tui-order-header {
		padding: 30rpx;
		box-sizing: border-box;
		background: #fff;
	}

	.tui-text {
		font-size: 28rpx;
		color: #333;
		padding: 4rpx;
	}

	.tui-bold {
		font-weight: bold;
	}

	.tui-node {
		height: 44rpx;
		width: 44rpx;
		border-radius: 50%;
		background-color: #ddd;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		flex-shrink: 0;
	}

	.tui-node-dot {
		height: 16rpx;
		width: 16rpx;
		background-color: #ddd;
		border-radius: 50%;
		/* transform: translateY(45%); */
		margin-top: 6rpx;
	}

	.tui-bg-primary {
		background: #EB0909 !important;
	}

	.tui-order-tracking {
		padding: 30rpx 30rpx 30rpx 40rpx;
		background: #fff;
		margin-top: 20rpx;
		box-sizing: border-box;
	}

	.tui-order-title {
		padding-bottom: 12rpx;
		font-size: 32rpx;
		color: #333;
		font-weight: bold;
	}

	.tui-order-desc {
		padding-bottom: 12rpx;
		font-size: 28rpx;
		color: #333;
	}

	.tui-ptop {
		display: flex;
		justify-content: flex-start;
		line-height: 28rpx;
	}

	.tui-order-time {
		font-size: 24rpx;
		font-weight: bold;
	}

	.tui-gray {
		color: #848484 !important;
	}
	.tui-gray{
		background-color: rgba(255,255,255,0)
	}
	.tui-primary{
		background-color: rgba(255,255,255,0) !important
	}
	.tui-light-gray {
		color: #888 !important;
	}

	.tui-primary {
		color: #5677fc;
	}
</style>
