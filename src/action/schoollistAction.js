import { SchoolList } from './actions'
import api from 'api/api'

const schoollist = ({status ,list}) =>({
	type : SchoolList.SCHOOLLIST_GET_SCHOOLLIST,
	status : status,
	list : list
});

export const GetSchoolList = (obj)=>{
	return function(dispatch, getState){
		dispatch(schoollist({"list" : [] ,"status" : 'pending' }));
		api.FetchGet('/hyb-stu/stu_resume/campus/list',obj).then((res) =>{
			res.data.campus_list.length ? 
				dispatch(schoollist({"list" : res.data.campus_list ,"status" : 'success' }))
				: dispatch(schoollist({"list" : [] ,"status" : 'nodata' }))
		},(res)=>{
			dispatch(schoollist({"list" : [] ,"status" : 'error' }));
		});
	}
}

export const SetSchoolList = (obj ,callback ,callback2)=>{
	return function(dispatch, getState){
		api.FetchPost('/hyb-stu/stu_resume/campus/add_update',obj).then(({res}) =>{
			const a = JSON.parse(obj.body);
			let newlist = getState().Schoollist.list;
			if(a.id){
				newlist.map((item)=>{
					if(item.id==a.id){
						item.activity_name = a.activity_name;
						item.duty_role = a.duty_role;
						item.start_time = a.start_time;
						item.end_time = a.end_time;
						item.experience = a.experience;
					}
				})
			}else{
				newlist = [res.data.campus_list[0]].concat(newlist);
			}
			dispatch(schoollist({"list" : newlist ,"status" : 'success' }));
			callback();
		},(res)=>{
			api.tip_msg('保存失败');
			callback2();
		});
	}
}

export const RemoveSchoolList = (obj ,id ,itemid)=>{
	return function(dispatch, getState){
		api.FetchGet(`/hyb-stu/stu_resume/campus/delete/${itemid}`,obj).then((res) =>{
			let list = getState().Schoollist.list;
			list.splice(id ,1);
			list.length ? dispatch(schoollist({"list" : list ,"status" : 'success' })) : dispatch(schoollist({"list" : list ,"status" : 'nodata' }));
		},(res)=>{
			api.tip_msg('删除失败');
		});
	}
}


