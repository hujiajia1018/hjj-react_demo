import { WorkList } from './actions'
import api from 'api/api'

const worklist = ({status ,list}) =>({
	type : WorkList.WORKLIST_GET_WORKLIST,
	status : status,
	list : list
});

export const GetWorkList = (obj)=>{
	return function(dispatch, getState){
		dispatch(worklist({"list" : [] ,"status" : 'pending' }));
		api.FetchGet('/hyb-stu/stu_resume/works/list',obj).then((res) =>{
			res.data.works_list.length ? 
				dispatch(worklist({"list" : res.data.works_list ,"status" : 'success' }))
				: dispatch(worklist({"list" : [] ,"status" : 'nodata' }))
		},(res)=>{
			dispatch(worklist({"list" : [] ,"status" : 'error' }));
		});
	}
}

export const SetWorkList = (obj ,callback ,callback2)=>{
	return function(dispatch, getState){
		api.FetchPost('/hyb-stu/stu_resume/works/add_update',obj).then(({res}) =>{
			const a = JSON.parse(obj.body);
			let newlist = getState().WorkList.list;
			if(a.id){
				newlist.map((item)=>{
					if(item.id==a.id){
						item.url = a.url;
						item.work_desc = a.work_desc;
					}
				})
			}else{
				newlist = [res.data.works_list[0]].concat(newlist);
			}
			dispatch(worklist({"list" : newlist ,"status" : 'success' }));
			callback();
		},(res)=>{
			api.tip_msg('保存失败');
			callback2();
		});
	}
}

export const RemoveWorkList = (obj ,id ,itemid)=>{
	return function(dispatch, getState){
		api.FetchGet(`/hyb-stu/stu_resume/works/delete/${itemid}`,obj).then((res) =>{
			let list = getState().WorkList.list;
			list.splice(id ,1);
			list.length ? dispatch(worklist({"list" : list ,"status" : 'success' })) : dispatch(worklist({"list" : list ,"status" : 'nodata' }));
		},(res)=>{
			api.tip_msg('删除失败');
		});
	}
}


