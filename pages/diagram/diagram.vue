<template>
	<view class="expire">
		<Top/>
		<view class="content-container">
			<view class="content">
				<view class="head">
				    <view>转账关系图</view>
				    <view class="cut">
				    	<view :class="{public:str=='转入'}" @click="nums('转入')">转入</view>
				    	<view :class="{public:str=='转出'}" @click="nums('转出')">转出</view>
				    </view>
				</view>
				<view v-if="!breadth">
					<view class="char" v-if="!show">
						<view class="core">{{param.address}}</view>
						<view v-if="str=='转入'">
							<view class="add" style="left: 16px;" v-if="list.length>0">
								<view><text style="margin-right: 6px;background: #e9e7ef;">{{list[0].from_address}}</text> <image src="../../static/a-ziyuan13.png" mode=""></image></view>
							</view>
							<view class="add1" v-if="list.length>1">
								<view style="background: #f0f0f4;">{{list[1].to_address}}</view>
								<view style="margin-top: 40px;"><image style="transform: rotate(60deg)" src="../../static/a-ziyuan13.png" mode=""></image></view>
							</view>
							<view class="add2" v-if="list.length>2">
								<view style="background: #e9f1f6;">{{list[2].to_address}}</view>
								<view style="margin-top: 40px;"><image style="transform: rotate(120deg)" src="../../static/a-ziyuan13.png" mode=""></image></view>
							</view>
							<view class="add3" style="right: 16px;" v-if="list.length>3">
								<view><image style="transform: rotate(180deg)" src="../../static/a-ziyuan13.png" mode=""></image><text style="margin-left: 6px;background: #f0fcff;">{{list[3].to_address}}</text></view>
							</view>
							<view class="add4" v-if="list.length>4">
								<view style="margin-bottom: 40px;"><image style="transform: rotate(-60deg)" src="../../static/a-ziyuan13.png" mode=""></image></view>
								<view style="background: #e3f9fd;">{{list[4].to_address}}</view>
							</view>
							<view class="add5" v-if="list.length>5">
								<view style="margin-bottom: 40px;"><image style="transform: rotate(-120deg)" src="../../static/a-ziyuan13.png" mode=""></image></view>
								<view style="color: #007AFF;cursor: pointer;background: #d6ecf0;">更多...</view>
							</view>
						</view>
						<view v-if="str=='转出'">
							<view class="add" style="left: 16px;" v-if="lists.length>0">
								<view><text style="margin-right: 6px;background: #e9e7ef;">{{lists[0].to_address}}</text> <image style="transform: rotate(180deg)" src="../../static/a-ziyuan13.png" mode=""></image></view>
							</view>
							<view class="add1" v-if="lists.length>1">
								<view style="background: #f0f0f4;">{{lists[1].to_address}}</view>
								<view style="margin-top: 40px;"><image style="transform: rotate(-120deg)" src="../../static/a-ziyuan13.png" mode=""></image></view>
							</view>
							<view class="add2" v-if="lists.length>2">
								<view style="background: #e9f1f6;">{{lists[2].to_address}}</view>
								<view style="margin-top: 40px;"><image style="transform: rotate(-60deg)" src="../../static/a-ziyuan13.png" mode=""></image></view>
							</view>
							<view class="add3" style="right: 16px;" v-if="lists.length>3">
								<view><image src="../../static/a-ziyuan13.png" mode=""></image><text style="margin-left: 6px;background: #f0fcff;">{{lists[3].to_address}}</text></view>
							</view>
							<view class="add4" v-if="lists.length>4">
								<view style="margin-bottom: 40px;"><image style="transform: rotate(60deg)" src="../../static/a-ziyuan13.png" mode=""></image></view>
								<view style="background: #e3f9fd;">{{lists[4].to_address}}</view>
							</view>
							<view class="add5" v-if="lists.length>5">
								<view style="margin-bottom: 40px;"><image style="transform: rotate(120deg)" src="../../static/a-ziyuan13.png" mode=""></image></view>
								<view style="color: #007AFF;cursor: pointer;background: #d6ecf0;" @click="show=true">更多...</view>
							</view>
						</view>
					</view>
					<view class="tab" v-if="show">
						<uni-table v-if="str=='转入'" border stripe ref="table" stripe emptyText="暂无更多数据">
							<uni-tr>
								<uni-th align="center">转出地址</uni-th>
								<uni-th align="center">转入地址</uni-th>
								<uni-th align="center">数额</uni-th>
							</uni-tr>
							<uni-tr v-for="(item, index) in list" :key="index">
								<uni-td align="center">{{ item.from_address }}</uni-td>
								<uni-td align="center">{{item.to_address}}</uni-td>
								<uni-td align="center">{{(Number(item.amount_total)).toFixed(4)}} FIL</uni-td>
							</uni-tr>
						</uni-table>
						<view style="margin-top: 10px;" v-if="list!=null&&str=='转入'">
							<page-pagination :pageSize="param.pageSize"  :currentPage="param.pageIndex" :numAround="true" :btnText="true" :total="total" :showGoPage="true"  trigger="click" @change="change" />
						</view>
						<uni-table v-if="str=='转出'" border stripe ref="table" stripe emptyText="暂无更多数据">
							<uni-tr>
								<uni-th align="center">转出地址</uni-th>
								<uni-th align="center">转入地址</uni-th>
								<uni-th align="center">数额</uni-th>
							</uni-tr>
							<uni-tr v-for="(item, index) in lists" :key="index">
								<uni-td align="center">{{ item.from_address }}</uni-td>
								<uni-td align="center">{{item.to_address}}</uni-td>
								<uni-td align="center">{{(Number(item.amount_total)).toFixed(4)}} FIL</uni-td>
							</uni-tr>
						</uni-table>
						<view style="margin-top: 10px;" v-if="lists!=null&&str=='转出'">
							<page-pagination :pageSize="params.pageSize"  :currentPage="params.pageIndex" :numAround="true" :btnText="true" :total="totals" :showGoPage="true"  trigger="click" @change="changes" />
						</view>
					</view>
				</view>
				<view v-if="breadth">
					<view class="char" v-if="!show">
						<view class="core">{{param.address.substring(0,6)}}...{{param.address.substring(param.address.length-6,param.address.length)}}</view>
						<view v-if="str=='转入'">
							<view class="add" style="left: 0;" v-if="list.length>0">
								<view><text style="background: #e9e7ef;">{{list[0].from_address.substring(0,6)}}...{{list[0].from_address.substring(list[0].from_address.length-6,list[0].from_address.length)}}</text> <image src="../../static/a-ziyuan13 (1).png" mode=""></image></view>
							</view>
							<view class="add1" v-if="list.length>1">
								<view style="background: #f0f0f4;">{{list[1].from_address.substring(0,6)}}...{{list[1].from_address.substring(list[1].from_address.length-6,list[1].from_address.length)}}</view>
								<view style="margin-top: 10px;"><image style="transform: rotate(60deg)" src="../../static/a-ziyuan13 (1).png" mode=""></image></view>
							</view>
							<view class="add2" v-if="list.length>2">
								<view style="background: #e9f1f6;">{{list[2].from_address.substring(0,6)}}...{{list[2].from_address.substring(list[2].from_address.length-6,list[2].from_address.length)}}</view>
								<view style="margin-top: 10px;"><image style="transform: rotate(120deg)" src="../../static/a-ziyuan13 (1).png" mode=""></image></view>
							</view>
							<view class="add3" style="right: 0;" v-if="list.length>3">
								<view><image style="transform: rotate(180deg)" src="../../static/a-ziyuan13 (1).png" mode=""></image><text style="background: #f0fcff;">{{list[3].from_address.substring(0,6)}}...{{list[3].from_address.substring(list[3].from_address.length-6,list[3].from_address.length)}}</text></view>
							</view>
							<view class="add4" v-if="list.length>4">
								<view style="margin-bottom: 10px;"><image style="transform: rotate(-60deg)" src="../../static/a-ziyuan13 (1).png" mode=""></image></view>
								<view style="background: #e3f9fd;">{{list[4].from_address.substring(0,6)}}...{{list[4].from_address.substring(list[4].from_address.length-6,list[4].from_address.length)}}</view>
							</view>
							<view class="add5" v-if="list.length>5">
								<view style="margin-bottom: 10px;"><image style="transform: rotate(-120deg)" src="../../static/a-ziyuan13 (1).png" mode=""></image></view>
								<view style="color: #007AFF;cursor: pointer;background: #d6ecf0;">更多...</view>
							</view>
						</view>
						<view v-if="str=='转出'">
							<view class="add" style="left: 0;" v-if="lists.length>0">
								<view><text style="background: #e9e7ef;">{{lists[0].to_address.substring(0,6)}}...{{lists[0].to_address.substring(lists[0].to_address.length-6,lists[0].to_address.length)}}</text> <image style="transform: rotate(180deg)" src="../../static/a-ziyuan13 (1).png" mode=""></image></view>
							</view>
							<view class="add1" v-if="lists.length>1">
								<view style="background: #f0f0f4;">{{lists[1].to_address.substring(0,6)}}...{{lists[1].to_address.substring(lists[1].to_address.length-6,lists[1].to_address.length)}}</view>
								<view style="margin-top: 10px;"><image style="transform: rotate(-120deg)" src="../../static/a-ziyuan13 (1).png" mode=""></image></view>
							</view>
							<view class="add2" v-if="lists.length>2">
								<view style="background: #e9f1f6;">{{lists[2].to_address.substring(0,6)}}...{{lists[2].to_address.substring(lists[2].to_address.length-6,lists[2].to_address.length)}}</view>
								<view style="margin-top: 10px;"><image style="transform: rotate(-60deg)" src="../../static/a-ziyuan13 (1).png" mode=""></image></view>
							</view>
							<view class="add3" style="right: 0;" v-if="lists.length>3">
								<view><image src="../../static/a-ziyuan13 (1).png" mode=""></image><text style="background: #f0fcff;">{{lists[3].to_address.substring(0,6)}}...{{lists[3].to_address.substring(lists[3].to_address.length-6,lists[3].to_address.length)}}</text></view>
							</view>
							<view class="add4" v-if="lists.length>4">
								<view style="margin-bottom: 10px;"><image style="transform: rotate(60deg)" src="../../static/a-ziyuan13 (1).png" mode=""></image></view>
								<view style="background: #e3f9fd;">{{lists[4].to_address.substring(0,6)}}...{{lists[4].to_address.substring(lists[4].to_address.length-6,lists[4].to_address.length)}}</view>
							</view>
							<view class="add5" v-if="lists.length>5">
								<view style="margin-bottom: 10px;"><image style="transform: rotate(120deg)" src="../../static/a-ziyuan13 (1).png" mode=""></image></view>
								<view style="color: #007AFF;cursor: pointer;background: #d6ecf0;" @click="show=true">更多...</view>
							</view>
						</view>
					</view>
					<view class="tab" v-if="show">
						<view v-if="str=='转入'">
							<view class="expires" v-for="(item, index) in list" :key="index">
								<view class="expire">
									<view>转出地址</view>
									<view>{{item.from_address.substring(0,6)}}...{{item.from_address.substring(item.from_address.length-6,item.from_address.length)}}</view>
								</view>
								<view class="expire">
									<view>转入地址</view>
									<view>{{item.to_address.substring(0,6)}}...{{item.to_address.substring(item.to_address.length-6,item.to_address.length)}}</view>
								</view>
								<view class="expire">
									<view>数额</view>
									<view>{{(Number(item.amount_total)).toFixed(4)}} FIL</view>
								</view>
							</view>
							<view style="margin-top: 10px;" v-if="list!=null&&str=='转入'">
								<page-pagination :pageSize="param.pageSize"  :currentPage="param.pageIndex" :numAround="true" :btnText="true" :total="total" :showGoPage="true"  trigger="click" @change="change" />
							</view>
						</view>
						<view v-if="str=='转出'">
							<view class="expires" v-for="(item, index) in lists" :key="index">
								<view class="expire">
									<view>转出地址</view>
									<view>{{item.from_address.substring(0,6)}}...{{item.from_address.substring(item.from_address.length-6,item.from_address.length)}}</view>
								</view>
								<view class="expire">
									<view>转入地址</view>
									<view>{{item.to_address.substring(0,6)}}...{{item.to_address.substring(item.to_address.length-6,item.to_address.length)}}</view>
								</view>
								<view class="expire">
									<view>数额</view>
									<view>{{(Number(item.amount_total)).toFixed(4)}} FIL</view>
								</view>
							</view>
							<view style="margin-top: 10px;" v-if="lists!=null&&str=='转出'">
								<page-pagination :pageSize="params.pageSize"  :currentPage="params.pageIndex" :numAround="true" :btnText="true" :total="totals" :showGoPage="true"  trigger="click" @change="changes" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<Footer/>
	</view>
</template>

<script>
	import { relationchart } from '../../common/api.js';
	import  Top  from '../../components/Top.vue';
	import  Footer  from '../../components/Footer.vue';
	export default {
		data() {
			return {
				breadth:false,
				param:{
					address:"",
					pageSize:20,
					pageIndex:1,
				},
				params:{
					address:"",
					pageSize:20,
					pageIndex:1,
				},
				total:0,
				totals:0,
				list:[],
				lists:[],
				str:"转入",
				show:false,
			}
		},
		onLoad(option) {
			if(document.body.clientWidth<450) {
				this.breadth=true
			}
			this.param.address=option.type
			this.params.address=option.type
			this.auto();
		},
		methods: {
			auto() {
				if (this.str=='转入') {
					this.param.status='transfer_in'
					relationchart(this.param).then(res=> {
						this.list=res.data.list.transfer_in
						this.total=res.data.total
					})
				}else if (this.str=='转出') {
					this.params.status='transfer_out'
					relationchart(this.params).then(res=> {
						this.lists=res.data.list.transfer_out
						this.totals=res.data.total
					})
				}
			},
			nums(str) {
				this.str=str
				this.auto()
				this.show=false
			},
			change(e) {
				this.param.pageIndex=e
				this.auto()
			},
			changes(e) {
				this.params.pageIndex=e
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
	@media (max-width: 450px) {
		.content-container {
			font-size: 12px;
			padding-top: 94.67px;
		}
		.content-container .content {
			padding: 16px;
		}
		.content-container .content .head {
			height: 30px;
		}
		.content-container .content .head>view:nth-child(1) {
			float: left;
			line-height: 30px;
			font-size: 16px;
		}
		.content-container .content .head .cut {
			float: right;
			display: flex;
		}
		.content-container .content .head .cut view {
			flex: 1;
			padding: 6px 12px;
			border: 1px solid #dddddd;
			border-radius: 4px;
			margin-left: 10px;
			cursor: pointer;
		}
		.content-container .content .char {
			position: relative;
			min-height: 390px;
		}
		.content-container .content .char .core {
			width: 92px;
			height: 30px;
			text-align: center;
			line-height: 30px;
			border: 1px solid #bbbbbb;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-47px,-16px);
			border-radius: 8px;
		}
		.content-container .content .char .add,
		.content-container .content .char .add3{
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
		}
		.content-container .content .char .add text,
		.content-container .content .char .add3 text{
			display: inline-block;
			width: 92px;
			height: 30px;
			text-align: center;
			line-height: 30px;
			border: 1px solid #bbbbbb;
			border-radius: 8px;
		}
		.content-container .content .char .add1 {
			position: absolute;
			top: 110px;
			left: 55px;
		}
		.content-container .content .char .add2 {
			position: absolute;
			top: 110px;
			right: 55px;
		}
		.content-container .content .char .add4 {
			position: absolute;
			bottom: 110px;
			right: 55px;
		}
		.content-container .content .char .add5 {
			position: absolute;
			bottom: 110px;
			left: 55px;
		}
		.content-container .content .char .add1>view:nth-child(1),
		.content-container .content .char .add2>view:nth-child(1),
		.content-container .content .char .add4>view:nth-child(2),
		.content-container .content .char .add5>view:nth-child(2){
			display: inline-block;
			width: 92px;
			height: 30px;
			text-align: center;
			line-height: 30px;
			border: 1px solid #bbbbbb;
			border-radius: 8px;
		}
		.content-container .content .char .add1>view:nth-child(2),
		.content-container .content .char .add5>view:nth-child(1){
			text-align: right;
		}
		.content-container .content .char image {
			width: 30px;
			height: 4px;
			vertical-align: middle;
		}
		.content-container .expires {
			border: 1px solid #eeeeee;
			box-shadow: 0px 2px 4px 1px #e5e5e5;
			padding: 10px;
			margin: 10px 0;
			border-radius: 4px;
			line-height: 24px;
		}
		.content-container .expire {
			display: flex;
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
		.content-container .content {
			width: 1400px;
			margin: 0 auto;
			background: #ffffff;
		}
		.content-container .content .head {
			padding: 10px 16px;
			border-bottom: 1px solid #eeeeee;
			height: 35px;
		}
		.content-container .content .head>view:nth-child(1) {
			float: left;
			line-height: 35px;
		}
		.content-container .content .head .cut {
			float: right;
			display: flex;
		}
		.content-container .content .head .cut view {
			flex: 1;
			padding: 6px 12px;
			border: 1px solid #dddddd;
			border-radius: 4px;
			margin-left: 10px;
			cursor: pointer;
		}
		.content-container .content .char {
			min-height: 600px;
			padding: 16px;
			font-size: 15px;
			position: relative;
		}
		.content-container .content .char .core {
			width: 380px;
			height: 42px;
			text-align: center;
			line-height: 42px;
			border: 1px solid #bbbbbb;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-191px,-22px);
			border-radius: 8px;
		}
		.content-container .content .char .add,
		.content-container .content .char .add3{
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
		}
		.content-container .content .char .add text,
		.content-container .content .char .add3 text{
			display: inline-block;
			width: 380px;
			height: 42px;
			text-align: center;
			line-height: 42px;
			border: 1px solid #bbbbbb;
			border-radius: 8px;
		}
		.content-container .content .char .add1 {
			position: absolute;
			top: 140px;
			left: 250px;
		}
		.content-container .content .char .add2 {
			position: absolute;
			top: 140px;
			right: 250px;
		}
		.content-container .content .char .add4 {
			position: absolute;
			bottom: 140px;
			right: 250px;
		}
		.content-container .content .char .add5 {
			position: absolute;
			bottom: 140px;
			left: 250px;
		}
		.content-container .content .char .add1>view:nth-child(1),
		.content-container .content .char .add2>view:nth-child(1),
		.content-container .content .char .add4>view:nth-child(2),
		.content-container .content .char .add5>view:nth-child(2){
			display: inline-block;
			width: 380px;
			height: 42px;
			text-align: center;
			line-height: 42px;
			border: 1px solid #bbbbbb;
			border-radius: 8px;
		}
		.content-container .content .char .add1>view:nth-child(2),
		.content-container .content .char .add5>view:nth-child(1){
			text-align: right;
		}
		.content-container .content .char image {
			width: 100px;
			height: 12px;
			vertical-align: middle;
		}
		.content-container .content .tab {
			min-height: 600px;
		}
	}
	.content-container .head .public {
		background-color: #f3921b;
		color: #ffffff;
	}
</style>
