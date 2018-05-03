import { ProjectList } from './actions'
import api from 'api/api'

const projectllist = ({status ,list}) =>({
	type : ProjectList.PROJECTLIST_GET_PROJECTLIST,
	status : status,
	list : list
});

export const GetProjectList = (obj)=>{
	return function(dispatch, getState){
		dispatch(projectllist({"list" : [] ,"status" : 'pending' }));
		api.FetchGet('/hyb-stu/stu_resume/project/list',obj).then((res) =>{
			res.data.prj_list.length ? 
				dispatch(projectllist({"list" : res.data.prj_list ,"status" : 'success' }))
				: dispatch(projectllist({"list" : [] ,"status" : 'nodata' }))
		},(res)=>{
			dispatch(projectllist({"list" : [] ,"status" : 'error' }));
		});
	}
}

export const SetProjectList = (obj ,callback ,callback2)=>{
	return function(dispatch, getState){
		api.FetchPost('/hyb-stu/stu_resume/project/add_update',obj).then(({res}) =>{
			const a = JSON.parse(obj.body);
			let newlist = getState().ProjectList.list;
			if(a.id){
				newlist.map((item)=>{
					if(item.id==a.id){
						item.project_name = a.project_name;
						item.duty = a.duty;
						item.start_time = a.start_time;
						item.end_time = a.end_time;
						item.project_url = a.project_url;
						item.project_desc = a.project_desc;
					}
				})
			}else{
				newlist = [res.data.prj_list[0]].concat(newlist);
			}
			dispatch(projectllist({"list" : newlist ,"status" : 'success' }));
			callback();
		},(res)=>{
			api.tip_msg('保存失败');
			callback2();
		});
	}
}

export const RemoveProjectList = (obj ,id ,itemid)=>{
	return function(dispatch, getState){
		api.FetchGet(`/hyb-stu/stu_resume/project/delete/${itemid}`,obj).then((res) =>{
			let list = getState().ProjectList.list;
			list.splice(id ,1);
			list.length ? dispatch(projectllist({"list" : list ,"status" : 'success' })) : dispatch(projectllist({"list" : list ,"status" : 'nodata' }));
		},(res)=>{
			api.tip_msg('删除失败');
		});
	}
}


