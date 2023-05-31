<template>
	<view class="index">
		<Top/>
		<view class="content-container">
			<view class="network">
				<view class="title"><image src="../../static/quanwanggailan.png" mode=""></image>全网概况</view>
				<view class="content">
					<view>
						<view>全网有效算力</view>
						<view>{{conversion(data.all_power)}}</view>
					</view>
					<view>
						<view>活跃存储提供者</view>
						<view>{{data.active_storage}}</view>
					</view>
					<view>
						<view>每区块奖励</view>
						<view>{{Number(data.reward_block).toFixed(4)}} FIL</view>
					</view>
					<view>
						<view>24h平均存储收益</view>
						<view>{{Number(data.average_revenue).toFixed(4)}} FIL/TiB</view>
					</view>
				</view>
				<view class="content">
					<view>
						<view>FIL质押量</view>
						<view>{{money(moneyFormat(data.fil_pledge_amount))}} FIL/TiB</view>
					</view>
					<view>
						<view>FIL流通量</view>
						<view>{{money(moneyFormat(data.fil_circulation))}} FIL/TiB</view>
					</view>
					<view>
						<view>总账户数</view>
						<view>{{data.total_accounts}}</view>
					</view>
					<view>
						<view>单T收益</view>
						<view>{{Number(data.single_t_income).toFixed(4)}} FIL/TiB</view>
					</view>
				</view>
			</view>
			<view class="transfer_list">
				<view><image src="../../static/paixingbang.png" mode=""></image>排行榜</view>
				<view class="name">
					<view class="menu">
						<view @click="num(0)" :class="{bct:id==0}">转账排行榜</view>
						<view @click="num(1)" :class="{bct:id==1}">富豪榜</view>
					</view>
					<view>共有 {{total}} 条数据</view>
				</view>
				<view v-if="id==0">
					<view v-if="!breadth">
						<uni-table border stripe ref="table" stripe emptyText="暂无更多数据">
							<uni-tr>
								<uni-th align="center">区块高度</uni-th>
								<uni-th align="center">消息ID</uni-th>
								<uni-th align="center">转出地址</uni-th>
								<uni-th align="center">转入地址</uni-th>
								<uni-th align="center">数额</uni-th>
							</uni-tr>
							<uni-tr v-for="(item, index) in list" :key="index">
								<uni-td align="center">{{ item.wallet_epoch }}</uni-td>
								<uni-td align="center">{{ item.wallet_cid }}</uni-td>
								<uni-td align="center">{{ item.wallet_from }}</uni-td>
								<uni-td align="center">{{ item.wallet_to }}</uni-td>
								<uni-td align="center">{{ (Number(item.wallet_amount)/100000000000000000).toFixed(4) }} FIL</uni-td>
							</uni-tr>
						</uni-table>
					</view>
					<view v-if="breadth" class="entry">
						<view class="expires" v-for="(item, index) in list" :key="index">
							<view class="expire">
								<view>区块高度</view>
								<view>{{ item.wallet_epoch }}</view>
							</view>
							<view class="expire">
								<view>消息ID</view>
								<view>{{ item.wallet_cid }}</view>
							</view>
							<view class="expire">
								<view>转出地址</view>
								<view>{{ item.wallet_from }}</view>
							</view>
							<view class="expire">
								<view>转入地址</view>
								<view>{{ item.wallet_to }}</view>
							</view>
							<view class="expire">
								<view>数额</view>
								<view>{{ (Number(item.wallet_amount)/100000000000000000).toFixed(4) }} FIL</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="id==1">
					<view v-if="!breadth">
						<uni-table border stripe ref="table" stripe emptyText="暂无更多数据">
							<uni-tr>
								<uni-th align="center">钱包ID</uni-th>
								<uni-th align="center">钱包地址</uni-th>
								<uni-th align="center">钱包余额</uni-th>
							</uni-tr>
							<uni-tr v-for="(item, index) in list" :key="index">
								<uni-td align="center">{{ item.balance_id }}</uni-td>
								<uni-td align="center">{{ item.balance_address }}</uni-td>
								<uni-td align="center">{{ Number(item.available_balance).toFixed(4) }} FIL</uni-td>
							</uni-tr>
						</uni-table>
					</view>
					<view v-if="breadth" class="entry">
						<view class="expires" v-for="(item, index) in list" :key="index">
							<view class="expire">
								<view>钱包ID</view>
								<view>{{ item.balance_id }}</view>
							</view>
							<view class="expire">
								<view>钱包地址</view>
								<view>{{ item.balance_address }}</view>
							</view>
							<view class="expire">
								<view>钱包余额</view>
								<view>{{ Number(item.available_balance).toFixed(4) }} FIL</view>
							</view>
						</view>
					</view>
				</view>
				<view style="margin-top: 16px;">
					<page-pagination :pageSize="form.pageSize"  :currentPage="form.pageIndex" :numAround="true" :btnText="true" :total="total" :showGoPage="true"  trigger="click" @change="change" />
				</view>
			</view>
		</view>
		<Footer/>
	</view>
</template>

<script>
	import  Top  from '../../components/Top.vue';
	import  Footer  from '../../components/Footer.vue';
	import { gethomepage,transferleaderboard,getlistRichList } from '../../common/api.js';
	export default {
		data() {
			return {
				breadth:false,
				data:{},
				form:{
					pageSize:20,
					pageIndex:1,
				},
				list:[],
				total:0,
				id:0
			}
		},
		onLoad() {
			if(document.body.clientWidth<450) {
				this.breadth=true
			}
			this.auto()
		},
		methods: {
			auto() {
				gethomepage().then(res=> {
					res.data.fil_pledge_amount=(Number(res.data.fil_pledge_amount)).toFixed(2)
					this.data=res.data
				})
				if (this.id==0) {
					transferleaderboard(this.form).then(res=> {
						for (var i=0;i<res.data.list.length;i++) {
							res.data.list[i].wallet_cid=(res.data.list[i].wallet_cid).substring(0,6)+"..."+(res.data.list[i].wallet_cid).substring(res.data.list[i].wallet_cid.length-6,res.data.list[i].wallet_cid.length)
							res.data.list[i].wallet_from=(res.data.list[i].wallet_from).substring(0,6)+"..."+(res.data.list[i].wallet_from).substring(res.data.list[i].wallet_from.length-6,res.data.list[i].wallet_from.length)
							res.data.list[i].wallet_to=(res.data.list[i].wallet_to).substring(0,6)+"..."+(res.data.list[i].wallet_to).substring(res.data.list[i].wallet_to.length-6,res.data.list[i].wallet_to.length)
						}
						this.list=res.data.list
						this.total=res.data.total
					})
				}else if (this.id==1) {
					getlistRichList(this.form).then(res=> {
						for (var i=0;i<res.data.list.length;i++) {
							if (res.data.list[i].balance_address.length>10) {
								res.data.list[i].balance_address=(res.data.list[i].balance_address).substring(0,6)+"..."+(res.data.list[i].balance_address).substring(res.data.list[i].balance_address.length-6,res.data.list[i].balance_address.length)
							}
						}
						this.list=res.data.list
						this.total=res.data.total
					})
				}
			},
			change(e) {
				this.form.pageIndex=e
				this.auto()
			},
			changes(e) {
				this.form.pageIndex=e
				this.auto()
			},
			num(num) {
				this.id=num
				this.form.pageIndex=1
				this.auto()
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
			line-height: 24px;
		}
		.content-container .network {
			padding: 16px;
		}
		.content-container .network .title image {
			width: 20px;
			height: 20px;
			vertical-align: middle;
			margin-right: 10px;
		}
		.content-container .network .content {
			overflow: hidden;
		}
		.content-container .network .content>view {
			float: left;
			width: 48%;
			height: 70px;
			text-align: center;
			background: #f1f6fd;
			font-size: 13px;
			margin-top: 10px;
			margin-right: 4%;
			padding-top: 12px;
			box-sizing: border-box;
		}
		.content-container .network .content>view:nth-child(2),
		.content-container .network .content>view:nth-child(4) {
			margin-right: 0;
		}
		.content-container .network .content>view view:nth-child(2) {
			color: #f3921b;
			font-weight: 700;
		}
		.content-container .transfer_list {
			padding: 16px;
			border-top: 6px solid  #f0f6fe;
		}
		.content-container .transfer_list>view:nth-child(1) image {
			width: 20px;
			height: 20px;
			vertical-align: middle;
			margin-right: 10px;
		}
		.content-container .transfer_list .name {
			display: flex;
			margin: 16px 0;
		}
		.content-container .transfer_list .name>view:nth-child(2) {
			flex: 1;
			text-align: right;
			font-size: 14px;
			line-height: 40px;
		}
		.content-container .transfer_list .name .menu {
			flex: 1;
			height: 40px;
			line-height: 40px;
			display: flex;
			text-align: center;
			font-size: 14px;
		}
		.content-container .transfer_list .name .menu view {
			flex: 1;
			cursor: pointer;
		}
		.content-container .transfer_list .name .menu .bct {
			color: #f3921b;
			border-bottom: 1px solid #f3921b;
		}
		.content-container .expires {
			border: 1px solid #eeeeee;
			box-shadow: 0px 2px 4px 1px #e5e5e5;
			padding: 10px;
			margin: 10px 0;
			border-radius: 4px;
		}
		.content-container .expire {
			display: flex;
			font-size: 12px;
		}
		.content-container .expire view {
			flex: 1;
		}
		.content-container .expire view:nth-child(2) {
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
		.content-container .network {
			width: 1400px;
			margin: 0 auto;
			padding: 16px;
			box-sizing: border-box;
			background: #ffffff;
		}
		.content-container .network .title {
			font-size: 18px;
		}
		.content-container .network .title image {
			width: 20px;
			height: 20px;
			vertical-align: middle;
			margin-right: 10px;
		}
		.content-container .network .content {
			display: flex;
			margin-top: 16px;
		}
		.content-container .network .content>view {
			flex: 1;
			height: 120px;
			margin-right: 16px;
			text-align: center;
			background: #f1f6fd;
			padding-top: 29px;
			box-sizing: border-box;
		}
		.content-container .network .content>view:nth-child(4),
		.content-container .network .content>view:nth-child(8) {
			margin-right: 0;
		}
		.content-container .network .content>view view:nth-child(2) {
			color: #f3921b;
			font-size: 24px;
			margin-top: 10px;
			font-weight: 700;
		}
		.content-container .transfer_list {
			width: 1400px;
			margin: 16px auto;
			padding: 16px;
			box-sizing: border-box;
			background: #ffffff;
		}
		.content-container .transfer_list>view:nth-child(1) {
			font-size: 18px;
		}
		.content-container .transfer_list>view:nth-child(1) image {
			width: 20px;
			height: 20px;
			vertical-align: middle;
			margin-right: 10px;
		}
		.content-container .transfer_list .name {
			display: flex;
			margin: 16px 0;
		}
		.content-container .transfer_list .name>view:nth-child(2) {
			flex: 1;
			text-align: right;
			line-height: 44px;
		}
		.content-container .transfer_list .name .menu {
			flex: 1;
			height: 44px;
			line-height: 44px;
			display: flex;
			text-align: center;
		}
		.content-container .transfer_list .name .menu view {
			width: 120px;
			cursor: pointer;
		}
		.content-container .transfer_list .name .menu .bct {
			color: #f3921b;
			border-bottom: 1px solid #f3921b;
		}
	}
</style>
