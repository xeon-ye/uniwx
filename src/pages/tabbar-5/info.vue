<template>
	<view class="app-container">
		<view class="item-list-wrap">
			<tui-list-view color="#777">
				<tui-list-cell arrow radius=true padding="30rpx" color="#000000" :hover="false">
					<view class="tui-item-box">
						<text class="tui-list-cell_name">我的头像</text>
						<view class="tui-right">
							<image :src="postData.avator" class="tui-logo" mode="scaleToFill" @click="uploadAvatr"></image>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell arrow radius=true padding="30rpx" color="#000000":hover="false" :arrow="false">
					<view class="tui-item-box">
						<text class="tui-list-cell_name">昵称</text>
						<view class="tui-right-name">
							<input placeholder="请输入昵称" class="tui-input" v-model="postData.nick_name"/>
						</view>
					</view>
				</tui-list-cell>
			</tui-list-view>
		</view>
		
		<view class="bottom-btn-box">
		    <tui-button width="100%" margin="0 auto" height="80rpx" shape="circle" type="warning" @click="submit">保存</tui-button>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				postData:{
					avator:"",
					nick_name:""
				}
				
			};
		},
		methods: {
			async initData() {
				let res = await this.$api.getMemberInfo();
				this.postData.avator = res.data.userInfo.avator;
				this.postData.nick_name = res.data.userInfo.nick_name
			},
			submit() {
				if (this.postData.nick_name == "") {
					this.$toast("请填写用户昵称");
					return;
				}
				this.updateInfo(this.postData);
			},
			
			updateInfo(postData) {
				return new Promise((resolve, reject) => {
				    this.$api.memberUpdate(postData).then((res) => {
				        if (res.status == 1) {
				            resolve(res);
							uni.showToast({
								icon:"success",
								title:"保存成功",
								duration:2000
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta:2
								})
							},2000)
				        } else {
				            uni.showToast({
				                title: res.info,
				                duration: 1000,
				                icon: "none",
				            });
				        }
				    });
				});
			},
			uploadAvatr() {
				uni.chooseImage({
				    success: (chooseImageRes) => {
						uni.showLoading({
							title:"上传中"
						})
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        uni.uploadFile({
				            url: this.$api.getUploadUrl(), //仅为示例，非真实的接口地址
				            filePath: tempFilePaths[0],
				            name: 'file',
				            header:{
								token:this.$cache.get('token')
							},
				            success: (uploadFileRes) => {
								uni.hideLoading()
								let uploadFile = uploadFileRes.data;
								if (uploadFileRes.statusCode == 200) {
									let uploadResult = JSON.parse(uploadFile);
									console.log(uploadResult)
									this.postData.avator = uploadResult.url
								} else {
									uni.showToast({
										icon:"none",
										title:"网络异常,请稍后再试",
										duration:2000
									})
								}
				            },
							fail: (error) => {
								uni.hideLoading()
							}
				        });
				    }
				});
			}
		},
		async created() {

		},
		mounted() {},
		onLoad() {
			this.initData();
		}
	};
</script>

<style lang='scss' scoped>
	.app-container {
		background: #f3f3f3;
		padding: 15px;
		height: 100vh;
	}
	.item-list-wrap{
		overflow: hidden;
		border-radius: 16rpx;
		box-shadow:0px 0px 20px 2px rgba(255,108,0,0.1);
	}

	.tui-item-box {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.tui-list-cell_name {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-right {
		margin-left: auto;
		margin-right: 34rpx;
		font-size: 26rpx;
		color: #999;
	}
	.tui-right-name{
		margin-left: auto;
		font-size: 26rpx;
		color: #999;
	}

	.tui-logo {
		height: 60rpx;
		width: 60rpx;
		flex-shrink: 0;
		border-radius: 60rpx;
	}
	.bottom-btn-box{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20rpx 20rpx;
		background: #fff;
	}
	.tui-input{
		text-align: right;
		font-size: 12px;
		font-weight: 300;
		color: #A9A9A9;
	}
	
</style>
