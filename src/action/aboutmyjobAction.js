import { AboutMyJobController } from './actions'
import { hashHistory } from 'react-router'
import api from 'api/api'

const job = ({id ,expect_salary ,user_position ,user_industry ,status})=>({
	type : AboutMyJobController.USER_SET_ABOUTMYJOB,
	id : id,
	money : expect_salary,
	job : user_position,
	direction : user_industry,
	status : status
});

const joblist = ({status ,list})=>({
	type : AboutMyJobController.USER_GET_ABOUTMYJOBLIST,
	status : status,
	list : list
});

export const FetchSetMyJob = (obj ,callback)=>{
	return function(dispatch, getState){ 
		api.FetchPost('/hyb-stu/stuCareer/insert_modify_career',obj).then(({res ,userKey}) =>{
			let newlist = getState().AboutMyJob.list ,a = JSON.parse(obj.body);
			if(a.id){
				newlist.map((item)=>{
					if(item.id==a.id){
						item.expect_salary = a.expect_salary;
						item.user_industry = a.user_industry;
						item.position_type_id = a.user_position;
					}
				});
				dispatch(job(Object.assign({}, a, {"status":'success'})));
			}else{
				newlist = [res.data.data].concat(newlist);
				dispatch(joblist({ "status" : "success" ,"list" : newlist }));
			}
			typeof callback=='function' && callback();
		},(res)=>{
			typeof callback=='function' && callback(res.data.message);
		});
	}
}

export const FetchGetMyJob =(obj)=>{
	return function(dispatch, getState){
		api.FetchGet('/hyb-stu/stuCareer/find_career_objective',obj).then((res) =>{ 
			//dispatch(job({ "status" : "success" ,"id" : res.data.data.id ,"expect_salary" : res.data.data.expect_salary ,"user_position" : res.data.data.position_type_id ,"user_industry": res.data.data.user_industry }));
		});
	}
}

export const SetMyJob = (obj ,id ,fn)=>{
	return function(dispatch, getState){
		api.FetchGet(`/hyb-stu/stuCareer/set_default/${id}`,obj).then((res) =>{
			dispatch(job(Object.assign({}, JSON.parse(obj.body), {"status":'success'})));
			typeof fn=='function' && fn();
		});
	}
}

export const GetMyJobList = (obj)=>{
	return function(dispatch, getState){
		dispatch(joblist({ "status" : "pending" ,"list" : [] }));
		api.FetchGet('/hyb-stu/stuCareer/career_object_list' ,obj).then((res)=>{
			res.data.list.length ?
				dispatch(joblist({ "status" : "success" ,"list" : res.data.list }))
			: dispatch(joblist({ "status" : "nodata" ,"list" : [] }));
		},(res)=>{
			dispatch(joblist({ "status" : "error" ,"list" : [] }));
		})
	}
}

export const RemoveJob = (obj)=>{
	return function(dispatch, getState){
		api.FetchGet(`/hyb-stu/stuCareer/delete/${obj.id}`,obj).then((res)=>{
			dispatch(job({
				id : res.data.data.id,
				expect_salary : res.data.data.expect_salary,
				user_position : res.data.data.position_type_id,
				user_industry : res.data.data.user_industry,
				status : 'success'
			}));
			let list = getState().AboutMyJob.list ,newlist = [];
			if(list.length){
				list.map((item)=>{
					if(item.id!=obj.id){
						newlist.push(item);
					}
				})
				dispatch(joblist({ "status" : "success" ,"list" : newlist }));
			}
		},(res)=>{
			api.tip_msg('删除失败');
		})
	}
}