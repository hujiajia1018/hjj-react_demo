import { CompanyDetail } from './actions'
import api from 'api/api'

const detail = ({status ,entInfo ,entDetail ,entPhotoList ,onlive}) =>({
	type : CompanyDetail.COMPANY_GET_COMPANYDETAIL,
	status : status,
	entInfo : entInfo,
	entDetail : entDetail,
	entPhotoList : entPhotoList,
	onlive : onlive
});

const position = ({positionstatus ,positionList})=>({
	type : CompanyDetail.COMPANY_GET_STUDENTPOSITION,
	positionstatus : positionstatus,
	positionList : positionList
});

const talk = ({talkstatus ,talkList})=>({
	type : CompanyDetail.COMPANY_GET_TALK,
	talkstatus : talkstatus,
	talkList : talkList
});

const setfollow = ({follow})=>({
	type : CompanyDetail.COMPANY_SET_FOLLOW,
	follow : follow
})

export const SetUserFollow = (obj)=>{
	return function(dispatch, getState){
		api.FetchPost('/hyb-stu/stu_ent/ent_follow',obj).then(({res}) =>{
			if(res.data.success){
				if(!JSON.parse(obj.body).status){
					dispatch(setfollow({ "follow" : 0 }));
					api.tip_msg('取消收藏','fixedmode');
				}else{
					dispatch(setfollow({ "follow" : 1 }));
					api.tip_msg('收藏成功','fixedmode');
				}
			}
		});
	}
}

export const Talk =(obj ,id)=>{
	return function(dispatch, getState){
		dispatch(talk({ "talkstatus" : 'pending' ,"talkList" : '' }));
		api.FetchGet(`/hyb-stu/stu_ent/talk/${id}`,obj).then((res) =>{
			setTimeout(()=>{
				dispatch(talk({ "talkstatus" : 'succsee' ,"talkList" : res.data.talk_list }));
			},500);
		},(res)=>{
			dispatch(talk({ "talkstatus" : 'error' ,"talkList" : [] }));
		});
	}
}

export const StuPosition =(obj)=>{
	return function(dispatch, getState){
		dispatch(position({ "positionstatus" : 'pending' ,"positionList" : '' }));
		api.FetchPost('/hyb-stu/stu_ent/search_position',obj).then(({res}) =>{
			setTimeout(()=>{
				dispatch(position({ "positionstatus" : 'succsee' ,"positionList" : res.data.position_list }));
			},500);
		},(res)=>{
			dispatch(position({ "positionstatus" : 'error' ,"positionList" : '' }));
		});
	}
}

export const GetCompanyDetail = (obj ,id)=>{
	return function(dispatch, getState){
		dispatch(detail({ "entInfo" : '' ,"entDetail" : '' ,"entPhotoList" : '', "follow" : '' ,"status" : 'pending' }));
		api.FetchGet(`/hyb-stu/stu_ent/ent/${id}`,obj).then((res) =>{
			let comdetail = res.data.ent_detail;
			comdetail.substring = api.substring(res.data.ent_detail.company_desc ,130 ,'.....');
			setTimeout(()=>{
				dispatch(detail({"onlive" : res.data.onlive ,"entInfo" : res.data.ent_info ,"entDetail" : comdetail ,"entPhotoList" : res.data.ent_photo_list ,"status" : 'succsee' }));
				dispatch(setfollow({ "follow" : res.data.follow }));
			},500);
		},(res)=>{
			dispatch(detail({ "entInfo" : '' ,"entDetail" : '' ,"entPhotoList" : '', "follow" : '' ,"status" : 'error' }));
		});
	}
}