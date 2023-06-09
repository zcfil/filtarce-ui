export function conversion(str) {
    for (var i=1;i<=4;i++) {
		if(str<1024&&str>-1024) {
			str=str+".000 GB"
			return str
		}
  		if(str/(1024**i)<1&&str/(1024**i)>-1) {
			if(i==2){
  			    str=(str/1024).toFixed(3)+" TB"
  			}else if(i==3){
  				str=(str/1024/1024).toFixed(3)+" PB"
  			}else if(i==4){
  				str=(str/1024/1024/1024).toFixed(3)+" EB"
  			}
  			return str
  		}
    }
}
export function moneyFormat(str) {
  if (str != undefined) {
    return Number(str).toFixed(2).toString();
  }
}
export function money(str) {
  if (str != undefined) {
    return str.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
}
// 日期格式化
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
