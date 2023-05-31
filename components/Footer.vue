<template>
	<view class="footer">
		<view class="title">
			<view class="titles">
				<view class="img">
					<image src="../static/logo.png" mode=""></image>
					<text>Filtrace</text>
				</view>
				<view class="palette">
					<view>Filtrace浏览器是Filecoin区块链浏览器及数据服务平台，提供基于Filecoin的各类收节点收益排行榜、区块链数据查询、可视化图表等一站式数据服务。</view>
					<view v-if="!breadth"><image src="../static/Telegram_2019_Logo.svg.png" mode=""></image> Telegram： <text @click="Telegram">https://t.me/+Nrhn1LpfVvVhNTg1</text></view>
				</view>
			</view>
		</view>
		<view class="copyright" v-if="!breadth">
			版权所有 © Filecoin开发补助计划 遵循<text @click="mit">MIT</text>和<text @click="apache">Apache 2.0</text>版权协议.
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				breadth:false,
				mit() {
					top.location.href="https://www.mit-license.org/"
				},
				apache() {
					top.location.href="https://www.apache.org/licenses/LICENSE-2.0.html"
				},
				Telegram() {
					top.location.href="https://t.me/+Nrhn1LpfVvVhNTg1"
				},
			};
		},
		mounted() {
			if(document.body.clientWidth<450) {
				this.breadth=true
			}else {
				this.breadth=false
			}
		},
	}
</script>

<style>
	@media (max-width: 450px) {
		.footer .titles {
			padding: 16px;
			border-top: 6px solid #f0f6fe;
		}
		.footer .titles .img {
			color: #0090ff;
			font-weight: 600;
		}
		.footer .titles .palette {
			font-size: 13px;
			margin-top: 10px;
			color: #444444;
		}
		.footer .titles image {
			width: 24px;
			height: 24px;
			margin-right: 8px;
			vertical-align: middle;
		}
	}
    @media (min-width: 450px) {
	    .footer .title {
	    	width: 100%;
	    	background: #122639;
	    }
	    .footer .title .titles {
	    	width: 1400px;
	    	margin: 0 auto;
	    }
		.footer .title .titles .img {
			color: #0090ff;
			font-size: 30px;
			font-weight: 700;
			padding: 30px 0 20px;
		}
		.footer .title .titles .palette {
			color: #ffffff;
			font-size: 15px;
			overflow: hidden;
			padding-bottom: 20px;
		}
		.footer .title .titles .palette view:nth-child(1) {
			float: left;
		}
		.footer .title .titles .palette view:nth-child(2) {
			float: right;
		}
		.footer .title .titles .palette text {
			color: #0090ff;
			margin: 0 6px;
			cursor:pointer;
		}
		.footer .title .titles .palette image {
			width: 22px;
			height: 22px;
			vertical-align: middle;
			margin-right: 4px;
		}
	    .footer .title .img image {
	    	width: 48px;
	    	height: 48px;
	    	margin-right: 20px;
	    	vertical-align: middle;
	    }
		.footer .copyright {
			width: 100%;
			background: #122639;
			color: #ffffff;
			font-size: 15px;
			text-align: center;
			border-top: 1px solid #ffffff;
			padding: 20px 0;
		}
		.footer .copyright text {
			color: #0090ff;
			margin: 0 6px;
		    cursor:pointer;
		}
    }
</style>
