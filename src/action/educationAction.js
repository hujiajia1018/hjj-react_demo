import { EducationList } from './actions'
import api from 'api/api'

const eductionlist = ({status ,list}) =>({
	type : EducationList.EDUCATION_GET_EDUCATIONLIST,
	status : status,
	list : list
});

export const GetEducationList = (obj)=>{
	return function(dispatch, getState){
		dispatch(eductionlist({"list" : [] ,"status" : 'pending' }));
		api.FetchGet('/hyb-stu/stu_resume/edu_background/list',obj).then((res) =>{
			res.data.edu_list.length ? 
				dispatch(eductionlist({"list" : res.data.edu_list ,"status" : 'success' }))
				: dispatch(eductionlist({"list" : [] ,"status" : 'nodata' }))
		},(res)=>{
			dispatch(eductionlist({"list" : [] ,"status" : 'error' }));
		});
	}
}

export const SetEducationList = (obj ,callback ,callback2)=>{
	return function(dispatch, getState){
		api.FetchPost('/hyb-stu/stu_resume/edu_background/add_update',obj).then(({res}) =>{
			const a = JSON.parse(obj.body);
			let newlist = getState().EducationList.list;
			if(a.id){
				newlist.map((item)=>{
					if(item.id==a.id){
						item.graduated_from = a.graduated_from;
						item.edu_level = a.edu_level;
						item.dept_level = a.dept_level;
						item.dept_level_name = a.dept_level_name;
						item.enrollment_date = a.enrollment_date;
						item.graduated_date = a.graduated_date;
						item.duty = a.duty;
					}
				})
			}else{
				newlist = [res.data.edu_list[0]].concat(newlist);
			}
			dispatch(eductionlist({"list" : newlist ,"status" : 'success' }));
			callback();
		},(res)=>{
			callback2();
			api.tip_msg('保存失败');
		});
	}
}

export const RemoveEducationList = (obj ,id ,itemid)=>{
	return function(dispatch, getState){
		api.FetchGet(`/hyb-stu/stu_resume/edu_background/delete/${itemid}`,obj).then((res) =>{
			let list = getState().EducationList.list;
			list.splice(id ,1);
			list.length ? dispatch(eductionlist({"list" : list ,"status" : 'success' })) : dispatch(eductionlist({"list" : list ,"status" : 'nodata' }));
		},(res)=>{
			api.tip_msg('删除失败');
		});
	}
}


