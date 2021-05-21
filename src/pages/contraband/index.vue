<template>
	<view class="app-container">
		<view class="app-body"> 
			<view class="top-content">
				<text class="uni-title row">限制寄送下列敏感物品</text>
				<view class="tui-flex tui-hot-country-wrap">
					<view class="spec">
						<span class="dian">.</span><view class="terxt">食品类：无法寄送含液体、粉末、气味较大、需要冷藏或保质期较短的食品，如：水果罐头、奶粉、大闸蟹、老干妈；</view>
					</view>
				</view>
				<view class="tui-flex tui-hot-country-wrap">
					<view class="spec">
						<span class="dian">.</span><view class="terxt">液体类：液体膏体支持小量寄送，单个包裹液体/膏体含量超过100ml无法寄送；</view>
					</view>
				</view>
				<view class="tui-flex tui-hot-country-wrap">
					<view class="spec">
						<span class="dian">.</span><view class="terxt">服饰类：国际一线品牌服饰，需要提供正规发票，如无法提供建议剪标去除原包装寄送；</view>
					</view> 
				</view>
				<view class="tui-flex tui-hot-country-wrap">
					<view class="spec">
						<span class="dian">.</span><view class="terxt">带电类：支持寄送带电物品如数码电子产品（含电池），纯电池、移动电源类物品禁止寄送；</view>
					</view>
				</view>
				<view class="tui-flex tui-hot-country-wrap">
					<view class="spec">
						<span class="dian">.</span><view class="terxt">药品类：粉末、颗粒、液体类药品及中药材无法寄送；</view>
					</view>
				</view>
				<view class="tui-flex tui-hot-country-wrap">
					<view class="spec">
						<span class="dian">.</span><view class="terxt">易碎物品：易碎物品如陶瓷、玻璃类制品、形状不规则商品等，由于国际运输需辗转多次，寄送中存在损坏、破碎风险，建议谨慎寄送并妥善包装，此类物品如在运输途中产品损坏，概不赔偿；</view>
					</view>
				</view>
				<view class="tui-flex tui-hot-country-wrap">
					<view class="spec">
						<span class="dian">.</span><view class="terxt">贵重物品：海关规定，申报价值超过5000元需要正式报关，且公司需具备进出口经营权资质，提供商业发票，装箱单，包裹价值超过5000元无法寄送，贵重物品建议下单时购买保价，以避免不必要的损失；</view>
					</view>
				</view>
				<view class="text-red">以上敏感物品受限于海关政策存在一定的海关查验、退包、损坏、罚没或征税等风险，坚持寄送，需自行承担寄送风险造成的后果。</view>
			</view>
			
			<view class="top-content">
				<text class="uni-title row">禁止寄送下列物品</text>
				<view class="tui-flex tui-hot-country-wrap">
					<view class="spec">
						<span class="dian">.</span><view class="terxt">武器弹药及仿真武器：枪，玩具枪，仿真武器子弹，刀具，警棍厨房刀具等；</view>
					</view>
				</view>
				<view class="tui-flex tui-hot-country-wrap">
					<view class="spec">
						<span class="dian">.</span><view class="terxt">易燃易爆品：打火机，酒精，香水，香烟，压缩气体，颜料，胶水，含酒精，含禁火标识商品等；</view>
					</view>
				</view>
				<view class="tui-flex tui-hot-country-wrap">
					<view class="spec">
						<span class="dian">.</span><view class="terxt">危险化学品：腐蚀性物品（如硫酸、盐酸等）、放射性元素、传染性、生化制品及药品、毒品（如罂粟、大麻、冰毒等）；</view>
					</view>
				</view>
				<view class="tui-flex tui-hot-country-wrap">
					<view class="spec">
						<span class="dian">.</span><view class="terxt">食品：散装食品、水果生鲜、罐头油、饮料、种子、老干妈及需冷藏食品等；</view>
					</view>
				</view>
				<view class="tui-flex tui-hot-country-wrap">
					<view class="spec">
						<span class="dian">.</span><view class="terxt">货币及印刷品：货币、有价证券、非法出版物及印刷品、淫秽书刊、反动书籍等；</view>
					</view>
				</view>
				<view class="tui-flex tui-hot-country-wrap">
					<view class="spec">
						<span class="dian">.</span><view class="terxt">其他：古董、宝石、黄金类贵重物品、侵犯知识产权及假冒伪劣商品、蓄电池、带磁、白色粉末、动植物标本等；</view>
					</view>
				</view>
				<view class="tui-flex tui-hot-country-wrap">
					除以上限制/禁止寄送物品外，我司还有权拒绝寄送以下物品：
				</view>
				<view class="tui-flex tui-hot-country-wrap">
					<view class="spec">
						<span class="dian">.</span><view class="terxt">法律法规明文规定禁止寄送的物品；</view>
					</view>
				</view>
				<view class="tui-flex tui-hot-country-wrap">
					<view class="spec">
						<span class="dian">.</span><view class="terxt">任何未提供寄件人和收件人的详细联络信息的包裹；</view>
					</view>
				</view>
				<view class="tui-flex tui-hot-country-wrap">
					<view class="spec">
						<span class="dian">.</span><view class="terxt">我们基于自身判断认为从经济角度或操作角度不可寄送的物品；</view>
					</view> 
				</view>
				<view class="tui-flex tui-hot-country-wrap">
					<view class="spec">
						<span class="dian">.</span><view class="terxt">因为产品本身或包装特性，我们基于本身判断认为可能危及运输工具及人员安全的物品；</view>
					</view>
				</view>
				<view class="text-red">寄件人有义务遵守始发地国际/地区当前适用的法律法规及政府规定，因各个国家或地区规定禁止或限制寄送的物品不尽相同，除以上禁寄/限寄物品标准外，建议寄送人参考当地海关进口政策，按规定寄送。</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
			};
		},
		methods: {
		}
	};
</script>

<style lang='scss' scoped>
	.spec{
		margin: 19rpx -5rpx;
		width: 100%;
		font-size: 29rpx;
		font-weight: 400;
	}
	.dian{
		display: inline-block;
		position: absolute;
		margin: -12rpx 6rpx;
		font-size: 47rpx;

	}
	.terxt{
		margin: 0rpx 43rpx;
		width: 615rpx;
	}
	.text-red{
		color: red;
		font: 28rpx; 
	}
	.app-container {
		background: #f3f3f3;
		padding: 20rpx;
		height: 100vh;
		.app-body{
			border-radius: 10rpx;
			overflow: hidden;
		}
		.top-content{
			background: #fff;
			padding: 24rpx 30rpx;
			.uni-title{
				font-size: 32rpx;
				/* font-weight: bold; */
			}
			.uni-sub-title{
				margin: 40rpx 0rpx;
				font-size: 28rpx;
			}
		}
	}
	.row{
		display: inline-block;
	      text-align: center;
	      margin: 0 2%;
	      width: 100%;
	  /* align-items: center; */
	}
	.flex{
		flex: 1;
	}
	.tui-hot-country{
		width: 30%;
		margin-bottom: 10rpx;
		background-color: #eaeef1;
		margin-right: 20rpx;
		padding: 20rpx 0rpx;
		border-radius: 40rpx;
		.country-text{
			font-size: 26rpx;
		}
	}
	.tui-hot-country-wrap{
		-webkit-flex-wrap: wrap;flex-wrap: wrap;
	}
</style>
