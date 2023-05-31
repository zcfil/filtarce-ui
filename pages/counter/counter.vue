<template>
	<view class="counter">
		<Top/>
		<view class="content-container" v-if="!breadth">
			<view class="content">
				<view>启动时间：<text>{{parseTime(time)}}</text></view>
				<view class="surface">
					<view class="title">满存算力</view>
					<view class="surface-tab">
						<view class="tab-left">
							<uni-forms class="form" ref="form" labelWidth="120" :modelValue="form" :rules="rules" err-show-type="undertext">
								<uni-forms-item  label="总算力" name="finally">
									<uni-easyinput maxlength="8" type="text" v-model="form.finally" placeholder="请输入总算力" />
								</uni-forms-item>
								<view class="unit" style="top: 25px;">TiB</view>
								<uni-forms-item label="总投入" name="cost">
									<uni-easyinput maxlength="10" type="text" v-model="form.cost" placeholder="请输入硬件及运维费用" />
								</uni-forms-item>
								<view class="unit" style="top: 83px;">￥</view>
								<uni-forms-item label="每日单T产出" name="produce">
									<uni-easyinput maxlength="8" type="text" v-model="form.produce" placeholder="请输入每日单T产出" />
								</uni-forms-item>
								<view class="unit" style="top: 141px;">FIL / TiB / D</view>
								<uni-forms-item label="币价" name="price">
									<uni-easyinput maxlength="8" type="text" v-model="form.price" placeholder="请输入币价" />
								</uni-forms-item>
								<view class="unit" style="top: 199px;">￥</view>
								<!-- <uni-forms-item label="单T维持消耗" name="consume">
									<uni-easyinput maxlength="8" type="text" v-model="form.consume" placeholder="请输入单T维持消耗" />
								</uni-forms-item> -->
								<!-- <view class="unit" style="top: 257px;">FIL / TiB / D</view> -->
							</uni-forms>
							<button @click="chang">开始计算</button>
							<view class="explain">
								<view class="img"><image src="../../static/shuoming.png" mode=""></image></view>
								<view class="explaintext">总投入包括{{name}}。</view>
							</view>
						</view>
						<view class="tab-right">
							<view class="everyday">
								<view>周期</view>
								<view>产出</view>
								<!-- <view>维持（时空证明）消耗</view> -->
							</view>
							<view class="everyday">
								<view>每日</view>
								<view>{{moneyFormat(fil)}} FIL/{{moneyFormat(yuan)}} 元</view>
							<!-- 	<view>{{moneyFormat(xhfil)}} FIL/{{moneyFormat(xhyuan)}} 元</view> -->
							</view>
							<view class="everyday">
								<view>每周</view>
								<view>{{moneyFormat(fil*7)}} FIL/{{moneyFormat(yuan*7)}} 元</view>
								<!-- <view>{{moneyFormat(xhfil*7)}} FIL/{{moneyFormat(xhyuan*7)}} 元</view> -->
							</view>
							<view class="everyday">
								<view>每月</view>
								<view>{{moneyFormat(fil*month)}} FIL/{{moneyFormat(yuan*month)}} 元</view>
								<!-- <view>{{moneyFormat(xhfil*month)}} FIL/{{moneyFormat(xhyuan*month)}} 元</view> -->
							</view>
							<view class="everyday">
								<view>每年</view>
								<view>{{moneyFormat(fil*360)}} FIL/{{moneyFormat(yuan*360)}} 元</view>
								<!-- <view>{{moneyFormat(xhfil*360)}} FIL/{{moneyFormat(xhyuan*360)}} 元</view> -->
							</view>
							<view class="everyday">
								<view>静态回本周期</view>
								<view>{{cycle}} 天</view>
							</view>
							<view class="everyday">
								<view>一年半总投入</view>
								<view>{{invest}} 元</view>
							</view>
							<view class="everyday">
								<view>一年半总收入</view>
								<view>{{moneyFormat(yuan*540)}} 元/{{moneyFormat(fil*540)}} FIL</view>
							</view>
						</view>
					</view>
				</view>
				<view>免责声明：本计算采用静态数据计算，实际情况中币价、每日单T产出、单T维持消耗均为变化的值，因此，本结果仅供参考，不作为投资建议。</view>
			</view>
		</view>
		<view class="content-container" v-if="breadth">
			<view class="content" v-if="!show">
				<view class="title">满存算力</view>
				<view class="surface-tab">
					<uni-forms class="form" ref="form" labelWidth="100" :modelValue="form" :rules="rules" err-show-type="undertext">
						<uni-forms-item label="总算力" name="finally">
							<uni-easyinput type="text" v-model="form.finally" placeholder="请输入总算力" />
						</uni-forms-item>
						<view class="unit" style="top: 9px;">TiB</view>
					    <uni-forms-item label="总投入" name="cost">
							<uni-easyinput type="text" v-model="form.cost" placeholder="请输入硬件及运维费用" />
						</uni-forms-item>
						<view class="unit" style="top: 67px;">￥</view>
						<uni-forms-item label="每日单T产出" name="produce">
							<uni-easyinput type="text" v-model="form.produce" placeholder="请输入每日单T产出" />
						</uni-forms-item>
						<view class="unit" style="top: 125px;">FIL / TiB / D</view>
						<uni-forms-item label="币价" name="price">
							<uni-easyinput type="text" v-model="form.price" placeholder="请输入币价" />
						</uni-forms-item>
						<view class="unit" style="top: 183px;">￥</view>
						<!-- <uni-forms-item label="单T维持消耗" name="consume">
							<uni-easyinput type="text" v-model="form.consume" placeholder="请输入单T维持消耗" />
						</uni-forms-item> -->
						<!-- <view class="unit" style="top: 241px;">FIL / TiB / D</view> -->
					    <view class="explain">
						    <view class="img"><image src="../../static/shuoming.png" mode=""></image></view>
						    <view class="explaintext">总投入包括{{name}}。</view>
					    </view>
					</uni-forms>
					<button @click="chang">开始计算</button>
				    <view style="font-size: 12px;color: #999999;text-align: center;">启动时间：<text>{{parseTime(time)}}</text></view>
				</view>
			</view>
			<view class="tab-right" v-if="show">
				<view class="everyday">
					<view>周期</view>
					<view>产出</view>
				<!-- 	<view>消耗</view> -->
				</view>
				<view class="everyday">
					<view>每日</view>
					<view>
						<view>{{moneyFormat(fil)}} FIL</view>
						<view>{{moneyFormat(yuan)}} 元</view>
					</view>
			    	<!-- <view>
					    <view>{{moneyFormat(xhfil)}} FIL</view>
					    <view>{{moneyFormat(xhyuan)}} 元</view>
					</view> -->
				</view>
				<view class="everyday">
					<view>每周</view>
					<view>
					    <view>{{moneyFormat(fil*7)}} FIL</view>
					    <view>{{moneyFormat(yuan*7)}} 元</view>
					</view>
				    <!-- <view>
					    <view>{{moneyFormat(xhfil*7)}} FIL</view>
					    <view>{{moneyFormat(xhyuan*7)}} 元</view>
					</view> -->
				</view>
				<view class="everyday">
					<view>每月</view>
					<view>
					    <view>{{moneyFormat(fil*month)}} FIL</view>
					    <view>{{moneyFormat(yuan*month)}} 元</view>
					</view>
					<!-- <view>
					    <view>{{moneyFormat(xhfil*month)}} FIL</view>
					    <view>{{moneyFormat(xhyuan*month)}} 元</view>
					</view> -->
				</view>
				<view class="everyday">
					<view>每年</view>
					<view>
					    <view>{{moneyFormat(fil*360)}} FIL</view>
					    <view>{{moneyFormat(yuan*360)}} 元</view>
					</view>
					<!-- <view>
					    <view>{{moneyFormat(xhfil*360)}} FIL</view>
					    <view>{{moneyFormat(xhyuan*360)}} 元</view>
					</view> -->
				</view>
				<view class="everyday">
					<view>静态回本周期</view>
					<view>{{cycle}} 天</view>
				</view>
				<view class="everyday">
					<view>一年半总投入</view>
					<view>{{invest}} 元</view>
				</view>
				<view class="everyday">
					<view>一年半总收入</view>
					<view>
					    <view>{{moneyFormat(fil*540)}} FIL</view>
					    <view>{{moneyFormat(yuan*540)}} 元</view>
					</view>
				</view>
				<view style="color: #999999;">免责声明：本计算采用静态数据计算，实际情况中币价、每日单T产出、单T维持消耗均为变化的值，因此，本结果仅供参考，不作为投资建议。</view>
				<button @click="show=false">重新计算</button>
			</view>
		</view>
		<Footer/>
	</view>
</template>

<script>
	import  Top  from '../../components/Top.vue';
	import  Footer  from '../../components/Footer.vue';
	import { getalldevicegasInfo } from '../../common/api.js';
	export default {
		data() {
			return {
				name:"",
				time:"",
				breadth:false,
				show:false,
				form:{
					finally:"1024",
					cost:"",
					produce:"",
					price:"",
					// consume:"0.00000"
				},
				month:"",
				fil:"",
				yuan:"",
				// xhfil:"",
				// xhyuan:"",
				cycle:"",
				invest:"",
				rules: {
				    finally: {
						rules:[
							{ required: true, errorMessage: '总算力不能为空', trigger: 'blur' },
							{
							    pattern: /^\d+$|^\d*\.\d+$/g,
							    errorMessage: '请输入正确的格式（正数）',
							    trigger: 'blur'
							}
						]
					},
				    cost: {
						rules:[
				            { required: true, errorMessage: '硬件及运维费用不能为空', trigger: 'blur' },
				            {
				                pattern: /^\d+$|^\d*\.\d+$/g,
				                errorMessage: '请输入正确的格式（正数）',
				                trigger: 'blur'
				            }
				        ]
					},
				    produce: {
						rules:[
				            { required: true, errorMessage: '每日单T产出不能为空', trigger: 'blur' },
				            {
				                pattern: /^\d+$|^\d*\.\d+$/g,
				                errorMessage: '请输入正确的格式（正数）',
				                trigger: 'blur'
				            }
				        ]
					},
				    price: {
						rules:[
				            { required: true, errorMessage: '币价不能为空', trigger: 'blur' },
				            {
				                pattern: /^\d+$|^\d*\.\d+$/g,
				                errorMessage: '请输入正确的格式（正数）',
				                trigger: 'blur'
				            }
				        ]
					},
				 //    consume: {
					// 	rules:[
				 //            { required: true, errorMessage: '单T维持消耗不能为空', trigger: 'blur' },
				 //            {
				 //                pattern: /^\d+$|^\d*\.\d+$/g,
				 //                errorMessage: '请输入正确的格式（正数）',
				 //                trigger: 'blur'
				 //            }
				 //        ]
					// }
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
				let date=new Date();
				this.time=new Date()
				this.month=new Date(date.getFullYear(),date.getMonth(),0).getDate()
				getalldevicegasInfo().then(res=> {
					this.form.produce=res.data.Single_T_income
					this.form.price=(res.data.GAS[0].cnytofil).toFixed(4)
					for (var i=0;i<res.data.Device.length;i++) {
						this.form.cost =  Number(this.form.cost) + Number(res.data.Device[i].price_one)
						this.name+=res.data.Device[i].device_name
						if (i!=res.data.Device.length-1) {
							this.name+="、"
						}
					}
					this.form.cost=(Number(this.form.cost)).toFixed(2)
				    if (this.breadth==false) {
						this.chang()
					}
				})
			},
			chang() {
				this.$refs.form.validate().then(res=>{
					this.fil=this.form.finally*this.form.produce
					// this.xhfil=this.form.finally*this.form.consume
					this.yuan=this.form.finally*this.form.produce*this.form.price
					// this.xhyuan=this.form.finally*this.form.consume*this.form.price
					if (this.yuan==0) {
						this.cycle=0
					} else {
					    this.cycle=parseInt(this.form.cost/this.yuan)	
					}
					this.invest=this.form.cost*1
				    this.show=true
				}).catch(err =>{
					console.log('表单错误信息：', err);
				})
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
			padding: 104.67px 16px 16px;
			min-height: 430px;
		}
		.content-container .content .title {
			text-align: center;
			margin-bottom: 20px;
		}
		.content-container .content .surface-tab .form {
			position: relative;
		}
		.content-container .content .surface-tab .form .explain {
			position: absolute;
			top: 64px;
			left: 42px;
		}
		.content-container .content .surface-tab .form .explain .img {
			width: 18px;
			height: 18px;
		}
		.content-container .content .surface-tab .form .explain image {
			width: 16px;
			height: 16px;
			vertical-align: middle;
		}
		.content-container .content .surface-tab .form .explain .explaintext {
			width: 150px;
			padding: 16px;
			border: 1px solid #bbbbbb;
			border-radius: 6px;
			background-color: #ffffff;
			color: #555555;
			font-size: 14px;
			margin-top: 10px;
			display: none;
		}
		.content-container .content .surface-tab .form .explain:hover .explaintext {
			display: block;
		}
		.content-container .content .surface-tab .form .unit {
			position: absolute;
			right: 6px;
			color: #cccccc;
			font-size: 14px;
			background: #ffffff;
			z-index: 100;
		}
		.content-container .content .surface-tab button {
			width: 200px;
			height: 36px;
			line-height: 36px;
			font-size: 14px;
			color: #ffffff;
			background-color: #f3921b;
			margin-bottom: 16px;
		}
		.content-container .tab-right {
			color: #333333;
			font-size: 12px;
		}
		.content-container .tab-right .everyday {
			width: 100%;
			display: flex;
			text-align: center;
			border-top: 1px solid #dddddd;
			border-left: 1px solid #dddddd;
			border-right: 1px solid #dddddd;
			padding: 10px 0;
		}
		.content-container .tab-right .everyday:nth-child(5),
		.content-container .tab-right .everyday:nth-child(8) {
			border-bottom: 1px solid #dddddd;
			margin-bottom: 16px;
		}
		.content-container .tab-right .everyday:nth-child(-n + 5)>view:nth-child(2),
		.content-container .tab-right .everyday:nth-child(-n + 5)>view:nth-child(3) {
			flex: 2;
		}
		.content-container .tab-right .everyday:nth-child(-n + 5)>view:nth-child(1) {
			flex: 1;
		}
		.content-container .tab-right .everyday:nth-child(n + 6)>view {
			flex: 1;
		}
		.content-container .tab-right .everyday>view>view:nth-child(1) {
			margin-bottom: 4px;
		}
		.content-container .tab-right .everyday:nth-child(-n+5):nth-child(n+2)>view:nth-child(1) ,
		.content-container .tab-right .everyday:nth-child(8)>view:nth-child(1) { 
			padding-top: 10px;
		}
		.content-container button {
			width: 200px;
			height: 36px;
			line-height: 36px;
			font-size: 14px;
			color: #ffffff;
			background-color: #f3921b;
			margin-top: 20px;
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
			padding: 16px;
			box-sizing: border-box;
			background: #ffffff;
		}
		.content-container .content .surface {
			border: 1px solid #dddddd;
			margin: 16px 0;
			padding: 16px;
		}
		.content-container .content .surface .title {
			text-align: center;
			font-weight: 700;
		}
		.content-container .content .surface .surface-tab {
			display: flex;
			padding: 30px 0 10px;
		}
		.content-container .content .surface .surface-tab .tab-left {
			flex: 5;
			margin-right: 16px;
			position: relative;
		}
		.content-container .content .surface .surface-tab .tab-left .form {
			border: 1px solid #dddddd;
			padding: 16px 16px 0 60px;
			position: relative;
		}
		.content-container .content .surface .surface-tab .tab-left .form .unit {
			position: absolute;
			right: 24px;
			color: #cccccc;
			font-size: 14px;
			background: #ffffff;
			z-index: 100;
		}
		.content-container .content .surface .surface-tab .tab-left button {
			width: 300px;
			margin-top: 30px;
			color: #ffffff;
			background-color: #f3921b;
		}
		.content-container .content .surface .surface-tab .tab-left .explain {
			position: absolute;
			top: 82px;
			left: 104px;
		}
		.content-container .content .surface .surface-tab .tab-left .explain .img {
			width: 18px;
			height: 18px;
		}
		.content-container .content .surface .surface-tab .tab-left .explain image {
			width: 16px;
			height: 16px;
			vertical-align: middle;
		}
		.content-container .content .surface .surface-tab .tab-left .explain .explaintext {
			width: 150px;
			padding: 20px;
			border: 1px solid #bbbbbb;
			border-radius: 6px;
			background-color: #ffffff;
			color: #555555;
			font-size: 14px;
			margin-top: 10px;
			display: none;
		}
		.content-container .content .surface .surface-tab .tab-left .explain:hover .explaintext {
			display: block;
		}
		.content-container .content .surface .surface-tab .tab-right {
			flex: 7;
			color: #333333;
			font-size: 15px;
		}
		.content-container .content .surface .surface-tab .tab-right .everyday {
			width: 100%;
			display: flex;
			text-align: center;
			border-top: 1px solid #dddddd;
			border-left: 1px solid #dddddd;
			border-right: 1px solid #dddddd;
			height: 50px;
			line-height: 50px;
		}
		.content-container .content .surface .surface-tab .tab-right .everyday:nth-child(5) {
			border-bottom: 1px solid #dddddd;
			margin-bottom: 16px;
		}
		.content-container .content .surface .surface-tab .tab-right .everyday:nth-child(8) {
			border-bottom: 1px solid #dddddd;
		}
		.content-container .content .surface .surface-tab .tab-right .everyday view:nth-child(1) {
			flex: 1;
		}
		.content-container .content .surface .surface-tab .tab-right .everyday view:nth-child(2),
		.content-container .content .surface .surface-tab .tab-right .everyday view:nth-child(3) {
			flex: 2;
		}
	}
</style>