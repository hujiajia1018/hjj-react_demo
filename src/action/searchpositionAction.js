import { SearchPositionResults } from './actions'
import api from 'api/api'

const positionList = ({position_name ,city ,company_size_types ,industries ,period_types ,edu_level ,time_sort ,salary_sort ,page ,list ,status ,maxpage}) => ({
	type : SearchPositionResults.POSITION_SEARCH_POSITIONRESULTS,
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
	position_name
});

const clearpositionList = ({position_name ,city ,company_size_types ,industries ,period_types ,edu_level ,time_sort ,salary_sort ,page ,list ,status ,maxpage}) => ({
	type : SearchPositionResults.POSITION_SEARCHCLEAR_POSITIONLIST,
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
	position_name
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
			  position_name = JSON.parse(obj.body).position_name;

		dispatch(positionList({ "position_name" : position_name ,"city" : city ,"company_size_types" : company_size_types ,"industries" : industries ,"period_types" : period_types ,"edu_level" : edu_level ,"time_sort" : time_sort ,"salary_sort" : salary_sort ,"page" : page ,"list" : [] ,"status" : 'pending' ,"maxpage" : 0 }));
		api.FetchPost('/hyb-stu/stu_position/search_position' ,obj).then(({res})=>{
			const maxpage = res.data.page.total;
			setTimeout(()=>{
				res.data.position_list.length ? dispatch(positionList({ "position_name" : position_name ,"city" : city ,"company_size_types" : company_size_types ,"industries" : industries ,"period_types" : period_types ,"edu_level" : edu_level ,"time_sort" : time_sort ,"salary_sort" : salary_sort ,"page" : page ,"list" : res.data.position_list ,"status" : 'success' ,"maxpage" : maxpage }))
				: dispatch(positionList({ "position_name" : position_name ,"city" : city ,"company_size_types" : company_size_types ,"industries" : industries ,"period_types" : period_types ,"edu_level" : edu_level ,"time_sort" : time_sort ,"salary_sort" : salary_sort ,"page" : page ,"list" : [] ,"status" : 'nodata' ,"maxpage" : maxpage }));
			},800);
		},()=>{
			dispatch(positionList({ "position_name" : position_name ,"city" : city ,"company_size_types" : company_size_types ,"industries" : industries ,"period_types" : period_types ,"edu_level" : edu_level ,"time_sort" : time_sort ,"salary_sort" : salary_sort ,"page" : page ,"list" : [] ,"status" : 'error' ,"maxpage" : 0 }));
		});
	}
}

export const clearPositionList = () =>{
	return function(dispatch, getState){
		dispatch(clearpositionList({ "position_name" : '' ,"city" : getState().Position.city ,"company_size_types" : [] ,"industries" : [] ,"period_types" : [] ,"edu_level" : [] ,"time_sort" : 0 ,"salary_sort" : '' ,"list" : [] ,"status" : '' ,"maxpage" : 0 ,"page" : 1 }));
	}
}