import { InternshipList } from './actions'
import api from 'api/api'

const internshipllist = ({status ,list}) =>({
	type : InternshipList.INTERNSHIPLIST_GET_INTERNSHIPLIST,
	status : status,
	list : list
});

export const GetInternShipList = (obj)=>{
	return function(dispatch, getState){
		dispatch(internshipllist({"list" : [] ,"status" : 'pending' }));
		api.FetchGet('/hyb-stu/stu_resume/intern/list',obj).then((res) =>{
			res.data.intern_list.length ? 
				dispatch(internshipllist({"list" : res.data.intern_list ,"status" : 'success' }))
				: dispatch(internshipllist({"list" : [] ,"status" : 'nodata' }))
		},(res)=>{
			dispatch(internshipllist({"list" : [] ,"status" : 'error' }));
		});
	}
}

export const SetInternShipList = (obj ,callback ,callback2)=>{
	return function(dispatch, getState){
		api.FetchPost('/hyb-stu/stu_resume/intern/add_update',obj).then(({res}) =>{
			const a = JSON.parse(obj.body);
			let newlist = getState().InternShipList.list;
			if(a.id){
				newlist.map((item)=>{
					if(item.id==a.id){
						item.ent_name = a.ent_name;
						item.position_name = a.position_name;
						item.start_time = a.start_time;
						item.end_time = a.end_time;
						item.intern_desc = a.intern_desc;
					}
				})
			}else{
				newlist = [res.data.intern_list[0]].concat(newlist);
			}
			dispatch(internshipllist({"list" : newlist ,"status" : 'success' }));
			callback();
		},(res)=>{
			api.tip_msg('保存失败');
			callback2();
		});
	}
}

export const RemoveInternShipList = (obj ,id ,itemid)=>{
	return function(dispatch, getState){
		api.FetchGet(`/hyb-stu/stu_resume/intern/delete/${itemid}`,obj).then((res) =>{
			let list = getState().InternShipList.list;
			list.splice(id ,1);
			list.length ? dispatch(internshipllist({"list" : list ,"status" : 'success' })) : dispatch(internshipllist({"list" : list ,"status" : 'nodata' }))
		},(res)=>{
			api.tip_msg('删除失败');
		});
	}
}


