import request from './request.js'
import qs from 'qs'
//扇区的状态信息
export function sectorslist(data) {
  return request({
    url: '/block/filexp/sectorslist',
    method: 'GET',
    data
  })
}
export function minerlist(data) {
  return request({
    url: '/block/filexp/minerlist',
    method: 'GET',
    data
  })
}
export function expmonth(data) {
  return request({
    url: '/block/filexp/expmonth',
    method: 'GET',
    data
  })
}
export function getminerdata(data) {
  return request({
    url: '/block/filexp/getminerdata',
    method: 'GET',
    data
  })
}
export function powertotal(data) {
  return request({
    url: '/block/filexp/powertotal',
    method: 'GET',
    data
  })
}
export function getpercentagelist(data) {
  return request({
    url: '/block/filexp/getpercentagelist',
    method: 'GET',
    data
  })
}
export function querysectorcount(data) {
  return request({
    url: '/block/filexp/querysectorcount',
    method: 'GET',
    data
  })
}

// gas费 
export function gasfil(data) {
  return request({
    url: '/block/homepage/gasfil',
    method: 'GET',
    data
  })
}

// 计算器路由
export function getalldevicegasInfo(data) {
  return request({
    url: '/block/homepage/getalldevicegasInfo',
    method: 'GET',
    data
  })
}

// 全网概况
export function gethomepage(data) {
  return request({
    url: '/block/homepage/gethomepage',
    method: 'GET',
    data
  })
}

//验证码
export function verificationCode(data) {
  return request({
    url: '/block/homepage/user/verificationCode',
    method: 'post',
	data
  })
}
export function verificationCodeedit(data) {
  return request({
    url: '/block/homepage/user/verificationCodeedit',
    method: 'post',
	data
  })
}
//注册
export function usersRegister(data) {
  return request({
    url: '/block/homepage/user/usersRegister',
    method: 'post',
	data
  })
}
//登录
export function userslogin(data) {
  return request({
    url: '/block/homepage/user/userslogin',
    method: 'post',
	data
  })
}
//验证码登录
export function verificationCodelogin(data) {
  return request({
    url: '/block/homepage/user/verificationCodelogin',
    method: 'post',
	data
  })
}
//忘记密码
export function restpasswd(data) {
  return request({
    url: '/block/homepage/user/restpasswd',
    method: 'post',
	data
  })
}
// 用户信息
export function userslist(token) {
  return request({
    url: '/block/homepage/user/userslist',
    method: 'GET',
	header:{
		'Authorization':token
	},
  })
}
// 修改用户信息
export function userseditnames(data,token) {
  return request({
    url: '/block/homepage/user/userseditnames',
    method: 'post',
	header:{
		'Authorization':token
	},
	data
  })
}






// 节点监控  list
export function getusersminerlist(data,token) {
  return request({
    url: '/block/homepage/user/getusersminerlist',
    method: 'post',
	header:{
		'Authorization':token
	},
	data
  })
}
// 节点监控 添加
export function usersmineradd(data,token) {
  return request({
    url: '/block/homepage/user/usersmineradd',
    method: 'post',
	header:{
		'Authorization':token
	},
	data
  })
}
// 节点监控 删除
export function userminerdelete(data,token) {
  return request({
    url: '/block/homepage/user/userminerdelete',
    method: 'post',
	header:{
		'Authorization':token
	},
	data
  })
}
// 节点监控 搜索
export function searchminerlist(data,token) {
  return request({
    url: '/block/homepage/user/searchminerlist',
    method: 'post',
	header:{
		'Authorization':token
	},
	data
  })
}
// 节点监控 编辑
// export function usermineredit(data,token) {
//   return request({
//     url: '/block/homepage/user/usermineredit',
//     method: 'post',
// 	header:{
// 		'Authorization':token
// 	},
// 	data
//   })
// }
// 个人用户监控
// export function usersminerlist(data,token) {
//   return request({
//     url: '/block/homepage/user/usersminerlist',
//     method: 'post',
// 	header:{
// 		'Authorization':token
// 	},
// 	data
//   })
// }
// export function usersmineredit(data,token) {
//   return request({
//     url: '/block/homepage/user/usersmineredit',
//     method: 'post',
// 	header:{
// 		'Authorization':token
// 	},
// 	data
//   })
// }

// 观察列表
export function usersmonitoradd(data,token) {
  return request({
    url: '/block/homepage/user/usersmonitoradd',
    method: 'post',
	header:{
		'Authorization':token
	},
	data
  })
}
// 观察列表
export function usersmonitorlist(data,token) {
  return request({
    url: '/block/homepage/user/usersmonitorlist',
    method: 'post',
	header:{
		'Authorization':token
	},
	data
  })
}
// 观察列表
// export function usersmonitoredit(data,token) {
//   return request({
//     url: '/block/homepage/user/usersmonitoredit',
//     method: 'post',
// 	header:{
// 		'Authorization':token
// 	},
// 	data
//   })
// }
// 观察列表
export function usersmonitordel(data,token) {
  return request({
    url: '/block/homepage/user/usersmonitordel',
    method: 'post',
	header:{
		'Authorization':token
	},
	data
  })
}

// 节点详情
export function usersminerwalletlist(data,token) {
  return request({
    url: '/block/homepage/user/usersminerwalletlist',
    method: 'post',
	header:{
		'Authorization':token
	},
	data
  })
}
// 节点详情
export function usersminerwalletedit(data,token) {
  return request({
    url: '/block/homepage/user/usersminerwalletedit',
    method: 'post',
	header:{
		'Authorization':token
	},
	data
  })
}

// 后台配置 硬件
export function listdefaultconfig(token) {
  return request({
    url: '/block/homepage/user/listdefaultconfig',
    method: 'GET',
	header:{
		'Authorization':token
	},
  })
}
// 后台配置 硬件
export function adddefaultconfig(data,token) {
  return request({
    url: '/block/homepage/user/adddefaultconfig',
    method: 'post',
	header:{
		'Authorization':token
	},
	data
  })
}
// 后台配置 硬件
export function editdefaultconfig(data,token) {
  return request({
    url: '/block/homepage/user/editdefaultconfig',
    method: 'post',
	header:{
		'Authorization':token
	},
	data
  })
}
// 后台配置 硬件
export function deletedefaultconfig(data,token) {
  return request({
    url: '/block/homepage/user/deletedefaultconfig',
    method: 'post',
	header:{
		'Authorization':token
	},
	data
  })
}
// 后台配置 大额
export function deviceall(token) {
  return request({
    url: '/block/homepage/user/deviceall',
    method: 'GET',
	header:{
		'Authorization':token
	},
  })
}
// 后台配置 大额
export function deviceadd(data,token) {
  return request({
    url: '/block/homepage/user/deviceadd',
    method: 'post',
	header:{
		'Authorization':token
	},
	data
  })
}
// 后台配置 大额
export function deviceedit(data,token) {
  return request({
    url: '/block/homepage/user/deviceedit',
    method: 'post',
	header:{
		'Authorization':token
	},
	data
  })
}
// 后台配置 大额
export function devicedelete(data,token) {
  return request({
    url: '/block/homepage/user/devicedelete',
    method: 'post',
	header:{
		'Authorization':token
	},
	data
  })
}
// 大额转账用户
export function getlistuserssendk(token) {
  return request({
    url: '/block/homepage/user/getlistuserssendk',
    method: 'GET',
	header:{
		'Authorization':token
	},
  })
}
export function addlistuserssendk(data,token) {
  return request({
    url: '/block/homepage/user/addlistuserssendk',
    method: 'post',
	header:{
		'Authorization':token
	},
	data
  })
}
export function editlistuserssendk(data,token) {
  return request({
    url: '/block/homepage/user/editlistuserssendk',
    method: 'post',
	header:{
		'Authorization':token
	},
	data
  })
}
export function deletelistuserssendk(data,token) {
  return request({
    url: '/block/homepage/user/deletelistuserssendk',
    method: 'post',
	header:{
		'Authorization':token
	},
	data
  })
}
// 大额转账用户搜索
export function getuserlist(data,token) {
  return request({
    url: '/block/homepage/user/getuserlist',
    method: 'post',
	header:{
		'Authorization':token
	},
	data
  })
}

// 批量转账
export function transferlist(data,token) {
  return request({
    url: '/block/homepage/user/transferlist',
    method: 'GET',
	header:{
		'Authorization':token
	},
	data
  })
}
export function transferadd(data,token) {
  return request({
    url: '/block/homepage/user/transferadd',
    method: 'post',
	header:{
		'Authorization':token
	},
	data
  })
}
export function transferdel(data,token) {
  return request({
    url: '/block/homepage/user/transferdel',
    method: 'post',
	header:{
		'Authorization':token
	},
	data
  })
}
export function walletsends(data,token) {
  return request({
    url: '/block/homepage/user/walletsends',
    method: 'post',
	header:{
		'Authorization':token
	},
	data
  })
}
export function walletsenslist(data,token) {
  return request({
    url: '/block/homepage/user/walletsenslist',
    method: 'GET',
	header:{
		'Authorization':token
	},
	data
  })
}

// 转账排行榜
export function transferleaderboard(data) {
  return request({
    url: '/block/homepage/user/transferleaderboard',
    method: 'GET',
    data
  })
}
// 富豪排行榜
export function getlistRichList(data) {
  return request({
    url: '/block/homepage/user/getlistRichList',
    method: 'post',
    data
  })
}
// 钱包查询
export function relationchart(data) {
  return request({
    url: '/block/homepage/user/relationchart',
    method: 'GET',
    data
  })
}
