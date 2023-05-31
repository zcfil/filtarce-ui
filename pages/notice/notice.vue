<template>
	<view class="notice">
		<Top/>
		<view class="content-container">
			<view class="title" v-if="!breadth">
				<text style="cursor: pointer;" @click="user">节点监控</text><image src="../../static/arrow-up-bold.png" mode=""></image><text style="cursor: pointer;" @click="monitor">{{form.miner_address}}</text><image src="../../static/arrow-up-bold.png" mode=""></image>通知设置
			</view>
			<view class="overview">
				<view>通知设置</view>
				<view class="data">
					<view class="perform">
						<view>地址</view>
						<view v-if="!breadth">{{data.wallet_address}}</view>
						<view v-if="breadth">{{address.substring(0,6)}}...{{address.substring(address.length-6,address.length)}}</view>
					</view>
					<view class="perform">
						<view>类型</view>
						<view>{{data.wallet_names}}</view>
					</view>
					<view class="perform" v-if="massage">
						<view>短信通知</view>
						<view><switch :checked="data.wallet_notification_message=='1' ? true:false" @change="switch1" style="zoom:.8" /></view>
					</view>
					<view class="perform" v-if="telephone">
						<view>电话通知</view>
						<view><switch :checked="data.wallet_notification_telephone=='1' ? true:false" @change="switch2" style="zoom:.8" /></view>
					</view>
					<view class="perform">
						<view>邮箱通知</view>
						<view><switch :checked="data.wallet_notification_email=='1' ? true:false" @change="switch3" style="zoom:.8" /></view>
					</view>
					<view class="perform">
						<view>通知阀值</view>
						<view class="inp"><input type="text" v-model="data.wallet_threshold" placeholder="请输入通知阀值"/></view>
					</view>
					<view class="btn"><text @click="edits">修改</text></view>
				</view>
			</view>
		</view>
		<Footer/>
	</view>
</template>

<script>
	import  Top  from '../../components/Top.vue';
	import  Footer  from '../../components/Footer.vue';
	import { usersminerwalletlist,usersminerwalletedit,userslist } from '../../common/api.js';
	export default {
		data() {
			return {
				breadth:false,
				form:{
					pageSize:10,
					pageIndex:1,
					miner_address:""
				},
				index:"",
				data:{},
				address:"",
				massage:false,
				telephone:false,
				tiao:false,
			}
		},
		onLoad(option) {
			if(document.body.clientWidth<450) {
				this.breadth=true
			}
			if (sessionStorage.getItem('massage')=="true") {
				this.massage=true
			}
			if (sessionStorage.getItem('telephone')=="true") {
				this.telephone=true
			}
			this.form.miner_address=option.miner_address
			this.index=option.index
			this.auto()
		},
		methods: {
			auto() {
				userslist(sessionStorage.getItem('token')).then(res=> {
					if(res.data.userinfo[0].users_phone!=''&&res.data.userinfo[0].users_email!='') {
						this.tiao=true
					}
				})
				usersminerwalletlist(this.form,sessionStorage.getItem('token')).then(res=> {
					this.data=res.data.data[this.index]
					this.address=res.data.data[this.index].wallet_address
				})
			},
			user() {
				uni.navigateTo({url:"/pages/user/user?type=1"})
			},
			monitor() {
				uni.navigateTo({url:"/pages/monitor/monitor?miner_address="+this.form.miner_address})
			},
			switch1(e) {
				this.data.wallet_notification_message=e.detail.value?'1':'0'
			},
			switch2(e) {
				this.data.wallet_notification_telephone=e.detail.value?'1':'0'
			},
			switch3(e) {
				this.data.wallet_notification_email=e.detail.value?'1':'0'
			},
			edits() {
				if (this.tiao==true) {
					usersminerwalletedit(this.data,sessionStorage.getItem('token')).then(res=> {
						this.$tip.success('修改成功')
						uni.navigateTo({url:"/pages/monitor/monitor?miner_address="+this.form.miner_address})
					})
				}else if (this.tiao==false) {
					this.$tip.toast('请先补全邮箱和手机号在进行操作')
					uni.navigateTo({url:"/pages/user/user?type=0"})
				}
			}
		},
		components: {
			Top,
			Footer
		}
	}
</script>

<style>
	@media (max-width: 450px) {
		.content-container {
			padding-top: 94.67px;
			font-size: 14px;
		}
		.content-container .overview>view:nth-child(1) {
			background: #f1f6fd;
			padding: 10px 16px;
		}
		.content-container .overview .data {
			padding: 16px;
			min-height: 400px;
		}
		.content-container .overview .data .perform {
			display: flex;
			margin-bottom: 20px;
		}
		.content-container .overview .data .perform view:nth-child(1) {
			flex: 1;
		}
		.content-container .overview .data .perform view:nth-child(2) {
			flex: 2;
			text-align: right;
		}
		.content-container .overview .data .perform .inp input {
			height: 30px;
			border: 1px solid #dddddd;
			border-radius: 4px;
			padding: 0 10px;
			text-align: left;
		}
		.content-container .overview .data .btn text {
			background: #f3921b;
			padding: 8px 20px;
			color: #ffffff;
			border-radius: 6px;
		}
	}
	@media (min-width: 450px) {
		.content-container {
			width: 100%;
			background: #f1f6fd;
			padding-top: 16px;
			padding-bottom: 16px;
		}
		.content-container .title {
			width: 1400px;
			margin: 0 auto;
			padding: 16px;
			box-sizing: border-box;
			background: #ffffff;
		}
		.content-container .title image {
			width: 16px;
			height: 16px;
			vertical-align: top;
			transform: rotate(90deg);
			margin: 4px 6px 0;
		}
		.content-container .overview {
			width: 1400px;
			margin: 16px auto;
			background: #ffffff;
		}
		.content-container .overview>view:nth-child(1) {
			padding: 16px;
			border-bottom: 1px solid #eeeeee;
		}
		.content-container .overview .data {
			padding: 16px;
			min-height: 500px;
			color: #333333;
		}
		.content-container .overview .data .perform {
			display: flex;
			margin-bottom: 32px;
		}
		.content-container .overview .data .perform view:nth-child(1) {
			flex: 1;
		}
		.content-container .overview .data .perform view:nth-child(2) {
			flex: 5;
		}
		.content-container .overview .data .perform .inp input {
			width: 200px;
			height: 30px;
			border: 1px solid #dddddd;
			border-radius: 4px;
			padding: 0 10px;
		}
		.content-container .overview .data .btn {
			padding-left: 224px;
		}
		.content-container .overview .data .btn text {
			background: #f3921b;
			padding: 8px 20px;
			color: #ffffff;
			border-radius: 6px;
		}
	}
</style>
