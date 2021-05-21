<template>
    <view class="app-container">
		<view class="app-body">
			<view class="body-step_1 tui-flex">
				<view class="body-step_1_data tui-center tui-col-4">
					<text class="title">邀请人数</text>
					<text class="num">{{ inviteData.group_total }}人</text>
				</view>
				<view class="body-step_1_data tui-center tui-col-4">
					<text class="title">累计收益</text>
					<text class="num">{{ inviteData.withdrawn }}</text>
				</view>
				<view class="body-step_1_data tui-center tui-col-4">
					<text class="title">累计优惠券</text>
					<text class="num">{{ inviteData.coupon_total }}</text>
				</view>
			</view>
			<view class="body-step_2 tui-flex">
				<view class="body-step_1_data tui-center tui-col-4">
					<view class="share-wx">
						<tui-icon name="wechat" color="#FF6C00" size="42"></tui-icon>
					</view>
					<button class="share-btn" open-type="share">
						<text class="share-btn-text">微信分享</text>
					</button>
					
				</view>
				<view class="body-step_1_data tui-center tui-col-4">
					<view class="share-wx">
						<tui-icon name="pic" color="#FF6C00" size="42"></tui-icon>
					</view>
					<text class="share-text" @click="shareImage">生成海报</text>
				</view>
				<view class="body-step_1_data tui-center tui-col-4">
					<view class="share-wx">
						<text class="share-wx_code">{{ inviteData.code }}</text>
					</view>
					<text class="share-text" @click="copyCode">邀请码</text>
				</view>
			</view>
			<view class="body-step_3 tui-flex">
				<view class="body-step_title tui-flex-1">如何获得现金返利</view>
				<view class="body-step_3_data tui-flex-1">
					<view class="body-step_3_data_step tui-flex-1">
						<image src="https://static.51mitui.com/wxMini/static/step_1.png" class="step-image" mode="aspectFill"></image>
						<image src="https://static.51mitui.com/wxMini/static/line.png" mode="aspectFill" class="step-line"></image>
						<image src="https://static.51mitui.com/wxMini/static/step_2.png"  class="step-image" mode="aspectFill"></image>
						<image src="https://static.51mitui.com/wxMini/static/line.png" mode="aspectFill"  class="step-line"></image>
						<image src="https://static.51mitui.com/wxMini/static/step_3.png" mode="aspectFill" class="step-image"></image>
					</view>
					<view class="body-step_3_data_step_text tui-flex-1 tui-flex tui-align-between">
						<view class="body-step_3_data_step_1">
							<text>邀请好友注册</text>
							<text>您得一张85折卷</text>
						</view>
						<view class="body-step_3_data_step_1">
							<text>好友得一张</text>
							<text>全线75折卷</text>
						</view>
						<view class="body-step_3_data_step_1">
							<text>好友首次支付成功</text>
							<text>您得一张75折卷</text>
						</view>
					</view>
				</view>
			</view>
			<view class="body-step_4 tui-flex">
				<view class="body-step_title tui-flex-1">如何邀请好友注册</view>
				<view class="body-step_4_data tui-flex-1">
					<view class="body-step_4_data_icon tui-col-2 tui-center mr">
						<tui-icon name="wechat" color="#FF6C00" size="38"></tui-icon>
					</view>
					<view class="tui-col-10 tui-left">
						<view class="share_way_title">点击分享给微信好友</view>
						<view class="share_way_title_sub">好友点击分享链接直接注册</view>
					</view>
				</view>
				<view class="body-step_4_data tui-flex-1">
					<view class="body-step_4_data_icon tui-col-2 tui-center">
						<tui-icon name="pic" color="#FF6C00" size="38"></tui-icon>
					</view>
					<view class="tui-col-10 tui-left">
						<view class="share_way_title">点击生成推广海报</view>
						<view class="share_way_title_sub">好友微信扫描海报二维码注册</view>
					</view>
				</view>
				<view class="body-step_4_data tui-flex-1">
					<view class="body-step_4_data_icon tui-col-2 tui-center">
						<tui-icon name="message" color="#FF6C00" size="38"></tui-icon>
					</view>
					<view class="tui-col-10 tui-left">
						<view class="share_way_title">直接复制专属邀请码</view>
						<view class="share_way_title_sub">好友注册并填写邀请码</view>
					</view>
				</view>
				<view class="body-step_4_data">
					<view class="body-step_4_data_notes">
						选择以上任意一种方式邀请好友注册，好友支付完成后，你就可以在“个人中心”查看所获收益啦！
					</view>
				</view>
			</view>
			<view class="body-step_5 tui-flex">
				<view class="body-step_title tui-flex-1">推荐好友返利说明</view>
				<view class="body-step_5_data tui-flex-1">
					<text class="share-plain">1. 选择以上任意一种方式邀请好友注册，好友支付完成后，你就可以在“个人中心”查看所获收益啦！</text>
				</view>
				<view class="body-step_5_data tui-col-12">
					<text class="share-plain">2. 选择以上任意一种方式邀请好友注册，好友支付完成后，你就可以在“个人中心”查看所获收益啦！</text>
				</view>
				<view class="body-step_5_data tui-col-12">
					<text class="share-plain">3. 选择以上任意一种方式邀请好友注册，好友支付完成后，你就可以在“个人中心”查看所获收益啦！</text>
				</view>
				<view class="body-step_5_data tui-col-12">
					<text class="share-plain">4. 选择以上任意一种方式邀请好友注册，好友支付完成后，你就可以在“个人中心”查看所获收益啦！</text>
				</view>
				<view class="body-step_5_data tui-col-12">
					<text class="share-plain">5. 选择以上任意一种方式邀请好友注册，好友支付完成后，你就可以在“个人中心”查看所获收益啦！</text>
				</view>
			</view>
		</view>
		
		<uni-popup ref="showimage" :type="type" :mask-click="true">
			
			<view class="uni-image">
				<canvas @click.stop="" class="canvas-element" canvas-id="my-canvas"></canvas>
				<view class="uni-image-close tui-center" @click="cancel()">
					<tui-button type="warning" width="240rpx" height="80rpx" :size="24" @click="saveShare">保存图片</tui-button>
				</view>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';

	export default {
		components: {
			uniPopup
			
		},
		data() {
			return {
				context:null,
				inviteData:{},
				type: '',
				showModel:false,
				headerImg:"https://static.51mitui.com/default/invite.png",
			};
		},
		
		onShareAppMessage() {
			return {
				title:"注册领取新人大礼包!",
				path:"/pages/index/index?scene="+this.inviteData.code
			}
		},
		async onLoad() {
			this.initData();
		},
		onReady() {
			this.context = uni.createCanvasContext('my-canvas', this)
		},
		methods: {
			async initData() {
				let _this = this;
				await this.$api.getSellerInfo().then(function(res){
					
					if(res.data) {
						_this.inviteData = {
							code: res.data.member_no,
							group_total:res.data.group_total,
							coupon_total:res.data.coupon_total,
							code:res.data.member_no,
							withdrawn:res.data.withdrawn
						};
					}
				})
			},
			copyCode() {
				let data = this.inviteData.code;
				uni.setClipboardData({
				    data: data,
				    success: function () {
				        uni.showToast({
				        	title:"内容已复制"
				        })
				    }
				});
			},
			async shareImage() {
				let qrcodeResult = await this.$api.getQrcode();
				if(qrcodeResult.status == 0) {
					this.$toast("生成失败");
					return;
				}
				uni.showLoading({
					title:"生成中"
				})
				let hW = uni.upx2px(600);
				let hH = uni.upx2px(1000);
				let headerImg = await this.getImageInfo(this.headerImg)
				this.context.drawImage(headerImg.path, 0, 0, hW, hH)
				let fontSize = uni.upx2px(32);

				this.context.setFontSize(fontSize)
				this.context.setFillStyle('#FFFFFF');
				this.context.fillText(this.inviteData.code, 60, 500)
				
				let codeW = uni.upx2px(160);
				let codeH = uni.upx2px(160);
				let codeImg = await this.getImageInfo(qrcodeResult.data.src)
				this.context.drawImage(codeImg.path, 205, 430, codeW, codeH)
					
				//延迟渲染
				setTimeout(()=>{
					this.context.draw(true)
					uni.hideLoading()
					this.type = "center"
					this.$nextTick(() => {
						this.$refs['showimage'].open()
					})
				},1000)
			},
			cancel() {
				this.$refs['showimage'].close()
			},
			saveShare() {
				let _this = this;
				uni.getSetting({
					success(res) {
						if (Object.keys(res.authSetting).length > 0) {
							//判断是否有相册权限
							if (res.authSetting['scope.writePhotosAlbum'] == undefined) {
								//打开设置权限
								uni.openSetting({
									success(res) {
										console.log('设置权限', res.authSetting)
									}
								})
							} else {
								if (!res.authSetting['scope.writePhotosAlbum']) {
									//打开设置权限
									uni.openSetting({
										success(res) {
											console.log('设置权限', res.authSetting)
										}
									})
								}
							}
						} else {
							return
						}
					}
				})
				uni.canvasToTempFilePath({
					canvasId: 'my-canvas',
					quality: 1,
					success: function(res) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success(res) {
								uni.showToast({
									title: '已保存到相册',
									icon: 'success',
									duration: 2000
								})
								setTimeout(() => {
									_this.$refs['showimage'].close()
								}, 2000)
							}
						})
					},
					fail: function(err) {
						console.error(JSON.stringify(err))
					}
				})
			},
			//获取图片
			getImageInfo(imgSrc){
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src: imgSrc,
						success: (image) => {
							resolve(image);
							console.log('获取图片成功',image)
						},
						fail: (err) => {
							reject(err);
							console.log('获取图片失败',err)
						}
					});
				});
			},
		}
	};
</script>

<style lang='scss' scoped>
	.app-container{
		height:100%;
		background-image: url(https://static.51mitui.com/wxMini/static/share_bg.png);
		background-size:100% 100%;
		background-repeat: no-repeat;
	}
	
	.app-body{
		padding: 800rpx 20rpx 0rpx 20rpx;
		
		.body-step_1,.body-step_2,.body-step_3,.body-step_4,.body-step_5{
			background-color: #FFEED9;
			border-radius: 16rpx;
			padding: 12rpx 0rpx;
			margin-bottom: 20rpx;
		}
		.body-step_1_data{
			display: flex;
			flex-direction: column;
			.title{
				color: #801D00;
				font-size: 28rpx;
				font-weight: bold;
			}
			.num{
				color: #E81426;
				font-size: 32rpx;
				font-weight: bold;
			}
		}
		.body-step_2{
			padding: 20rpx 40rpx;
			.share-wx{
				background-color: #FFFFFF;
				border-radius: 16rpx;
				height: 140rpx;
				width: 140rpx;
				line-height: 140rpx;
				text-align: center;
				.share-wx_code{
					color: #FF6D00;
					font-weight: bold;
					font-size: 32rpx;
				}
			}
			.share-text,.share-btn-text{
				width: 120rpx;
				margin-top: 14rpx;
				font-size: 28rpx;
				color: #FFFFFF;
				text-align: center;
				background-color: #FF6D00;
				padding: 10rpx 20rpx;
				z-index: 2;
			}
			.share-btn-text{
				
				display: block;
			}
			.share-btn{
				padding: 0rpx;
				margin: 0rpx;
				line-height: inherit;
				background-color: rgba(255, 255, 255, 0);
			}
		}
		.body-step_3{
			flex-direction: column;
			padding: 20rpx 40rpx;
			.body-step_3_data{
				display: flex;
				flex-direction: column;
				.step-image{
					width: 80rpx;
					height: 80rpx;
				}
				.step-line{
					width: 62rpx;
					height: 18rpx;
					margin: 0rpx 40rpx;
					display: inline-flex;
					align-items: center;
					vertical-align: middle;
				}
				.body-step_3_data_step{
					text-align: center;
					line-height: 80rpx;
					
				}
				.body-step_3_data_step_1 text{
					font-size: 24rpx;
					color: #E81426;
					display: flex;
					flex-direction: column;
				}
			}
		}
		.body-step_4{
			flex-direction: column;
			padding: 20rpx 40rpx;
			.body-step_4_data{
				display: flex;
				margin:20rpx 0rpx;
				.body-step_4_data_icon{
					background-color: #FFFFFF;
					border-radius: 16rpx;
					height: 80rpx;
					width: 80rpx;
					text-align: center;
					margin-right: 20rpx;
				}
				.share_way_title{
					color: #E81426;
					font-weight: bold;
					font-size: 32rpx;
				}
				.share_way_title_sub{
					color: #801D00;
					font-size: 24rpx;
				}
				.body-step_4_data_notes{
					color: #801D00;
					font-size: 24rpx;
				}
			}
		}
		.body-step_5{
			flex-direction: column;
			padding: 20rpx 40rpx;
			.share-plain{
				color: #801D00;
				font-size: 28rpx;
				margin: 20rpx 0rpx;
				line-height: 48rpx;
			}
		}
		.body-step_title{
			text-align: center;;
			color: #801D00;
			font-size: 36rpx;
			font-weight: bold;
			padding: 20rpx 0rpx;
		}
	}
	
	.share-btn::after {
		content: '';
		position: absolute;
		width: 200%;
		height: 200%;
		transform-origin: 0 0;
		transform: scale(0.5, 0.5) translateZ(0);
		box-sizing: border-box;
		left: 0;
		top: 0;
		border-radius: 12rpx;
		border: 0;
	}
	.uni-image {
		position: relative;
	}
	.pop-image{
		width: 600rpx;
		height: 1000rpx;
	}
	.uni-image-close {
		margin-top: 20px;
		text-align: center;
	}
	.canvas-element {
		width: 600rpx;
		height: 1000rpx;
	}
</style>
