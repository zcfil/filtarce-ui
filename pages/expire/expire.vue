<template>
	<view class="expire">
		<Top/>
		<view class="content-container">
			<view class="head">扇区概览</view>
			<view class="content">
				<view>
					<view>全网算力：{{arr.chain_power}}</view>
					<view>
					  <qiun-data-charts
					    type="pie"
					    :chartData="chartData"
					    background="none"
					  />
					</view>
				</view>
				<view>
					<view>近半年到期算力</view>
					<view class="quantity">
						<view class="power">
							<view>到期日期</view>
							<view>当月：{{data.power1}}</view>
							<view>三个月：{{data.power3}}</view>
							<view>六个月：{{data.power6}}</view>
						</view>
						<view class="count">
							<view>到期扇区数量 (32/64)</view>
							<view>{{data.count1}}</view>
							<view>{{data.count3}}</view>
							<view>{{data.count6}}</view>
						</view>
						<view class="fils">
							<view>到期质押 FIL</view>
							<view>{{data.fil_count1}}</view>
							<view>{{data.fil_count3}}</view>
							<view>{{data.fil_count6}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="yesterday">
				<view>
					<view>昨日算力数据</view>
					<view>
						<view class="terday">
							<view>昨日封装</view>
							<view>{{yesterday.add_sector}}</view>
							<view>昨日到期质押币</view>
							<view>{{yesterday.pledge_expires}} FIL</view>
						</view>
						<view class="terday">
							<view>昨日到期算力</view>
							<view>{{yesterday.expired_sectors}}</view>
							<view>昨日增量</view>
							<view>{{yesterday.Incremental}}</view>
						</view>
						<view class="terday">
							<view>昨日掉算力</view>
							<view>{{yesterday.faulty_sector}}</view>
						</view>
					</view>
				</view>
				<view class="charts-box">
					<qiun-data-charts
					    type="line"
					    :chartData="chartData1"
					    background="none"
					/>
				</view>
			</view>
			<view class="querys">
				<view v-if="!breadth">存储者生命周期查询</view>
				<uni-search-bar  placeholder="查询多个存储者ID用逗号隔开" @confirm="search" @clear="clear" cancelButton="none" v-model="queryParams.miners">
				</uni-search-bar>
				<view style="cursor: pointer;" @click="sousuo"><image src="../../static/search.png" mode=""></image>查询</view>
			</view>
			<view class="total">
				<view>到期列表</view>
				<view>共 {{total}} 条数据</view>
			</view>
			<view v-if="breadth" class="entry">
				<view class="expires" v-for="(item, index) in list" :key="index">
					<view class="expire">
						<view>存储者ID</view>
						<view class="ids" @click="details(item.miner_id)">{{ item.miner_id }}</view>
					</view>
					<view class="expire">
						<view>有效算力/占比
						    <view class="select" @click="switch1"><image src="../../static/arrow-left-bold.png" mode=""></image><image src="../../static/arrow-right-bold.png" mode=""></image></view>
						</view>
						<view>{{ item.power }}/{{item.ratio}}</view>
					</view>
					<view class="expire">
						<view>有效数据</view>
						<view>{{ item.active_data }}</view>
					</view>
					<view class="expire">
						<view>最近到期时间
						    <view class="select" @click="switch2"><image src="../../static/arrow-left-bold.png" mode=""></image><image src="../../static/arrow-right-bold.png" mode=""></image></view>
						</view>
						<view>{{ parseTime(item.exceed) }}</view>
					</view>
					<view class="expire">
						<view>扇区大小（GB）</view>
						<view>{{ item.sector_size }}</view>
					</view>
					<view class="expire">
						<view>扇区到期数量</view>
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
				</view>
			</view>
			<view class="bg" v-if="!breadth">
				<uni-table border stripe ref="table" :loading="loading" stripe emptyText="暂无更多数据">
					<uni-tr>
						<uni-th align="center">存储者ID</uni-th>
						<uni-th align="center">有效算力/占比
						    <view class="select" @click="switch1"><image src="../../static/arrow-left-bold.png" mode=""></image><image src="../../static/arrow-right-bold.png" mode=""></image></view>
						</uni-th>
						<uni-th align="center">有效数据</uni-th>
						<uni-th align="center">最近到期时间
						    <view class="select" @click="switch2"><image src="../../static/arrow-left-bold.png" mode=""></image><image src="../../static/arrow-right-bold.png" mode=""></image></view>
						</uni-th>
						<uni-th align="center">扇区大小（GB）</uni-th>
						<uni-th align="center">扇区到期数量</uni-th>
						<uni-th align="center">到期算力</uni-th>
						<uni-th align="center">到期释放（FIL）</uni-th>
					</uni-tr>
					<uni-tr v-for="(item, index) in list" :key="index">
						<uni-td align="center">
							<view class="ids" @click="details(item.miner_id)">{{ item.miner_id }}</view>
						</uni-td>
						<uni-td align="center">{{ item.power }} / {{item.ratio}}</uni-td>
						<uni-td align="center">{{ conversion(item.active_data) }}</uni-td>
						<uni-td align="center">{{ parseTime(item.exceed) }}</uni-td>
						<uni-td align="center">{{ item.sector_size }}</uni-td>
						<uni-td align="center">{{ item.sectors_count }}</uni-td>
						<uni-td align="center">{{ item.exp_power }}</uni-td>
						<uni-td align="center">{{ item.fil_count }}</uni-td>
					</uni-tr>
				</uni-table>
			</view>
			<view class="paging">
				<page-pagination :pageSize="queryParams.pageSize"  :currentPage="queryParams.pageNum" :numAround="true" :btnText="true" :total="total" :showGoPage="true"  trigger="click" @change="change" />
			</view>
		</view>
		<Footer/>
	</view>
</template>

<script>
	import { minerlist,expmonth,powertotal,getpercentagelist,querysectorcount } from '../../common/api.js';
	import  Top  from '../../components/Top.vue';
	import  Footer  from '../../components/Footer.vue';
	export default {
		data() {
			return {
				breadth:false,
				value1:"0",
				value2:"2",
				data:{},
				arr:{},
				list:[],
				yesterday:{},
				queryParams: {
				    pageNum: 1,
				    pageSize: 20,
					miners:"",
					order:""
				},
				total: 0,
				loading: false,
				chartData:{
				  series:[
					  {data: []}
				  ],
				},
				chartData1:{
					categories:[],
					series:[
						{name:"新增算力 (PB)",data:[]}
					]
				},
			}
		},
		onLoad() {
			if(document.body.clientWidth<450) {
				this.breadth=true
			}
			this.auto();
			this.expire()
			this.whole()
		},
		methods: {
			auto() {
				this.loading=true
				this.queryParams.miners=(this.queryParams.miners).trim()
				minerlist(this.queryParams).then(res=> {
					if (res.data.list==null) {
						uni.showToast({icon: 'none',title: '无法搜索到此内容'});
					}else {
						for (var i=0;i<res.data.list.length;i++) {
							res.data.list[i].power=this.conversion(res.data.list[i].power)
							res.data.list[i].exp_power=this.conversion(res.data.list[i].exp_power)
							res.data.list[i].ratio=res.data.list[i].ratio+"%"
							res.data.list[i].sectors_count=this.money(res.data.list[i].sectors_count)
							res.data.list[i].fil_count=this.money(res.data.list[i].fil_count)
						}
					}
					this.list=res.data.list
					this.total=res.data.total
					this.loading=false
				})
			}, 
			expire() {
				expmonth().then(res=> {
					res.data[0].power1=this.conversion(res.data[0].power1)
					res.data[0].power3=this.conversion(res.data[0].power3)
					res.data[0].power6=this.conversion(res.data[0].power6)
					res.data[0].count1=this.money(res.data[0].count1)
					res.data[0].count3=this.money(res.data[0].count3)
					res.data[0].count6=this.money(res.data[0].count6)
					res.data[0].fil_count1=this.money(res.data[0].fil_count1)
					res.data[0].fil_count3=this.money(res.data[0].fil_count3)
					res.data[0].fil_count6=this.money(res.data[0].fil_count6)
					this.data=res.data[0]
				}) 
			},
			whole() {
				powertotal().then(res=> {
					res.data[0].chain_power=this.conversion(res.data[0].chain_power)
					this.arr=res.data[0]
				})
				getpercentagelist().then(res=> {
					for (var i=0;i<res.data.length;i++) {
						res.data[i].value=Number((res.data[i].value/1024/1024).toFixed(2))
						res.data[i].name=res.data[i].name+"(PB)"
					}
					this.chartData.series[0].data=res.data
				})
				querysectorcount().then(res=> {
					res.data.TotalCout[0].Incremental=this.conversion(res.data.TotalCout[0].Incremental)
					res.data.TotalCout[0].add_sector=this.conversion(res.data.TotalCout[0].add_sector)
					res.data.TotalCout[0].expired_sectors=this.conversion(res.data.TotalCout[0].expired_sectors)
					res.data.TotalCout[0].faulty_sector=this.conversion(res.data.TotalCout[0].faulty_sector)
					res.data.TotalCout[0].pledge_expires=(Number(res.data.TotalCout[0].pledge_expires)).toFixed(4)
					this.yesterday=res.data.TotalCout[0]
					if (this.breadth==false) {
						this.chartData1.categories=res.data.TotalSctors.map((item)=> {
							return item.datetime
						})
						this.chartData1.series[0].data=res.data.TotalSctors.map((item)=> {
							return (item.add_sector/1024/1024).toFixed(4)
						})
					}else {
						for (var i=3;i<res.data.TotalSctors.length;i++) {
							this.chartData1.categories.push(res.data.TotalSctors[i].datetime)
							this.chartData1.series[0].data.push((res.data.TotalSctors[i].add_sector/1024/1024).toFixed(4))
						}
					}
				})
			},
			change(e) {
				this.queryParams.pageNum=e
				this.auto()
			},
			search() {
				this.queryParams.pageNum=1
				this.auto()
			},
			clear(res) {
				this.queryParams.miners=''
				this.queryParams.pageNum=1
				this.auto() 
			},
			sousuo() {
				this.queryParams.pageNum=1
				this.auto()
			},
			details(miner_id) {
				uni.navigateTo({url:'/pages/details/details?miners='+miner_id}) 
			},
			switch1() {
				if (this.value2=="2") {
					this.value2="3"
					uni.showToast({icon: 'none',title: '切换为算力逆序'});
				}else if (this.value2=="3") {
					this.value2="2"
					uni.showToast({icon: 'none',title: '切换为算力顺序'});
				}
				this.queryParams.order=this.value2
				this.auto()
			},
			switch2() {
				if (this.value1=="0") {
				    this.value1="1"
					uni.showToast({icon: 'none',title: '切换为时间逆序'});
				}else if (this.value1=="1") {
				    this.value1="0"
					uni.showToast({icon: 'none',title: '切换为时间逆序'});
				}
				this.queryParams.order=this.value1
			    this.auto() 
			},
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
	.content-container .expire view {
		flex: 1;
	}
	.content-container .expire view:nth-child(2) {
		text-align: right;
	}
	.content-container .ids {
		color: #007AFF;
		cursor: pointer;
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
		    padding: 10px 10px 10px 0;
			font-size: 12px;
			border-bottom: 6px solid #f0f6fe;
	    }
		.content-container .content>view:nth-child(1)>view:nth-child(1) {
			font-size: 16px;
			padding-left: 16px;
		}
		.content-container .content>view:nth-child(1)>view:nth-child(2) {
			width: 360px;
			height: 290px;
		}
		.content-container .content>view:nth-child(2) {
			padding-left: 16px;
		}
		.content-container .content>view:nth-child(2)>view:nth-child(1) {
			font-size: 16px;
		}
		.content-container .content .quantity {
			display: flex;
		} 
		.content-container .content .quantity .power>view:nth-child(1), 
		.content-container .content .quantity .count>view:nth-child(1),
		.content-container .content .quantity .fils>view:nth-child(1){
			font-size: 14px;
			margin: 8px 0;
		}
		.content-container .content .quantity .power {
			flex: 17;
		}
		.content-container .content .quantity .count {
			flex: 20;
		}
		.content-container .content .quantity .fils {
			flex: 12;
		}
		.content-container .yesterday {
		    padding: 16px 10px 10px 0;
			font-size: 12px;
			border-bottom: 6px solid #f0f6fe;
		}
		.content-container .yesterday>view:nth-child(1) {
			padding-left: 16px;
		}
		.content-container .yesterday>view:nth-child(1)>view:nth-child(1) {
			font-size: 16px;
		}
		.content-container .yesterday>view:nth-child(1)>view:nth-child(2) {
			display: flex;
			margin-top: 10px;
		}
		.content-container .yesterday .terday {
			flex: 1;
		}
		.content-container .yesterday .terday view:nth-child(1),
		.content-container .yesterday .terday view:nth-child(3) {
			font-size: 14px;
		}
		.content-container .yesterday .terday view:nth-child(3) {
			margin-top: 6px;
		}
		.content-container .yesterday .charts-box{
		    height:250px;
			margin-top: 10px;
		}
		.content-container .querys {
			padding: 10px 16px 0;
			position: relative;
		}
		.content-container .querys>view:nth-child(1) {
			margin-right: 70px;
		}
		.content-container .querys>view:nth-child(2) {
			position: absolute;
			right: 20px;
			top: 20px;
			background-color: #007AFF;
			border-radius: 4px;
			height: 34px;
			padding: 0 10px 0 34px;
			line-height: 34px;
			color: #ffffff;
		}
		.content-container .querys>view:nth-child(2) image {
			position: absolute;
			top: 7px;
			left: 10px;
			width: 20px;
			height: 20px;
		}
		.content-container .total {
			padding: 0 16px;
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
		.content-container .entry .select {
			display: inline-block;
			transform: rotate(90deg);
		}
		.content-container .entry .select image {
			width: 12px;
			height: 12px;
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
			background-color: #ffffff;
			display: flex;
		}
		.content-container .content>view:nth-child(1) {
			flex: 1;
			padding: 0 16px;
			display: flex;
		}
		.content-container .content>view:nth-child(1)>view:nth-child(1) {
			flex: 2;
			font-size: 20px;
			line-height: 290px;
		}
		.content-container .content>view:nth-child(1)>view:nth-child(2) {
			flex: 3;
			width: 360px;
			height: 290px;
		}
		.content-container .content>view:nth-child(2) {
			flex: 1;
			padding: 50px 16px 16px;
		}
		.content-container .content>view:nth-child(2)>view:nth-child(1) {
			font-size: 18px;
		}
		.content-container .content .quantity {
			font-size: 14px;
			padding-top: 20px;
			display: flex;
			color: #555555;
		}
		.content-container .content .quantity .power,
		.content-container .content .quantity .count,
		.content-container .content .quantity .fils{
			flex: 1;
		}
		.content-container .content .quantity .power view,
		.content-container .content .quantity .count view,
		.content-container .content .quantity .fils view {
			margin-bottom: 6px;
		}
		.content-container .content .quantity .power view:nth-child(1),
		.content-container .content .quantity .count view:nth-child(1),
		.content-container .content .quantity .fils view:nth-child(1) {
			margin-bottom: 10px;
			font-size: 16px;
			color: #222222;
		}
		.content-container .yesterday {
			width: 1400px;
			margin: 16px auto 0;
			box-sizing: border-box;
			padding: 10px 16px;
			background-color: #ffffff;
			display: flex;
		}
		.content-container .yesterday>view:nth-child(1) {
			flex: 1;
			margin: 40px 20px 0 0;
		}
		.content-container .yesterday>view:nth-child(1)>view:nth-child(1) {
			font-size: 18px;
		}
		.content-container .yesterday>view:nth-child(1)>view:nth-child(2) {
			font-size: 14px;
			display: flex;
			color: #555555;
			margin-top: 10px;
		}
		.content-container .yesterday .terday {
			flex: 1;
		}
		.content-container .yesterday .terday view:nth-child(1),
		.content-container .yesterday .terday view:nth-child(3) {
			font-size: 16px;
			color: #222222;
			margin: 10px 0 6px;
		}
		.content-container .yesterday .charts-box{
			flex: 1;
			margin-left: 20px;
		    height:250px;
		}
		.content-container .querys {
			width: 1400px;
			margin: 16px auto;
			box-sizing: border-box;
			padding: 10px 16px;
			background-color: #ffffff;
			position: relative;
		}
		.content-container .querys>view:nth-child(1) {
			position: absolute;
			left: 20px;
			top: 24px;
		}
		.content-container .querys>view:nth-child(2) {
			margin-left: 140px;
			margin-right: 80px;
		}
		.content-container .querys>view:nth-child(3) {
			position: absolute;
			right: 20px;
			top: 20px;
			background-color: #007AFF;
			border-radius: 4px;
			height: 34px;
			padding: 0 10px 0 34px;
			line-height: 34px;
			color: #ffffff;
		}
		.content-container .querys>view:nth-child(3) image {
			position: absolute;
			top: 7px;
			left: 10px;
			width: 20px;
			height: 20px;
		}
		.content-container .total {
			width: 1400px;
			margin: 0 auto;
			box-sizing: border-box;
			padding: 16px;
			display: flex;
			background-color: #ffffff;
		}
		.content-container .total view {
			flex: 1;
		}
		.content-container .total view:nth-child(2) {
			text-align: right;
		}
		.content-container .bg {
			width: 1400px;
			margin: 0 auto;
			padding: 0 16px;
			box-sizing: border-box;
			background-color: #ffffff;
		}
		.content-container .bg .select {
			display: inline-block;
			transform: rotate(90deg);
		}
		.content-container .bg .select image {
			width: 12px;
			height: 12px;
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
