<template>
    <div class="app-container">
        <div class="login-part">
            <div class="row title">欢迎登录/注册</div>
            <div class="row">
                <input
                    type="text"
                    placeholder="请输入手机号"
                    placeholder-class="mobile"
					v-model="loginData.mobile"
                />
            </div>
            <div class="row code-row">
                <input
                    type="text"
                    class="code"
                    placeholder="请输入验证码"
                    placeholder-class="code"
					v-model="loginData.code"
                />
                <button class="get-code" :class="dynacodeData.isSend ? 'disabled-btn' : ''" @tap="sendSms">{{ dynacodeData.codeText}}</button>
                <div class="desc" @click="emailLogin">国外手机号接收不到验证码？</div>
            </div>
            <div class="row">
                <button class="login-btn" @click="handleLogin">登录</button>
            </div>
            <div class="row auth-row">
                <tui-button
                    class="login-btn"
                    @click="showLo"
                    :disabled="loginBtn"
                    open-type="getPhoneNumber"
                    @getphonenumber="getPhoneNumber"
                    size="30"
                    type="green"
                    background="#00c25f!important;"
                    :loading="loginBtn"
                >
                    微信用户一键登录
                </tui-button>
                <!-- <button class="auth-login-btn">微信授权登录</button> -->
            </div>
        </div>
    </div>
</template>

<script>
import Api from "../../services/index";
export default {
    components: {},
    data() {
        return {
            loginBtn: false,
			isLogin:false,
			codeIsSend:false,
			loginData:{
				mobile:"",
				code:""
			},
			dynacodeData: {
				seconds: 60,
				timer: null,
				codeText: '获取验证码',
				isSend: false,
			},
        };
    },
    methods: {
		emailLogin() {
			uni.navigateTo({
				url: 'email',
				
			});
		},
        async getPhoneNumber(e) {
            wx.hideLoading();
            let userInfo = this.$cache.get("userInfo");
            // 授权未允许
            if (!e.encryptedData) {
                this.loginBtn = false;
                return false;
            }
            
            let openid = this.$cache.get("openId");
			let	scene = this.$cache.get("scene");
            let postData = {
				scene:scene,
                avatarUrl: userInfo.avatarUrl,
                gender: userInfo.gender,
                encryptedData: e.encryptedData,
                iv: e.iv,
                nickName: userInfo.nickName,
                openid,
            };
            let res = await this.login(postData);
            if (res.data.token) {
                this.$cache.put("token", res.data.token);
                uni.showToast({
                    title: "登录成功",
                    icon: "success",
                    duration: 100,
                });
                setTimeout(() => {
                    uni.reLaunch({
                        url: "/pages/index/index",
                    });
                }, 100);
            } else {
                uni.showToast({
                    title: res.message || res.status,
                    icon: "none",
                    duration: 500,
                });
            }
        },
        // 登录
        login(postData) {
            return new Promise((resolve, reject) => {
                Api.authLogin(postData).then((res) => {
                    if (res.data.token) {
                        resolve(res);
                    } else {
                        uni.showToast({
                            title: res.message,
                            duration: 1000,
                            icon: "none",
                        });
                    }
                });
            });
        },
        showLo() {
            this.loginBtn = true;
            wx.showLoading({
                title: "加载中",
                mask: true,
            });
        },
        handleLogin(){
			let _this = this;
			if(this.isLogin) {
				return;
			}
            if(this.loginData.mobile == "") {
				this.$toast("请输入手机号码");
				return;
			}
			
			if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.loginData.mobile)) {
			  this.$toast("请输入正确的手机号码");
			  return;
			}
			if(!this.codeIsSend) {
				this.$toast("请先获取验证码");
				return;
			}
			
			if(this.loginData.code == "") {
				this.$toast("请输入验证码");
				return;
			}
			
			let openId = this.$cache.get("openId");
			let	scene = this.$cache.get("scene");
			this.isLogin = true;
			uni.showLoading({
				title:"登录中"
			})
			let postData = {
				scene:scene,
				mobile:this.loginData.mobile,
				code:this.loginData.code,
				openid:openId,
				}
			this.$api.loginSms(postData).then(function(res){
				console.log(res);
				uni.hideLoading();
				if(res.status == 1) {
					_this.$cache.put("token", res.data.token);
					uni.showToast({
					    title: "登录成功",
					    icon: "success",
					    duration: 200,
					});
					setTimeout(() => {
					    uni.reLaunch({
					        url: "/pages/index/index",
					    });
					}, 100);
				} else {
					_this.isLogin = false;
					_this.$toast(res.info);
					return;
				}
			})
			
			
        },
		sendSms() {
			let _that = this;
			if(this.dynacodeData.isSend) {
				return;
			}
			
			if(this.loginData.mobile == "") {
				this.$toast("请输入手机号码");
				return;
			}
			if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.loginData.mobile)) {
			  this.$toast("请输入正确的手机号码");
			  return;
			}
			
			this.dynacodeData.isSend = true;
			let openId = this.$cache.get("openId");
			this.codeIsSend = true;
			this.$api.sendSms({mobile:this.loginData.mobile,openid:openId}).then(function (res) {
				if(res.status == 1) {
					_that.$toast(res.info);
					_that.dynacodeData.timer = setInterval(() => {
						_that.dynacodeData.seconds--;
						_that.dynacodeData.codeText = _that.dynacodeData.seconds + 's后可重新获取';
					}, 1000);
					setTimeout(() => {
						clearInterval(_that.dynacodeData.timer);
						_that.dynacodeData = {
							seconds: 60,
							timer: null,
							codeText: '获取验证码',
							isSend: false,
						}
					}, 60000)
				} else {
					_that.$toast(res.info);
				}
			});
			
		}
    },
    created() {},
    mounted() {},
};
</script>
<style lang='scss' scoped>
.app-container {
    .login-part {
        padding: 40rpx 76rpx 0;
        .title {
            color: #000000;
            font-size: 44rpx;
        }
        .row {
            position: relative;
            margin-bottom: 60rpx;
            .desc {
                position: absolute;
                right: 10rpx;
                font-size: 24rpx;
                color: #ff6c00;
                bottom: -44rpx;
            }
            > input {
                height: 80rpx;
                line-height: 80rpx;
                border-radius: 40rpx;
                font-size: 32rpx;
                background: #f3f3f3;
                padding-left: 40rpx;
            }
            .code {
            }
            .get-code {
                position: absolute;
                top: 10rpx;
                right: 10rpx;
                height: 60rpx;
                line-height: 60rpx;
                border-radius: 30rpx;
                font-size: 28rpx;
                color: #fff;
				z-index: 111;
                background-image: linear-gradient(to right, #ff9900, #ff7100);
            }
            .login-btn {
                color: #fff;
                height: 80rpx;
                line-height: 80rpx;
                border-radius: 40rpx;
                background-image: linear-gradient(to right, #ff9900, #ff7100);
            }
            .auth-login-btn {
                width: 70%;
                color: #fff;
                height: 80rpx;
                line-height: 80rpx;
                background: #07c160;
            }
        }
        .code-row {
            margin-bottom: 100rpx;
        }
        .auth-row {
            padding-top: 200rpx;
        }
    }
}

.disabled-btn{
	background-image: linear-gradient(to right, #eaeef1, #eaeef1) !important;
	
	color: #80848f !important;
}
</style>