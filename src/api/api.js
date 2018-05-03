import 'isomorphic-fetch'
import { hashHistory } from 'react-router'
import { ajaxurl ,showday ,zhiwei ,zhuanye ,city } from './config'
import md5 from 'blueimp-md5'

/*window.addEventListener("online", function(){
    console.log("浏览器连上了网络");
});

window.addEventListener("offline", function(){
    console.log("浏览器未连上了网络");
});*/

function checkStatus(response){
	if(response.status >= 200 && response.status < 600) {
		if(response.headers.get('SET_UNIQUE_KEY')){
			api.userKey = response.headers.get('SET_UNIQUE_KEY');
			api.setLocalStorage("userKey" ,response.headers.get('SET_UNIQUE_KEY'));
		}else{
			api.userKey = window.localStorage.getItem('userKey');
		}
		return response.json();
	}else{
		var error = new Error(response.statusText);
		error.response = response;
		throw error;
	}
}

const setfetchParams = (TYPE ,defaultparams = {})=>{ 
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("UNIQUE_KEY", defaultparams.UserKey ? defaultparams.UserKey : window.localStorage.getItem('userKey') ? window.localStorage.getItem('userKey') : '');
	myHeaders.append("TOKEN", defaultparams.token ? defaultparams.token : window.localStorage.getItem('token') ? window.localStorage.getItem('token') : '');
	return TYPE=="POST" ? { method : TYPE, headers: myHeaders, body : defaultparams.body }
		: { method : TYPE, headers: myHeaders };
}

function noscroll(event){
	event.preventDefault();
	event.stopPropagation();
}

const api = {
	userKey : '',
	savewebviewfn : '',
	appzhibo : '',
	FetchPost : (url ,defaultparams = {})=>{
		const params = setfetchParams('POST' ,defaultparams);
		return new Promise((resolve, reject) =>{
			fetch(ajaxurl + url ,params).then(checkStatus).then((res)=>{
				res.code==0 ? res.data.success ? resolve({"res":res ,"userKey":api.userKey}) : reject(res) : reject(res);
			}).catch((e)=>{ reject({"reason" : '服务器错误'}); }); 
		})
	},
	FetchGet : (url ,defaultparams = {})=>{
		const params = setfetchParams('GET' ,defaultparams);
		return new Promise((resolve, reject) =>{
			fetch(ajaxurl + url ,params).then(checkStatus).then(res => {
				res.code==0 ? res.data.success ? resolve(res) : reject(res) : reject(res);
			}).catch((e)=>{ reject({"reason" : '服务器错误'}); });
		})
	},
	getTarget : (target ,selector)=>{
		return target.tagName.toLowerCase()!=selector ? target.parentNode : target;
	},
	closest(el, selector) {
		const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
		while (el) {
			if (matchesSelector.call(el, selector)) {
				return el;
			}else{
				el = el.parentElement;
			}
		}
		return null;
	},
	isNumber(n){
		return !isNaN(parseFloat(n)) && isFinite(n);  
	},
	updataStorage : (type ,newval)=>{
		let history = api.getLocalStorage(type);
		if(history){
			history = history.split(',');
			const index = history.findIndex((value, index, arr)=>{
					return value==newval
			});
			if(index!=-1){
				let newhisory = [].concat(history);
				newhisory.splice(index ,1);
				history = [newval].concat(newhisory);
			}else{
				history = [newval].concat(history);
			}
		}else{
			history = [newval];
		}
		api.setLocalStorage(type ,history.join(','));
		return history;
	},
	setLocalStorage : (type ,obj)=>{
		window.localStorage.setItem(type, obj);
	},
	getLocalStorage : (key)=>{
		return window.localStorage.getItem(key);
	},
	isPhoneNumberTest : (val)=>{
		return /^1\d{10}$/.test(val);
	},
	isTestImgCode : (val)=>{
		return /^[0-9a-zA-Z]{5}$/.test(val);
	},
	isPhoneMsgNumber : (val)=>{
		return /^[0-9]{6}$/.test(val);
	},
	isEmail : (val)=>{
		return /^([a-zA-Z0-9_-])+@[a-z0-9]+[.][a-zA-Z]+$/.test(val);
	},
	tip_msg : (msg ,mode)=>{
		const tip = document.createElement("div"),
			tipcontent = document.createElement('div');
		tip.classList.add('tip');
		mode && tip.classList.add('fixedmode');
		tipcontent.classList.add('tipcontent');
		tipcontent.textContent = msg;
		tip.appendChild(tipcontent);
		document.body.appendChild(tip);
		tipcontent.classList.add('show');
		setTimeout(function(){
			tip.remove();
		},1000);
	},
	getOffset : (el)=>{
		const box = el.getBoundingClientRect();
		return {
			top: box.top + window.pageYOffset - document.documentElement.clientTop,
			left: box.left + window.pageXOffset - document.documentElement.clientLeft
		}
	},
	getelwh : (el)=>{
		return{
			w : el.getBoundingClientRect().width,
			h : el.getBoundingClientRect().height
		}
	},
	showdaytext : (time)=>{
		const upday = new Date(time.replace(/-/g,"/")).getTime() - new Date().getTime();
		const hours = Math.abs(Math.floor((upday % (24*3600*1000))/(3600*1000)));
		const day = Math.abs(Math.floor(upday/(24*3600*1000)));

		const t1 = time.split(' ');
		const t2 = `${t1[0].split('-')[1]}月${t1[0].split('-')[2]}日`;
		if(hours<=3 && day==1){
			return `${hours}小时前`;
		}else if(hours<=6 && day==1){
			return t1[1];
		}else{
			return t2;
		}
	},
	showmorecity(text ,citystring){
		let cityarray = [];
		if(citystring){
			citystring.split(',').map((item)=>{
				cityarray.push(city[item]);
			});
			if(cityarray.length==1){
				return `${text}${cityarray[0]}`;
			}else{
				return `${text}${cityarray[0]}等${cityarray.length}个城市`
			}
		}else{
			return '';
		}
	},
	getcitylist(citystring){
		let citylist = [];
		if(citystring){
			citystring.split(',').map((item)=>{
				citylist.push(city[item]);
			})
		}
		return citylist.join(' ');
	},
	isEmptyObject(obj){
		return Object.keys(obj).length === 0;
	},
	getzhiweiname :(val)=>{
		if(val){
			if(new String(val).length > 6){
				return zhiwei[val.substring(0,3)].children[val.substring(0,6)].children[val].name;
			}else{
				return zhiwei[val.substring(0,3)].children[val].name;
			}
		}
	},
	getzhuanyename :(val)=>{
		if(val){
			let a = val.split(',') ,name = [];
			for(let i=0;i<a.length;i++){
				if(zhuanye[a[i].substring(0,3)].children[a[i]]){
					name.push(zhuanye[a[i].substring(0,3)].children[a[i]].name);
				}
			}
			return name.join(',');
		}
	},
	substring : (des ,num ,mark)=>{
		if(des && des.length > num){
			return `${des.substring(0,num)}${mark}`;
		}else{
			return des;
		}
	},
	lock : ()=>{
		document.querySelectorAll('body')[0].classList.add('noscoll');
		document.addEventListener("touchmove",noscroll,false);
	},
	unlock : ()=>{
		document.querySelectorAll('body')[0].classList.remove('noscoll');
		document.removeEventListener("touchmove",noscroll);
	},
	setmd5 : (val)=>{
		return md5(val);
	},
	msstatus : (key)=>{
		if(key==7 || key==11 || key==14){
			return true;
		}else{
			return false;
		}
	},
	webview : (actiontype ,callback)=>{
		let hidden = document.getElementById("app-hidden-div");
		if(hidden){
			document.body.removeChild(hidden);
		} 
		hidden = document.createElement("div");
		hidden.id = "app-hidden-div";
		hidden.style.display = "none";
		let iframe = document.createElement("iframe");
		iframe.src = `yaocaibaoservice://${actiontype}`;
		iframe.style.display = "none";
		hidden.appendChild(iframe);
		document.body.appendChild(hidden);
		setTimeout(()=>{ hidden.remove() },0);
		if(callback){
			api.savewebviewfn = callback;
		} 
		return false;
	},
	roller : (a ,b)=>{
		let key = '' ;
		b.map(function(item ,index){
			if(parseInt(item)==a){
				key = index;
			}
		});
		if(key>4){
			const left = b.slice(key - 4 , key);
			const right = b.slice(key);
			const right2 = b.slice(0 ,key - 4 );
			return left.concat(right ,right2);
		}else if(key<4){
			const chaval = 4 - key;
			const left = b.splice(b.length - chaval ,chaval);
			return left.concat(b);
		}else{
			return b;
		}
	},
	getsalary : (min ,max)=>{
		if(min==0 && max==20){
			return '面议';
		}else{
			return `${min}k-${max}k`;
		}
	},
	settime : (oldtime)=>{
		if(oldtime){
			let time = oldtime.replace(/-/g,'\/') ,minu = new Date(time).getMinutes().toString().length==1 ? `0${new Date(time).getMinutes()}` : new Date(time).getMinutes();
			return `${new Date(time).getMonth()+1}月${new Date(time).getDate()}日 ${new Date(time).getHours()}:${minu}`;
		}
	},
	damping : (value)=>{
	    const step = [20, 40, 60, 80, 100];
	    const rate = [0.5, 0.4, 0.3, 0.2, 0.1];

	    let scaleedValue = value;
	    let valueStepIndex = step.length;

	    while (valueStepIndex--) {
	        if (value > step[valueStepIndex]) {
	            scaleedValue = (value - step[valueStepIndex]) * rate[valueStepIndex];
	            for (let i = valueStepIndex; i > 0; i--) {
	                scaleedValue += (step[i] - step[i - 1]) * rate[i - 1];
	            }
	            scaleedValue += step[0] * 1;
	            break;
	        }
	    }
	    return scaleedValue;
	},
	mergeobj : (obj)=>{
		let newobj = {};
		Object.keys(obj).map((key ,index)=>{
			if(!newobj[key]){
				newobj[key] = {};
				newobj[key].full = obj[key].full;
				newobj[key].batch_list = [];
			}
			let timeobj = {};
			for(let i=0;i<obj[key].batch_list.length;i++){
				if(!timeobj[obj[key].batch_list[i].start_date]){
					timeobj[obj[key].batch_list[i].start_date] = [];
				}
				timeobj[obj[key].batch_list[i].start_date].push(obj[key].batch_list[i]);
			}
			for(let item in timeobj){
				let len = timeobj[item].length ,array = [];
				for(let i=0;i<len;i++){
					if(i+1<=len-1){
						timeobj[item][0].full = timeobj[item][0].full+','+timeobj[item][i+1].full;
						timeobj[item][0].id = timeobj[item][0].id +','+timeobj[item][i+1].id;
					}
				}
				newobj[key].batch_list.push(timeobj[item][0]);
			}
		});
		return newobj;
	},
	substringObj(obj ,from ,to){
		let array = {};
		Object.keys(obj).map((key ,index ,val)=>{
			if(to){
				if(from <= index && to >= index+1){
					if(!array[key]){
						array[key] = {};
					}
					array[key] = obj[key];
				}
			}else{
				if(from <= index){
					if(!array[key]){
						array[key] = {};
					}
					array[key] = obj[key];
				}
			}
		});
		return array;
	}
}

window.webviewCallbackfn = (webviewObj)=>{
	if(webviewObj){
		api.savewebviewfn(JSON.parse(webviewObj));
		//api.savewebviewfn = '';
		const actiontype = "comesback?param={\"result\":\""+webviewObj+"\"}";
		api.webview(actiontype);
	}
}

export default api;