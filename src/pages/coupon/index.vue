<template>
    <view class="app-container">
        <view class="coupon-part-list" v-if="couponList.length > 0">
             <view class="coupon-item " :class="[item.status == 3 ? 'use-item' : 'no-use-item']" v-for="(item,index) in couponList" :key="index">
                <view class="coupon-top">
                    <view class="money-num" v-if="item.coupon_type == 1">
                        <text>￥</text><text class="num">{{ item.money }}</text>
                    </view>
                    <view class="money-num" v-else>
                        <text class="num">{{ item. discount }}</text><text>折</text>
                    </view>
                    <view class="coupon-desc">
                        <view>{{ item.coupon_name }}</view>
                        <view>仅限国际线路使用</view>
                    </view>
                </view>
                <view class="coupon-bottom">
                    <view class="coupon-time"> 有效期：{{ item.end_time }}前 </view>
                    <view class="coupon-btn use-btn" v-if="item.status === 3" @click="goUse(item)"> 立即使用 </view>
                    <view class="coupon-btn no-use-btn" v-else-if="item.status === 2"> 已过期 </view>
                    <view class="coupon-btn no-use-btn" v-else-if="item.status === 1"> 已使用 </view>
                </view>
            </view>
        </view>
        <view  class="no-data"  v-if="couponList.length == 0">
			<tuiEmpty source="coupon" emptyText="暂无优惠券"></tuiEmpty>
        </view>
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
            couponList:[],
			from:""
        };
    },
    methods: {
        getCouponList(){
            this.$api.getCouponList()
        },
		goUse(item) {
			if(this.from == "order") {
				let pages = getCurrentPages();
				let nowPage = pages[ pages.length - 1];
				let prevPage = pages[ pages.length - 2 ];
				prevPage.$vm.coupon = item; 
				uni.navigateBack({
					delta:1
				})
			} else {
				let url = "../send/index?from=coupon&coupon="+JSON.stringify(item)
				uni.navigateTo({
					url:url
				})
			}
		}
    },
    async created() {
        let res = await this.$api.getMyCounponList({page:1,size:10});
        if(res.data && res.data.list.length > 0) {
            this.couponList = res.data.list;
        }
        console.log(res);
    },
	onLoad(options) {
		this.from = options.from
	},
    mounted() {},
};
</script>
<style lang='scss' scoped>
.app-container {
    background: #f3f3f3;
    min-height: 100vh;
    padding: 40rpx 56rpx 0;
    .coupon-part-list {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .coupon-item {
            width: 640rpx;
            height: 103px;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            margin-bottom: 40rpx;
            .coupon-top {
                height: 66px;
                display: flex;
                align-items: center;
                color: #fff;
                font-size: 14px;
                .money-num {
                    width: 220rpx;
                    text-align: center;
                    .num {
                        font-size: 48rpx;
                        font-weight: bold;
                    }
                }
                .coupon-desc {
                    padding-left: 40rpx;
                }
            }
            .coupon-bottom {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 30px;
                padding: 0 50rpx;
                font-size: 12px;
                .coupon-btn {
                    height: 40rpx;
                    line-height: 40rpx;
                    border-radius: 20rpx;
                    border: 1px solid;
                    padding: 0 7px;
                }
                .use-btn {
                    color: #fe5108;
                    border-color: #fe5108;
                }
                .no-use-btn {
                    color: #7b7b7b;
                    border-color: #7b7b7b;
                }
            }
        }
        .use-item {
            background-image: url("../../static/coupon-1.png");
        }
        .no-use-item {
            background-image: url("../../static/coupon-2.png");
        }
    }
    .no-data{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-100%);
        width: 100%;
        height: 460rpx;
        img{
            width: 80%;
            height: 100%;
        }
    }
}
</style>