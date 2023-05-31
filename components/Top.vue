<template>
	<view class="Top">
		<view class="title" v-if="!breadth">
			<view class="titles">
				<image @click="index" src="../static/logo.png" mode=""></image>
				<text @click="index">Filtrace</text>
			</view>
		</view>
		<view class="palette" v-if="!breadth">
			<view class="palettes">
				<view class="navigation">
					<view @click="index" :class="{active:'/' ===$route.path}">首页</view>
					<view @click="statistics" :class="{active:'/pages/statistics/statistics' ===$route.path}">统计</view>
					<view @click="expire" :class="{active:'/pages/expire/expire' ===$route.path}">扇区到期</view>
					<view @click="counter" :class="{active:'/pages/counter/counter' ===$route.path}">计算器</view>
					<view @click="user" :class="{active:'/pages/user/user' ===$route.path}">存储提供者</view>
				</view>
				<view class="log" v-if="!tokenshow">
					<text @click="login" style="cursor:pointer;">登录</text>|<text @click="register" style="cursor:pointer;">注册</text>
				</view>
				<view class="logs" v-if="tokenshow" @click="menushow=!menushow">
					<image src="../static/icon-1.png" mode=""></image> {{universal}} <image v-if="!menushow" src="../static/arrow-down-bold.png" mode=""><image v-if="menushow" src="../static/arrow-up-bold.png" mode=""></image></image>
				</view>
				<view class="sear">
					<input class="inp" type="text" v-model="value" placeholder="请输入钱包地址或者钱包ID"/>
					<view class="img"><image @click="search" src="../static/sousuo.png" mode=""></image></view>
				</view>
				<view class="menu" v-if="menushow">
					<view @click="chang(0)">个人中心</view>
					<view @click="chang(1)">节点监控</view>
					<view @click="chang(2)">观察列表</view>
					<view v-if="verify" @click="chang(3)">后台配置</view>
					<view v-if="verify" @click="chang(4)">批量转账</view>
					<view @click="chang(5)">退出</view>
				</view>
			</view>
		</view>
		<view class="title" v-if="breadth">
			<view class="titles">
				<image @click="index" src="../static/logo.png" mode=""></image>
				<text @click="index">Filtrace</text>
			</view>
			<view class="log" v-if="!tokenshow">
				<text @click="login">登录</text>|<text @click="register">注册</text><image @click="tab1" src="../static/ego-menu.png" mode=""></image>
			</view>
			<view class="log" v-if="tokenshow">
				<image @click="tab2" style="margin-right: 10px;" src="../static/icon.png" mode=""></image></text><image @click="tab1" src="../static/ego-menu.png" mode=""></image>
			</view>
		</view>
		<view class="search" v-if="breadth">
			<view class="searchs">
				<input class="inp" type="text" v-model="value" placeholder="请输入钱包地址或者钱包ID"/>
				<view class="img"><image @click="search" src="../static/sousuo.png" mode=""></image></view>
			</view>
		</view>
		<view class="palettes" v-if="mask">
			<view class="navigation">
				<view @click="index" :class="{active:'/' ===$route.path}">首页</view>
				<view @click="statistics" :class="{active:'/pages/statistics/statistics' ===$route.path}">统计</view>
				<view @click="expire" :class="{active:'/pages/expire/expire' ===$route.path}">扇区到期</view>
				<view @click="counter" :class="{active:'/pages/counter/counter' ===$route.path}">计算器</view>
				<view @click="user" :class="{active:'/pages/user/user' ===$route.path}">存储提供者</view>
			</view>
			<view class="mas" @click="mask=false"></view>
		</view>
		<view class="palettes" v-if="menushows">
			<view class="navigation">
				<view @click="chang(0)">个人中心</view>
				<view @click="chang(1)">节点监控</view>
				<view @click="chang(2)">观察列表</view>
				<view v-if="verify" @click="chang(3)">后台配置</view>
					<view v-if="verify" @click="chang(4)">批量转账</view>
					<view @click="chang(5)">退出</view>
			</view>
			<view class="mas" @click="menushows=false"></view>
		</view>
	</view>
</template>

<script>
	import { userslist } from '../common/api.js';
	export default {
		data() {
			return {
				verify:false,
				mask:false,
				value:"",
				breadth:false,
				tokenshow:false,
				menushow:false,
				menushows:false,
				universal:"",
			}
		},
		mounted(option) {
			if(document.body.clientWidth<450) {
				this.breadth=true
			}else {
				this.breadth=false
			}
			if (sessionStorage.getItem('token')==null) {
				this.tokenshow=false
			}else {
				this.tokenshow=true
				if (sessionStorage.getItem('verify')=="true") {
					this.verify=true
				}
				userslist(sessionStorage.getItem('token')).then(res=> {
					if (res.data.userinfo[0].users_phone!="") {
						this.universal=res.data.userinfo[0].users_phone
					} else {
						this.universal=res.data.userinfo[0].users_email
					}
				})
			}
		},
		methods: {
			chang(num) {
				if (num==5) {
					sessionStorage.removeItem('token')
					uni.reLaunch({url:"/pages/index/index"})
				}else {
					uni.navigateTo({url:"/pages/user/user?type=" + num})
				}
			},
			index() {
				this.mask=false
				uni.navigateTo({url:"/pages/index/index"})
			},
			statistics() {
				this.mask=false
				uni.navigateTo({url:"/pages/statistics/statistics"})
			},
			expire() {
				this.mask=false
				uni.navigateTo({url:"/pages/expire/expire"})
			},
			counter() {
				this.mask=false
				uni.navigateTo({url:"/pages/counter/counter"})
			},
			user() {
				this.mask=false
				uni.navigateTo({url:"/pages/user/user?type=0"})
			},
			login() {
				this.mask=false
				uni.navigateTo({url:"/pages/account/account?key=login"})
			},
			register() {
				this.mask=false
				uni.navigateTo({url:"/pages/account/account?key=register"})
			},
			tab1() {
				this.mask=!this.mask
				this.menushows=false
			},
			tab2() {
				this.menushows=!this.menushows
				this.mask=false
			},
			search() {
				this.value=(this.value).trim()
				var reg=/^f[0|1|2|3][0-9a-zA-Z]{1,}$/
				if (!reg.test(this.value)) {
					uni.showToast({title:"地址格式不正确（f0、f1、f2、f3开头的数字和字母）",icon:'none', })
					return
				}
				uni.navigateTo({url:"/pages/diagram/diagram?type="+this.value})
			}
		}
	}
</script>

<style>
	@media (max-width: 450px) {
		.Top .title {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 900;
			box-sizing: border-box;
			background-color: #ffffff;
			overflow: hidden;
			padding: 10px;
		}
		.Top .title .titles {
			float: left;
			color: #0090ff;
			font-weight: 700;
		}
		.Top .title .titles image {
			width: 24px;
			height: 24px;
			margin-right: 8px;
			vertical-align: middle;
		}
		.Top .title .log {
			float: right;
		}
		.Top .title .log image {
			width: 24px;
			height: 24px;
			vertical-align: middle;
		}
		.Top .title .log text:nth-child(1) {
			margin-right: 8px;
		}
		.Top .title .log text:nth-child(2) {
			margin-left: 8px;
			margin-right: 12px;
		}
		.Top .search {
			position: fixed;
			top: 44.67px;
			left: 0;
			width: 100%;
			z-index: 899;
			box-sizing: border-box;
			background-color: #ffffff;
			padding: 10px;
		}
		.Top .searchs {
			display: flex;
			background-color: #f0f6fe;
			height: 30px;
			border-radius: 6px;
			padding-left: 14px;
		}
		.Top .search .inp {
			font-size: 13px;
			flex: 10;
			height: 30px;
		}
		.Top .search .img {
			flex: 1;
			height: 30px;
			line-height: 30px;
			text-align: center;
		}
		.Top .search image {
			width: 16px;
			height: 16px;
			vertical-align: middle;
		}
		.Top .palettes {
			position: fixed;
			top: 44.67px;
			left: 0;
			bottom: 0;
			right: 0;
			z-index: 900;
			background: rgba(0, 0, 0, 0.7); 
			backdrop-filter: blur(2px);
		}
		.Top .palettes .mas {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
		}
		.Top .palettes .navigation {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 901;
		}
		.Top .palettes .navigation view {
			padding: 8px 20px; 
			background-color: #ffffff;
			font-size: 14px;
			border-bottom: 1px solid #eeeeee;
		}
		.Top .palettes .navigation view:hover {
			color: #f3921b;
		}
		.active {
			color: #f3921b;
		}
	}
	@media (min-width: 450px) {
		.Top .title {
			width: 100%;
			padding: 6px 0;
			background: #122639;
			color: #0090ff;
			font-size: 26px;
			font-weight: 700;
		}
		.Top .title .titles {
			width: 1400px;
			margin: 0 auto;
		}
		.Top .title .titles text {
			cursor: pointer;
		}
		.Top .title image {
			width: 46px;
			height: 46px;
			margin-right: 20px;
			vertical-align: middle;
			cursor: pointer;
		}
		.Top .palette {
			width: 100%;
			background: #ffffff;
			height: 60px;
		}
		.Top .palette .palettes {
			width: 1400px;
			margin: 0 auto;
			overflow: hidden;
		}
		.Top .palette .palettes .navigation {
			float: left;
			line-height: 60px;
			display: flex;
		}
		.Top .palette .palettes .navigation view {
			margin-right: 30px;
			cursor:pointer;
		}
		.Top .palette .palettes .navigation view:hover {
			color: #f3921b;
		}
		.active {
			color: #f3921b;
		}
		.Top .palette .palettes .logs {
			float: right;
			cursor: pointer;
			color: #333333;
			height: 22px;
			margin: 19px 0;
		}
		.Top .palette .palettes .logs image:nth-child(1) {
			width: 20px;
			height: 20px;
			vertical-align: top;
			margin-right: 6px;
		}
		.Top .palette .palettes .logs image:nth-child(2) {
			width: 20px;
			height: 20px;
			vertical-align: top;
			margin-left: 6px;
		}
		.Top .palette .palettes .log {
			float: right;
			background: #f3921b;
			color: #ffffff;
			width: 120px;
			height: 36px;
			line-height: 36px;
			text-align: center;
			border-radius: 6px;
			margin: 12px 0;
		}
		.Top .palette .palettes .log text:nth-child(1) {
			margin-right: 10px;
		}
		.Top .palette .palettes .log text:nth-child(2) {
			margin-left: 10px;
		}
		.Top .palette .palettes .sear {
			display: flex;
			float: right;
			width: 400px;
			height: 36px;
			border: 1px solid #dddddd;
			border-radius: 6px;
			margin: 12px 20px 12px 0;
			padding-left: 20px;
			box-sizing: border-box;
		}
		.Top .palette .palettes .sear .inp {
			font-size: 12px;
			flex: 10;
			height: 34px;
		}
		.Top .palette .palettes .sear .img {
			flex: 1;
			height: 34px;
			line-height: 34px;
			text-align: center;
		}
		.Top .palette .palettes .sear image {
			width: 16px;
			height: 16px;
			vertical-align: middle;
		}
		.Top .palette .palettes .menu {
			position: absolute;
			top: 110px;
			right: 50%;
			background: #ffffff;
			border: 1px solid #dddddd;
			border-radius: 6px;
			width: 140px;
			transform: translateX(700px);
			z-index: 100;
		}
		.Top .palette .palettes .menu view {
			padding-left: 20px;
			height: 30px;
			line-height: 30px;
			font-size: 14px;
			cursor: pointer;
		}
	}
</style>
