<template>
	<view class="account">
		<Top/>
		<view class="content-container">
			<view class="content" :class="{heig:key=='register'}">
				<view class="account">
					<view class="titles" v-if="key=='login'">欢迎回来</view>
					<view class="titles" v-if="key=='register'">账号注册</view>
					<view class="titles" v-if="key=='reset'">忘记密码</view>
					<uni-forms ref="form" :modelValue="formData" :rules="rules">
						<view v-if="key=='register'" class="title">用户名</view>
						<uni-forms-item v-if="key=='register'" name="users_name">
							<uni-easyinput @confirm="submit" type="text" v-model="formData.users_name" placeholder="请输入用户名" />
						</uni-forms-item>
						<view class="title">账号</view>
						<uni-forms-item name="universal">
							<uni-easyinput @confirm="submit" type="text" v-model="formData.universal" placeholder="请输入邮箱或者手机号" />
						</uni-forms-item>
						<view class="title" v-if="key=='login'&&show1==true">密码</view>
						<view class="title" v-if="key=='register'||key=='reset'">设置密码</view>
						<uni-forms-item name="users_passwd" v-if="show1==true">
							<uni-easyinput @confirm="submit" type="password" v-model="formData.users_passwd" placeholder="请输入密码" />
						</uni-forms-item>
						<view v-if="key=='register'" class="title">确认密码</view>
						<uni-forms-item v-if="key=='register'" name="newusers_passwd">
							<uni-easyinput @confirm="submit" type="password" v-model="formData.newusers_passwd" placeholder="请输入确认密码" />
						</uni-forms-item>
						<view class="title" v-if="key=='register'||key=='reset'||show1==false">验证码</view>
						<uni-forms-item v-if="key=='register'||key=='reset'||show1==false" name="users_code" class="code">
							<uni-easyinput @confirm="submit" type="text" v-model="formData.users_code" placeholder="请输入验证码" />
						</uni-forms-item>
					</uni-forms>
					<view v-if="key=='register'||key=='reset'" class="name" :class="{names:key=='register'}">
						<text @click="grtCode" v-show="show" style="cursor: pointer;">获取验证码</text>
						<text v-show="!show">{{count}}s</text>
					</view>
					<view v-if="show1==false" class="namess">
						<text @click="grtCode" v-show="show" style="cursor: pointer;">获取验证码</text>
						<text v-show="!show">{{count}}s</text>
					</view>
					<view class="code_password" v-if="key=='login'">
						<view @click="show1=false" v-if="show1==true">验证码登录</view>
						<view @click="show1=true" v-if="show1==false">密码登录</view>
						<view @click="reset" v-if="show1==true">忘记密码？</view>
					</view>
					<view class="register" v-if="key=='login'">
						<view>还没有账号？ <text @click="register">立即注册</text></view>
						<view><button @click="submit">登录</button></view>
					</view>
					
					<view class="register" v-if="key=='register'">
						<view>已有账户？ <text @click="login">登录</text></view>
						<view><button @click="submit">注册</button></view>
					</view>
					<view class="register" v-if="key=='reset'">
						<view><text @click="login">返回登录</text></view>
						<view><button @click="submit">确定</button></view>
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
	import { verificationCode,usersRegister,userslogin,verificationCodelogin,restpasswd } from '../../common/api.js';
	export default {
		data() {
			return {
				key:"login",
                count: "",
                timer: null,
                show: true,
                show1: true,
				formData:{
					users_name:"",
					universal:"",
					users_passwd:"",
					newusers_passwd:"",
					users_code:"",
					status:"",
				},
				rules: {
					users_name: {
						rules:[
							{ required: true, errorMessage: '用户名不能为空', trigger: 'blur' },
					        {
					            pattern: /^(?!.*?[\u3000-\u303F\u4DC0-\u4DFF\u2800-\u28FF\u3200-\u32FF\u3300-\u33FF\u2700-\u27BF\u2600-\u26FF\uFE10-\uFE1F\uFE30-\uFE4F])[\u4e00-\u9fbb\u2E80-\uFE4Fa-zA-Z.`·]+$/,
					            errorMessage: '请输入正确的用户名格式（汉字和英文字母）',
					            trigger: 'blur'
					        }
						]
					},
				    universal: {
						rules:[
							{ required: true, errorMessage: '账号不能为空', trigger: 'blur' },
							{
								validateFunction : function (rule,value,data,callback) {
									const mailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; //邮箱验证
									const reg = /^1[3|4|5|7|8|9]\d{9}$/; //手机号验证
									if (value.indexOf("@") > 0 ) {
										if (mailReg.test(value)) {
										    callback()
										} else {
                                            callback('邮箱格式不正确')
                                        }
									}else {
										if (reg.test(value)) {
										    callback()
										} else {
                                            callback('手机号格式不正确')
                                        }
									}
								}
							}
						]
					},
				    users_passwd: {
						rules:[
				            { required: true, errorMessage: '密码不能为空', trigger: 'blur' },
				            {
				                pattern: /^(\w){6,18}$/,
				                errorMessage: '请输入正确的密码格式（6到18位数字和英文字母）',
				                trigger: 'blur'
				            }
				        ]
					},
					newusers_passwd:{
						rules:[
				            { required: true, errorMessage: '确认密码不能为空', trigger: 'blur' },
				            {
				                pattern: /^(\w){6,18}$/,
				                errorMessage: '请输入正确的密码格式（6到18位数字和英文字母）',
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
			if (option.key!=undefined) {
				this.key=option.key
			}
		},
		methods: {
			grtCode() {
			      var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
				  if (this.formData.universal.indexOf("@") > 0 ) {
					  this.formData.status="2"
					  var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
					  if (!reg.test(this.formData.universal)) {
					  	uni.showToast({title:"邮箱格式不正确",icon:'none', })
					    return;
					  }
				  }else {
					  this.formData.status="1"
					  var reg = /^1[3|4|5|7|8|9]\d{9}$/;
					  if (!reg.test(this.formData.universal)) {
					  	uni.showToast({title:"手机号格式不正确",icon:'none', })
					    return;
					  }
				  }
			      const TIME_COUNT = 60;
			      if (!this.timer) {
			        this.count = TIME_COUNT;
			        this.show = false;
			        this.timer = setInterval(() => {
			          if (this.count > 0 && this.count <= TIME_COUNT) {
			            this.count--;
			          } else {
			            this.show = true;
			            clearInterval(this.timer);
			            this.timer = null;
			          }
			        }, 1000);
			      }
				  if (this.key=='register') {
					  this.formData.msgType="1"
				  }else if (this.key=='login') {
					  this.formData.msgType="2"
				  }else if (this.key=='reset') {
					  this.formData.msgType="3"
				  }
				verificationCode(this.formData).then(res=> {
					uni.showToast({title:"验证码已发送成功",icon:'success', })
				})
			},
			submit() {
				if (this.formData.universal.indexOf("@") > 0 ) {
					this.formData.status="2"
				}else {
					this.formData.status="1"
				}
				this.$refs.form.validate().then(res=>{
					if (this.key=='register') {
						usersRegister(this.formData).then(res=> {
							this.$tip.success('注册成功')
							uni.navigateTo({url:"/pages/account/account?key=login"})
						})
					}else if (this.key=='login') {
						if (this.show1==true) {
							userslogin(this.formData).then(res=> {
								this.$tip.success('登录成功')
								sessionStorage.setItem("token",res.data.token)
								sessionStorage.setItem("verify",res.data.verify)
								sessionStorage.setItem("massage",res.data.massage)
								sessionStorage.setItem("telephone",res.data.telephone)
								uni.reLaunch({url:"/pages/user/user?type=0"})
							})
						}else if (this.show1==false) {
							verificationCodelogin(this.formData).then(res=> {
								this.$tip.success('登录成功')
								sessionStorage.setItem("token",res.data.token)
								sessionStorage.setItem("verify",res.data.verify)
								sessionStorage.setItem("massage",res.data.massage)
								sessionStorage.setItem("telephone",res.data.telephone)
								uni.reLaunch({url:"/pages/user/user?type=0"})
							})
						}
					}else if (this.key=='reset') {
						restpasswd(this.formData).then(res=> {
							this.$tip.success('修改成功')
							uni.navigateTo({url:"/pages/account/account?key=login"})
						})
					}
				}).catch(err =>{
					console.log('表单错误信息：', err);
				})
			},
			login() {
				uni.navigateTo({url:"/pages/account/account?key=login"})
			},
			register() {
				uni.navigateTo({url:"/pages/account/account?key=register"})
			},
			reset() {
				uni.navigateTo({url:"/pages/account/account?key=reset"})
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
		}
		.content-container .content {
			height: 460px;
			padding: 16px;
			box-sizing: border-box;
			position: relative;
			font-size: 14px;
		}
		.content-container .heig {
			height: 570px;
		}
		.content-container .content .account .titles {
		    color: #f3921b;
		    font-size: 24px;
		    font-weight: 700;
		    margin-bottom: 20px;
	    }
		.content-container .content .account .name {
		    position: absolute;
		    top: 274px;
		    left: 220px;
		    width: 100px;
		    height: 34px;
		    line-height: 34px;
		    text-align: center;
		    border: 1px solid #dedede;
		    border-radius: 6px;
		    font-size: 14px;
		}
		.content-container .content .account .names {
		    top: 448px;
		}
		.content-container .content .account .namess {
			position: absolute;
			top: 187px;
			left: 220px;
			width: 100px;
			height: 34px;
			line-height: 34px;
			text-align: center;
			border: 1px solid #dedede;
			border-radius: 6px;
			font-size: 14px;
		}
		.content-container .content .account .register view:nth-child(2) button {
		    height: 40px;
		    line-height: 40px;
		    color: #ffffff;
		    background: #f3921b;
		    width: 80px;
			font-size: 15px;
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
			height: 707px;
			box-sizing: border-box;
			margin: 0 auto;
			padding-top: 160px;
			padding-bottom: 160px;
			background: #ffffff;
		}
		.content-container .heig {
			padding-top: 71px;
			padding-bottom: 71px;
		}
		.content-container .content .account {
			width: 500px;
			margin: 0 auto;
			position: relative;
		}
	    .content-container .content .account .titles {
		    color: #f3921b;
		    font-size: 30px;
		    font-weight: 700;
		    margin-bottom: 40px;
	    }
	    .content-container .content .account .name {
		    position: absolute;
		    top: 289px;
		    left: 200px;
		    width: 100px;
		    height: 34px;
		    line-height: 34px;
		    text-align: center;
		    border: 1px solid #dedede;
		    border-radius: 6px;
		    font-size: 14px;
	    }
	    .content-container .content .account .names {
			top: 467px;
	    }
		.content-container .content .account .namess {
			position: absolute;
			top: 200px;
			left: 200px;
			width: 100px;
			height: 34px;
			line-height: 34px;
			text-align: center;
			border: 1px solid #dedede;
			border-radius: 6px;
			font-size: 14px;
		}
	    .content-container .content .account .register view:nth-child(2) button {
		    height: 40px;
		    line-height: 40px;
		    color: #ffffff;
		    background: #f3921b;
		    width: 160px;
	    }
	}
	.content-container .content .account .title {
		color: #444444;
		margin-bottom: 10px;
	}
	.content-container .content .account .code {
		width: 200px;
	}
	.content-container .content .account .code_password {
		overflow: hidden;
		margin-bottom: 10px;
	}
	.content-container .content .account .code_password view:nth-child(1) {
		float: left;
		color: #f3921b;
		cursor:pointer;
	}
	.content-container .content .account .code_password view:nth-child(2) {
		float: right;
		color: #f3921b;
		cursor:pointer;
	}
	.content-container .content .account .register {
		overflow: hidden;
	}
	.content-container .content .account .register view:nth-child(1) {
		float: left;
		line-height: 40px;
	}
	.content-container .content .account .register view:nth-child(2) {
		float: right;
	}
	.content-container .content .account .register view:nth-child(1) text {
		color: #f3921b;
		cursor:pointer;
	}
</style>