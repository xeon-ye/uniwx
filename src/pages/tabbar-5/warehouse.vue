<template>
	<view class="app-container">
		<view class="app-body">
			<view class="top-content">
				<text class="uni-title row">寄哪里</text>
				<text class="uni-sub-title row">热门目的地国家/地区</text>
				
				<view class="tui-flex tui-hot-country-wrap">
					<view class="tui-center tui-hot-country mr" v-for="(item, index) in warehouseHot" :key="index" @click="navTo(item)">
						<text class="country-text">{{ item.name }}</text>
					</view>
				</view>
				
			</view>
			<view class="item-list-wrap">
				<tui-list-view color="#fff">
					<tui-list-cell arrow radius=true :lineRight="true"  padding="30rpx" color="#000000" :hover="false" :arrow="false" v-for="(item, index) in warehouse" :key="index" @click="navTo(item)">
						{{ item.name }}
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
				warehouse:[],
				warehouseHot:[]
			};
		},
		methods: {
			navTo(e) {
			  uni.navigateTo({
				  url: '/pages/tabbar-5/warehouse_detail?id='+e.id+"&name="+e.name
			  });
			}
		},
		async created() {
			let res = await this.$api.warehouseCountry();
			if(res.data) {
			    this.warehouse = res.data.all;
				this.warehouseHot = res.data.hot;
			}
			console.log(this.warehouse);
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
		.top-content{
			background: #fff;
			padding: 24rpx 30rpx;
			.uni-title{
				font-size: 32rpx;
				font-weight: bold;
			}
			.uni-sub-title{
				margin: 40rpx 0rpx;
				font-size: 28rpx;
			}
		}
	}
	.row{
	  display: flex;
	  align-items: center;
	}
	.flex{
		flex: 1;
	}
	.tui-hot-country{
		width: 30%;
		margin-bottom: 10rpx;
		background-color: #eaeef1;
		margin-right: 20rpx;
		padding: 20rpx 0rpx;
		border-radius: 40rpx;
		.country-text{
			font-size: 26rpx;
		}
	}
	.tui-hot-country-wrap{
		-webkit-flex-wrap: wrap;flex-wrap: wrap;
	}
</style>
