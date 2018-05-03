import { PositionList } from './actions'
import api from 'api/api'

const positionList = ({database ,city ,company_size_types ,industries ,period_types ,edu_level ,time_sort ,salary_sort ,page ,list ,status ,maxpage}) => ({
	type : PositionList.POSITION_GET_POSITIONLIST,
	page,
	list,
	status,
	maxpage,
	city,
	company_size_types,
	industries,
	period_types,
	edu_level,
	time_sort,
	salary_sort,
	database
});

const clearpositionList = ({database ,city ,company_size_types ,industries ,period_types ,edu_level ,time_sort ,salary_sort ,page ,list ,status ,maxpage}) => ({
	type : PositionList.POSITION_CLEAR_POSITIONLIST,
	page,
	list,
	status,
	maxpage,
	city,
	company_size_types,
	industries,
	period_types,
	edu_level,
	time_sort,
	salary_sort,
	database
});

export const FetchPositionList = (obj) =>{
	return function(dispatch, getState){
		const page = JSON.parse(obj.body).page.page,
			  city = JSON.parse(obj.body).city,
			  company_size_types = JSON.parse(obj.body).company_size_types,
			  industries = JSON.parse(obj.body).industries,
			  period_types = JSON.parse(obj.body).period_types,
			  edu_level = JSON.parse(obj.body).edu_level,
			  time_sort = api.isNumber(JSON.parse(obj.body).time_sort) ? JSON.parse(obj.body).time_sort : '',
			  salary_sort = api.isNumber(JSON.parse(obj.body).salary_sort) ? JSON.parse(obj.body).salary_sort : '',
			  database = obj.database;

		dispatch(positionList({ "database" : database ,"city" : city ,"company_size_types" : company_size_types ,"industries" : industries ,"period_types" : period_types ,"edu_level" : edu_level ,"time_sort" : time_sort ,"salary_sort" : salary_sort,"page" : page ,"list" : [] ,"status" : 'pending' ,"maxpage" : 0 }));
		api.FetchPost('/hyb-stu/stu_position/search',obj).then(({res})=>{
			setTimeout(()=>{ 
				res.data.position_list.length ? dispatch(positionList({ "database" : database ,"city" : city ,"company_size_types" : company_size_types ,"industries" : industries ,"period_types" : period_types ,"edu_level" : edu_level ,"time_sort" : time_sort ,"salary_sort" : salary_sort ,"page" : page ,"list" : res.data.position_list ,"status" : 'success' ,"maxpage" : res.data.page.total }))
				: dispatch(positionList({ "database" : database ,"city" : city ,"company_size_types" : company_size_types ,"industries" : industries ,"period_types" : period_types ,"edu_level" : edu_level ,"time_sort" : time_sort ,"salary_sort" : salary_sort ,"page" : page ,"status" : "nodata" ,"list" : [] ,"maxpage" : 0 })); 
			},800);
		},(res)=>{
			console.log(res)
			dispatch(positionList({ "database" : database ,"city" : city ,"company_size_types" : company_size_types ,"industries" : industries ,"period_types" : period_types ,"edu_level" : edu_level ,"time_sort" : time_sort ,"salary_sort" : salary_sort ,"page" : page ,"status" : "error" ,"maxpage" : 0 }));
		});	
	}
}

export const clearPositionList = () =>{
	return function(dispatch, getState){ 
		dispatch(clearpositionList({ "database" : {} ,"city" : getState().Position.city ,"company_size_types" : [] ,"industries" : [] ,"period_types" : [] ,"edu_level" : [] ,"time_sort" : 0 ,"salary_sort" : '' ,"list" : [] ,"status" : '' ,"maxpage" : 0 ,"page" : 1 }));
	}
}