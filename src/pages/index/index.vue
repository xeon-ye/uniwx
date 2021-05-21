<template>
    <view class="app-container">
        <!-- 轮播图 -->
        <view class="tui-banner-box">
            <swiper
                :indicator-dots="true"
                :autoplay="true"
                :interval="5000"
                :duration="150"
                class="tui-banner-swiper"
                :circular="true"
                indicator-color="rgba(255, 255, 255, 0.8)"
                indicator-active-color="#fff"
            >
                <swiper-item v-for="(item, index) in bannerList" :key="index">
                    <image
                        :src="item.pic_url"
                        class="tui-slide-image"
                        mode="scaleToFill"
                    />
                </swiper-item>
              
            </swiper>
        </view>
		<!-- board -->
		<view class="tui-notice-board">
		    <view class="tui-rolling-news">
		        <tui-icon
		            name="news-fill"
		            :size="28"
		            color="#FF4848"
		        ></tui-icon>
		        <swiper
		            vertical
		            autoplay
		            circular
		            interval="3000"
		            class="tui-swiper"
		        >
		            <swiper-item
		                v-for="(item, index) in tipsList"
		                :key="index"
		                class="tui-swiper-item"
		            >
		                <view class="tui-news-item" @tap="detail">{{
		                    item.text
		                }}</view>
		            </swiper-item>
		        </swiper>
		    </view>
		</view>
		<view class="space"></view>
        <view class="banner-part">
            <view class="piece bg-1">
                <view class="desc-box"  @click="navTo('/pages/send/index')">  
                    <view class="left left-1"></view>
                    <view class="right">
                        <view>上门取件</view>
                        <view>2小时上门取件</view>   
                    </view> 
                </view>
            </view>
            <view class="piece bg-2" @click="navTo('/pages/contraband/index')">
                <view class="desc-box">
                    <view class="left left-2"></view>
                    <view class="right">
                        <view>违禁物品</view>
                        <view>违禁物品集合</view>
                    </view>
                </view>
            </view>
            <view class="piece bg-3" @click="navTo('/pages/invite/index')">
                <view class="desc-box">
                    <view class="left left-3"></view>
                    <view class="right">
                        <view>推荐他人</view>
                        <view>下单拿现金</view>
                    </view>
                </view>
            </view>
            <view class="piece bg-4">
                <view class="desc-box" @click="navTo('/pages/freight/index')">
                    <view class="left left-4"></view>
                    <view class="right">
                        <view>运费与实效</view>
                        <view>透明正规准时</view>
                    </view>
                </view>
            </view>
        </view>
        <!-- write part -->
        <view class="write-address-part">
            <text>海外地址不会填？邀请收件人填写</text>  
            <button open-type="share" style="padding:0px 9px;font-size: 14px;">邀请填写</button>
        </view>
		<view class="app-order">
			<view class="app-order-wrap">
				<view class="app-order-alert">
					<view class="tui-flex">
						<view class="tui-left tui-col-12">
							<tui-icon name="news-fill" size="28" color="#FF4848"></tui-icon>
							<text class="alert-text">这些包裹没有主人，快来认领</text>
						</view>
					</view>
				</view>
				<view class="app-order-search">
					<view class="tui-flex tui-align-between">
						<view class="tui-left tui-col-8 ">
							<input placeholder="输入快递单号" class="search-input" />
						</view>
						<view class="tui-right">
							<tui-button type="black" plain shape="circle" width="160rpx" height="60rpx" :size="28" @click="search">搜索</tui-button>
						</view>
					</view>
				</view>
				<view class="app-order-list">
					
					<tui-list-view color="#777" unlined="all">
					  <tui-list-cell :arrow="false" unlined="true" :hover="false" padding="20rpx" color="#000000">
						   <view class="tui-flex app-order-list_tab">
							<view class="tui-left tui-col-4 title">快递单号</view>
							<view class="tui-center tui-col-4 title">仓库签收时间</view>
							<view class="tui-right tui-col-4 title">包裹状态</view>
						   </view>
					  </tui-list-cell>
					</tui-list-view>
					
					<view class="app-order-list_data">
						<tui-list-view color="#777" unlined="all">
						  <tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="20rpx" color="#000000">
						    <view class="tui-flex">
						    	<view class="tui-left tui-col-4 title">20201213</view>
								<view class="tui-center tui-col-4 title">2021231</view>
						    	<view class="tui-right tui-col-4 title">
									<text class="btn-get">认领</text>
								</view>
						    </view>
							
						  </tui-list-cell>
						  <tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="20rpx" color="#000000">
						    <view class="tui-flex">
						    	<view class="tui-left tui-col-4 title">20201213</view>
						  		<view class="tui-center tui-col-4 title">2021231</view>
						    	<view class="tui-right tui-col-4 title">
									<text class="btn-get-end">已经认领</text>
								</view>
						    </view>				
						  </tui-list-cell>
						  <tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="20rpx" color="#000000">
						    <view class="tui-flex">
						    	<view class="tui-left tui-col-4 title">20201213</view>
						  		<view class="tui-center tui-col-4 title">2021-03-12</view>
						    	<view class="tui-right tui-col-4 title">
									<text class="btn-get-wait">需要客服处理</text>
						  		</view>
						    </view>				
						  </tui-list-cell>
						</tui-list-view>
					</view>
				</view>
			</view>
			
		</view>
		<view class="app-customer">
			<button open-type="contact" class="app-customer_btn">
				<view class="app-customer_data_flex">
					<tui-icon name="kefu" size="28" color="#FFFFFF" style="margin-top:9rpx;"></tui-icon>
					<text class="tui-grid-label">在线客服</text>
				</view>
			</button>
		</view>
		<view class="follow-wrapp" v-if="followShow == true">
			<view class="follow-block tui-flex">
				<view class="tui-left tui-col-2">
					<tui-icon @click="closeFollow" name="shut" size="18" color="#FFFFFF"></tui-icon>
				</view>
				<view class="tui-center tui-col-7">
					<text class="follow-text">关注赫德速递公众号，包裹动态实时掌握</text>
				</view>
				<view class="tui-right tui-col-3" @click="followTo">
					<text class="follow-btn">立即关注</text>
				</view>
			</view>
		</view>
    </view>
</template>

<script>
import Api from "../../services/index";
export default {
	components: {},
    data() {
        return {
            bannerList: [],  // 轮播图
            tipsList: [],  // 提示
			followShow:true
        }; 
    },
    async onLoad(option) {
        let getBannerRes = await Api.getBanner();
		console.log()
        this.bannerList = getBannerRes.data;
        let tipsRes = await Api.getAlert();
        this.tipsList = tipsRes.data;
        setTimeout(() => {
            this.animation = true;
        }, 600);
		if(option.scene){
			this.$cache.put(
			    "scene",
			    option.scene
			); 
		} 
    },
    methods: {
        navTo(url) {
            this.$href.navigateTo({ url: url });      
		},
		closeFollow() {
			this.followShow = false;
		},
		followTo() {
			let url = "/pages/tabbar-4/webview?src="+"https://www.baidu.com";

			this.$href.navigateTo({url : url});
		}
    },
	onShareAppMessage(res) {
		if(res.from == "button") {
			let token = this.$cache.get('token');
			return {
				title:"邀请你填写收件地址",
				path:"pages/invite/address?token="+token,
				imageUrl:"https://static.51mitui.com/wxMini/static/invite_address.png"
			}
		}
	}
};
</script>

<style lang="scss">
	page{
		background-color: #f3f3f3;
	}
.app-container {
	.space{
		height: 1rem;
	}
	height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20rpx 30rpx;
    background: #f3f3f3;
	
    .tui-notice-board {
        width: 100%;
        padding-right: 30rpx;
        box-sizing: border-box;
        font-size: 28rpx;
        height: 60rpx;
        background: rgba(255,217,188,0.5);
        display: flex;
        align-items: center;
		border-radius: 16rpx;
		overflow: hidden;
        .tui-rolling-news {
            width: 100%;
		
            padding: 12rpx 30rpx;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: nowrap;
        }

        .tui-swiper {
            font-size: 28rpx;
            height: 50rpx;
            flex: 1;
        }

        .tui-swiper-item {
            display: flex;
            align-items: center;
        }

        .tui-news-item {
            line-height: 28rpx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
			
        }
    }
    .tui-banner-box {
        width: 100%;
        box-sizing: border-box;
        margin-top: 20rpx;
        margin-bottom: 20rpx;
        box-shadow:0px 0px 20px 2px rgba(255,108,0,0.1);
        .tui-banner-swiper {
            width: 100%;
            height: 240rpx;
            border-radius: 16rpx;
            overflow: hidden;
            transform: translateY(0);
        }

        .tui-slide-image {
            width: 100%;
            height: 240rpx;
            display: block;
        }

        /* #ifdef MP-WEIXIN */
        .tui-banner-swiper .wx-swiper-dot {
            width: 8rpx;
            height: 8rpx;
            display: inline-flex;
            background: none;
            justify-content: space-between;
        }

        .tui-banner-swiper .wx-swiper-dot::before {
            content: "";
            flex-grow: 1;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 16rpx;
            overflow: hidden;
        }

        .tui-banner-swiper .wx-swiper-dot-active::before {
            background-color: #fff;
        }

        .tui-banner-swiper .wx-swiper-dot.wx-swiper-dot-active {
            width: 16rpx;
        }

        /* #endif */

        /* #ifndef MP-WEIXIN */
        .tui-banner-swiper .uni-swiper-dot {
            width: 8rpx;
            height: 8rpx;
            display: inline-flex;
            background-color: none;
            justify-content: space-between;
        }
		/* #endif */
        .tui-banner-swiper .uni-swiper-dot::before {
            content: "";
            flex-grow: 1;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 16rpx;
            overflow: hidden;
        }

        .tui-banner-swiper .uni-swiper-dot-active::before {
            background-color: #fff;
        }

        .tui-banner-swiper .uni-swiper-dot.uni-swiper-dot-active {
            width: 16rpx;
        }
    }
    .banner-part {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
		box-shadow:0px 0px 20px 2px rgba(255,108,0,0.1);
        margin-bottom: 16rpx;
        .piece {
            width: calc(50% - 2rpx);
            height: 190rpx;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            .desc-box {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                width: 100%;
                height: 100%;
                padding-left: 30rpx;
                .left {
                    width: 100rpx;
                    height: 100rpx;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    margin-right: 4rpx;
                }
                .left-1 {
                    background-image: url("../../static/index-1.png");
                }
                .left-2 {
                    background-image: url("../../static/index-2.png");
                }
                .left-3 {
                    background-image: url("../../static/index-3.png");
                }
                .left-4 {
                    background-image: url("../../static/index-4.png");
                }
                .right {
                    :nth-child(1) {
                        color: #000000;
                        font-size: 35rpx;
						font-weight: bold;
                    }
                    :nth-child(2) {
                        color: #7b7b7b;
                        font-size: 27rpx;
                    }
                }
            }
        }
        .bg-1 {
            background-image: url("../../static/index-bg-1.png");
            margin-right: 4rpx;
            margin-bottom: 4rpx;
        }
        .bg-2 {
            background-image: url("../../static/index-bg-2.png");
            margin-bottom: 4rpx;
        }
        .bg-3 {
            background-image: url("../../static/index-bg-3.png");
            margin-right: 4rpx;
        }
        .bg-4 {
            background-image: url("../../static/index-bg-4.png");
        }
    }
    .write-address-part {
        height: 110rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        width: 100%;
        padding: 0 30rpx;
        font-size: 28rpx;
        box-sizing: border-box;
		border-radius: 16rpx;
		overflow: hidden;
		
        margin: 20rpx 0rpx;
		box-shadow:0px 0px 20px 2px rgba(255,108,0,0.1);
        > text {
            font-weight: bold;
        }
        > button {
            color: #fff;
            height: 60rpx;
            line-height: 60rpx;
            border-radius: 30rpx;
            background-image: linear-gradient(to right, #ff9900, #ff7100);
        }
    }
	
	.app-order{
		width: 100%;
		border-radius: 16rpx;
		overflow: hidden;
		display: none;
		background-color: #FFFFFF;
		.app-order-wrap{
			padding: 20rpx;
			border-radius: 16rpx;
			.app-order-alert{
				.tui-left{
					display: inline-flex;
					align-items: center;
					text{
						margin-left: 10rpx;
					}
				}
				.alert-text{
					font-size: 28rpx;
				}
			}
			.app-order-search{
				margin: 20rpx 0rpx;
				.search-input{
					border-radius: 50rpx;
					width: 444rpx;
					background-color: #F3F3F3;
					height: 60rpx;
					padding: 0rpx 20rpx;
					font-size: 26rpx;
				}
				.search-btn{
					border: 2rpx solid #000000;
					color: #000000;
				}
			}
			.app-order-list{
				margin-top: 20rpx;
				.title{
					font-size: 28rpx;
					color: #000000;
				}
				.app-order-list_data{
					.btn-get{
						padding: 10rpx 40rpx;
						color: #fff;
						height: 60rpx;
						line-height: 60rpx;
						border-radius: 30rpx;
						font-size: 24rpx;
						background-image: linear-gradient(to right, #ff9900, #ff7100);
					}
					
					.btn-get-end{
						padding: 10rpx 20rpx;
						color: #fff;
						height: 60rpx;
						line-height: 60rpx;
						border-radius: 30rpx;
						font-size: 24rpx;
						background-color: #ACACAC;
					}
					.btn-get-wait{
						padding: 10rpx 20rpx;
						color: #fff;
						height: 60rpx;
						line-height: 60rpx;
						border-radius: 30rpx;
						font-size: 24rpx;
						background-color: #FF0000;
					}
				}
			}
		}
		
	}
}

.logo {
    height: 200rpx;
    width: 200rpx;
    margin: 200rpx auto 50rpx auto;
}

.text-area {
    display: flex;
    justify-content: center;
}

.title {
    font-size: 36rpx;
    color: #8f8f94;
}
.tui-right{
	text-align: right;
}
.follow-wrapp{
	width: 100%;
	left: 0rpx;
	position: fixed;
	bottom: 10rpx;
	
	.follow-block{
		margin: 20rpx 30rpx;
		padding: 5rpx 20rpx;
		justify-content: center;
		align-items: center;
		 background-image: linear-gradient(to right, #ff9900, #ff7100);
		border-radius: 50rpx;
		overflow: hidden;
		.follow-text{
			font-size: 24rpx;
			color: #FFFFFF;
		}
		.follow-btn{
			background-color: #FFFFFF;
			padding: 4rpx 12rpx;
			color: #FF6C00;
			font-size: 24rpx;
			border-radius: 50rpx;
			overflow: hidden;
		}
	}
	
}
.app-customer{
	position: fixed;
	right: 13rpx;
	bottom: 130rpx;
	.app-customer_btn::after{
	 border: 0px;
	}
	.app-customer_btn{
		border: 0px;
		line-height: 57rpx;
		background-color: rgba(255, 255, 255, 0);
		.app-customer_data_flex{
			display: flex;
			width: 114rpx;
			height: 114rpx;
			background-color: #FF8C00;
			flex-direction: column;
			border-radius: 32rpx;
			.tui-grid-label {
                margin-top: -20rpx;
				display: block;
				text-align: center;
				font-size: 22rpx;
				color: #F5F5F5;
			}
		}
	}
	
	
}
</style>
