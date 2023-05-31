<template>
	<view class="details">
		<Top/>
		<view class="content-container">
			<view class="head">{{queryParams.miners}}扇区详情</view>
			<view class="content">
				<view class="power">
					<view><text>扇区大小：</text> <text>{{data.sector_size}}G</text></view>
					<view><text>扇区总数：</text> <text>{{data.total_sectors}}</text></view>
					<view><text>有效扇区：</text> <text class="aaa">{{data.active_sectors}}</text></view>
				</view>
				<view class="count">
					<view><text>错误扇区：</text> <text style="color:red;">{{data.faulty_sectors}}</text></view>
					<view><text>可续约扇区：</text> <text>{{data.renew}}</text></view>
					<view><text>不可续扇区：</text> <text>{{data.renewed}}</text></view>
				</view>
			</view>
			<view class="total">
				<view>扇区生命周期列表</view>
				<view>共 {{total}} 条数据</view>
			</view>
			<view v-if="breadth" class="entry">
				<view class="expires" v-for="(item, index) in list" :key="index">
					<view class="expire">
						<view>到期月份</view>
						<view>{{ item.exceed }}</view>
					</view>
					<view class="expire">
						<view>最早到期时间</view>
						<view>{{ parseTime(item.frist_date) }}</view>
					</view>
					<view class="expire">
						<view>到期数量</view>
						<view>{{ item.sectors_count }}</view>
					</view>
					<view class="expire">
						<view>到期算力</view>
						<view>{{ item.exp_power }}</view>
					</view>
					<view class="expire">
						<view>到期释放（FIL）</view>
						<view>{{ item.fil_count }}</view>
					</view>
					<view class="expire">
						<view>可否续签</view>
						<view>
							<view v-if="item.seal_proof==0">否</view>
						    <view v-if="item.seal_proof==1">是</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bg" v-if="!breadth">
				<uni-table border stripe ref="table" :loading="loading" stripe emptyText="暂无更多数据">
					<uni-tr>
						<uni-th align="center">到期月份</uni-th>
						<uni-th align="center">最早到期时间</uni-th>
						<uni-th align="center">到期数量</uni-th>
						<uni-th align="center">到期算力</uni-th>
						<uni-th align="center">到期释放（FIL）</uni-th>
						<uni-th align="center">可否续签</uni-th>
					</uni-tr>
					<uni-tr v-for="(item, index) in list" :key="index">
						<uni-td align="center">{{ item.exceed }}</uni-td>
						<uni-td align="center">{{ parseTime(item.frist_date) }}</uni-td>
						<uni-td align="center">{{ item.sectors_count }}</uni-td>
						<uni-td align="center">{{ item.exp_power }}</uni-td>
						<uni-td align="center">{{ item.fil_count }}</uni-td>
						<uni-td align="center">
							<view v-if="item.seal_proof==0">否</view>
							<view v-if="item.seal_proof==1">是</view>
						</uni-td>
					</uni-tr>
				</uni-table>
			</view>
			<view class="paging">
				<page-pagination :pageSize="queryParams.pageSize"  :currentPage="queryParams.pageNum" :numAround="true" :btnText="true" :total="total" @change="change" />
			</view>
		</view>
		<Footer/>
	</view>
</template>

<script>
	import { sectorslist,getminerdata } from '../../common/api.js';
	import  Top  from '../../components/Top.vue';
	import  Footer  from '../../components/Footer.vue';
	export default {
		data() {
			return {
				breadth:false,
				data:{},
				list:[],
				queryParams: {
				    pageNum: 1,
				    pageSize: 20,
					miners:""
				},
				total: 0,
				loading: false,
			}
		},
		onLoad(option) {
			if(document.body.clientWidth<450) {
				this.breadth=true
			}
			this.queryParams.miners=option.miners
			this.auto();
			this.details()
		},
		methods: {
            auto() {
                this.loading=true
            	sectorslist(this.queryParams).then(res=> {
					for (var i=0;i<res.data.list.length;i++) {
						res.data.list[i].exp_power=this.conversion(res.data.list[i].exp_power)
						res.data.list[i].sectors_count=this.money(res.data.list[i].sectors_count)
						res.data.list[i].fil_count=this.money(res.data.list[i].fil_count)
					}
            	    this.list=res.data.list
            	    this.total=res.data.total
            	    this.loading=false
                })
            }, 
			details() {
				getminerdata({miners:this.queryParams.miners}).then(res=> {
					res.data[0].active_sectors=this.money(res.data[0].active_sectors)
					res.data[0].faulty_sectors=this.money(res.data[0].faulty_sectors)
					res.data[0].renew=this.money(res.data[0].renew)
					res.data[0].renewed=this.money(res.data[0].renewed)
					res.data[0].total_sectors=this.money(res.data[0].total_sectors)
				    this.data=res.data[0]
				})
			},
		    change(e) {
			    this.queryParams.pageNum=e
			    this.auto()
		    },
		   copy(value){
		        uni.setClipboardData({
		           data:value,//要被复制的内容
		           success:(res)=>{//复制成功的回调函数
		             uni.showToast({//提示
		               title:"复制成功",
		             })
		           }
		         });
		   }
		},
		components: {
			Top,
			Footer
		}
	}
</script>

<style>
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
	.content-container .expire>view {
		flex: 1;
	}
	.content-container .expire>view:nth-child(2) {
		text-align: right;
	}
	.content-container .aaa {
		color: #16c22d;
	}
	@media (max-width: 450px) {
		.content-container {
			padding-bottom: 16px;
			font-size: 14px;
			line-height: 24px;
			padding-top: 94.67px;
		}
		.content-container .head {
			padding: 10px 16px;
			border-bottom: 1px solid #eeeeee;
		}
	    .content-container .content {
		    padding: 10px 16px;
			font-size: 12px;
			border-bottom: 6px solid #f0f6fe;
			display: flex;
	    }
		.content-container .content .power {
			flex: 1;
		}
		.content-container .content .count {
			flex: 1;
		}
		.content-container .total {
			padding: 10px 16px 0;
			display: flex;
		}
		.content-container .total view {
			flex: 1;
		}
		.content-container .total view:nth-child(2) {
			text-align: right;
			font-size: 12px;
		}
		.content-container .entry {
			padding: 0 16px;
		}
	    .content-container .paging {
		    padding: 0 16px;
	    }
	}
	@media (min-width: 450px) {
		.content-container {
			width: 100%;
			background: #f1f6fd;
			padding-top: 16px;
			padding-bottom: 16px;
		}
		.content-container .head {
			width: 1400px;
			margin: 0 auto;
			box-sizing: border-box;
			background-color: #ffffff;
			padding: 16px;
			border-bottom: 1px solid #eeeeee;
		}
		.content-container .content {
			width: 1400px;
			margin: 0 auto;
			box-sizing: border-box;
			font-size: 15px;
		    padding: 16px;
			background-color: #ffffff;
		}
		.content-container .content .power>view,
		.content-container .content .count>view {
			display: flex;
		}
		.content-container .content .power>view text:nth-child(1),
		.content-container .content .count>view text:nth-child(1){
			flex: 1;
		}
		.content-container .content .power>view text:nth-child(2),
		.content-container .content .count>view text:nth-child(2){
			flex: 6;
		}
		.content-container .total {
			width: 1400px;
			margin: 0 auto;
			box-sizing: border-box;
			padding: 16px;
			display: flex;
			background-color: #ffffff;
			margin-top: 16px;
		}
		.content-container .bg {
			width: 1400px;
			margin: 0 auto;
			padding: 0 16px;
			box-sizing: border-box;
			background-color: #ffffff;
		}
		.content-container .total view {
			flex: 1;
		}
		.content-container .total view:nth-child(2) {
			text-align: right;
		}
		.content-container .entry {
			background-color: #ffffff;
		}
		.content-container .paging {
			width: 1400px;
			margin: 0 auto;
			box-sizing: border-box;
			padding: 10px 16px;
			background-color: #ffffff;
		}
	}
</style>
