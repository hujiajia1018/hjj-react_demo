import { UserController } from './actions'
import { hashHistory } from 'react-router'
import api from 'api/api'

const login  = ({user ,token ,userKey}) => ({
	type : UserController.USERSTATE_LOGIN,
	user : user,
	userKey : userKey,
	token : token,
	isSignIn : true
})

export const Fetchlogin = (obj ,callback) =>{
	return function(dispatch, getState) {
		api.FetchPost('/hyb-stuuser/stu_user/login',obj).then(({res ,userKey}) =>{
			dispatch(login({"user": JSON.parse(obj.body).mobile ,"token":res.data.token ,"userKey":userKey}));
			api.setLocalStorage("token" ,res.data.token);
			api.setLocalStorage("mobile" ,JSON.parse(obj.body).mobile);
			
			hashHistory.push('/indexpage');
			/*查询求职意向*/
			/*api.FetchGet('/hyb-stu/stuCareer/career_object_list',{
				UserKey : userKey,
				token : res.data.token
			}).then((res)=>{
				res.data.list && res.data.list.length ? hashHistory.push('/indexpage') : hashHistory.push({pathname : '/myjob'});
			},()=>{
				hashHistory.push({pathname : '/myjob'});
			});*/
		},(res)=>{
			res.code==0 ? callback(res.data.message) : callback(res);
		});
	}
}