let server_url=process.env.NODE_ENV === 'development' ? 'http://103.44.239.120:8161' : 'http://103.44.239.120:8161' ; //环境配置
// let server_url=process.env.NODE_ENV === 'development' ? 'http://103.44.239.120:8161' : 'http://103.44.239.120:4653' ; //环境配置
function service(options = {}) {
	options.url = `${server_url}${options.url}`;
    return new Promise((resolved, rejected) => {
                //成功
        options.success = (res) => {
            if (Number(res.data.code) == 200) {  //请求成功
                resolved(res.data);
			}else if (Number(res.data.code) == 401) {
				sessionStorage.removeItem('token');
				uni.redirectTo({url:"/pages/account/account?key=login"});
			} else {
                uni.showToast({
                    icon: 'none',   
                    duration: 3000,
                    title: `${res.data.msg}`
                });
                rejected(res.data.msg);//错误
            }
        }
              //错误
        options.fail = (err) => {
            rejected(err); //错误
        }
        uni.request(options);
    });
}
export default service;