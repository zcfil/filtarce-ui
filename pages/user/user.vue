<template>
	<view class="user">
		<Top/>
		<view class="content-container">
			<view class="content">
				<view class="left" v-if="!breadth">
					<view class="menu">
						<view @click="chang(0)" :class="{act:num==0}">
							<image v-if="num==0" src="../../static/icon-1.png" mode=""></image>
							<image v-if="num!=0" src="../../static/icon-.png" mode=""></image>个人中心
						</view>
						<view @click="chang(1)" :class="{act:num==1}">
							<image v-if="num==1" src="../../static/jiankong-1.png" mode=""></image>
							<image v-if="num!=1" src="../../static/jiankong.png" mode=""></image>节点监控
						</view>
						<view @click="chang(2)" :class="{act:num==2}">
							<image v-if="num==2" src="../../static/yanjing_guankan-1.png" mode=""></image>
							<image v-if="num!=2" src="../../static/yanjing_guankan.png" mode=""></image>观察列表
						</view>
						<view v-if="verify" @click="chang(3)" :class="{act:num==3}">
							<image v-if="num==3" src="../../static/peizhi (1).png" mode=""></image>
							<image v-if="num!=3" src="../../static/peizhi.png" mode=""></image>后台配置
						</view>
						<view v-if="verify" @click="chang(4)" :class="{act:num==4}">
							<image v-if="num==4" src="../../static/weibiaoti5.png" mode=""></image>
							<image v-if="num!=4" src="../../static/weibiaoti5 (1).png" mode=""></image>批量转账
						</view>
					</view>
					<view class="text">
						<view>
							<image src="../../static/22222_huaban1.png" mode=""></image>
							<text v-if="num==0">个人中心</text>
							<text v-if="num==1">节点监控</text>
							<text v-if="num==2">观察列表</text>
							<text v-if="num==3">后台配置</text>
							<text v-if="num==4">批量转账</text>
						</view>
						<view v-if="num==0">此页面概述了您的Filtrace账户信息。您也可以在此处修改您的手机号和邮箱。</view>
						<view v-if="num==1">您可以添加多个节点方便统一进行监控管理。</view>
						<view v-if="num==2">您可以添加您关注的地址到当前页面，方便您对地址状态的管理。</view>
						<view v-if="num==3">您是特权用户，可以修改后台告警和计算器数据的配置。</view>
						<view v-if="num==4">您是特权用户，可以添加管理钱包地址转账。</view>
					</view>
				</view>
				<view class="right" v-if="num==0">
					<view class="menu">
						<view @click="id='0'" :class="{bct:id==0}">账户信息</view>
						<view @click="id='1'" :class="{bct:id==1}">账户设置</view>
					</view>
					<view class="news" v-if="id==0">
						<view class="name">
							<view>用户名：</view>
							<view>{{formData.users_name}}</view>
							<view @click="id='1'"></view>
						</view>
						<view class="name">
							<view>手机号：</view>
							<view>{{formData.users_phone}}</view>
							<view @click="id='1'"><image src="../../static/arrow-right-bold.png" mode=""></image></view>
						</view>
						<view class="name">
							<view>邮箱：</view>
							<view>{{formData.users_email}}</view>
							<view @click="id='1'"><image src="../../static/arrow-right-bold.png" mode=""></image></view>
						</view>
						<view class="name">
							<view>节点监控列表：</view>
							<view>{{miner_address}}个节点</view>
							<view @click="chang(1)"><image src="../../static/arrow-right-bold.png" mode=""></image></view>
						</view>
						<view class="name">
							<view>观察列表：</view>
							<view>{{miner_monitor}}个列表</view>
							<view @click="chang(2)"><image src="../../static/arrow-right-bold.png" mode=""></image></view>
						</view>
					</view>
					<view class="form" v-if="id==1">
						<uni-forms labelWidth="80" ref="form" :modelValue="formData" :rules="rules">
							<uni-forms-item name="users_phone" label="手机号">
								<uni-easyinput :disabled="phone!=''" type="text" v-model="formData.users_phone" placeholder="请输入手机号" />
							</uni-forms-item>
							<uni-forms-item name="users_email" label="邮箱">
								<uni-easyinput :disabled="email!=''" type="text" v-model="formData.users_email" placeholder="请输入邮箱" />
							</uni-forms-item>
							<uni-forms-item v-if="phone==''" class="code" name="users_code" label="手机验证码">
								<uni-easyinput type="text" v-model="formData.users_code" placeholder="请输入手机验证码" />
							</uni-forms-item>
							<uni-forms-item v-if="email==''" class="code" name="users_code" label="邮箱验证码">
								<uni-easyinput type="text" v-model="formData.users_code" placeholder="请输入邮箱验证码" />
							</uni-forms-item>
						</uni-forms>
						<view v-if="phone==''" class="name">
							<text @click="grtCode(1)" v-show="shows" style="cursor: pointer;">获取手机验证码</text>
							<text v-show="!shows">{{count}}s</text>
						</view>
						<view v-if="email==''" class="name">
							<text @click="grtCode(2)" v-show="shows" style="cursor: pointer;">获取邮箱验证码</text>
							<text v-show="!shows">{{count}}s</text>
						</view>
						<view class="btn" style="margin-top: 30px;">
							<text @click="modify" style="background: #f3921b;cursor: pointer;">确认修改</text>
							<text @click="chang(0)" style="background: #aaaaaa;cursor: pointer;">取消</text>
						</view>
					</view>
				</view>
				<view class="right" v-if="num==1">
					<view class="top" v-if="!breadth">
						<view class="title">节点监控 <text>已创建{{total}}个节点</text></view>
						<view class="sear">
							<input class="inp" type="text" v-model="form.miner_address" placeholder="请输入节点ID"/>
							<view class="clear"><image @click="clear" v-if="form.miner_address!=''" src="../../static/shanchu.png" mode=""></image></view>
							<view class="img"><image @click="search" src="../../static/sousuo.png" mode=""></image></view>
						</view>
						<view class="establish" @click="show=true">创建节点</view>
					</view>
					<view class="tops" v-if="breadth">
						<view>
							<view class="title">节点监控 <text>已创建{{total}}个节点</text></view>
							<view class="establish" @click="show=true">创建节点</view>
						</view>
						<view>
							<view class="sear">
								<input class="inp" type="text" v-model="form.miner_address" placeholder="请输入节点ID"/>
							<view class="clear"><image @click="clear" v-if="form.miner_address!=''" src="../../static/shanchu.png" mode=""></image></view>
								<view class="img"><image @click="search" src="../../static/sousuo.png" mode=""></image></view>
							</view>
						</view>
					</view>
					<view v-if="!breadth">
						<view class="column" style="border-top: 1px solid #dddddd;">
							<view>节点</view>
							<view>有效算力</view>
							<view>总奖励</view>
							<view>可用余额</view>
							<view>扇区质押</view>
							<view>锁仓奖励</view>
							<view>扇区大小</view>
							<view>奖励块数</view>
							<view>当天累计</view>
							<view>幸运值</view>
							<view>操作</view>
						</view>
						<view class="column" v-for="(item,index) in node" :key="index" style="font-size: 13px;">
							<view><text style="color: #007AFF;cursor: pointer;" @click="details(item.miner_address)">{{item.miner_address}}</text></view>
							<view><text v-if="item.miner_power!=''">{{conversion(item.miner_power)}}</text><text v-if="item.miner_power==''">0.000 GB</text></view>
							<view>{{money(Number(item.miner_reward).toFixed(3))}}FIL</view>
							<view>{{money(Number(item.miner_available).toFixed(3))}}FIL</view>
							<view>{{money(Number(item.miner_pledge).toFixed(3))}}FIL</view>
							<view>{{money(Number(item.miner_locked).toFixed(3))}}FIL</view>
							<view>{{item.miner_size}}GB</view>
							<view>{{item.miner_rewards}}</view>
							<view>{{item.miner_total}}</view>
							<view>{{money(Number(item.miner_lucky*100).toFixed(2))}}</view>
							<view><text @click="deletes(item.miner_address)" style="color: red;cursor: pointer;">删除</text></view>
						</view>
					</view>
					<view v-if="breadth">
					    <view class="expires" v-for="(item,index) in node" :key="index">
						    <view class="expire">
							    <view>节点</view>
							    <view style="color: #007AFF;"><text @click="details(item.miner_address)">{{item.miner_address}}</text></view>
						    </view>
							<view class="expire">
							    <view>有效算力</view>
							    <view><text v-if="item.miner_power!=''">{{conversion(item.miner_power)}}</text><text v-if="item.miner_power==''">0.000 GB</text></view>
							</view>
							<view class="expire">
							    <view>总奖励</view>
							    <view>{{money(Number(item.miner_reward).toFixed(3))}} FIL</view>
							</view>
							<view class="expire">
							    <view>可用余额</view>
							    <view>{{money(Number(item.miner_available).toFixed(3))}} FIL</view>
							</view>
							<view class="expire">
							    <view>扇区质押</view>
							    <view>{{money(Number(item.miner_pledge).toFixed(3))}} FIL</view>
							</view>
							<view class="expire">
							    <view>锁仓奖励</view>
							    <view>{{money(Number(item.miner_locked).toFixed(3))}} FIL</view>
							</view>
							<view class="expire">
							    <view>扇区大小</view>
							    <view>{{item.miner_size}} GB</view>
							</view>
							<view class="expire">
							    <view>奖励块数</view>
							    <view>{{item.miner_rewards}}</view>
							</view>
							<view class="expire">
							    <view>当天累计</view>
							    <view>{{item.miner_total}}</view>
							</view>
							<view class="expire">
							    <view>幸运值</view>
							    <view>{{money(Number(item.miner_lucky*100).toFixed(2))}}</view>
							</view>
							<view class="expire">
							    <view>操作</view>
							    <view style="color: red;"><text @click="deletes(item.miner_address)">删除</text></view>
							</view>
					    </view>
					</view>
					<view style="margin-top: 10px;" v-if="node!=null">
						<page-pagination :pageSize="form.pageSize"  :currentPage="form.pageIndex" :numAround="true" :btnText="true" :total="total" :showGoPage="true"  trigger="click" @change="change" />
					</view>
				</view>
				<view class="right" v-if="num==2">
					<view class="top">
						<view class="title">观察列表 <text>已添加{{totals}}个地址</text></view>
						<view class="establish" @click="add1">添加地址</view>
					</view>
					<view v-if="!breadth">
						<view class="column" style="border-top: 1px solid #dddddd;">
							<view>钱包ID</view>
							<view>别名</view>
							<view>余额</view>
							<view>操作</view>
						</view>
						<view class="column" v-for="(item,index) in address" :key="index" style="font-size: 14px;">
							<view><text style="cursor: pointer;">{{item.wallet_id}}</text></view>
							<view>{{item.wallet_names}}</view>
							<view>{{Number(item.wallet_available).toFixed(3)}} FIL</view>
							<view><text style="color: red;cursor: pointer;" @click="deletess(item.wallet_address)">删除</text></view>
						</view>
					</view>
					<view v-if="breadth">
					    <view class="expires" v-for="(item,index) in address" :key="index">
						    <view class="expire">
							    <view>钱包ID</view>
							    <view><text>{{item.wallet_id}}</text></view>
						    </view>
							<view class="expire">
							    <view>别名</view>
							    <view>{{item.wallet_names}}</view>
							</view>
							<view class="expire">
							    <view>余额</view>
							    <view>{{Number(item.wallet_available).toFixed(3)}} FIL</view>
							</view>
							<view class="expire">
							    <view>操作</view>
							    <view style="color: red;"><text @click="deletess(item.wallet_address)">删除</text></view>
							</view>
					    </view>
					</view>
					<view style="margin-top: 10px;" v-if="address!=null">
						<page-pagination :pageSize="forms.pageSize"  :currentPage="forms.pageIndex" :numAround="true" :btnText="true" :total="totals" :showGoPage="true"  trigger="click" @change="changes" />
					</view>
				</view>
				<view class="right" v-if="num==4">
					<view class="menu">
						<view @click="ids='0'" :class="{bct:ids==0}">钱包管理</view>
						<view @click="ids='1'" :class="{bct:ids==1}">转账列表</view>
					</view>
					<view class="hardware" v-if="ids==0">
						<view @click="add3">添加钱包地址</view>
						<view v-if="!breadth">
							<view class="column" style="border-top: 1px solid #dddddd;">
								<view>别名</view>
								<view>钱包地址</view>
								<view>钱包余额</view>
								<view>操作</view>
							</view>
							<view class="column" v-for="(item,index) in qianbaolist" :key="index" style="font-size: 14px;">
								<view>{{item.lotus_wallet_alias}}</view>
								<view>{{item.lotus_wallet_address}}</view>
								<view>{{(Number(item.lotus_available)).toFixed(6)}} FIL</view>
								<view><text style="color: #007AFF;cursor: pointer;margin-right: 20px;" @click="mids(item)">转账</text><text style="color: red;cursor: pointer;" @click="qianbaodelete(item)">删除</text></view>
							</view>
						</view>
						<view v-if="breadth">
						    <view class="expires" v-for="(item,index) in qianbaolist" :key="index">
							    <view class="expire">
								    <view>别名</view>
								    <view>{{item.lotus_wallet_alias}}</view>
							    </view>
								<view class="expire">
								    <view>钱包地址</view>
								    <view>{{item.lotus_wallet_address}}</view>
								</view>
								<view class="expire">
								    <view>钱包余额</view>
								    <view>{{(Number(item.lotus_available)).toFixed(6)}} FIL</view>
								</view>
								<view class="expire">
								    <view>操作</view>
								    <view><text style="color: #007AFF;cursor: pointer;margin-right: 20px;" @click="mids(item)">转账</text><text style="color: red;" @click="qianbaodelete(item)">删除</text></view>
								</view>
						    </view>
						</view>
						<view style="margin-top: 10px;" v-if="qianbaolist!=null">
							<page-pagination :pageSize="form1.pageSize"  :currentPage="form1.pageIndex" :numAround="true" :btnText="true" :total="total1" :showGoPage="true"  trigger="click" @change="change1" />
						</view>
					</view>
					<view v-if="ids==1">
						<view v-if="!breadth">
							<view class="column" style="border-top: 1px solid #dddddd;">
								<view>操作人</view>
								<view>消息ID</view>
								<view>转出地址</view>
								<view>转入地址</view>
								<view>转账金额</view>
								<view>状态</view>
							</view>
							<view class="column" v-for="(item,index) in zhuanzhanglist" :key="index" style="font-size: 14px;">
								<view>{{item.users_name}}</view>
								<view>{{item.cid}}</view>
								<view>{{item.from}}</view>
								<view>{{item.to}}</view>
								<view>{{item.amount}}</view>
								<view>{{item.status}}</view>
							</view>
						</view>
						<view v-if="breadth">
						    <view class="expires" v-for="(item,index) in zhuanzhanglist" :key="index">
								<view class="expire">
								    <view>操作人</view>
								    <view>{{item.users_name}}</view>
								</view>
							    <view class="expire">
								    <view>消息ID</view>
								    <view>{{item.cid}}</view>
							    </view>
								<view class="expire">
								    <view>转出地址</view>
								    <view>{{item.from}}</view>
								</view>
								<view class="expire">
								    <view>转入地址</view>
								    <view>{{item.to}}</view>
								</view>
								<view class="expire">
								    <view>转账金额</view>
								    <view>{{item.amount}}</view>
								</view>
								<view class="expire">
								    <view>状态</view>
								    <view>{{item.status}}</view>
								</view>
						    </view>
						</view>
						<view style="margin-top: 10px;" v-if="zhuanzhanglist!=null">
							<page-pagination :pageSize="form2.pageSize"  :currentPage="form2.pageIndex" :numAround="true" :btnText="true" :total="total2" :showGoPage="true"  trigger="click" @change="change2" />
						</view>
					</view>
				</view>
				<view class="right" v-if="num==3">
					<view class="menu">
						<view @click="ids='0'" :class="{bct:ids==0}">设备成本</view>
						<view @click="ids='1'" :class="{bct:ids==1}">大额转账</view>
					</view>
					<view class="hardware" v-if="ids==0">
						<view @click="hardwareadd">添加成本配置</view>
						<view v-if="!breadth" class="hardwaretab">
							<view class="column" style="border-top: 1px solid #dddddd;">
								<view>配置名称</view>
								<view>1024T 成本额</view>
								<view>操作</view>
							</view>
							<view class="column" v-for="(item,index) in hardwarelist" :key="index" style="font-size: 14px;">
								<view>{{item.device_name}}</view>
								<view>{{item.price_one}}</view>
								<view><text style="color: #007AFF;cursor: pointer;margin-right: 20px;" @click="hardwareedit(item)">修改</text><text style="color: red;cursor: pointer;" @click="hardwaredelete(item)">删除</text></view>
							</view>
						</view>
						<view v-if="breadth">
						    <view class="expires" v-for="(item,index) in hardwarelist" :key="index">
							    <view class="expire">
								    <view>配置名称</view>
								    <view>{{item.device_name}}</view>
							    </view>
								<view class="expire">
								    <view>1024T 成本额</view>
								   <view>{{item.price_one}}</view>
								</view>
								<view class="expire">
								    <view>操作</view>
								    <view><text style="color: #007AFF;cursor: pointer;margin-right: 20px;" @click="hardwareedit(item)">修改</text><text style="color: red;cursor: pointer;" @click="hardwaredelete(item)">删除</text></view>
								</view>
						    </view>
						</view>
					</view>
					<view class="transfer" v-if="ids==1">
						<view class="dae">
							<uni-forms labelWidth="120" ref="formtransfer" :modelValue="formtransfer" :rules="ruletransfer">
								<uni-forms-item name="lotus_value" label="大额转账告警限额">
									<uni-easyinput type="text" v-model="formtransfer.lotus_value" placeholder="请输入大额转账告警限额" />
								</uni-forms-item>
							</uni-forms>
							<view class="btn" @click="transferedit">修改</view>
						</view>
						<view class="uer">
							<view>大额转账告警用户</view>
							<view @click="add2">用户添加</view>
						</view>
						<view v-if="!breadth">
							<view class="column" style="border-top: 1px solid #dddddd;">
								<view>用户</view>
								<view>邮箱告警</view>
								<view>短信告警</view>
								<view>操作</view>
							</view>
							<view class="column" v-for="(item,index) in data" :key="index" style="font-size: 14px;">
								<view>{{item.users_names}}</view>
								<view><switch :checked="item.users_m_email=='1' ? true:false" @change="switch1(item)" style="zoom:.8" /></view>
								<view><switch :checked="item.users_m_message=='1' ? true:false" @change="switch2(item)" style="zoom:.8" /></view>
								<view><text style="color: red;cursor: pointer;" @click="userdelete(item)">删除</text></view>
							</view>
						</view>
						<view v-if="breadth">
						    <view class="expires" style="line-height: 30px;" v-for="(item,index) in data" :key="index">
							    <view class="expire">
								    <view>用户</view>
								    <view>{{item.users_names}}</view>
							    </view>
								<view class="expire">
								    <view>邮箱告警</view>
								   <view><switch :checked="item.users_m_email=='1' ? true:false" @change="switch1(item)" style="zoom:.8" /></view>
								</view>
								<view class="expire">
								    <view>短信告警</view>
								   <view><switch :checked="item.users_m_message=='1' ? true:false" @change="switch2(item)" style="zoom:.8" /></view>
								</view>
								<view class="expire">
								    <view>操作</view>
								    <view><text style="color: red;cursor: pointer;" @click="userdelete(item)">删除</text></view>
								</view>
						    </view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="mask" v-if="show3">
			<view class="add">
				<view>转账</view>
				<uni-forms labelWidth="60" ref="forward" :modelValue="forward" :rules="ruleforward">
					<uni-forms-item name="to" label="钱包地址">
						<uni-easyinput maxlength="-1" type="textarea" v-model="forward.to" placeholder="请输入钱包地址(多个钱包地址用逗号隔开)" />
					</uni-forms-item>
					<uni-forms-item name="fil" label="金额">
						<uni-easyinput type="text" v-model="forward.fil" placeholder="请输入金额(对应钱包地址用逗号隔开)" />
					</uni-forms-item>
				</uni-forms>
				<view class="btn">
					<view @click="submit1" style="background: #f3921b;float: left;cursor: pointer;">确认</view>
					<view @click="show3=false" style="background: #aaaaaa;float: right;cursor: pointer;">取消</view>
				</view>
			</view>
			<view class="mas" @click="show3=false"></view>
		</view>
		<view class="mask" v-if="show1">
			<view class="add">
				<view v-if="num==3">添加用户</view>
				<view v-if="num==4">添加钱包地址</view>
				<uni-forms v-if="num==3" labelWidth="60" ref="transferuser" :modelValue="transferuser" :rules="ruleuser">
					<uni-forms-item name="users_name" label="用户">
						<uni-easyinput type="text" @input="onInput"  v-model="transferuser.users_name" placeholder="请输入手机号或者邮箱查询添加用户" />
					</uni-forms-item>
				</uni-forms>
				<uni-forms v-if="num==4" labelWidth="60" ref="qianbao" :modelValue="qianbao" :rules="ruleqianbao">
					<uni-forms-item name="private_key" label="秘钥">
						<uni-easyinput maxlength="-1" type="textarea" v-model="qianbao.private_key" placeholder="请输入秘钥" />
					</uni-forms-item>
					<uni-forms-item name="lotus_wallet_alias" label="别名">
						<uni-easyinput type="text" v-model="qianbao.lotus_wallet_alias" placeholder="请输入别名" />
					</uni-forms-item>
				</uni-forms>
                <view class="small" v-show="show2">
                    <view v-for="(item,index) in userdata" :key="index" @click="choice(item)">{{item.users_name}}</view>
                </view>
				<view class="btn">
					<view @click="submits" style="background: #f3921b;float: left;cursor: pointer;">确认</view>
					<view @click="show1=false" style="background: #aaaaaa;float: right;cursor: pointer;">取消</view>
				</view>
			</view>
			<view class="mas" @click="show1=false"></view>
		</view>
		<view class="mask" v-if="show">
			<view class="add">
				<view v-if="num==1">创建节点</view>
				<view v-if="num==2">添加账户地址到观察列表</view>
				<view v-if="num==3">成本配置</view>
				<uni-forms v-if="num==1" labelWidth="80" ref="formnode" :modelValue="formnode" :rules="rulenode">
					<!-- <uni-forms-item name="miner_name" label="节点池名称">
						<uni-easyinput type="text" v-model="formnode.miner_name" placeholder="请输入节点池名称" />
					</uni-forms-item> -->
					<uni-forms-item name="miner_address" label="节点">
						<uni-easyinput type="text" v-model="formnode.miner_address" placeholder="请输入您的节点,多个用逗号隔开" />
					</uni-forms-item>
				</uni-forms>
				<uni-forms v-if="num==2" labelWidth="80" ref="formadd" :modelValue="formadd" :rules="ruleadd">
					<uni-forms-item name="wallet_address" label="钱包地址">
						<uni-easyinput type="text" v-model="formadd.wallet_address" placeholder="请输入您要观察的钱包地址" />
					</uni-forms-item>
					<uni-forms-item name="wallet_names" label="别名">
						<uni-easyinput type="text" v-model="formadd.wallet_names" placeholder="请输入别名" />
					</uni-forms-item>
				</uni-forms>
				<uni-forms v-if="num==3" labelWidth="90" ref="formhardware" :modelValue="formhardware" :rules="rulehardware">
					<uni-forms-item name="device_name" label="配置名称">
						<uni-easyinput type="text" v-model="formhardware.device_name" placeholder="请输入您要添加的配置名称" />
					</uni-forms-item>
					<uni-forms-item name="price_one" label="1024T成本额">
						<uni-easyinput type="text" v-model="formhardware.price_one" placeholder="请输入成本额" />
					</uni-forms-item>
				</uni-forms>
				<view class="btn">
					<view @click="submit" style="background: #f3921b;float: left;cursor: pointer;">确认</view>
					<view @click="show=false" style="background: #aaaaaa;float: right;cursor: pointer;">取消</view>
				</view>
			</view>
			<view class="mas" @click="show=false"></view>
		</view>
		<Footer/>
	</view>
</template>

<script>
	import  Top  from '../../components/Top.vue';
	import  Footer  from '../../components/Footer.vue';
	import CryptoJS from '../../node_modules/crypto-js/crypto-js.js'
	import { verificationCodeedit,userslist,userseditnames,usersmineradd,getusersminerlist,userminerdelete,usersmonitoradd,usersmonitorlist,usersmonitordel,deviceall,deviceadd,deviceedit,devicedelete,listdefaultconfig,editdefaultconfig,getlistuserssendk,addlistuserssendk,deletelistuserssendk,editlistuserssendk,getuserlist,transferlist,transferadd,transferdel,walletsends,walletsenslist } from '../../common/api.js';
	export default {
		data() {
			return {
				encrypt(word) {
				    let keyStr = 'yungo@2021-04-16'; //判断是否存在ksy，不存在就用定义好的key
				    var iv = CryptoJS.enc.Utf8.parse("yungo-2020-06-16");
				    var key = CryptoJS.enc.Utf8.parse(keyStr);
				    var srcs = CryptoJS.enc.Utf8.parse(word);
				    var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv:iv, mode: CryptoJS.mode.CTR, padding: CryptoJS.pad.NoPadding });
				    return encrypted.ciphertext.toString()
				},
				verify:false,
				hardwarelist:[],
                count: "",
                timer: null,
				shows:true,
				mid:"",
				sex: [
					{text: 'Worker',value: 'Worker'},
					{text: 'Controller',value: 'Controller'},
				    {text: 'Owner',value: 'Owner'}
				],
				breadth:false,
				show:false,
				show1:false,
				show2:false,
				show3:false,
				userdata:[],
				data:[],
				num:"0",
				id:"0",
				ids:"0",
				miner_address:0,
				miner_monitor:0,
				address:[],
				node:[],
				qianbaolist:[],
				zhuanzhanglist:[],
				form:{
					pageSize:10,
					pageIndex:1,
					miner_address:""
				},
				forms:{
					pageSize:10,
					pageIndex:1,
				},
				form1:{
					pageSize:10,
					pageIndex:1,
				},
				form2:{
					pageSize:10,
					pageIndex:1,
				},
				total:0,
				totals:0,
				total1:0,
				total2:0,
				formData:{
					users_name:"",
					users_email:"",
					users_phone:"",
					users_code:""
				},
				phone:"",
				email:"",
				formnode:{
					// miner_name:"",
					miner_address:""
				},
				formadd:{
					wallet_address:"",
					wallet_names:""
				},
				formhardware:{
					device_name:"",
					price_one:""
				},
				formtransfer:{
					lotus_value:""
				},
				transferuser:{
					users_name:""
				},
				qianbao:{
					private_key:"",
					lotus_wallet_alias:""
				},
				forward:{
					to:"",
					fil:""
				},
				ruleforward:{
					to: {
						rules:[
							{ required: true, errorMessage: '钱包地址不能为空', trigger: 'blur' },
							{
							    pattern: /^[f|t][0|1|2|3][0-9a-zA-Z,]+$/,
							    errorMessage: '请输入正确的钱包地址（f0/f1/f2/f3/t0/t1/t2/t3开头的数字英文和英文逗号）',
							    trigger: 'blur'
							}
						]
					},
					fil: {
						rules:[
							{ required: true, errorMessage: '金额不能为空', trigger: 'blur' },
							{
							    pattern: /^[0-9,.]+$/,
							    errorMessage: '请输入正确的金额格式',
							    trigger: 'blur'
							}
						]
					},
				},
				ruleuser:{
					users_name: {
						rules:[
							{ required: true, errorMessage: '用户不能为空', trigger: 'blur' },
							{
							    pattern: /^(?!.*?[\u3000-\u303F\u4DC0-\u4DFF\u2800-\u28FF\u3200-\u32FF\u3300-\u33FF\u2700-\u27BF\u2600-\u26FF\uFE10-\uFE1F\uFE30-\uFE4F])[\u4e00-\u9fbb\u2E80-\uFE4Fa-zA-Z.`·]+$/,
							    errorMessage: '请输入正确的用户格式（汉字和字母）',
							    trigger: 'blur'
							}
						]
					},
				},
				ruleqianbao:{
					private_key: {
						rules:[
							{ required: true, errorMessage: '秘钥不能为空', trigger: 'blur' },
							{
							    pattern: /^[0-9a-zA-Z]+$/,
							    errorMessage: '请输入正确的秘钥格式（数字和字母）',
							    trigger: 'blur'
							}
						]
					},
					lotus_wallet_alias: {
						rules:[
							{ required: true, errorMessage: '别名不能为空', trigger: 'blur' },
							{
							    pattern: /^(?!.*?[\u3000-\u303F\u4DC0-\u4DFF\u2800-\u28FF\u3200-\u32FF\u3300-\u33FF\u2700-\u27BF\u2600-\u26FF\uFE10-\uFE1F\uFE30-\uFE4F])[\u4e00-\u9fbb\u2E80-\uFE4Fa-zA-Z.`·]+$/,
							    errorMessage: '请输入正确的别名格式（汉字和字母）',
							    trigger: 'blur'
							}
						]
					},
				},
				rulehardware:{
					device_name: {
						rules:[
							{ required: true, errorMessage: '配置名称不能为空', trigger: 'blur' },
							{
							    pattern: /^(?!.*?[\u3000-\u303F\u4DC0-\u4DFF\u2800-\u28FF\u3200-\u32FF\u3300-\u33FF\u2700-\u27BF\u2600-\u26FF\uFE10-\uFE1F\uFE30-\uFE4F])[\u4e00-\u9fbb\u2E80-\uFE4Fa-zA-Z.`·]+$/,
							    errorMessage: '请输入正确的配置名称',
							    trigger: 'blur'
							}
						]
					},
					price_one: {
						rules:[
							{ required: true, errorMessage: '成本额不能为空', trigger: 'blur' },
							{
							    pattern: /^\d+$|^\d*\.\d+$/g,
							    errorMessage: '请输入正确的成本额格式（正数）',
							    trigger: 'blur'
							}
						]
					}
				},
				rulenode: {
					// miner_name: {
					// 	rules:[
					// 		{ required: true, errorMessage: '节点池名称不能为空', trigger: 'blur' },
				 //            {
				 //                pattern: /^(?!.*?[\u3000-\u303F\u4DC0-\u4DFF\u2800-\u28FF\u3200-\u32FF\u3300-\u33FF\u2700-\u27BF\u2600-\u26FF\uFE10-\uFE1F\uFE30-\uFE4F])[\u4e00-\u9fbb\u2E80-\uFE4Fa-zA-Z.`·]+$/,
				 //                errorMessage: '请输入正确的节点池名称',
				 //                trigger: 'blur'
				 //            }
					// 	]
					// },
				    miner_address: {
						rules:[
							{ required: true, errorMessage: '节点不能为空', trigger: 'blur' },
							{
							    pattern: /^f[0|1|2|3][0-9a-zA-Z,]+$/,
							    errorMessage: '请输入正确的节点格式（f0/f1/f2/f3开头的数字英文和英文逗号）',
							    trigger: 'blur'
							}
						]
					}
				},
				ruletransfer:{
					lotus_value: {
						rules:[
							{ required: true, errorMessage: '请输入大额转账告警限额', trigger: 'blur' },
							{
							    pattern: /^\d+$/,
							    errorMessage: '请输入正整数',
							    trigger: 'blur'
							}
						]
					}
				},
				ruleadd: {
					 wallet_address: {
						rules:[
							{ required: true, errorMessage: '钱包地址不能为空', trigger: 'blur' },
							{
							    pattern: /^f[0|1|2|3][0-9a-zA-Z]{1,}$/,
							    errorMessage: '请输入正确的地址格式（f0/f1/f2/f3开头的数字英文和英文逗号）',
							    trigger: 'blur'
							}
						]
					},
					wallet_names: {
						rules:[
							{ required: true, errorMessage: '别名不能为空', trigger: 'blur' },
							{
							    pattern: /^(?!.*?[\u3000-\u303F\u4DC0-\u4DFF\u2800-\u28FF\u3200-\u32FF\u3300-\u33FF\u2700-\u27BF\u2600-\u26FF\uFE10-\uFE1F\uFE30-\uFE4F])[\u4e00-\u9fbb\u2E80-\uFE4Fa-zA-Z.`·]+$/,
							    errorMessage: '请输入正确的别名格式（汉字和字母）',
							    trigger: 'blur'
							}
						]
					}
				},
				rules: {
					users_email: {
						rules:[
							{ required: true, errorMessage: '邮箱不能为空', trigger: 'blur' },
					        {
					            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
					            errorMessage: '请输入正确的邮箱格式',
					            trigger: 'blur'
					        }
						]
					},
					users_phone: {
						rules:[
							{ required: true, errorMessage: '手机号不能为空', trigger: 'blur' },
					        {
					            pattern: /^1[3|4|5|7|8|9]\d{9}$/,
					            errorMessage: '请输入正确的手机号格式',
					            trigger: 'blur'
					        }
						]
					},
				    users_code: {
						rules:[
				            { required: true, errorMessage: '验证码不能为空', trigger: 'blur' },
				            {
				                pattern: /^\d{6}$/,
				                errorMessage: '请输入正确的验证码',
				                trigger: 'blur'
				            }
				        ]
					}
				},
			}
		},
		onLoad(option) {
			if(document.body.clientWidth<450) {
				this.breadth=true
			}
			if (sessionStorage.getItem('verify')=="true") {
				this.verify=true
			}
			this.num=option.type
			this.auto()
		},
		methods: {
			grtCode(str) {
				  if (str=='2') {
					  this.formData.status="2"
					  var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
					  if (!reg.test(this.formData.users_email)) {
					  	uni.showToast({title:"邮箱格式不正确",icon:'none', })
					    return;
					  }
				  }else {
					  this.formData.status="1"
					  var reg = /^1[3|4|5|7|8|9]\d{9}$/;
					  if (!reg.test(this.formData.users_phone)) {
					  	uni.showToast({title:"手机号格式不正确",icon:'none', })
					    return;
					  }
				  }
			      const TIME_COUNT = 60;
			      if (!this.timer) {
			        this.count = TIME_COUNT;
			        this.shows = false;
			        this.timer = setInterval(() => {
			          if (this.count > 0 && this.count <= TIME_COUNT) {
			            this.count--;
			          } else {
			            this.shows = true;
			            clearInterval(this.timer);
			            this.timer = null;
			          }
			        }, 1000);
			      }
				verificationCodeedit(this.formData).then(res=> {
					uni.showToast({title:"验证码已发送成功",icon:'success', })
				})
			},
			auto() {
				if (sessionStorage.getItem('token')==null) {
					uni.reLaunch({url:"/pages/account/account?key=login"})
				}else {
					if (this.num==0) {
						userslist(sessionStorage.getItem('token')).then(res=> {
							this.formData.users_name=res.data.userinfo[0].users_name
							this.miner_monitor=res.data.minerinfo[0].miner_monitor
							this.miner_address=res.data.minerinfo[0].miner_address
							this.formData.users_phone=res.data.userinfo[0].users_phone
							this.formData.users_email=res.data.userinfo[0].users_email
							this.phone=res.data.userinfo[0].users_phone
							this.email=res.data.userinfo[0].users_email
						})
					}else if (this.num==1) {
						getusersminerlist(this.form,sessionStorage.getItem('token')).then(res=> {
							this.node=res.data.list
							this.total=res.data.total
						})
						this.formnode.miner_address=''
					}else if (this.num==2) {
						usersmonitorlist(this.forms,sessionStorage.getItem('token')).then(res=> {
							this.address=res.data.list
							this.totals=res.data.total
						})
					}else if (this.num==3) {
						deviceall(sessionStorage.getItem('token')).then(res=> {
							this.hardwarelist=res.data
						})
						listdefaultconfig(sessionStorage.getItem('token')).then(res=> {
							this.formtransfer=res.data[0]
						})
						getlistuserssendk(sessionStorage.getItem('token')).then(res=> {
							this.data=res.data
						})
					}else if (this.num==4) {
						transferlist(this.form1,sessionStorage.getItem('token')).then(res=> {
							if (res.data.list!=null) {
								for (var i=0;i<res.data.list.length;i++) {
									res.data.list[i].lotus_wallet_address=(res.data.list[i].lotus_wallet_address).substring(0,6)+"..."+(res.data.list[i].lotus_wallet_address).substring(res.data.list[i].lotus_wallet_address.length-6,res.data.list[i].lotus_wallet_address.length)
								}
							}
							this.qianbaolist=res.data.list
							this.total1=res.data.total
						})
						walletsenslist(this.form2,sessionStorage.getItem('token')).then(res=> {
							if (res.data.list!=null) {
								for (var i=0;i<res.data.list.length;i++) {
									res.data.list[i].cid=(res.data.list[i].cid).substring(0,6)+"..."+(res.data.list[i].cid).substring(res.data.list[i].cid.length-6,res.data.list[i].cid.length)
									res.data.list[i].from=(res.data.list[i].from).substring(0,6)+"..."+(res.data.list[i].from).substring(res.data.list[i].from.length-6,res.data.list[i].from.length)
									res.data.list[i].to=(res.data.list[i].to).substring(0,6)+"..."+(res.data.list[i].to).substring(res.data.list[i].to.length-6,res.data.list[i].to.length)
								}
							}
							this.zhuanzhanglist=res.data.list
							this.total2=res.data.total
						})
					}
				}
			},
			submit() {
				if (this.num==1) {
					this.$refs.formnode.validate().then(res=>{
						usersmineradd(this.formnode,sessionStorage.getItem('token')).then(res=> {
							uni.showToast({title:"添加成功",icon:'success', })
							this.show=false
							this.auto()
						})
					}).catch(err =>{
						console.log('表单错误信息：', err);
					})
				}else if (this.num==2) {
					this.$refs.formadd.validate().then(res=>{
						usersmonitoradd(this.formadd,sessionStorage.getItem('token')).then(res=> {
							uni.showToast({title:"添加成功",icon:'success', })
							this.show=false
							this.auto()
						})
					}).catch(err =>{
						console.log('表单错误信息：', err);
					})
				}else if (this.num==3) {
					this.$refs.formhardware.validate().then(res=>{
						if (this.formhardware.mid!=undefined) {
							deviceedit(this.formhardware,sessionStorage.getItem('token')).then(res=> {
								uni.showToast({title:"修改成功",icon:'success', })
								this.show=false
								this.auto()
							})
						}else {
							deviceadd(this.formhardware,sessionStorage.getItem('token')).then(res=> {
								uni.showToast({title:"添加成功",icon:'success', })
								this.show=false
								this.auto()
							})
						}
					}).catch(err =>{
						console.log('表单错误信息：', err);
					})
				}
			},
			hardwareadd() {
				this.formhardware={
					device_name:"",
					price_one:""
				}
				this.show=true
			},
			hardwareedit(item) {
				this.formhardware=item
				this.show=true
			},
			add1() {
				this.formadd={
					wallet_address:"",
					wallet_names:""
				},
				this.show=true
			},
			add2() {
				this.transferuser={
					users_name:""
				}
				this.show1=true
			},
			add3() {
				this.qianbao={
					private_key:"",
					lotus_wallet_alias:""
				},
				this.show1=true
			},
			transferedit() {
				this.$refs.formtransfer.validate().then(res=>{
					editdefaultconfig(this.formtransfer,sessionStorage.getItem('token')).then(res=> {
						this.$tip.success('修改成功')
						that.auto()
					})
				}).catch(err =>{
					console.log('表单错误信息：', err);
				})
			},
			modify() {
				if (this.phone!=''&&this.email!='') {
					return
				}
				this.$refs.form.validate().then(res=>{
					userseditnames(this.formData,sessionStorage.getItem('token')).then(res=> {
						this.$tip.success('修改成功')
						uni.navigateTo({url:"/pages/user/user?type=" + this.num})
					})
				}).catch(err =>{
					console.log('表单错误信息：', err);
				})
			},
			change(e) {
				this.form.pageIndex=e
				this.auto()
			},
			changes(e) {
				this.forms.pageIndex=e
				this.auto()
			},
			change1(e) {
				this.form1.pageIndex=e
				this.auto()
			},
			change2(e) {
				this.form2.pageIndex=e
				this.auto()
			},
			deletes(id) {
				var that=this
				uni.showModal({
				    title: '提示',
				    content: '是否确认删除 '+id+' 此节点',
				    success: function (res) {
				        if (res.confirm) {
				            userminerdelete({miner_address:id},sessionStorage.getItem('token')).then(res=> {
				            	uni.showToast({title:"删除成功",icon:'success', })
				            	that.auto()
				            })
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			deletess(id) {
				var that=this
				uni.showModal({
				    title: '提示',
				    content: '是否确认删除 '+id+' 此钱包地址',
				    success: function (res) {
				        if (res.confirm) {
				            usersmonitordel({wallet_address:id},sessionStorage.getItem('token')).then(res=> {
				            	uni.showToast({title:"删除成功",icon:'success', })
				            	that.auto()
				            })
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			hardwaredelete(item) {
				var that=this
				uni.showModal({
				    title: '提示',
				    content: '是否确认删除配置名称为 '+item.device_name+' 的配置吗',
				    success: function (res) {
				        if (res.confirm) {
				            devicedelete({mid:item.mid},sessionStorage.getItem('token')).then(res=> {
				            	uni.showToast({title:"删除成功",icon:'success', })
				            	that.auto()
				            })
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			details(id) {
				uni.navigateTo({url:"/pages/monitor/monitor?miner_address=" + id})
			},
			chang(num) {
				uni.navigateTo({url:"/pages/user/user?type=" + num})
			}, 
			onInput(e) {
				if(e.length!='') {
				    getuserlist({universal:e},sessionStorage.getItem('token')).then(res=> {
				        this.userdata=res.data.list
				        if (this.userdata.length>0) {
				            this.show2=true
				        }else {
				            this.show2=false
				        }
				    })
			    }else{
				    this.userdata=[]
				    this.show2=false
				}
			},
            choice(item) {
                this.transferuser.users_name=item.users_name
				sessionStorage.setItem("users_name",item.users_name)
                this.transferuser.users_id=item.users_id
                this.show2=false
            },
			submits() {
				if (this.num==3) {
					this.$refs.transferuser.validate().then(res=>{
						if (sessionStorage.getItem('users_name')!=this.transferuser.users_name) {
							uni.showToast({title:"您选择了用户之后又修改了用户名，请重新查询选择！",icon:'none', })
							return
						}
						addlistuserssendk({users_id:this.transferuser.users_id},sessionStorage.getItem('token')).then(res=> {
							uni.showToast({title:"添加成功",icon:'success', })
							this.show1=false
							this.auto()
						})
					}).catch(err =>{
						console.log('表单错误信息：', err);
					})
				}else if (this.num==4) {
					var param={
						private_key:this.encrypt(this.qianbao.private_key),
						lotus_wallet_alias:this.qianbao.lotus_wallet_alias
					}
					this.$refs.qianbao.validate().then(res=>{
						transferadd(param,sessionStorage.getItem('token')).then(res=> {
							uni.showToast({title:"添加成功",icon:'success', })
							this.show1=false
							this.auto()
						})
					}).catch(err =>{
						console.log('表单错误信息：', err);
					})
				}
			},
			submit1() {
				var arr1=this.forward.to.split(",")
				var arr2=this.forward.fil.split(",")
				var arr=[]
				for (var i=0;i<arr1.length;i++) {
					var obj={}
					obj.fil=this.encrypt(arr2[i])
					obj.id=this.encrypt(this.mid)
					obj.to=this.encrypt(arr1[i])
					arr.push(obj)
				}
				this.$refs.forward.validate().then(res=>{
				    if (arr1.length!=arr2.length) {
					    this.$tip.error("钱包地址和金额个数对应不上,请检查后重新输入")
					    return
				    }
					walletsends(arr,sessionStorage.getItem('token')).then(res=> {
						uni.showToast({title:"转账成功 ",icon:'success', })
						this.show3=false
						this.auto()
					})
				}).catch(err =>{
					console.log('表单错误信息：', err);
				})
			},
			userdelete(item) {
				var that=this
				uni.showModal({
				    title: '提示',
				    content: '是否确认删除用户名为 '+item.users_names+' 的用户吗',
				    success: function (res) {
				        if (res.confirm) {
				            deletelistuserssendk({users_id:item.users_id},sessionStorage.getItem('token')).then(res=> {
				            	uni.showToast({title:"删除成功",icon:'success', })
				            	that.auto()
				            })
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			qianbaodelete(item) {
				var that=this
				uni.showModal({
				    title: '提示',
				    content: '是否确认删除 '+item.lotus_wallet_address+' 钱包地址吗',
				    success: function (res) {
				        if (res.confirm) {
				            transferdel({mid:item.mid},sessionStorage.getItem('token')).then(res=> {
				            	uni.showToast({title:"删除成功",icon:'success', })
				            	that.auto()
				            })
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			switch1(item) {
				item.users_m_email=item.users_m_email=="1"?"0":"1"
				editlistuserssendk(item,sessionStorage.getItem('token')).then(res=> {
					uni.showToast({title:"修改成功",icon:'success', })
					this.auto()
				}).catch(err=> {
					this.auto()
				})
			},
			switch2(item) {
				item.users_m_message=item.users_m_message=="1"?"0":"1"
				editlistuserssendk(item,sessionStorage.getItem('token')).then(res=> {
					uni.showToast({title:"修改成功",icon:'success', })
					this.auto()
				}).catch(err=> {
					this.auto()
				})
			},
			mids(item) {
				this.forward={
					to:"",
					fil:""
				},
				this.mid=item.mid
				this.show3=true
			},
			search() {
				this.form.pageIndex=1
				this.auto()
			},
			clear() {
				this.form.miner_address=''
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
	.user .mask {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 900;
		background: rgba(0, 0, 0, 0.5); 
	}
	.user .mask .mas {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}
	.user .mask .add {
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 901;
		width: 540px;
		transform: translate(-290px,-50%);
		background: #ffffff;
		padding: 20px;
	}
	.user .mask .add>view:nth-child(1) {
		text-align: center;
		margin-bottom: 40px;
	}
	.user .mask .add .btn {
		overflow: hidden;
		margin-top: 30px;
	}
	.user .mask .add .btn view {
		padding: 8px 16px;
		font-size: 14px;
		color: #ffffff;
		border-radius: 6px;
	}
	.user .mask .add .small {
		position: absolute;
		top: 120px;
		left: 80px;
		background: #ffffff;
		border: 1px solid #aaaaaa;
		border-radius: 6px;
	}
	.user .mask .add .small view {
		width: 100px;
		padding: 6px 16px;
		cursor: pointer;
	}
	@media (max-width: 450px) {
		.content-container {
			padding: 94.67px 0 20px;
			min-height: 440px;
			line-height: 22px;
		}
		.content-container .content .right .menu {
			height: 44px;
			line-height: 44px;
			border-bottom: 1px solid #f1f1f1;
			display: flex;
			text-align: center;
		}
		.content-container .content .right .menu view {
			flex: 1;
			cursor: pointer;
		}
		.content-container .content .right .menu .bct {
			color: #f3921b;
		}
		.content-container .content .right .news {
			padding: 0 16px;
		}
		.content-container .content .right .news .name {
			border-bottom: 1px solid #f1f1f1;
			height: 40px;
			line-height: 40px;
			display: flex;
		}
		.content-container .content .right .news .name view:nth-child(1) {
			flex: 4;
		}
		.content-container .content .right .news .name view:nth-child(2) {
			flex: 4;
			text-align: right;
			font-size: 14px;
			color: #666666;
		}
		.content-container .content .right .news .name view:nth-child(3) {
			flex: 1;
			text-align: right;
		}
		.content-container .content .right .news .name image {
			width: 24px;
			height: 24px;
			vertical-align: middle;
		}
		.content-container .content .right .form {
			padding: 16px;
			position: relative;
		}
		.content-container .content .right .form .btn text {
			padding: 8px 16px;
			font-size: 14px;
			color: #ffffff;
			border-radius: 6px;
			margin-right: 30px;
		}
		.content-container .content .right .form .name {
		    position: absolute;
		    top: 132px;
		    left: 236px;
		    width: 120px;
		    height: 34px;
		    line-height: 34px;
		    text-align: center;
		    border: 1px solid #dedede;
		    border-radius: 6px;
		    font-size: 14px;
		}
		.content-container .content .right .form .code {
			width: 220px;
		}
		.content-container .content .right .top {
			padding: 16px;
			background: #f1f6fd;
			display: flex;
		}
		.content-container .content .right .top .title {
			flex: 2;
			margin-right: 10px;
		}
		.content-container .content .right .top .title text {
			color: #666666;
			font-size: 14px;
			margin-left: 10px;
		}
		.content-container .content .right .top .establish {
			flex: 1;
			height: 34px;
			line-height: 34px;
			text-align: center;
			color: #ffffff;
			background-color: #f3921b;
			border-radius: 6px;
			font-size: 14px;
		}
		.content-container .content .right .tops {
			padding: 16px;
			background: #f1f6fd;
		}
		.content-container .content .right .tops>view:nth-child(1) {
			display: flex;
		}
		.content-container .content .right .tops .title {
			flex: 2;
			margin-right: 10px;
		}
		.content-container .content .right .tops .title text {
			color: #666666;
			font-size: 14px;
			margin-left: 10px;
		}
		.content-container .content .right .tops .establish {
			flex: 1;
			height: 34px;
			line-height: 34px;
			text-align: center;
			color: #ffffff;
			background-color: #f3921b;
			border-radius: 6px;
			font-size: 14px;
		}
		.content-container .content .right .tops .sear {
			display: flex;
			width: 100%;
			height: 36px;
			border: 1px solid #dddddd;
			border-radius: 6px;
			margin: 2px 0;
			padding-left: 20px;
			box-sizing: border-box;
			background-color: #ffffff;
			margin-top: 16px;
		}
		.content-container .content .right .tops .sear .inp {
			font-size: 12px;
			flex: 8;
			height: 34px;
		}
		.content-container .content .right .tops .sear .img,
		.content-container .content .right .tops .sear .clear{
			flex: 1;
			height: 34px;
			line-height: 34px;
			text-align: center;
		}
		.content-container .content .right .tops .sear image {
			width: 16px;
			height: 16px;
			vertical-align: middle;
		}
		.content-container .content .right .tops .sear .clear image {
			width: 18px;
			height: 18px;
		}
		.content-container .content .right .expires {
		    border: 1px solid #eeeeee;
		    box-shadow: 0px 2px 4px 1px #e5e5e5;
		    padding: 10px;
		    margin: 16px;
		    border-radius: 4px;
	    }
		.content-container .content .right .expires .expire {
			display: flex;
			font-size: 12px;
		}
		.content-container .content .right .expires .expire view {
			flex: 1;
		}
		.content-container .content .right .expires .expire view:nth-child(2) {
			text-align: right;
		}
		.user .mask .add {
			width: 300px;
			transform: translate(-170px,-50%);
		}
		.content-container .content .right .hardware>view:nth-child(1) {
			font-size: 14px;
			width: 120px;
			height: 36px;
			line-height: 36px;
			text-align: center;
			background:  #f3921b;
			color: #ffffff;
			margin: 16px 0 16px 16px;
			border-radius: 6px;
		}
		.content-container .content .right .dae {
			padding: 16px;
		}
		.content-container .content .right .dae .btn {
			width: 80px;
			height: 36px;
			line-height: 36px;
			text-align: center;
			background: #f3921b;
			color: #ffffff;
			border-radius: 6px;
			font-size: 14px;
		}
		.content-container .content .right .uer>view:nth-child(1) {
			padding: 16px;
			border-top: 1px solid #eeeeee;
		}
		.content-container .content .right .uer>view:nth-child(2) {
			width: 90px;
			height: 36px;
			line-height: 36px;
			text-align: center;
			background: #f3921b;
			color: #ffffff;
			border-radius: 6px;
			cursor: pointer;
			margin-left: 16px;
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
			display: flex;
		}
		.content-container .content .left {
			flex: 2;
		}
		.content-container .content .left .menu {
			background: #ffffff;
			margin-bottom: 16px;
		}
		.content-container .content .left .menu view {
			padding: 16px;
			cursor: pointer;
		}
		.content-container .content .left image {
			width: 20px;
			height: 20px;
			vertical-align: middle;
			margin-right: 10px;
		}
		.content-container .content .left .text {
			background: #ffffff;
			padding: 16px;
		}
		.content-container .content .left .text>view:nth-child(2) {
			font-size: 15px;
			margin-top: 16px;
			color: #666666;
		}
		.content-container .content .left .act {
			color: #f3921b;
			background: #f3f0e5;
		}
		.content-container .content .right {
			flex: 7;
			margin-left: 16px;
			background: #ffffff;
			min-height: 660px;
		}
		.content-container .content .right .menu {
			margin: 16px;
			height: 40px;
			line-height: 40px;
			border-bottom: 1px solid #dddddd;
			display: flex;
		}
		.content-container .content .right .menu view {
			margin-right: 40px;
			cursor: pointer;
		}
		.content-container .content .right .menu view:hover {
			color: #f3921b;
		}
		.content-container .content .right .menu .bct {
			color: #f3921b;
			border-bottom: 2px solid #f3921b;
		}
		.content-container .content .right .news .name {
			border-bottom: 1px solid #dddddd;
			padding: 0 40px 0 16px;
			height: 40px;
			line-height: 40px;
			display: flex;
		}
		.content-container .content .right .news .name view:nth-child(1) {
			flex: 1;
		}
		.content-container .content .right .news .name view:nth-child(2) {
			flex: 1;
		}
		.content-container .content .right .news .name view:nth-child(3) {
			flex: 3;
			text-align: right;
		}
		.content-container .content .right .news .name image {
			width: 24px;
			height: 24px;
			vertical-align: middle;
		}
		.content-container .content .right .form {
			padding-left: 16px;
			width: 600px;
			position: relative;
		}
		.content-container .content .right .form .name {
		    position: absolute;
		    top: 116px;
		    left: 415px;
		    width: 120px;
		    height: 34px;
		    line-height: 34px;
		    text-align: center;
		    border: 1px solid #dedede;
		    border-radius: 6px;
		    font-size: 14px;
		}
		.content-container .content .right .form .code {
			width: 400px;
		}
		.content-container .content .right .form .btn text {
			padding: 8px 16px;
			font-size: 14px;
			color: #ffffff;
			border-radius: 6px;
			margin-right: 40px;
		}
		.content-container .content .right .top {
			padding: 16px;
			overflow: hidden;
		}
		.content-container .content .right .top .title {
			float: left;
			font-size: 18px;
			line-height: 41px;
		}
		.content-container .content .right .top .title text {
			color: #666666;
			font-size: 16px;
			margin-left: 10px;
		}
		.content-container .content .right .top .establish {
			float: left;
			padding: 10px 16px;
			color: #ffffff;
			background-color: #f3921b;
			border-radius: 6px;
			cursor: pointer;
			margin-left: 20px;
		}
		.content-container .content .right .top .sear {
			display: flex;
			float: right;
			width: 300px;
			height: 36px;
			border: 1px solid #dddddd;
			border-radius: 6px;
			margin: 2px 0;
			padding-left: 20px;
			box-sizing: border-box;
		}
		.content-container .content .right .top .sear .inp {
			font-size: 12px;
			flex: 8;
			height: 34px;
		}
		.content-container .content .right .top .sear .img,
		.content-container .content .right .top .sear .clear{
			flex: 1;
			height: 34px;
			line-height: 34px;
			text-align: center;
		}
		.content-container .content .right .top .sear image {
			width: 16px;
			height: 16px;
			vertical-align: middle;
		}
		.content-container .content .right .top .sear .clear image {
			width: 18px;
			height: 18px;
		}
		.content-container .content .right .column {
			display: flex;
			text-align: center;
			height: 50px;
			line-height: 50px;
			border-bottom: 1px solid #dddddd;
		}
		.content-container .content .right .column view {
			flex: 1;
		}
		.content-container .content .right .hardware>view:nth-child(1) {
			width: 140px;
			height: 40px;
			line-height: 40px;
			text-align: center;
			background:  #f3921b;
			color: #ffffff;
			margin: 0 0 16px 16px;
			border-radius: 6px;
			cursor: pointer;
		}
		.content-container .content .right .dae {
			width: 400px;
			padding-left: 16px;
		}
		.content-container .content .right .dae .btn {
			width: 90px;
			height: 36px;
			line-height: 36px;
			text-align: center;
			background: #f3921b;
			color: #ffffff;
			border-radius: 6px;
			cursor: pointer;
		}
		.content-container .content .right .uer>view:nth-child(1) {
			margin-top: 16px;
			padding: 16px;
			border-top: 1px solid #dddddd;
			font-size: 18px;
		}
		.content-container .content .right .uer>view:nth-child(2) {
			width: 90px;
			height: 36px;
			line-height: 36px;
			text-align: center;
			background: #f3921b;
			color: #ffffff;
			border-radius: 6px;
			cursor: pointer;
			margin-left: 16px;
			margin-bottom: 16px;
		}
	}
</style>
