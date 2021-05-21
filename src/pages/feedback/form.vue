<template>
  <view class="app-container">
    <view class="top-content">
      <view class="row">
        您的问题类型:{{ name }}
      </view>
      <view class="row">
       反馈内容:
      </view>
      <textarea name="" id="" v-model="postData.contents" placeholder="描述一下您的问题，便于我们即时处理"></textarea>
    </view>
    <view class="upload-img">
      <view class="row">
        <text>相关凭证</text>
         <text>(最多三张)</text>
      </view>
      <view class="img-list">
        <tui-upload :value="value" width=180 height=180 limit=3 :serverUrl="serverUrl" :header="header" @complete="uploadComplete" @remove="uploadRemove"></tui-upload>
      </view>
    </view>
    <view class="bottom-content">
      <view class="row">
        <text>联系电话</text>
        <text>{{ postData.mobile }}</text>
      </view>
      <view class="row">
        <text>邮箱</text>
        <input placeholder="海外用户请填写您的邮箱" v-model="postData.email"/>
      </view>
    </view>
    <view class="btn-box">
        <tui-button width="686rpx" height="80rpx" shape="circle" type="warning" @click="submit">提交</tui-button>
    </view>
  </view>
</template>

<script>
import tuiUpload from "@/components/tui-upload/tui-upload";
export default {
  components: {
	  tuiUpload
  },
  data() {
    return {
      name:"",
	  serverUrl:"",
      postData:{
		type_id:0,
        contents:"",
        mobile:"",
        email:""
      },
	  header:{},
      imageList:[]
    };
  },
  methods: {
    submit() {
		if (this.postData.contents == "") {
			this.$toast("请填写反馈内容");
			return;
		}
		if(this.imageList.length == 0) {
			this.$toast("请上传图片");
			return;
		}
		this.postData.pic_urls = this.imageList.join(',')
	
		this.addComplaint(this.postData)
    },
	addComplaint(postData) {
	    return new Promise((resolve, reject) => {
	        this.$api.addComplaint(postData).then((res) => {
	            if (res.status == 1) {
	                resolve(res);
					uni.showToast({
					    title: "提交成功",
					    duration: 1000,
					    icon: "none",
					});
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

 
    uploadComplete(e) {
      this.imageList = e.imgArr;
	 
    },
    uploadRemove(e) {

    },
	async initData() {
		let res = await this.$api.getMemberInfo();
		this.postData.mobile = res.data.userInfo.mobile;
	}
  },
  created() {},
  mounted() {},
  onLoad(e) {
    this.name = e.name;
    this.postData.type_id = e.id;
	this.postData.mobile = this.$cache.get("token")
	this.header = {
		token: this.$cache.get("token")
	};
	this.serverUrl = this.$api.getUploadUrl()
	this.initData();
  }
};
</script>
<style lang='scss' scoped>
.app-container {
  background: #f3f3f3;
  padding: 15px;  
  height: 100vh;
  .top-content{
    background: #fff;
    padding: 24rpx 30rpx;
    margin-bottom: 30rpx;
	border-radius: 16rpx;
	overflow: hidden;
    .row{
      margin-bottom: 20rpx;
    }
    > textarea{
      width: 100%;
      height: 240rpx;
      border-radius: 16rpx;
      background: #F3F3F3;
      padding: 20rpx;
      box-sizing: border-box;
    }
  }
  .upload-img{
    background: #fff;
    padding: 30rpx;
	border-radius: 16rpx;
	overflow: hidden;
    margin-bottom: 30rpx;
    .row{
      margin-bottom: 20rpx;
    }
  }
  .bottom-content{
    background: #fff;
    padding: 0 30rpx;
    margin-bottom: 60rpx;
	border-radius: 16rpx;
	overflow: hidden;
    .row{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 104rpx;
    }
    .line{
      border-bottom: 1px solid #F3F3F3;
    }
  }
}
</style>