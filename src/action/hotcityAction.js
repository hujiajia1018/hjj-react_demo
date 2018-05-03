import { HotCityList } from './actions'
import api from 'api/api'

const hot = ({status ,citylist}) =>({
	type : HotCityList.HOTCITY_GET_HOTCITYLIST,
	status : status,
	citylist : citylist
});

export const GetHotCity = (obj)=>{
	return function(dispatch, getState){
		dispatch(hot({"citylist" : [] ,"status" : 'pending' }));
		api.FetchGet('/hyb-stu/stu_ent/pinyin_position_cities',obj).then((res) =>{
			res.data.cities.length ? 
				setTimeout(()=>{dispatch(hot({"citylist" : res.data.cities ,"status" : 'succsee' }));},500)
				: dispatch(hot({"citylist" : [] ,"status" : 'nodata' }));
		},(res)=>{
			dispatch(hot({"citylist" : [] ,"status" : 'error' }));
		});
	}
}