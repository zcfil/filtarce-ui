<template>
	<view class="monitor">
		<Top/>
		<view class="content-container">
			<view class="title" v-if="!breadth">
				<text style="cursor: pointer;" @click="user">节点监控</text><image src="../../static/arrow-up-bold.png" mode=""></image><text>{{form.miner_address}}</text>
			</view>
			<view class="overview">
				<view>节点概览</view>
				<view class="data">
					<view class="expire">
						<view>有效算力</view>
						<view>{{conversion(data.active_power)}}</view>
					</view>
					<view class="expire">
					    <view>总奖励</view>
					    <view>{{money(Number(data.total_reward).toFixed(3))}} FIL</view>
					</view>
					<view class="expire">
					    <view>可用余额</view>
					    <view>{{money(Number(data.available_Balance).toFixed(3))}} FIL</view>
					</view>
					<view class="expire">
					    <view>扇区质押</view>
					    <view>{{money(Number(data.sector_pledge).toFixed(3))}} FIL</view>
					</view>
					<view class="expire">
					    <view>锁仓奖励</view>
					    <view>{{money(Number(data.lockup_reward).toFixed(3))}} FIL</view>
					</view>
				</view>
				<view class="tab" v-if="!breadth">
					<view class="column" style="border-top: 1px solid #e5e5e5;">
						<view>类型</view>
						<view>地址</view>
						<view>余额</view>
						<view>通知设置</view>
					</view>
					<view class="column" v-for="(item,index) in list" :key="index" style="font-size: 14px;">
						<view>{{item.wallet_names}}</view>
						<view>{{(item.wallet_address).substring(0,6)}}...{{(item.wallet_address).substring(item.wallet_address.length-6,item.wallet_address.length)}}</view>
						<view>{{money(Number(item.wallet_available).toFixed(3))}} FIL</view>
						<view><image v-if="item.wallet_names!='Owner'" @click="notice(index)" src="../../static/tongzhishezhi.png" mode=""></image></view>
					</view>
				</view>
				<view class="tab" v-if="breadth">
				    <view class="expires" v-for="(item,index) in list" :key="index">
					    <view class="exp">
						    <view>类型</view>
						    <view>{{item.wallet_names}}</view>
					    </view>
						<view class="exp">
						    <view>地址</view>
						    <view>{{(item.wallet_address).substring(0,6)}}...{{(item.wallet_address).substring(item.wallet_address.length-6,item.wallet_address.length)}}</view>
						</view>
						<view class="exp">
						    <view>余额</view>
						    <view>{{money(Number(item.wallet_available).toFixed(3))}} FIL</view>
						</view>
						<view class="exp">
						    <view>通知设置</view>
						    <view><image v-if="item.wallet_names!='Owner'" @click="notice(index)" src="../../static/tongzhishezhi.png" mode=""></image></view>
						</view>
				    </view>
				</view>
			</view>
			<view class="recent">
				<view>近期节点数据</view>
				<view class="table" v-if="!breadth">
					<view class="column" style="border-top: 1px solid #e5e5e5;">
						<view>日期</view>
						<view>节点</view>
						<view>有效算力</view>
						<view>总奖励</view>
						<view>质押币</view>
						<view>故障扇区</view>
						<view>新增扇区</view>
						<view>到期扇区数量</view>
					</view>
					<view class="column" v-for="(item,index) in lists" :key="index" style="font-size: 14px;">
						<view>{{item.datetime}}</view>
						<view style="color: #007AFF;cursor: pointer;"><text @click="details(item.miner_id)">{{item.miner_id}}</text></view>
						<view>{{conversion(item.active_power)}}</view>
					    <view>{{money(Number(item.rewards).toFixed(3))}} FIL</view>
					    <view>{{money(Number(item.pledge_expires).toFixed(3))}} FIL</view>
						<view>{{conversion(item.faulty_sector)}}</view>
						<view>{{conversion(item.add_sector)}}</view>
						<view>{{conversion(item.expired_sectors)}}</view>
					</view>
				</view>
				<view class="table" v-if="breadth">
				    <view class="expires" v-for="(item,index) in lists" :key="index">
					    <view class="exp">
						    <view>日期</view>
						   <view>{{item.datetime}}</view>
					    </view>
						<view class="exp">
						    <view>节点</view>
						    <view style="color: #007AFF;"><text @click="details(item.miner_id)">{{item.miner_id}}</text></view>
						</view>
						<view class="exp">
						    <view>有效算力</view>
						    <view>{{conversion(item.active_power)}}</view>
						</view>
						<view class="exp">
						    <view>总奖励</view>
						     <view>{{money(Number(item.rewards).toFixed(3))}} FIL</view>
						</view>
						<view class="exp">
						    <view>质押币</view>
						     <view>{{money(Number(item.pledge_expires).toFixed(3))}} FIL</view>
						</view>
						<view class="exp">
						    <view>故障扇区</view>
						    <view>{{conversion(item.faulty_sector)}}</view>
						</view>
						<view class="exp">
						    <view>新增扇区</view>
						    <view>{{conversion(item.add_sector)}}</view>
						</view>
						<view class="exp">
						    <view>到期扇区数量</view>
						    <view>{{conversion(item.expired_sectors)}}</view>
						</view>
				    </view>
				</view>
			</view>
		</view>
		<Footer/>
	</view>
</template>

<script>
	import  Top  from '../../components/Top.vue';
	import  Footer  from '../../components/Footer.vue';
	import { usersminerwalletlist,usersminerwalletedit } from '../../common/api.js';
	export default {
		data() {
			return {
				breadth:false,
				form:{
					pageSize:10,
					pageIndex:1,
					miner_address:""
				},
				data:{},
				list:[],
				lists:[],
			}
		},
		onLoad(option) {
			if(document.body.clientWidth<450) {
				this.breadth=true
			}
			this.form.miner_address=option.miner_address
			this.auto()
		},
		methods: {
			auto() {
				usersminerwalletlist(this.form,sessionStorage.getItem('token')).then(res=> {
					this.data=res.data.total[0]
					this.list=res.data.data
					this.lists=res.data.datainfo.list
				})
			},
			details(miner_id) {
				uni.navigateTo({url:'/pages/details/details?miners='+miner_id}) 
			},
			user() {
				uni.navigateTo({url:"/pages/user/user?type=1"})
			},
			notice(index) {
				uni.navigateTo({url:"/pages/notice/notice?miner_address="+this.form.miner_address+"&index="+index})
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
			padding: 94.67px 0 16px;
			font-size: 14px;
		}
		.content-container .overview>view:nth-child(1) {
			background: #f1f6fd;
			padding: 10px 16px;
		}
		.content-container .overview .data {
			padding: 16px;
			color: #444444;
		}
		.content-container .overview .expire {
			display: flex;
			margin-top: 10px;
		}
		.content-container .overview .expire:nth-child(1) {
			margin-top: 0;
		}
		.content-container .overview .expire view:nth-child(1) {
			flex: 1;
		}
		.content-container .overview .expire view:nth-child(2) {
			flex: 2;
			text-align: right;
		}
		.content-container .overview .tab {
			padding: 10px 16px 0;
			border-top: 6px solid #f1f6fd;
			color: #444444;
		}
		.content-container .overview .tab .expires {
		    border: 1px solid #eeeeee;
		    box-shadow: 0px 2px 4px 1px #e5e5e5;
		    padding: 10px;
		    border-radius: 4px;
			margin-bottom: 10px;
		}
		.content-container .overview .tab .expires .exp {
			display: flex;
			margin-top: 6px;
		}
		.content-container .overview .tab .expires .exp view {
			flex: 1;
		}
		.content-container .overview .tab .expires .exp view:nth-child(2) {
			text-align: right;
		}
		.content-container .overview .tab .expires .exp view image {
			width: 20px;
			height: 20px;
			vertical-align: middle;
		}
		.content-container .recent>view:nth-child(1) {
			background: #f1f6fd;
			padding: 10px 16px;
		}
		.content-container .recent .table .expires {
		    border: 1px solid #eeeeee;
		    box-shadow: 0px 2px 4px 1px #e5e5e5;
		    padding: 10px;
		    border-radius: 4px;
			margin: 10px 16px;
			color: #444444;
		}
		.content-container .recent .table .expires .exp {
			display: flex;
			margin-top: 6px;
		}
		.content-container .recent .table .expires .exp view {
			flex: 1;
		}
		.content-container .recent .table .expires .exp view:nth-child(2) {
			text-align: right;
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
		}
		.content-container .overview .data {
			padding: 16px 0;
			border-top: 1px solid #e5e5e5;
			border-bottom: 1px solid #e5e5e5;
			display: flex;
			text-align: center;
		}
		.content-container .overview .data .expire {
			flex: 1;
		}
		.content-container .overview .data .expire view:nth-child(2) {
			color: #f3921b;
			font-size: 26px;
			margin-top: 14px;
			font-weight: 700;
		}
		.content-container .overview .tab {
			padding: 16px;
		}
		.content-container .overview .tab .column {
			display: flex;
			text-align: center;
			height: 50px;
			line-height: 50px;
			border-bottom: 1px solid #e5e5e5;
			border-right: 1px solid #e5e5e5;
			border-left: 1px solid #e5e5e5;
		}
		.content-container .overview .tab .column view {
			flex: 1;
		}
		.content-container .overview .tab .column view image {
			width: 20px;
			height: 20px;
			vertical-align: middle;
		}
		.content-container .recent {
			width: 1400px;
			margin: 0 auto;
			background: #ffffff;
		}
		.content-container .recent>view:nth-child(1) {
			padding: 16px;
		}
		.content-container .recent .table .column {
			display: flex;
			text-align: center;
			height: 50px;
			line-height: 50px;
			border-bottom: 1px solid #e5e5e5;
		}
		.content-container .recent .table .column view {
			flex: 1;
		}
	}
</style>