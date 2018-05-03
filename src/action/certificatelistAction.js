import { CertificateList } from './actions'
import api from 'api/api'

const certificatelist = ({status ,list}) =>({
	type : CertificateList.CERTIFICATELIST_GET_CERTIFICATELIST,
	status : status,
	list : list
});

export const GetCertificatelist = (obj)=>{
	return function(dispatch, getState){
		dispatch(certificatelist({"list" : [] ,"status" : 'pending' }));
		api.FetchGet('/hyb-stu/stu_resume/cert/list',obj).then((res) =>{
			res.data.cert_list.length ? 
				dispatch(certificatelist({"list" : res.data.cert_list ,"status" : 'success' }))
				: dispatch(certificatelist({"list" : [] ,"status" : 'nodata' }))
		},(res)=>{
			dispatch(certificatelist({"list" : [] ,"status" : 'error' }));
		});
	}
}

export const SetCertificatelist = (obj ,callback ,callback2)=>{
	return function(dispatch, getState){
		api.FetchPost('/hyb-stu/stu_resume/cert/add_update',obj).then(({res}) =>{
			const a = JSON.parse(obj.body);
			let newlist = getState().CertificateList.list;
			if(a.id){
				newlist.map((item)=>{
					if(item.id==a.id){
						item.cert_name = a.cert_name;
					}
				})
			}else{
				newlist = [res.data.cert_list[0]].concat(newlist);
			}
			dispatch(certificatelist({"list" : newlist ,"status" : 'success' }));
			callback();
		},(res)=>{
			api.tip_msg('保存失败');
			callback2();
		});
	}
}

export const RemoveCertificatelist = (obj ,id ,itemid)=>{
	return function(dispatch, getState){
		api.FetchGet(`/hyb-stu/stu_resume/cert/delete/${itemid}`,obj).then((res) =>{
			let list = getState().CertificateList.list;
			list.splice(id ,1);
			list.length ? dispatch(certificatelist({"list" : list ,"status" : 'success' })) : dispatch(certificatelist({"list" : list ,"status" : 'nodata' }));
		},(res)=>{
			api.tip_msg('删除失败');
		});
	}
}


