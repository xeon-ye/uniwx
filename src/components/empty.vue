<template>
	<view class="empty-content">
		<image class="empty-content-image" :src="setSrc" mode="aspectFit"></image>
		<text class="empty-text">暂无数据</text>
	</view>
</template>

<script>
	export default {
		props: {
			src: {
				type: String,
				default: 'empty'
			},
		},
		data() {
			return {
				typeSrc: {
					empty: 'https://static.51mitui.com/wxMini/static/empty-data.png'
				},
			}
		},
		computed: {
			setSrc() {
				return this.typeSrc[this.src];
			},
		}
	}
</script>

<style lang="scss">
	.empty-content {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: $page-color-base;
		padding-bottom: 120upx;
		&-image {
			width: 440upx;
			height: 440upx;
		}
		.empty-text{
			font-size: 28rpx;
			color: rgba(255,108,0, 0.5);
		}
	}
</style>