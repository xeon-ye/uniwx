<template>
  <view class="app-container">
    <view class="tabs-box">
      <tui-tabs unlined="true" sliderWidth="400" sliderBgColor="#FF6C00" selectedColor="#FF6C00" color="##000000" :tabs="tabs" itemWidth="50%" :currentTab="currentTab" @change="change"></tui-tabs>
    </view>
    <view class="addr-content">
      <view class="addr-list" v-if="addrList.length > 0">
        <radio-group color="#ff7100" :value="1" @change="handleDefault">
          <view class="addr-itme" v-for="(item,index) in addrList" :key="index">
            <view class="row" @click="sureAddress(item)">
              <text class="name-text">{{ item.realname }}</text>
              <text class="mobile-text">{{ item.mobile }}</text>
            </view>
            <view class="row" @click="sureAddress(item)">{{ item.address }}</view>
            <view class="radio-row">
             <view class="left">
                <radio :value="item.address_id" color="#ff7100" :checked="item.is_default == 1 ? true : false" ></radio>
              <text class="thorui-left__sm">{{ item.is_default == 1 ? '默认寄件地址' : '设为默认寄件地址' }}</text>
             </view>
             <view class="right">
               <text @click="handleEdit(item.address_id)">编辑</text>
               <text @click="handleDel(item.address_id)">删除</text>
             </view>
            </view>
          </view>
        </radio-group>
      </view>
      <empty v-else></empty>
    </view>
    <view class="bottom-btn-box">
      <button @click="navTo('/pages/address/receive')" v-if="currentTab == 0">新增收件地址</button>
      <button @click="navTo('/pages/address/send')" v-if="currentTab == 1">新增寄件地址</button>
    </view>
  </view>
</template>

<script>
import tuiTabs from "../../components/tui-tabs/tui-tabs";
import empty from "../../components/empty";
export default {
  components: {
    tuiTabs,
    empty
  },
  data() {
    return {
      addrList: [],
      currentTab:0,
      tabs: [{
					name: "收件地址簿"
				}, {
					name: "寄件地址簿"
				}],
      type:1   ,// 地址类型 1-寄件，2-收件
	  from:""
    };
  },
  onLoad(option){
	  if(option.currentTab) {
		  this.currentTab = option.currentTab;
	  }
	  if(option.from && option.from == 'send') {
		  this.from = option.from
	  }
  },
  methods: {
	sureAddress(e) {
		if ( this.from &&  this.from == "send") {
			let pages = getCurrentPages();
			let nowPage = pages[ pages.length - 1];
			let prevPage = pages[ pages.length - 2 ];
			if (this.currentTab == 1) {
				prevPage.$vm.sendAddr = e; 
			} else {
				prevPage.$vm.receAddr = e; 
			}
			uni.navigateBack({
				delta:1
			})
		}
		  console.log(e);
	},
    navTo(url) {
        this.$href.navigateTo({ url: url });
    },
    change(e) {
      this.currentTab = e.index;
      this.initDate();
    },
    handleDefault(e){
	  let type = this.currentTab == 0 ? 2 : 1;
      this.$api.setDefaultAddr({address_id:e.detail.value,type:type});
      this.initDate();
    },
    async initDate(){
      if(this.currentTab == 0){
        let res = await this.$api.getReceivedAddr({page:1,size:50});
        this.addrList = res.data.list;
      }else{
        let res = await this.$api.getSendAddrList({page:1,size:50});
        this.addrList = res.data.list;
      }
    },
    async handleDel(address_id){
      let res = await this.$api.delAddress({address_id,type:this.type});
      this.$toast(res.info);
      this.initDate();
    },
    handleEdit(address_id){
		let from = this.from;
		if(this.currentTab == 0) {
			this.$href.navigateTo({url:`/pages/address/receive?address_id=${address_id}&type=edit&from=${from}`});
		} else {
			this.$href.navigateTo({url:`/pages/address/send?address_id=${address_id}&type=edit&from=${from}`});
		}
      
    }

  },
  created() {
  },
  onShow() {
    this.initDate();
  },
  mounted() {
     
  },
};
</script>
<style lang='scss' scoped>
.app-container {
  background: #f3f3f3;
  height: 100vh;
  padding-bottom: 140rpx;
  .tabs-box {
    background: #fff;
    width: 100%;
	
    display: flex;
    padding-left: 20rpx;
    position: fixed;
    top: 0;
    z-index: 2021;
    .tab-item {
      height: 80rpx;
      line-height: 80rpx;
      padding: 4rpx 20rpx;
      margin-right: 30rpx;
    }
    .active {
      color: #3f81ff;
      border-bottom: 3px solid #3f81ff;
    }
  }
  .addr-content{
    padding: 120rpx 20rpx 0 20rpx;
    .addr-list{
      // height: calc(100vh - 60rpx);
      .addr-itme{
        // padding: 20rpx;
        padding-left: 20rpx;
        margin-bottom: 30rpx;
        background: #fff;
        border-radius: 16rpx;
        .row{
          // height: 70rpx;
          line-height: 70rpx;
        }
        .radio-row{
          display: flex;
          justify-content: space-between;
          height: 80rpx;
          line-height: 80rpx;
          border-top: 1px solid #ccc;
          color: rgb(119, 113, 113);
         .right{
           text{
             margin-right: 20rpx;
           }
         }
        }
      }
    }
  }
  .bottom-btn-box{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: 38rpx;
    padding-top: 30rpx;
    background: #fff;
    button{
      width: 90%;
      margin: 0 auto;
      height: 66rpx;
      line-height: 66rpx;
      border-radius: 33rpx;
      background: #ff7100;
      color: #fff;
    }
  }
}
.name-text{
	margin-right: 20rpx;
}
</style>