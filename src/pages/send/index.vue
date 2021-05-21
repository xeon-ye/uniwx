<template>
  <view class="app-container">
    <view class="send-part-box">
      <view class="row line">
        <view class="tag tag-1">寄</view>
        <view class="send-info" v-if="!sendAddr"  @click="navTo('/pages/address/index?currentTab=1&from=send')">
          <view class="row"> 寄件人信息 </view>
          <view class="row gray"> 点击填写寄件地址 </view>
        </view>
        <view class="send-info" v-else>
          <view class="row">
            <text class="name">{{ sendAddr.realname }}</text>
            <text class="mobile">{{ sendAddr.mobile }}</text>
          </view>
          <view class="row gray clamp-1"> {{ sendAddr.address }} </view>
        </view>
        <view
          class="address"
          @click="navTo('/pages/address/index?currentTab=1&from=send')"
        >
          地址簿
        </view>
      </view>
      <view class="row">
        <view class="tag tag-2">收</view>
        <view class="send-info" v-if="!receAddr" @click="navTo('/pages/address/index?currentTab=0&from=send')">
          <view class="row"> 收件人信息 </view>
          <view class="row gray"> 点击填写收件地址 </view>
        </view>
        <view class="send-info" v-else>
          <view class="row">
            <text>{{ receAddr.realname }}</text>
            <text>{{ receAddr.mobile }}</text>
          </view>
          <view class="row gray clamp-1"> {{ receAddr.address }} </view>
        </view>
        <view
          class="address"
          @click="navTo('/pages/address/index?currentTab=0&from=send')"
        >
          地址簿
        </view>
      </view>
    </view>
    <view class="send-info-box">
      <tui-list-cell :hover="false">
        <view class="thorui-input-item">
          <view class="thorui-input-title">物品信息</view>
          <input
            v-if="declareList.length === 0"
            class="thorui-input"
            placeholder="请申报您寄送的物品信息>"
            placeholder-class="thorui-phcolor"
            v-model="name"
            disabled="true"
             @click="handlePopup('goods')"
          />
          <view class="" v-else @click="lookDeclareList">
            物品共{{total_qty}}件，总价值￥{{total_amounts}}
          </view>
        </view>
      </tui-list-cell>
      <!-- 预估重量 -->
      <tui-list-cell :hover="false">
        <view class="thorui-input-item">
          <view class="thorui-input-title">预估重量</view>
          <input
            class="thorui-input"
            placeholder="请输入包裹的预估重量"
            placeholder-class="thorui-phcolor"
            v-model="weightNum"
            disabled="true"
             @click="handlePopup('weight')"
          />
          <text style="padding: 5rpx 1rpx;">KG</text>
        </view>
      </tui-list-cell>
      <tui-list-cell :hover="false">
        <view class="thorui-input-item">
          <view class="thorui-input-title">
            <text>预估体积重量</text>
            <!-- <view>必填</view> -->
          </view>
          <input
            class="thorui-input"
            placeholder="补充体积预估费用更准确"
            placeholder-class="thorui-phcolor"
            v-model="volume"
            disabled="true"
            @click="handlePopup('volume')"
          />
          <text>KG</text>
        </view>
      </tui-list-cell>
      <tui-list-cell :hover="false">
        <view class="thorui-input-item">
          <view class="thorui-input-title">
            <text>增值服务</text>
          </view>
          <input
            class="thorui-input"
            placeholder="贵重物品建议购买保价服务>"
            placeholder-class="thorui-phcolor"
            v-model="submitStatementValue_msg"
            disabled="true"
            @click="handlePopup('support')"
          />
        </view>
      </tui-list-cell>
	  <tui-list-cell :hover="false">
	    <view class="thorui-input-item">
	      <view class="thorui-input-title">
	        <text>优惠券</text>
	      </view>
	      <input
	        class="thorui-input"
	        placeholder="选择优惠券>"
	        placeholder-class="thorui-phcolor"
	        disabled="true"
			v-model="coupon.coupon_name"
			@click="navTo('/pages/coupon/index?from=order')"
	      />
	    </view>
	  </tui-list-cell>
      <view class="upload-img">
        <view class="row">
          <text>包裹拍照</text>
          <text>(最多三张)</text>
        </view>
        <view class="img-list">
          <tui-upload
            :value="value"
            :serverUrl="serverUrl"
            :header="header"
			limit=3
			width=150
			height=150
            @complete="uploadComplete"
            @remove="uploadRemove"
          ></tui-upload>
        </view>
      </view>
    </view>
    <view class="send-type-box">
      <view class="row line">
        <view class="row-left">寄件方式</view>
        <view class="row-right">
          <radio-group @change="radioChange">
            <label
              class="thorui-radio thorui-align__center thorui-padding"
              style="margin-right: 20rpx"
            >
              <radio color="#5677fc" :value="0" checked="true" style="transform:scale(0.8)"></radio>
              <text class="thorui-left__sm">上门取件</text>
            </label>
            <label class="thorui-radio thorui-align__center thorui-padding">
              <radio color="#5677fc" :value="1"  style="transform:scale(0.8)"></radio>
              <text class="thorui-left__sm">自寄到仓</text>
            </label>
          </radio-group>
        </view>
      </view>
      <view class="row" v-if="mail == 0">
        <view class="row-left">上门取件时间</view>
        <view class="row-right" @click="dateShow">
		   {{ result }}
        </view>
      </view>
      <view class="row" v-else>
        <view class="row-left">快递单号</view>
        <view class="row-right">
          <input type="text" placeholder="请填写发货的快递单号" v-model="logistics_no">
          <image src="../../static/scan.png" alt="" @click="handleScan">
        </view>
      </view>
    </view>
    <label class="thorui-radio" style="margin-right: 20rpx">
      <radio color="#5677fc" :checked="aggrementChecked" @click="handleAggrentMent"></radio>
      <text class="thorui-left__sm" @click="handleAggrentMent">我已同意并阅读《物流服务协议》</text>
    </label>
    <view class="send-buy-box">
      <view class="left">
        <view class="top"> 预估运费<text>￥ {{ price || 0 }} </text>起 </view>
        <view class="bottom alert">最终运费以到仓称重确认为准</view>
		<view class="bottom">{{ time}}</view>
      </view>
      <view class="right">
        <button @click="handleCreateOrder">立即下单</button>
      </view>
    </view>
    <!-- 底部弹框部分 -->
     <tui-bottom-popup
            backgroundColor="#fff"
            @close="popup"
            :show="popupShow"
          >
            <view class="popup-box" v-if="popupType == 'weight'">
              <view class="title">
                <text>填写预估重量</text>
              </view>
              <view class="line">
                <view> 预估重量<text>(包含外装的总重量)</text> </view>
                <view class="line-right">
                  <!-- <button class="sub" @click="handleSub">-</button> -->
                  <input type="digit" v-model="weight" />
                  <!-- <button class="add" @click="handleAdd">+</button> -->
                  <text>kg</text>
                </view>
              </view>
              <view class="rule">
                <view>计费规则：</view>
                <view>体积重量(kg) = (长(cm) x 宽(cm) x 高(cm)) ÷ 6000</view>
                <view>国际物流续重以0.5kg为计费单位，不足时按0.5kg计费</view>
                <view>例如：体积重量为1.01kg，按1.5kg计费</view>
              </view>
              <button class="" @click="handleConfirmWeight">确认</button>
            </view>
            <view class="popup-box" v-else-if="popupType === 'goods'">
              <view class="title">
                <text>选择物品类型信息</text>
              </view>
             <view class="type-1-list-wrap">
                <view class="type-1-list">
                  <view v-if="firstList.length > 0">
                    <view class="type-item" v-for="(item, index) in firstList" :key="index" @click="handleSecList(item.declare_id)">{{ item.declare_name }}</view>
                  </view>
                  <view v-else>
                    <view class="type-item" v-for="(item, index) in secList" :key="index" @click="handleItemPrice(item)">{{ item.declare_name }}</view>
                  </view>
              </view>
             </view>
              <button>提交</button>
            </view>
            <!-- 申报物品 -->
            <view class="popup-box up" v-else-if="popupType === 'declare'">
              <!-- <view class="title">
                <text>物品申报</text>
              </view> -->
             <view class="declare-wrap">
                <view class="declare-row">
                 <view class="left">申报单价</view>
                 <view class="right">
                   <input type="number"  placeholder="输入申报单价(1-5000)" v-model="order_item.item_price">
                   <text>人民币</text>
                 </view>
              </view>
              <view class="declare-row">
                <view class="left">申报数量</view>
                 <view class="right">
                   <input type="number"  placeholder="输入申报物品数量" adjust-position="tue" style="width:280rpx" v-model="order_item.item_num">
                   <text>个</text>
                 </view>
              </view>
             </view>
              <button @click="declareComfirm">确认</button>
            </view>
            <!-- 申报物品列表 -->
            <view class="popup-box" v-else-if="popupType === 'declareList'">
              <view class="title">
                <text>物品申报</text>
              </view>
             <scroll-view scroll-y="true" class="declare-list-box">
               <view class="declare-list-wrap">
                  <view class="declare-item" v-for="(item,index) in declareList" :key="index">
                    <view class="row">
                      <text class="name-text">{{ item.item_name }}</text>
                    </view>
                    <view class="row">
                      <text class="name-text" style="margin-right:20rpx">物品单价：￥{{ item.item_price }}</text>
                      <text class="name-text">物品数量：￥{{ item.item_num }}</text>
                    </view>
                    <view class="radio-row">
                      <view class="left">
                      </view>
                      <view class="right">
                        <text @click="handleEdit(item, index)">编辑</text>
                        <text @click="handleDel(item, index)">删除</text>
                      </view>
                    </view>
                  </view>
              </view>
             </scroll-view>
             <view class="declare-btn-box">
              <button class="add" @click="handlePopup('goods')">继续添加</button>
              <button class="submit" @click="declareListComfirm">确认</button>
             </view>
            </view>
            <!-- 申报物品列表 -->
            <view class="popup-box" v-else-if="popupType === 'support'">
              <view class="title">
                <text>保价服务</text>
              </view>
             <scroll-view scroll-y="true" class="support-list-box">
                  <view class="statement-value">
                    <text class="statement-value-lab">声明价值</text>
                    <input type="text" v-model="fillStatementValue" placeholder="¥ ：1-50000的整数" @blur="onRodeChange()">
                  </view>
                  <view class="use-price">
                    <text class="price-lab">费用:</text>
                    <text class="price-val">¥{{submitStatementValue || 0}}</text>
                    <text class="price-icon">元</text>
                  </view>
                  <text class="explain-title"></text>
                  <view class="explain-list">
                    <text class="explain-item">
                      1.长+宽+高不得超过120cm，单边长度不得超过90cm
                    </text>
                    <text class="explain-item">
                      2.长+宽+高不得超过120cm，单边长度不得超过90cm
                    </text>
                    <text class="explain-item">
                      3.长+宽+高不得超过120cm，单边长度不得超过90cm
                    </text>
                  </view>
             </scroll-view>
             <view class="support-box-btn-box">
                <button type="submit" class="cancel" @click="cancelSupport">取消</button>
                <button type="submit" class="submit" @click="submitSupport">确认保价</button>
              </view>
            </view>
            <view v-else>
              <view class="popup-box">
              <view class="title">
                <text>预估体积重</text>
              </view>
              <view class="input-line">
                <view class="input-item">
                  <input type="number" @blur="handleCheck" v-model="longth" maxlength="3" placeholder="长">
                  <text>cm</text>
                </view>
                <view class="input-item">
                  <input type="number"  @blur="handleCheck" v-model="width" maxlength="3" placeholder="宽">
                  <text>cm</text>
                </view>
                <view class="input-item">
                  <input type="number"  @blur="handleCheck" v-model="height" maxlength="3" placeholder="高">
                  <text>cm</text>
                </view>
              </view>
              <view class="line-text">
                <text>预估体积总量=</text>
                <text class="num">{{ volumeWeight }} KG</text>
              </view>
              <view class="tips">
                *长+宽+高不得超过120cm，单边长度不得超过90cm
              </view>
              <view class="tips">
                *预估体积重量=(长x宽x高)/6000
              </view>
              <button class="" @click="handleVolume">确认</button>
            </view>
            </view>
          </tui-bottom-popup>
		  <tui-datetime
		    :type="1"
		    ref="dateTime"
		    @confirm="change"
			:startYear="startYear"
			:endYear="endYear"
		  ></tui-datetime>
  </view>
</template>

<script>
import tuiDatetime from "../../components/tui-datetime/tui-datetime";
import tuiUpload from "@/components/tui-upload/tui-upload";
  
export default {
  components: {
    tuiDatetime,
	tuiUpload
  },
  data() {
    return {
      inputUp: false,
      longth: "",
      width: "",
      height: "",
      popupShow: false,
      popupType: "weight", // 默认weight
      popupWeightShow: false, // 预估重量弹框
      result: "",
      sendAddr: null,
      receAddr: null,
      weight: 0.1,
      weightNum: "",
      volume: "",
      mail: 0, //寄件方式 0 上门取件 1 自寄下单
      logistics_no: "",
      volumeWeight: 0,
      firstList: [],
      secList: [],
      order_item: {
        declare_id: "",
        item_price: "",
        item_num: "",
      }, // 申报物品的item
      declareList: [], // 申报物品列表
      total_amount: "", // 申报物品总价
      total_amounts: "",
      total_qty: "", // 申报物品数量
	  price:0,
	  time:"",
      standard_price: 0, // 预估金额
      fillStatementValue: "",//保价总金额
      submitStatementValue: 0, //保价手续费
	  submitStatementValue_msg:"",
	  standard_price_time:"",
	  preferential_price: 0, // 预估金额
	  preferential_price_time:"",
      imageList: [],
      header: {},
      value: "", // 图片上传
      serverUrl: "",
      aggrementChecked: false, // 协议
      order_insured_price: 0, //保价费率 保价金额乘以保价费率 如果低于10元 默认10
      order_insured_total: 0, //保价最高限制
      insured_price: 0,
	  coupon:{},
	  startYear:"2021",
	  endYear:"2021"
    };
  },
  watch: {
    // 预估金额
    async weightNum(newVal, oldVal) {
		console.log(this.coupon);
        if (
          this.sendAddr.address_id &&
          this.receAddr.address_id &&
          this.weightNum
        ) {
          let data = {
            sender_id: this.sendAddr.address_id,
            addressee_id: this.receAddr.address_id,
            weight: this.weightNum,
			volume:this.volume,
			coupon_id:this.coupon.id || 0 ,
          }; 
          let res = await this.$api.getOrderPrice(data);
          this.standard_price = res.data.standard_price+this.submitStatementValue;
          this.standard_price_time = res.data.standard_price_time;
          this.price = res.data.standard_price+this.submitStatementValue;
          this.time = res.data.standard_price_time;
          this.preferential_price = res.data.preferential_price+this.submitStatementValue;// 预估金额
          this.preferential_price_time = res.data.preferential_price_time;
        }
      // }
    },
	// 预估金额
	async volume(newVal, oldVal) {
	    if (
	      this.sendAddr.address_id &&
	      this.receAddr.address_id &&
	      this.volume
	    ) {
	      let data = {
	        sender_id: this.sendAddr.address_id,
	        addressee_id: this.receAddr.address_id,
	        weight: this.weightNum ? this.weightNum : this.volume,
			volume:this.volume,
			coupon_id:this.coupon.id || 0 ,
	      }; 
	      let res = await this.$api.getOrderPrice(data);
	      this.standard_price = res.data.standard_price+this.submitStatementValue;
	      this.standard_price_time = res.data.standard_price_time;
	      this.price = res.data.standard_price+this.submitStatementValue;
	      this.time = res.data.standard_price_time;
	      this.preferential_price = res.data.preferential_price+this.submitStatementValue;// 预估金额
	      this.preferential_price_time = res.data.preferential_price_time;
	    }
	  // }
	}
  },
  async onShow() {
    if (this.sendAddr == null) {
      this.sendAddr = await this.getDefaultAddr(1);
    }
    if (this.receAddr == null) {
      this.receAddr = await this.getDefaultAddr(2);
    }
  },
  async onLoad(options) {
    let date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    this.result = `${year}-${month}-${day} ${hour}:${minute}`;
    this.serverUrl = this.$api.getUploadUrl();
	this.startYear = year;
	this.endYear = year;
    this.header = {
      token: this.$cache.get("token"),
    };
	if(options.from == "coupon") {
		this.coupon = JSON.parse(options.coupon)
	}
  },
  methods: {
    // 协议
    handleAggrentMent() {
      this.aggrementChecked = !this.aggrementChecked;
    },
    // 扫一扫
    handleScan() {
      // 允许从相机和相册扫码
      let _this = this;
      uni.scanCode({
        success: function (res) {
          _this.logistics_no = res.result;
        },
      });
    },
    // 图片上传
    uploadComplete(e) {
		if(this.imageList.length > 3){
			this.$toast("上传图片超出三张");
		}else{
			this.imageList = e.imgArr;
		}
    },
    uploadRemove(e) {},
    // 一级物品申报点击
    async handleSecList(declare_id) {
      let res = await this.$api.getSecList({ page: 1, size: 100, declare_id });
      this.secList = res.data.list;
      this.firstList = [];
    },
    handleItemPrice(item, index) {
      this.order_item = {
        item_name: item.declare_name || item.item_name,
        declare_id: item.declare_id,
        index: index,
      };
      this.popupType = "declare";
    },
	onRodeChange(){
		if(!this.total_amounts){
			  this.$toast("请先申报物品");
			  setTimeout(() =>{
				  this.handlePopup('goods');
			  },1000);
		}else{
		  if(this.fillStatementValue > this.total_amounts){
				  this.fillStatementValue = this.total_amounts;
		  }
		  if(this.fillStatementValue > this.order_insured_total && this.order_insured_total){
				  this.fillStatementValue = this.order_insured_total;
		  }
		 
		  
		  this.submitStatementValue =  parseFloat((this.fillStatementValue*this.order_insured_price)/100).toFixed(2);
		  if(this.submitStatementValue < 10){
			  this.submitStatementValue = this.submitStatementValue >0 ? 10 : 0;
		  }
		}
	},
    // 申报物品确认
    declareComfirm() {
      if (this.order_item.item_num && this.order_item.item_price) {
        if(this.order_item.index > -1){
          this.declareList[this.order_item.index] = this.order_item;
        }else{
          this.declareList.push(this.order_item);
        }
        if (this.declareList.length > 0) {
          let newArr = this.declareList.map((item) => {
            return item.item_num * item.item_price;
          });
          let newQtyArr = this.declareList.map((item) => {
            return item.item_num;
          });
          this.total_qty = newQtyArr.reduce((prev, next) => {
            return parseInt(prev) + parseInt(next);
          });
          this.total_amounts = newArr.reduce((prev, next) => {
            return parseInt(prev) + parseInt(next);
          });
        }
        this.popupShow = false;
      } else {
        this.$toast("请完善申报信息");
        return;
      }
    },
    // 申报物品编辑
    handleEdit(item, index) {
      this.handleItemPrice(item, index);
    },
    handleDel(item, index) {
      this.declareList.splice(index,1);
          let newArr = this.declareList.map((item) => {
            return item.item_num * item.item_price;
          });
          let newQtyArr = this.declareList.map((item) => {
            return item.item_num;
          });
          this.total_qty = newQtyArr.reduce((prev, next) => {
            return parseInt(prev) + parseInt(next);
          });
          this.total_amounts = newArr.reduce((prev, next) => {
            return parseInt(prev) + parseInt(next);
          });

    },
    // 申报物品确认
    declareListComfirm() {
      this.popupShow = false;
    },
    // 保价确认
    submitSupport() {
      this.popupShow = false;
	  if(!this.total_amounts){
		  this.$toast("请先申报物品");
		  setTimeout(() =>{
		      this.handlePopup('goods');
		  },1000);
	  }else{
      let standard_price = this.standard_price;
      let preferential_price = this.preferential_price;
      let price = this.price;
		  if(this.fillStatementValue > this.total_amounts){
		  		  this.fillStatementValue = this.total_amounts;
		  }
		  if(this.order_insured_total && this.fillStatementValue > this.order_insured_total){
		  		  this.fillStatementValue = this.order_insured_total;
		  }
		 
		  
		  this.submitStatementValue = parseFloat((this.fillStatementValue*this.order_insured_price)/100).toFixed(2);
		  if(this.submitStatementValue < 10){
		  		  this.submitStatementValue = this.submitStatementValue > 0 ? 10 : 0;
		  }
		  this.submitStatementValue_msg = "保费￥"+ parseInt(this.submitStatementValue);
		  this.standard_price = parseInt(standard_price) + parseInt(this.submitStatementValue);
		  this.preferential_price = parseInt(preferential_price) + parseInt(this.submitStatementValue);
		  this.price =  parseInt(price)+ parseInt(this.submitStatementValue);
	  }
    },
    // 保价取消
    cancelSupport() {
      this.popupShow = false;
      this.fillStatementValue = "";
    },
    // 查看物品申报的列表
    lookDeclareList() {
		
      this.handlePopup("declareList");
    },
    // 获取一级物品申报
    async getFirstList() {
      let res = await this.$api.getFirstList({ page: 1, size: 100 });
      this.firstList = res.data.list;
    },
    // 检验长宽高输入
    handleCheck(e) {
      if (this.longth && this.width && this.height) {
        this.volumeWeight = this.volumeWeight = parseFloat(
          (this.longth * this.width * this.height) / 6000
        ).toFixed(2);
        if (this.volume < 0.5) {
          this.volumeWeight = 0.5;
        }
      }
    },
    // 处理体积
    handleVolume() {
      if (this.longth && this.width && this.height) {
        this.volume = this.volumeWeight = parseFloat(
          (this.longth * this.width * this.height) / 6000
        ).toFixed(2);
        // this.postData.volume = this.longth * this.width * this.height;
		if(this.volume < 0.5){
			this.volume = 0.5;
		}
      }
      setTimeout(() => {
        this.popupShow = false;
      }, 500);
    },
    // 创建订单 立即下单
    async handleCreateOrder() {
		
		if(this.sendAddr == null) {
			this.$toast("请先填写寄件人信息");
			return;
		}
		
		if(this.receAddr == null) {
			this.$toast("请先填写收件人信息");
			return;
		}
		if(this.declareList.length == 0) {
			this.$toast("请申报您寄送的物品信息");
			return;
		}
		if(this.weightNum == "") {
			this.$toast("请输入包裹的预估重量");
			return;
		}
      if (!this.aggrementChecked) {
        this.$toast("请确认已经阅读并同意《物流服务协议》");
        return false;
      }
      let data = {
        sender_id: this.sendAddr.address_id || "",
        addressee_id: this.receAddr.address_id || "",
        weight: this.weightNum,
        mail: this.mail,
        item_picture: this.imageList,
        order_items: JSON.stringify(this.declareList),
        total_amount: this.price + this.submitStatementValue,
        scene: this.$cache.get("scene") || "",
        increment_price_total: this.fillStatementValue,
        pick_up_time: this.result || "",
        logistics_no: this.logistics_no,
        increment_price: this.submitStatementValue,
		coupon_id:this.coupon.id || 0 ,
      };

      let res = await this.$api.createOrder(data);

      if (res.info == "success") {
        this.$toast("下单成功");
		let url = "/pages/order/finished?order_sn="+res.data.order_sn
        this.$href.navigateTo({ url: url });
      } else {
        this.$toast(res.info);
      }
    },
    handlePopup(type) {
	  if(this.sendAddr == null) {
	  	this.$toast("请先填写寄件人信息");
	  	return;
	  }
	  
	  if(this.receAddr == null) {
	  	this.$toast("请先填写收件人信息");
	  	return;
	  }
      if (type === "goods") {
        this.popupShow = true;
        this.getFirstList();
      }else{
        this.popupShow = !this.popupShow; 
      }
      this.popupType = type;
    },
    navTo(url) {
      this.$href.navigateTo({ url });
    },
    // 获取默认地址
    async getDefaultAddr(type) {
      let res = await this.$api.getDefaultAddr({
        type, // 1默认寄件地址 2默认收件地址
      });
	  
	  if (res.data && res.data.length > 0) {
		  this.order_insured_price = res.data[0]["order_insured_price"];
		  this.order_insured_total = res.data[0]["order_insured_total"];
		  return res.data[0];
	  }
     
    },
    radioChange(e) {
      if (e.detail.value == 0) {
        this.price = this.standard_price;
        this.time = this.standard_price_time;
      }
      if (e.detail.value == 1) {
        this.price = this.preferential_price;
        this.time = this.preferential_price_time;
      }
      this.mail = e.detail.value;
    },
    dateShow: function (e) {
      this.$refs.dateTime.show();
    },
    change: function (e) {
      this.result = e.result;
    },
	
    // 处理重量
    handleConfirmWeight() {
      let _self = this;
      if (this.weight > this.receAddr.order_total_kg) {
        setTimeout(() => {
          _self.$toast(`最大重量是${this.receAddr.order_total_kg}KG`);
        }, 500);
        this.weightNum = this.receAddr.order_total_kg;
        this.weight = this.receAddr.order_total_kg;
      } else {
        this.weightNum = this.weight;
      }
      this.popupShow = false;
    },
    popup: function () {
      this.popupShow = !this.popupShow;
    },
    // 重量减
    handleSub() {},
    handleAdd() {},

  },
  async created() {},
  mounted() {},
};
</script>
<style lang='scss'>
.app-container {
  background: #f3f3f3;
  padding: 20rpx;
  padding-bottom: 100px;
  .send-part-box {
    padding: 0 20rpx;
    background: #fff;
    border-radius: 16rpx;
    margin-bottom: 20rpx;
    > .row {
      display: flex;
      align-items: center;
      padding: 30rpx 0;
      .tag {
        color: #fff;
        padding: 4rpx 2rpx;
        height: 40rpx;
        width: 40rpx;
        text-align: center;
        line-height: 40rpx;
        border-radius: 8rpx;
        margin-right: 16rpx;
      }
      .tag-1 {
        background: #3f81ff;
      }
      .tag-2 {
        background: #ff8400;
      }
      .send-info {
        flex: 1;
        border-right: 1px solid #ccc;
        width: 70%;
        > .row {
          height: 45rpx;
          line-height: 40rpx;
          width: 100%;
          > text {
            margin-right: 20rpx;
          }
          .mobile {
            font-size: 14px;
            color: #ccc;
          }
        }
        .gray {
          color: #ccc;
		  font-size: 26rpx;
        }
      }
      .address {
        padding: 0 20rpx;
      }
    }
    > .line {
      border-bottom: 1px solid rgba(204, 204, 204, 0.3);
    }
  }
  .send-info-box {
    border-radius: 16rpx;
	overflow: hidden;
    .thorui-input-item {
      display: flex;
      justify-content: space-between;
      .thorui-input {
        flex: 1;
        text-align: right;
        .thorui-phcolor {
          text-align: right !important;
        }
      }
      > text {
        font-size: 28rpx;
        color: #333;
        // font-size: ;
		padding: 3rpx 1rpx;
      }
    }
    .upload-img {
      background: #fff;
      padding: 30rpx;
	  border-radius: 16rpx;
	  overflow: hidden;
      margin-bottom: 20rpx;
      .row {
        margin-bottom: 20rpx;
      }
    }
  }
  .send-type-box {
    background: #fff;
	border-radius: 16rpx;
	overflow: hidden;
    margin-bottom: 20rpx;
    .line {
      border-bottom: 1px solid rgba(204, 204, 204, 0.3);
    }
    > .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx;
      height: 66rpx;
      .row-right {
        display: flex;
        image {
          width: 40rpx;
          height: 40rpx;
        }
      }
    }
  }
  > .thorui-radio {
	  radio{
		  transform:scale(0.7)
	  }
	  text{
		  font-size: 26rpx;
		  color: #7B7B7B;
	  }
  }
  .send-buy-box {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10rpx 30rpx 50rpx 30rpx;
    background: #fff;
    font-size: 24rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      .top {
        > text {
          color: #ff9800;
          font-size: 32rpx;
          margin-right: 10rpx;
        }
      }
      .bottom {
        > text {
          color: #3f81ff;
          margin-left: 10rpx;
        }
      }
	  .alert{
		  color: #7B7B7B;
	  }
    }
    .right {
      button {
        background: #3f81ff;
        color: #fff;
        height: 60rpx;
        border-radius: 30rpx;
        line-height: 60rpx;
      }
    }
  }
  .popup-box {
    padding: 30rpx;
    &.up{
        padding-bottom: 430rpx;
      }
    .title {
      text-align: center;
      font-size: 18px;
      color: #000000;
      line-height: 25px;
    }
    .type-1-list-wrap {
      min-height: 600rpx;
      .type-1-list {
        margin-top: 40rpx;
        > view {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          width: 100%;
        }
        .type-item {
          width: 30%;
          background: #f3f3f3;
          color: #7b7b7b;
          height: 60rpx;
          line-height: 60rpx;
          text-align: center;
          margin-bottom: 20rpx;
        }
      }
    }
    // 申报物品
    .declare-wrap {
      padding: 40rpx 0;
      .declare-row {
        display: flex;
        justify-content: space-between;
        height: 60rpx;
        line-height: 60rpx;
        .right {
          display: flex;
          align-items: center;
          input {
            text-align: right;
            margin-right: 8rpx;
          }
        }
      }
    }
    // 申报物品列表
    .declare-list-box {
      .declare-list-wrap {
        .declare-item {
          // padding: 20rpx;
          padding-left: 20rpx;
          margin-bottom: 30rpx;
          background: #fff;
          border-radius: 16rpx;
          .row {
            // height: 70rpx;
            line-height: 70rpx;
          }
          .radio-row {
            display: flex;
            justify-content: space-between;
            height: 80rpx;
            line-height: 80rpx;
            border-top: 1px solid #ccc;
            color: rgb(119, 113, 113);
            .right {
              text {
                margin-right: 20rpx;
              }
            }
          }
        }
      }
    }

    .input-line {
      display: flex;
      justify-content: space-between;
      padding: 6rpx 16rpx;
      .input-item {
        display: flex;
        align-items: center;
        background: #f3f3f3;
        width: 30%;
        height: 70rpx;
        padding-right: 10rpx;
        input {
          padding: 20rpx;
        }
      }
    }
    .line-text {
      font-size: 18px;
      line-height: 25px;
      margin: 40rpx 0;
      text {
        color: #7b7b7b;
      }
      .num {
        color: #000000;
        font-size: 22px;
        line-height: 30px;
      }
    }
    .tips {
      color: #ff6c00;
      margin-bottom: 30rpx;
    }
    .line {
      display: flex;
      justify-content: space-between;
      margin-top: 20rpx;
      font-size: 16px;
      text {
        color: #7b7b7b;
      }
      .line-right {
        display: flex;
        view {
          background: #f3f3f3;
          margin-right: 8rpx;
          padding: 0 16rpx;
        }
        > button {
          background: #f3f3f3;
          height: 70rpx;
          line-height: 70rpx;
        }
        input {
          display: block;
          width: 60rpx;
          background: #f3f3f3;
          padding: 6rpx 16rpx;
          margin-right: 8rpx;
        }
        .sub {
          border-top-left-radius: 6rpx;
          border-bottom-left-radius: 6rpx;
        }
        .add {
          border-top-right-radius: 6rpx;
          border-bottom-right-radius: 6rpx;
        }
      }
    }
    .rule {
      margin-top: 30rpx;
      margin-bottom: 50rpx;
      view {
        color: #7b7b7b;
      }
    }
    > button {
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 40rpx;
      background: #ff9200;
      color: #fff;
    }
  }
}
.support-list-box {
  margin-top: 52rpx;
  .statement-value {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .statement-value-lab {
      font-size: 36rpx;
      line-height: 50rpx;
      color: #000;
      font-weight: bold;
    }
    input {
      display: block;
      width: 496rpx;
      height: 70rpx;
      background: #f3f3f3;
      font-size: 32rpx;
      text-align: center;
    }
  }
  .use-price {
    display: flex;
    margin-top: 30rpx;
    justify-content: flex-end;
    align-items: center;
    font-size: 32rpx;
    line-height: 44rpx;
    color: #000;
    font-weight: bold;
    .price-val {
      color: #ff0000;
    }
  }
  .explain-title {
    margin-top: 30rpx;
    font-size: 32rpx;
    line-height: 44rpx;
    color: #000;
    font-weight: bold;
  }
  .explain-list {
    width: 100%;
    margin-top: 10rpx;
    .explain-item {
      display: block;
      margin-bottom: 8rpx;
      font-size: 24rpx;
      line-height: 34rpx;
    }
  }
}
.support-box-btn-box {
  display: flex;
  margin-top: 50rpx;
  align-items: center;
  justify-content: center;
  button {
    display: flex;
    width: 300rpx;
    height: 80rpx;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    font-size: 36rpx;
    font-weight: bold;
    border-radius: 44rpx;
  }
  .cancel {
    color: #7b7b7b;
    border: 2rpx solid #7b7b7b;
  }
  .submit {
    margin-left: 36rpx;
    color: #fff;
    background-image: linear-gradient(45deg, #ff9b00 0%, #ff6c00 100%);
  }
}
.declare-btn-box{
  display: flex;
  align-items: center;
  justify-content: center;
    button {
    display: flex;
    width: 300rpx;
    height: 80rpx;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    font-size: 36rpx;
    font-weight: bold;
    border-radius: 44rpx;
  }
  .add {
    color: #7b7b7b;
    border: 2rpx solid #7b7b7b;
  }
  .submit {
    margin-left: 36rpx;
    color: #fff;
    background-image: linear-gradient(45deg, #ff9b00 0%, #ff6c00 100%);
  }
}
</style>
