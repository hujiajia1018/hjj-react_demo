import { DeliveryList } from './actions'
import api from 'api/api'

const delivery = ({status ,list ,maxpage ,page}) =>({
	type : DeliveryList.DELIVERY_GET_DELIVERYLIST,
	status,
	list,
	maxpage,
	page
});

const cleardelivery = ({status ,list ,maxpage ,page}) =>({
	type : DeliveryList.DELIVERY_CLEAR_DELIVERYLIST,
	status,
	list,
	maxpage,
	page
});

export const GetDeliveryList = (obj)=>{
	return function(dispatch, getState){
		const page = JSON.parse(obj.body).page;
		dispatch(delivery({"list" : [] ,"status" : 'pending' ,'maxpage' : 0 ,"page" : page}));
		api.FetchPost('/hyb-stu/stu_position/position_submit/list' ,obj).then(({res})=>{
			setTimeout(()=>{
				res.data.position_list.length ? dispatch(delivery({"list" : res.data.position_list ,"status" : 'success' ,'maxpage' : res.data.total ,"page" : page}))
				: dispatch(delivery({"list" : [] ,"status" : 'nodata' ,'maxpage' : res.data.total ,"page" : page}));
			},500);
		},(res)=>{
			dispatch(delivery({ "list" : [] ,"status" : 'erro' ,"maxpage" : 0 ,"page" : page}));
		});
	}
}

export const ClearDeliveryList = ()=>{
	return function(dispatch, getState){
		dispatch(cleardelivery({"list" : [] ,"status" : '' ,'maxpage' : 0 ,"page" : 1}));
	}
}