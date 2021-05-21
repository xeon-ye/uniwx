<script>
export default {
    onLaunch: function () {
		let that = this;
		let openId = that.$cache.get("openId");
		if(typeof(openId) == "undefined") {
			uni.login({
			    provider: "weixin",
			    success(res) {
			        that.$api.getAuthSession({code:res.code}).then(function (sessionRes) {
						that.$cache.put(
						    "openId",
						    sessionRes.data.open_id
						);
					});
			        
			    },
			});
		}
    },
    onShow: function () {
    },
    onHide: function () {
    },
};
</script>

<style>
/*每个页面公共css */
 @import './static/style/thorui.min.css';
* {
    box-sizing: border-box;
}
button::after {
    border: none;
}
button {
    border-radius: 0;
    background-color: #fff;
}
.clamp-1{
	white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

</style>
