<template>
	<view class="empty-block">
		<view class="empty-blcok-data">
			<image :src="setSource" class="empty-image" mode="aspectFit"></image>
			<text class="empty-text">{{ emptyText }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "tuiEmpty",
		props: {
			source: {
				type: String,
				default: 'empty'
			},
			emptyText: {
				type: String,
				default: "暂无数据"
			},
		},
		data() {
			return {
				sourceSrc:{
					data:"https://static.51mitui.com/wxMini/static/empty-data.png",
					blank:"https://static.51mitui.com/wxMini/static/empty.png",
					coupon:"https://static.51mitui.com/wxMini/static/empty-coupon.png"
				}
			}
		},
		computed: {
			setSource() {
				return this.sourceSrc[this.source];
			},
		}
	}
</script>

<style>
	.empty-blcok-data{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 10rpx 0rpx;
	}
	
	.empty-image{
		width: 440rpx;
		height: 440rpx;
	}
	.empty-text{
		font-size: 28rpx;
		color: rgba(255,108,0, 0.5);
	}
</style>
