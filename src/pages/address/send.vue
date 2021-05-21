<template>
  <view class="content">
    <view class="row b-b">
      <text class="tit">姓名</text>
      <input
        class="input"
        type="text"
        v-model="addressData.realname"
        placeholder="请输入姓名"
        placeholder-class="placeholder"
      />
    </view>
    <view class="row b-b">
      <text class="tit">电话</text>
      <input
        class="input"
        type="number"
        v-model="addressData.mobile"
        placeholder="请输入联系电话"
        placeholder-class="placeholder"
      />
    </view>
    <view class="row b-b">
      <text class="tit">省市区</text>
      <picker
        :value="value"
        mode="multiSelector"
        @change="picker"
        @columnchange="columnPicker"
        :range="multiArray"
        class="pick"
      >
        <input
          type="text"
          v-model="addressData.receiverRegionShow"
          placeholder="选择省/市/区"
          @click="pickerClick"
          class="input"
          disabled="true"
        />
      </picker>
      <view>
        {{ text }}
      </view>
      <!-- <text  @click="togglePopup">{{ pcdAdress }}</text> -->
    </view>
    <view class="row b-b">
      <text class="tit">详细地址</text>
      <input
        class="input"
        type="text"
        v-model="addressData.address"
        placeholder="精确到门牌号"
        placeholder-class="placeholder"
      />
    </view>

    <view class="row default-row">
      <text class="tit">设为默认寄件地址</text>
      <switch
        :checked="addressData.is_default == 1"
        color="#ff7100"
        @change="switchChange"
      />
    </view>
    <button class="add-btn" @click="handleConfirm">提交</button>
    <tui-bottom-popup :show="popupShow"> </tui-bottom-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      popupShow: false,
      manageType: "add",
      addressData: {
        receiverDistrictId: "",
        receiverRegionName: "",
        receiverRegionShow: "",
        prov_id:"",
        city_id:"",
        dist_id:"",
        mobile: "",
        address:'',
        realname: "",  // 姓名
        is_default: false,
        address_id:''
      },
      selectList: [], // 接口返回picker数据,此处就直接使用本地测试数据
      multiArray: [], // picker数据
      provinces: [],
      citys: [],
      districts: [],
      value: [0, 0, 0],
      text: "",
      id: "",
      address_id:''
    };
  },
  async onLoad(option) {
    var _self = this;
    // let title = '新增收货地址';
    if (option.type === "edit") {
      // title = "编辑收货地址";
      let res = await this.$api.getPostDetail({address_id:option.address_id});
      this.addressData = res.data;
	  this.addressData.address_id = option.address_id;
      this.addressData.receiverRegionShow = this.addressData.prov + ' ' + this.addressData.city + ' ' + this.addressData.dist;
      console.log(res);
      
    }
    this.manageType = option.type;
    // uni.setNavigationBarTitle({
    //   title,
    // });
  },
  mounted() {
    this.pickerClick();
  },
  methods: {
    switchChange(e) {
      this.addressData.is_default = e.detail.value == true ? 1 : 2;
    },
    columnPicker: function (e, p) {
      // 第几列 下标从0开始
      let column = e.detail.column;
      // 第几行 下标从0开始
      let value = e.detail.value;
      if (column === 0) {
        this.provinceChoose(this.provinces[value].id);
        this.value = [value, 0, 0];
      } else if (column === 1) {
        this.cityChoose(this.citys[value].id);
        this.value = [this.value[0], value, 0];
      }
    },
    picker: function (e) {
      let value = e.detail.value;
      this.value = value;
      // this.addressData.receiverCity = this.citys[value[1]].name;
      console.log('object',this.districts[value[2]]);
      // this.addressData.receiverDistrict = this.districts[value[2]].name;
      this.addressData.receiverDistrictId = this.districts[value[2]].id;
      this.addressData.prov_id = this.provinces[value[0]].id;
      this.addressData.city_id = this.provinces[value[1]].id;
      this.addressData.dist_id = this.provinces[value[2]].id;
      this.addressData.receiverRegionName =
        this.provinces[value[0]].name +
        " " +
        this.citys[value[1]].name +
        " " +
        this.districts[value[2]].name;
      this.addressData.receiverRegionShow =
        this.provinces[value[0]].name +
        " " +
        this.citys[value[1]].name +
        " " +
        this.districts[value[2]].name;
    },
    provinceChoose: async function (stateId) {
      let citys = await this.$api.getRegion({ parent_id: stateId });
      this.citys = citys.data;
      let districts = await this.$api.getRegion({
        parent_id: this.citys[0].id,
      });
      this.districts = districts.data;
      this.multiArray = [
        this.toArr(this.provinces),
        this.toArr(this.citys),
        this.toArr(this.districts),
      ];
    },
    cityChoose: async function (cityId) {
      
      let districts = await this.$api.getRegion({ parent_id: cityId });
      this.districts = districts.data;
      this.multiArray = [
        this.toArr(this.provinces),
        this.toArr(this.citys),
        this.toArr(this.districts),
      ];
    },
    toArr(object) {
      let arr = [];
      for (let i in object) {
        arr.push(object[i].name);
      }
      return arr;
    },
    pickerClick: async function () {
      let provinces = await this.$api.getRegion();
      this.provinces = provinces.data;
      console.log(this.provinces);
      console.log(this.value);

      let citysRes = await this.$api.getRegion({
        parent_id: this.provinces[this.value[0]].id,
      });
      this.citys = citysRes.data;
      let districts = await this.$api.getRegion({
        parent_id: this.citys[this.value[1]].id,
      });
      this.districts = districts.data;
      this.multiArray = [
        this.toArr(this.provinces),
        this.toArr(this.citys),
        this.toArr(this.districts),
      ];
    },
    togglePopup() {
      this.popupShow = !this.popupShow;
    },
  
    //提交
    handleConfirm() {
      var _self = this;
      let data = this.addressData;
	  console.log(data);
      if (!data.realname) {
        this.$toast("请填写收货人姓名");
        return;
      }
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(data.mobile)) {
        this.$toast("请输入正确的手机号码");
        return;
      }
      if (!data.address) {
        this.$toast("请填写详细地址信息");
        return;
      }
      if (_self.manageType === "add") {
        this.$api.addSendAddr(_self.addressData).then(function (res) {
          var result = res.data;
          if (result.code === 200) {
          } else {
            _self.$toast("添加失败，请重试");
          }
        });
      } else {
		  
        this.$api.addSendAddr(this.addressData).then(function (res) {
            _self.$toast(res.info);
        });
      }
      //this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
      // this.$api.prePage().refreshList(data, this.manageType);
      this.$toast(`地址${this.manageType == "edit" ? "修改" : "添加"}成功`);
      setTimeout(() => {
        uni.navigateBack();
      }, 2000);
    },
  },
};
</script>

<style lang="scss">
.content{
  padding: 0 30rpx;
  background: #fff;
}

.popup {
  height: fit-content;
  width: 100%;
  background: #fff;
}

.picker-btn {
  display: flex;
  height: 100upx;
  width: 100%;
  line-height: 100upx;
  background: #fff;
  font-size: 34upx;
  z-index: 1;
  border-bottom: 1rpx solid #f8f8f8;

  .left {
    flex: 1;
    color: #0076ff;
    padding-left: 40upx;
    box-sizing: border-box;
  }

  .right {
    flex: 1;
    text-align: right;
    padding-right: 40upx;
    color: #fe4533;
    box-sizing: border-box;
  }
}

picker-view {
  width: 100%;
  height: 500rpx;
  display: relative;
}
.item {
  line-height: 100rpx;
  text-align: center;
}
.row {
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 30upx;
  height: 110upx;
  background: #fff;
  border-bottom: 1px solid #F3F3F3;

  .tit {
    display: block;
    flex-shrink: 0;
    width: 150rpx;
    font-size: 30upx;
    color: $font-color-dark;
  }
  .input {
    flex: 1;
    font-size: 30upx;
    color: $font-color-dark;
  }
  .icon-shouhuodizhi {
    font-size: 36upx;
    color: $font-color-light;
  }
}
.default-row {
  margin-top: 16upx;
  .tit {
    flex: 1;
  }
  switch {
    transform: translateX(16upx) scale(0.9);
  }
}
.add-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 690upx;
  height: 80upx;
  margin: 60upx auto;
  font-size: $font-lg;
  color: #fff;
  background-color: $base-color;
  border-radius: 10upx;
  box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
  background-image: linear-gradient(to right, #ff9900, #ff7100);
}
</style>
