<template>
  <view class="app-container">
    <view class="progress-box">
      <view class="buy-content" v-if="navShow === 'left'">
        <view class="right-progress">
          <view class="content">
            <view class="line-1">
              <view class="left">
                <view>收</view>
                <view>收件地址</view>
              </view>
              <view @click="clearData">清空</view>
            </view>
            <view class="line-2"> 注意：国际收件人信息请用英文填写 </view>
            <view class="line-3">
              <view class="left">
                <view>姓名</view>
                <view class="eng-str">Name</view>
              </view>
              <view class="right">
                <input
                  type="text"
                  v-model="postData.realname"
                  placeholder="请使用英文输入"
                />
              </view>
            </view>
            <view class="line-3">
              <view class="left">
                <view>国家/地区</view>
                <view class="eng-str">County/Region</view>
              </view>
              <view class="right">
                <input
                  type="text"
                  v-model="country_name"
                  placeholder="请选择"
                  @click="handleRegion"
                  maskClosable="true"
                />
              </view>
              <tui-drawer
                mode="bottom"
                :visible="regionVisible"
                @close="closeDrawer"
              >
                <view class="d-container">
                  <scroll-view style="height: 800rpx" scroll-y="true">
                    <view class="region-list">
                      <view
                        class="region-item"
                        @click="selectRegion(item.id, item.name_en)"
                        v-for="(item, index) in regionList"
                        :key="index"
                        >{{ item.name }} - {{ item.name_en }}</view
                      >
                    </view>
                  </scroll-view>

                  <tui-button
                    height="80rpx"
                    type="warning"
                    shape="circle"
                    @click="closeDrawer"
                    >关闭</tui-button
                  >
                </view>
              </tui-drawer>
            </view>
            <view class="line-3" v-if="postData.country_id">
              <view class="left">
                <view>州(省)</view>
                <view class="eng-str">State</view>
              </view>
              <view class="right">
                <input
                  type="text"
                  placeholder="请选择"
                  v-model="stateName"
                  @click="handleState"
                />
              </view>
              <tui-drawer
                mode="bottom"
                :visible="stateVisible"
                @close="closeDrawer"
                maskClosable="true"
              >
                <view class="d-container">
                  <scroll-view style="height: 800rpx" scroll-y="true">
                    <view class="region-list">
                      <view
                        class="region-item"
                        @click="selectState(item.id, item.name)"
                        v-for="(item, index) in stateList"
                        :key="index"
                        >{{ item.name }}</view
                      >
                    </view>
                  </scroll-view>

                  <tui-button
                    height="80rpx"
                    type="warning"
                    shape="circle"
                    @click="stateVisible = false"
                    >关闭</tui-button
                  >
                </view>
              </tui-drawer>
            </view>
            <view class="line-3" v-if="postData.state_id">
              <view class="left">
                <view>城市</view>
                <view class="eng-str">City</view>
              </view>
              <view class="right">
                <input
                  type="text"
                  placeholder="请选择"
                  v-model="cityName"
                  @click="handleCity"
                />
              </view>
              <tui-drawer
                mode="bottom"
                :visible="cityVisible"
                @close="cityVisible = false"
                maskClosable="true"
              >
                <view class="d-container">
                  <scroll-view style="height: 800rpx" scroll-y="true">
                    <view class="region-list">
                      <view
                        class="region-item"
                        @click="selectCity(item.id, item.name)"
                        v-for="(item, index) in cityList"
                        :key="index"
                        >{{ item.name }}</view
                      >
                    </view>
                  </scroll-view>

                  <tui-button
                    height="80rpx"
                    type="warning"
                    shape="circle"
                    @click="cityVisible = false"
                    >关闭</tui-button
                  >
                </view>
              </tui-drawer>
            </view>
            <view class="line-3">
              <view class="left">
                <view>详细地址</view>
                <view class="eng-str">Detail Address</view>
              </view>
              <view class="right max-width">
                <input
                  type="text"
                  placeholder="请使用英文输入(需精确到门牌号)"
                  v-model="postData.address"
                />
              </view>
            </view>
            <view class="line-3">
              <view class="left">
                <view>境外电话</view>
                <view class="eng-str">Phone</view>
              </view>
              <view class="right">
                <view class="left-input">
                  <input
                    type="number"
                    placeholder="区号"
                    v-model="postData.mobile_code"
                  />
                </view>
                <view class="right-input">
                  <input
                    type="number"
                    placeholder="电话号码"
                    v-model="postData.mobile"
                  />
                </view>
              </view>
            </view>
            <view class="line-3">
              <view class="left">
                <view>邮编</view>
                <view class="eng-str">Zip Code</view>
              </view>
              <view class="right">
                <input
                  type="text"
                  placeholder="请输入邮编"
                  v-model="postData.zipcode"
                />
              </view>
            </view>

            <view class="line-3 no-border">
              <view class="left">
                <view>公司名称</view>
                <view class="eng-str">Company Address</view>
              </view>
              <view class="right">
                <input
                  type="text"
                  placeholder="(选填)如：EXPRESS CO,LTD"
                  v-model="postData.company_name"
                />
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="buy-content" v-if="navShow === 'right'">
        <view class="right-progress">
          <view class="content">
            <view class="line-1">
              <view class="left">
                <view>收</view>
                <view>收件地址</view>
              </view>
              <view>清空</view>
            </view>
            <view class="line-2"> 注意：国际收件人信息请用英文填写 </view>
            <view class="line-3">
              <view class="left">
                <view>姓名</view>
              </view>
              <view class="right">
                <input type="text" placeholder="请输入名字" />
              </view>
            </view>
            <view class="line-3">
              <view class="left">
                <view>地区</view>
              </view>
              <view class="right">
                <input type="text" placeholder="请选择地区" />
              </view>
            </view>
            <view class="line-3">
              <view class="left">
                <view>电话</view>
              </view>
              <view class="right">
                <view class="left-input">
                  <input type="text" placeholder="区号" />
                </view>
                <view class="right-input">
                  <input type="text" placeholder="请输入电话" />
                </view>
              </view>
            </view>
            <view class="line-3">
              <view class="left">
                <view>邮编</view>
              </view>
              <view class="right">
                <input type="text" placeholder="请输入邮编" />
              </view>
            </view>
            <view class="line-3">
              <view class="left">
                <view>城市</view>
              </view>
              <view class="right">
                <input type="text" placeholder="请选择" />
              </view>
            </view>
            <view class="line-3">
              <view class="left">
                <view>详细地址</view>
              </view>
              <view class="right">
                <input type="text" placeholder="精确到门牌号" />
              </view>
            </view>
            <view class="line-3 no-border">
              <view class="left">
                <view>公司名称</view>
              </view>
              <view class="right">
                <input type="text" placeholder="(选填)如：EXPRESS CO,LTD" />
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="row default-row">
      <text class="tit">设为默认寄件地址</text>
      <switch
        :checked="postData.is_default == 1"
        color="#ff7100"
        @change="switchChange"
      />
    </view>
    <view class="bottom-btn">
		<view class="bottom-btn-wrapp">
			 <button @click="handleSubmit">确定</button>
		</view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      navShow: "left",
      regionVisible: false,
      stateVisible: false,
      cityVisible: false,
      regionList: [], // 国家
      stateList: [], // 州
      cityList: [], // 城市
      country_name: "",
      stateName: "",
      cityName: "",
      postData: {
        realname: "",
        mobile: "",
        mobile_code: "",
        country_id: "",
        is_china: "",
        city_id: "",
        dist_id: "",
        state_id: "",
        zipcode: "",
        address: "",
        is_default: "",
        address_id: "",
        company_name: "",
      },
    };
  },
  methods: {
	clearData() {
		let postData = this.postData;
		this.postData = {
			realname: "",
			mobile: "",
			mobile_code: "",
			country_id: "",
			is_china: "",
			city_id: "",
			dist_id: "",
			state_id: "",
			zipcode: "",
			address: "",
			is_default: "",
			address_id: postData.address_id,
			company_name: "",
		} 
		this.country_name = "";
		this.cityName = "";
		this.stateName = "";
	},
    switchChange(e) {
      this.postData.is_default = e.detail.value == true ? 1 : 0;
    },
    //   提交
    async handleSubmit() {
      if (!this.postData.realname) {
        this.$toast("请填写姓名！");
        return;
      } else if (!this.postData.country_id) {
        this.$toast("请完善国家省市区！");
        return;
      } else if(!this.postData.state_id){
		  this.$toast("请完善州(省)！");
		  return;
	  } else if(!this.postData.city_id){
		  this.$toast("请完善城市！");
		  return;
	  } else if (!this.postData.address) {
        this.$toast("请填写详细地址！");
        return;
      } else if (!this.postData.mobile_code) {
        this.$toast("请填写区号！");
        return;
      } else if (!this.postData.mobile) {
        this.$toast("请填写电话号码！");
        return;
      } else if (!this.postData.zipcode) {
        this.$toast("请填写邮编！");
        return;
      }
      this.postData.is_china = this.navShow == 'left' ? 0 : 1;
      let res = await this.$api.addReceivedAddr(this.postData);

      this.$toast(res.info);
	  let _this = this;
	  setTimeout(() => {
		_this.$href.navigateBack()
	  }, 2000);
    },
    // 选择国家
    selectRegion(id, eName) {
      this.country_name = eName;
      this.postData.country_id = id;
      this.regionVisible = false;
    },
    // 选择省
    selectState(id, name) {
      this.postData.state_id = id;
      this.stateName = name;
      this.stateVisible = false;
    },
    // 选择城市
    selectCity(id, name) {
      this.cityName = name;
      this.postData.city_id = id;
      this.cityVisible = false;
    },
    // nav展示
    handleNavShow(parm) {
      this.navShow = parm;
    },
    handleRegion() {
      this.regionVisible = true;
    },
    async handleState() {
      if (!this.postData.country_id) {
        this.$toast("请先选择国家(地区)！");
        return;
      } else {
        let res = await this.$api.getRegionEnAddr({
          country_id: this.postData.country_id,
        });
        this.stateList = res.data;
        this.stateVisible = true;
        console.log(res);
      }
    },
    async handleCity() {
      let res = await this.$api.getRegionEnAddr({
        country_id: this.postData.country_id,
        parent_id: this.postData.state_id,
      });
      console.log(res);
      this.cityList = res.data;
      this.cityVisible = true;
    },
    closeDrawer() {
      this.regionVisible = false;
    },
  },
  async onLoad(option) {
	  console.log(option);
	 if (option.type === "edit") {
		 let res = await this.$api.getReceivedDetail({address_id:option.address_id});
		 console.log(res);
		 this.postData = res.data;
		 this.postData.address_id = res.data.id;
		 this.country_name = res.data.country;
		 this.stateName = res.data.state;
		 this.cityName = res.data.city;
	 }
    if (this.navShow == "left") {
      let res = await this.$api.getCountryAddrList({ is_china: 0 });
      this.regionList = res.data;
    } else {
      let res = await this.$api.getCountryAddrList({ is_china: 1 });
    }
  },
};
</script>
<style lang="scss" scoped>
.app-container {
	background: #f3f3f3;
  padding: 40rpx 20rpx;
  padding-bottom: 120rpx;
  .progress-box {
    border-radius: 24rpx;
    box-shadow: 0px 4px 7px 0px rgba(16, 81, 179, 0.08);
    > .title {
      border-radius: 24rpx 24rpx 0 0;
      display: flex;
      text-align: center;
      height: 68rpx;
      line-height: 68rpx;
      background: #ececee;
      color: #011128;
      font-weight: 400;
      .title-left {
        width: 50%;
      }
      .title-right {
        width: 50%;
      }
      .selected {
        font-size: 32rpx;
        font-weight: bold;
        background: #fff;
        border-radius: 24rpx 24rpx 0px 0px;
      }
      .selected-2 {
        font-size: 32rpx;
        font-weight: bold;
        background: #fff;
        border-radius: 24rpx 0 0px 0px;
      }
    }
    .buy-content {
      display: flex;
      padding: 20rpx;
      background: #fff;
	  border-radius: 16rpx;
	  overflow: hidden;
      .left-progress {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 24rpx;
        padding-top: 4px;
        .p-1-line {
          height: 44px;
          border-left: 1px solid #cccccc;
        }
        .point {
          line-height: 17px;
          background: #cccccc;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          text {
            color: #011128;
            position: relative;
            right: -5px;
            top: -1px;
          }
        }
        .p-2-line {
          border-left: 1px solid #cccccc;
          height: 62px;
        }
        .active {
          background: #00cb98;
        }
        .line-active {
          border-left: 1px solid #00cb98;
        }
      }
      .right-progress {
        width: 100%;
        margin-left: 8px;
        .content {
          .line-1 {
            display: flex;
            justify-content: space-between;
            padding: 30rpx 0;
            .left {
              display: flex;
              :first-child {
                background: #ff7100;
                color: #fff;
                width: 46rpx;
                height: 46rpx;
                line-height: 46rpx;
                text-align: center;
                border-radius: 8rpx;
                margin-right: 20rpx;
              }
            }
          }
          .line-2 {
            background: #f9e6d7;
            color: #ff7100;
            padding: 10rpx 20rpx;
            border-radius: 12rpx;
            margin-bottom: 20rpx;
          }
		  .no-border{
			  border-bottom: none !important;
		  }
          .line-3 {
            border-bottom: 1px solid #f3f3f3;
            display: flex;
            align-items: center;
            padding: 16rpx 0;
            > .left {
              width: 180rpx;
              color: #7b7b7b;
              .eng-str {
                font-size: 12px;
              }
            }
            > .right {
              display: flex;
			  flex: 1;
              .left-input {
                display: block;
                width: 80rpx;
                margin-right: 10rpx;
                border-right: 1px solid #f3f3f3;
              }
              .right-input {
                display: block;
              }
            }
          }
        }
      }
    }
  }
  .row {
    display: flex;
    align-items: center;
    position: relative;
    padding: 0 30upx;
    height: 110upx;
    background: #fff;
    border-bottom: 1px solid #f3f3f3;
  }
  .default-row {
    margin-top: 16upx;
	border-radius: 16rpx;
	overflow: hidden;
    .tit {
      flex: 1;
    }
    switch {
      transform: translateX(16upx) scale(0.9);
    }
  }
  .d-container {
    padding: 40rpx 30rpx;
    .region-list {
      .region-item {
        padding: 20rpx 0;
        border-bottom: 1px solid #ccc;
      }
    }
  }
  .bottom-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    
	.bottom-btn-wrapp{
		padding: 20rpx 0rpx;
		> button {
		  width: 90%;
		  height: 70rpx;
		  border-radius: 35rpx;
		  line-height: 70rpx;
		  background: #ff7100;
		  color: #fff;
		}
	}
    
  }
}

.app-body-tab {
	height: 96rpx;
	line-height: 104rpx;
	background-color: #FFF0E5;
	border-top-left-radius: 16rpx;
	border-top-right-radius: 16rpx;
	overflow: hidden;
	.tab-active-left {
		border-top-right-radius: 20rpx;
		background-color: #FFFFFF;
	}
	.tab-active-right{
		border-top-left-radius: 20rpx;
		background-color: #FFFFFF;
	}
				
}

input{
	font-size: 30rpx;
	width: 100%;
}

</style>