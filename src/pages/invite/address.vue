<template>
	<view class="app-container">
		<view class="app-body">
			<view class="app-body-wrapp">
				<view class="app-body-wrapp_head">
					<view class="tui-flex tui-align-between">
						<view class="tui-center tab-active tui-col-4">
							<text class="get">收</text>
							<text class="get_address">收件地址</text>
						</view>
						<view class="tui-right tab-active-no tui-col-4" @click="clear">
							<text class="clear">清空</text>
						</view>
					</view>
				</view>
			</view>
			<view class="app-body-data">
				<tui-list-view color="#777" unlined="all" v-if="currentTab == 1">
					<tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="15rpx" color="#000000">
						<view class="tui-flex tui-align-between">
							<view class="tui-left tui-col-4 row">
								<text class="zh">姓名</text>
								<text class="en">Name</text>
							</view>
							<view class="tui-left tui-col-8 tui-middle">
								<input placeholder="请使用英文输入" v-model="postEnData.realname" />
							</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="15rpx" color="#000000">
						<view class="tui-flex tui-align-between">
							<view class="tui-left tui-col-4 row">
								<text class="zh">国家/地区</text>
								<text class="en">County/Reguon</text>
							</view>
							<view class="tui-left tui-col-8 tui-middle">
								<view class="tui-left tui-col-8 tui-middle">
									<text class="input-data" :class="sureData.currentCountryData != '请选择地区' ? 'cur': ''" @click="popupClick(2, 0)">{{ sureData.currentCountryData }}</text>
								</view>
							</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="15rpx" color="#000000">
						<view class="tui-flex tui-align-between">
							<view class="tui-left tui-col-4 row">
								<text class="zh">境外电话</text>
								<text class="en">Phone</text>
							</view>
							<view class="tui-left tui-col-8 tui-middle">
								<view class="tui-flex">
									<view class="tui-center tui-col-2 mobile_code">
										<input placeholder="区号" v-model="postEnData.mobile_code" />
									</view>
									<view class="tui-center tui-col-10">
										<input placeholder="电话号码" v-model="postEnData.mobile" />
									</view>
								</view>
							</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="15rpx" color="#000000">
						<view class="tui-flex tui-align-between">
							<view class="tui-left tui-col-4 row">
								<text class="zh">邮编</text>
								<text class="en">Zip Code</text>
							</view>
							<view class="tui-left tui-col-8 tui-middle">
								<input placeholder="请输入邮编" v-model="postEnData.zipcode" />
							</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="15rpx" color="#000000">
						<view class="tui-flex tui-align-between">
							<view class="tui-left tui-col-4 row">
								<text class="zh">州(省)</text>
								<text class="en">State</text>
							</view>
							<view class="tui-left tui-col-8 tui-middle">
								<view class="tui-left tui-col-8 tui-middle">
									<text class="input-data" :class="sureData.currentProv != '请选择' ? 'cur': ''" @click="popupClick(2, 1)">{{ sureData.currentProv }}</text>
								</view>
							</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="15rpx" color="#000000">
						<view class="tui-flex tui-align-between">
							<view class="tui-left tui-col-4 row">
								<text class="zh">城市</text>
								<text class="en">City</text>
							</view>
							<view class="tui-left tui-col-8 tui-middle">
								<view class="tui-left tui-col-8 tui-middle">
									<text class="input-data" :class="sureData.currentCity != '请选择' ? 'cur': ''" @click="popupClick(2, 2)">{{ sureData.currentCity }}</text>
								</view>
							</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" :lineRight="true" :hover="false" padding="15rpx" color="#000000">
						<view class="tui-flex tui-align-between">
							<view class="tui-left tui-col-4 row">
								<text class="zh">详细地址</text>
								<text class="en">Phone</text>
							</view>
							<view class="tui-left tui-col-8 tui-middle">
								<input placeholder="请使用英文输入(精确到门牌号)" v-model="postEnData.address" />
							</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" :unlined="true" :hover="false" padding="15rpx" color="#000000">
						<view class="tui-flex tui-align-between">
							<view class="tui-left tui-col-4 row">
								<text class="zh">公司名称</text>
								<text class="en">Company Name</text>
							</view>
							<view class="tui-left tui-col-8 tui-middle">
								<input placeholder="(选填)如: 赫德 CO,LTD" v-model="postEnData.company_name" />
							</view>
						</view>
					</tui-list-cell>
				</tui-list-view>
			</view>
		</view>
		<view class="app-bottom">
			<view class="tui-center">
				<tui-button margin="0 20rpx 26rpx 0" type="green" width="368rpx" height="90rpx" :size="32" @click="submit">确定</tui-button>
			</view>
		</view>
		<uni-popup ref="showpopup" type="bottom">
			<view class="pupup-block">
				<view class="countryZh-block">
					<view class="header">
						<text>{{ requstCountry.popupTitle }}</text>
					</view>
					<view class="body">
						<scroll-view scroll-y="true" class="scroll-Y">
							<tui-list-view color="#777" unlined="all">
								<tui-list-cell v-for="(item,index) in requstCountry.countryData" :key="index" :arrow="false" :lineRight="true" :hover="false" padding="20rpx" color="#000000">
									<view class="tui-flex tui-align-between" @click="checkData(item, requstCountry.currentTab)">
										<view class="tui-left tui-col-12" >
											<text class="country-name" :class="requstCountry.currentId == item.id ? 'cur':''">{{ item.name }}</text>
											<text class="country-name-en" :class="requstCountry.currentId == item.id ? 'cur':''">{{ item.name_en }}</text>
										</view>
										
									</view>
								</tui-list-cell>
							</tui-list-view>
						</scroll-view>
					</view>
					<view class="tui-center">
						<tui-button width="686rpx" height="80rpx" shape="circle" type="warning" @click="sure()">确定</tui-button>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { domain } from "../../utils/request.js";
	export default {
		components: {},
		data() {
			return {
				isEnd:false,
				isSubmit:false,
				currentTab: 1,
				indexEn:'',
				currentCountryName:"请选择",
				countryZh:[],
				countryEn:[],
				state:{
					stateIndex:"",
					stateName:"请选择",
					stateData:[]
				},
				token:"",
				postEnData:{
					realname:"",
					mobile:"",
					mobile_code:"",
					country_id:"",
					is_china:0,
					city_id:"",
					state_id:"",
					dist_id:"",
					zipcode:"",
					address:"",
					company_name:"",
					
				},
				requstCountry:{
					is_china:1,
					countryData:[],
					currentCountry:"请选择地区",
					currentProv:"请选择",
					currentProvId:"",
					currentCity:"请选择",
					currentCityId:"",
					country:"",
					country_id:"",
					currentTab:0,
					popupTitle:"",
					currentId:""
				},
				
				sureData:{
					is_china:1,
					countryData:[],
					currentCountryData:"请选择地区",
					currentProv:"请选择",
					currentProvId:"",
					currentCity:"请选择",
					currentCityId:"",
					country:"",
					country_id:"",
					currentTab:0,
					popupTitle:"",
					currentId:""
				},
				
				popupTitle:["请选择收件国","请选择州","请选择城市"]
			};
		},
		methods: {
			sure() {
				let requstCountry = this.requstCountry
				this.sureData = {
					is_china: requstCountry.is_china,
					countryData:requstCountry.countryData,
					currentCountryData:requstCountry.currentCountry,
					currentProv:requstCountry.currentProv,
					currentProvId:requstCountry.currentProvId,
					currentCity:requstCountry.currentCity,
					currentCityId:requstCountry.currentCityId,
					country:requstCountry.country,
					country_id:requstCountry.country_id,
					currentTab:requstCountry.currentTab,
					popupTitle:requstCountry.popupTitle,
					currentId:requstCountry.currentId
				}
				this.postEnData.country_id = this.sureData.country_id;
				if (this.currentTab == 1) {
					this.postEnData.state_id = this.sureData.currentProvId;
					this.postEnData.city_id = this.sureData.currentCityId;
				} else {
					this.postEnData.city_id = this.sureData.currentProvId;
					this.postEnData.dist_id = this.sureData.currentCityId;
				}
				this.$refs['showpopup'].close()
			},
			checkData(e, currentTab) {
				
				if(currentTab == 0) {
					this.requstCountry.country_id = e.id;
					this.requstCountry.currentCountry = e.name;
				} else if(currentTab == 1) {
					
					this.requstCountry.currentProv = e.name;
					this.requstCountry.currentProvId = e.id;
				} else if(currentTab == 2) {
					this.requstCountry.currentCityId = e.id;
					this.requstCountry.currentCity = e.name;
				}
				console.log(this.sureData);
				this.requstCountry.currentId = e.id;
				
			},
			//currentTab-0:省 ，1：州，2-城市
			async popupClick(is_china, currentTab) {
				this.requstCountry.currentTab = currentTab;
				this.requstCountry.popupTitle = this.popupTitle[currentTab];
				if(currentTab == 0) {
					let countryData = await this.$api.getCountryAddrList({is_china:is_china})
					this.requstCountry.countryData = countryData.data;
				} else if(currentTab == 1) {
					let countryData = await this.$api.getRegionEnAddr({country_id:this.requstCountry.country_id});
					this.requstCountry.countryData = countryData.data;
				} else if(currentTab == 2) {
					let countryData = await this.$api.getRegionEnAddr({country_id:this.requstCountry.country_id,parent_id:this.requstCountry.currentProvId});
					this.requstCountry.countryData = countryData.data;
				}
				this.requstCountry.is_china = is_china;
				
				this.$nextTick(() => {
					this.$refs['showpopup'].open()
				})
			},
			async submit() {
				if(this.isEnd) {
					this.$toast("您已经添加过");
					return;
				}
				if (this.isSubmit) {
					return;
				}
				let data = this.postEnData;
				let _this = this;
				if(!data.realname) {
					this.$toast("请填写收货人姓名");
					return;
				}
				if(!data.country_id) {
					this.$toast("请选择国家");
					return;
				}
				if(this.currentTab == 1 && !data.state_id) {
					this.$toast("请选择州(省)");
					return;
				}
				if(this.currentTab == 1 && !data.city_id) {
					this.$toast("请选择城市");
					return;
				}
				if(this.currentTab == 2 && !data.city_id) {
					this.$toast("请选择城市");
					return;
				}
				if(this.currentTab == 2 && !data.dist_id) {
					this.$toast("请选择区");
					return;
				}
				if (!data.mobile) {
				  this.$toast("请输入手机号码");
				  return;
				}
				if(!data.mobile_code) {
					this.$toast("请输入电话区号");
					return;
				}
				if(!data.zipcode) {
					this.$toast("请输入邮政编码");
					return;
				}
				
				if (!data.address) {
				  this.$toast("请填写详细地址信息");
				  return;
				}
				data.token = this.token;
				data.openid = this.$cache.get("openId");
				this.isSubmit = true;
				uni.showLoading({
					title:"保存中"
				})
				await this.addInviteAddr(data).then(function(res) {
					uni.hideLoading();
					_this.isEnd = true;
					if(res.status == 1) {
						uni.showToast({
							icon:"success",
							title:"保存成功"
						})
						
					} else {
						_this.$toast(res.info);
					}
					_this.isSubmit = false;
				})
				
			},
			tapTab(e) {
				if(e == this.currentTab) {
					return;
				}
				
				this.currentTab = e;
				this.requstCountry = this.sureData = {
					is_china:1,
					countryData:[],
					currentCountryData:"请选择地区",
					currentProv:"请选择",
					currentProvId:"",
					currentCity:"请选择",
					country:"",
					country_id:"",
					currentTab:0,
					popupTitle:"",
					currentId:""
				},
				this.postEnData = {
					realname:"",
					mobile:"",
					mobile_code:"",
					country_id:"",
					is_china:0,
					city_id:"",
					state_id:"",
					dist_id:"",
					zipcode:"",
					address:"",
					company_name:"",
				};
				this.postEnData.is_china = e == 2 ? 1 : 0;
			},
			clear() {
				this.postEnData = {
					realname:"",
					mobile:"",
					mobile_code:"",
					country_id:"",
					is_china:0,
					city_id:"",
					state_id:"",
					dist_id:"",
					zipcode:"",
					address:"",
					company_name:"",
				};
			},
			addInviteAddr(data) {
				let _this = this;
				return new Promise((resolve, reject) => {
				    uni.showLoading({
				        title: '加载中...'
				    });
				    uni.request({
				        url: domain() + "address/addReceived", //仅为示例，并非真实接口地址。
				        data: data,
				        method: 'POST', // 默认值 GET
				        header: {
				            'token': _this.token, //自定义请求头信息
				            'content-type': 'application/x-www-form-urlencoded'
				        },
				        success: (res) => {
				            resolve(res.data);
				        },
				        fail: (err) => {
				            reject(err);
				        },
				        complete: () => {
				            uni.hideLoading();
				        }
				    });
				})
			}
		},
		onLoad(e) {
			this.token = e.token
		}
	};
</script>
<style lang='scss' scoped>
	.app-container {
		background: #f3f3f3;
		padding: 20rpx;
		height: 100vh;

		.app-body {
			margin-top: 40rpx;
			background-color: #FFFFFF;
			border-radius: 16rpx;
			overflow: hidden;
			padding: 20rpx;
			.cur{
				color: #000000 !important; 
			}
			.app-body-tab {
				height: 96rpx;
				line-height: 104rpx;
				background-color: #FFF0E5;

				.tab-active-left {
					border-top-right-radius: 20rpx;
					background-color: #FFFFFF;
				}
				.tab-active-right{
					border-top-left-radius: 20rpx;
					background-color: #FFFFFF;
				}
				
			}

			.app-body-wrapp_head {
				.get {
					background-color: #FF6D00;
					padding: 4rpx 8rpx;
					color: #FFFFFF;
					font-size: 30rpx;
					margin-right: 30rpx;
				}

				.get_address {
					color: #000000;
					font-size: 30rpx;
				}

				.clear {
					color: #7B7B7B;
					font-size: 30rpx;
					text-align: right;
				}
			}

			.app-body-data {
				.zh {
					color: #000000;
					font-size: 28rpx;
				}

				.en {
					color: #7B7B7B;
					font-size: 24rpx;
				}

				.tui-middle {
					vertical-align: middle;
				}
			}
		}
		.app-bottom{
			margin-top: 60rpx;
		}
	}
	.pupup-block{
		padding: 20rpx;
		background-color: #FFFFFF;
		.cur{
			color: #FF6D00 !important;
		}
		.countryZh-block{
			.header{
				
				text{
					color: #7B7B7B;
				}
			}
			.country-name{
				font-size: 26rpx;
				margin-right: 8rpx;
			}
			.country-name-en{
				font-size: 26rpx;
			}
			.body{
				margin: 20rpx 0rpx;
			}
		}
		
	}
	.tui-right{
		text-align: right;
	}
	.row {
		display: flex;
		flex-direction: column;
	}
	.mobile_code{
		border-right: 2rpx #7B7B7B solid;
	}
	.input-data{
		color: #7B7B7B;
		font-size: 28rpx;
	}
	.scroll-Y{
		height: 300rpx;
	}
	.activie{
		color: #FF6D00;
	}
</style>
