<template>
	<view class="statistics">
		<Top/>
		<view class="content-container">
			<view class="gas">
				<view class="title">
					<view>Filecoin挖矿成本实时查询</view>
					<view class="cut">
						<view :class="{public:num=='32'}" @click="nums(32)">每32G</view>
						<view :class="{public:num=='64'}" @click="nums(64)">每64G</view>
					</view>
				</view>
				<view class="content">
					<view class="lump">
						<view class="name">每T扇区总成本</view>
						<view class="fil" style="color: #c23531;">{{costfil}} FIL</view>
						<view class="money">{{costmoney}} ￥</view>
					</view>
					<view class="lump">
						<view class="name">每T扇区质押费</view>
						<view class="fil">{{pledgefil}} FIL</view>
						<view class="money">{{pledgemoney}} ￥</view>
					</view>
					<view class="lump">
						<view class="name">每T扇区Gas费</view>
						<view class="fil" style="color: #61a0a8;">{{gasfil}} FIL</view>
						<view class="money">{{gasmoney}} ￥</view>
					</view>
				</view>
				<view class="charts-box">
					<qiun-data-charts
					    type="line"
					    :chartData="chartData"
					    background="none"
					/>
				</view>
			</view>
		</view>
		<Footer/>
	</view>
</template>

<script>
	import  Top  from '../../components/Top.vue';
	import  Footer  from '../../components/Footer.vue';
	import { gasfil } from '../../common/api.js';
	export default {
		data() {
			return {
				breadth:false,
				data:[],
				num:"32",
				costfil:"",
				costmoney:"",
				pledgefil:"",
				pledgemoney:"",
				gasfil:"",
				gasmoney:"",
				chartData:{
					categories:[],
					series:[
						{name:"",data:[]},
						{name:"",data:[]},
						{name:"",data:[]}
					]
				},
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
				gasfil().then(res=> {
					this.data=res.data.reverse()
			        this.nums(32)
				})
			},
			nums(num) {
				this.num=num
				this.chartData={
					categories:[],
					series:[
						{name:"",data:[]},
						{name:"",data:[]},
						{name:"",data:[]}
					]
				}
				if (num=="32") {
					this.costfil=((this.data[0].gasfil32+this.data[0].pleagefil32)*32).toFixed(4)
					this.pledgefil=(this.data[0].pleagefil32*32).toFixed(4)
					this.gasfil=(this.data[0].gasfil32*32).toFixed(4)
					this.chartData.series[0].name="每T总成本（32GB/FIL）"
					this.chartData.series[1].name="每T质押费（32GB/FIL）"
					this.chartData.series[2].name="每TGas费（32GB/FIL）"
					if (this.breadth==true) {
						for (var i=0;i<5;i++) {
							this.chartData.series[0].data.push(((this.data[i].gasfil32+this.data[i].pleagefil32)*32).toFixed(4))
							this.chartData.series[1].data.push((this.data[i].pleagefil32*32).toFixed(4))
							this.chartData.series[2].data.push((this.data[i].gasfil32*32).toFixed(4))
						}
					}else {
						for (var i=0;i<this.data.length;i++) {
							this.chartData.series[0].data.push(((this.data[i].gasfil32+this.data[i].pleagefil32)*32).toFixed(4))
							this.chartData.series[1].data.push((this.data[i].pleagefil32*32).toFixed(4))
							this.chartData.series[2].data.push((this.data[i].gasfil32*32).toFixed(4))
						}
					}
				}else if (num=="64") {
					this.costfil=((this.data[0].gasfil64+this.data[0].pleagefil64)*16).toFixed(4)
					this.pledgefil=(this.data[0].pleagefil64*16).toFixed(4)
					this.gasfil=(this.data[0].gasfil64*16).toFixed(4)
					this.chartData.series[0].name="每T总成本（64GB/FIL）"
					this.chartData.series[1].name="每T质押费（64GB/FIL）"
					this.chartData.series[2].name="每TGas费（64GB/FIL）"
					if (this.breadth==true) {
						for (var i=0;i<5;i++) {
							this.chartData.series[0].data.push(((this.data[i].gasfil64+this.data[i].pleagefil64)*16).toFixed(4))
							this.chartData.series[1].data.push((this.data[i].pleagefil64*16).toFixed(4))
							this.chartData.series[2].data.push((this.data[i].gasfil64*16).toFixed(4))
						}
					}else {
						for (var i=0;i<this.data.length;i++) {
							this.chartData.series[0].data.push(((this.data[i].gasfil64+this.data[i].pleagefil64)*16).toFixed(4))
							this.chartData.series[1].data.push((this.data[i].pleagefil64*16).toFixed(4))
							this.chartData.series[2].data.push((this.data[i].gasfil64*16).toFixed(4))
						}
					}
				}
				this.costmoney=(this.costfil*this.data[0].cnytofil).toFixed(2)
				this.pledgemoney=(this.pledgefil*this.data[0].cnytofil).toFixed(2)
				this.gasmoney=(this.costmoney - this.pledgemoney).toFixed(2)
				if (this.breadth==true) {
					for (var i=0;i<5;i++) {
						this.chartData.categories.push(this.parseTime(this.data[i].create_time).substring(11,19))
					} 
				}else {
					this.chartData.categories=this.data.map((item)=> {
						return this.parseTime(item.create_time).substring(5,19)
					})
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
	.content-container .gas .title {
		overflow: hidden;
		color: #333333;
	}
	.content-container .gas .title>view:nth-child(1) {
		float: left;
		line-height: 35px;
	}
	.content-container .gas .title .cut {
		float: right;
		display: flex;
	}
	.content-container .gas .title .cut view {
		flex: 1;
		padding: 6px 12px;
		border: 1px solid #dddddd;
		border-radius: 4px;
		margin-left: 10px;
		cursor: pointer;
	}
	.content-container .gas .public {
		background-color: #f3921b;
		color: #ffffff;
	}
	.content-container .gas .charts-box{
	    width: 100%;
	    height:300px;
	}
	@media (max-width: 450px) {
		.content-container {
			padding: 104.67px 16px 16px 0;
		}
		.content-container .gas {
			height: 440px;
		}
		.content-container .gas .title {
			padding-left: 16px;
		}
		.content-container .gas .title>view:nth-child(1) {
			line-height: 30px;
		}
		.content-container .gas .title .cut view {
			font-size: 12px;
		    margin-left: 6px;
		}
		.content-container .gas .content {
			display: flex;
			text-align: center;
			padding-left: 8px;
		}
		.content-container .gas .content .lump {
			margin: 20px 0 10px;
			flex: 1;
		}
		.content-container .gas .content .lump .name {
			font-size: 14px;
		}
		.content-container .gas .content .lump .fil {
			margin: 8px 0;
		}
		.content-container .gas .content .lump .money {
			font-size: 12px;
			color: #d48265;
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
		.content-container .gas {
			width: 1400px;
			margin: 0 auto;
			padding: 16px;
			box-sizing: border-box;
			background: #ffffff;
			height: 660px;
		}
		.content-container .gas .title>view:nth-child(1) {
			font-size: 18px;
		}
		.content-container .gas .content {
			display: flex;
			justify-content: center;
			text-align: center;
		}
		.content-container .gas .content .lump {
			width: 240px;
			padding: 20px;
			border: 1px solid #eeeeee;
			box-shadow: 0px 2px 4px 1px #e5e5e5;
			border-radius: 4px;
			margin: 30px 15px;
		}
		.content-container .gas .content .lump .fil {
			margin: 15px 0;
			font-size: 20px;
		}
		.content-container .gas .content .lump .money {
			text-align: right;
			font-size: 14px;
			color: #d48265;
		}
	}
</style>
