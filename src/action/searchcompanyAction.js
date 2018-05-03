import { SearchResults } from './actions'
import { hashHistory } from 'react-router'
import api from 'api/api'

const SearchResultsCompany = ({status ,cityid ,companylist ,keywords ,maxpage ,pagestatus ,page}) =>({
	type : SearchResults.COMPANY_SEARCH_COMPANYRESULTS,
	status,
	cityid,
	companylist,
	keywords,
	maxpage,
	pagestatus,
	page
});

const SearchResultsUpdate = ({status ,cityid ,companylist ,keywords ,maxpage ,pagestatus ,page}) =>({
	type : SearchResults.COMPANY_SEARCHUPDATE_COMPANYRESULTS,
	status,
	cityid,
	companylist,
	keywords,
	maxpage,
	pagestatus,
	page
});

export const GetSearchResultsCompany = (obj)=>{
	return function(dispatch, getState){
		hashHistory.push({pathname : '/searchresult'});
		dispatch(SearchResultsCompany({ "companylist" : [] ,"cityid" : JSON.parse(obj.body).city ,"status" : 'pending' ,"maxpage" : 0 ,"pagestatus" : '' ,"keywords" : JSON.parse(obj.body).ent_name ,"page" : 1 }));
		api.FetchPost('/hyb-stu/stu_ent/search_ent',obj).then(({res}) =>{
			if(res.data.ent_list.length){
				setTimeout(()=>{
					dispatch(SearchResultsCompany({ "page" : JSON.parse(obj.body).page.page ,"cityid" : JSON.parse(obj.body).city ,"companylist" : res.data.ent_list ,"keywords" : JSON.parse(obj.body).ent_name ,"status" : 'succsee' ,"maxpage" : res.data.total , "pagestatus" : 'succsee' }));
				},800);
			}else{
				dispatch(SearchResultsCompany({ "page" : JSON.parse(obj.body).page.page ,"status" : 'nodata' ,"maxpage" : res.data.total ,"pagestatus" : 'succsee' ,"cityid" : JSON.parse(obj.body).city ,"companylist" : [] ,"keywords" : JSON.parse(obj.body).ent_name }))
			}
		},(res)=>{
			dispatch(SearchResultsCompany({ "page" : JSON.parse(obj.body).page.page ,"status" : 'error' ,"maxpage" : res.data.total ,"pagestatus" : 'succsee' ,"cityid" : JSON.parse(obj.body).city ,"companylist" : [] ,"keywords" : JSON.parse(obj.body).ent_name }));
		});
	}
}

export const ClearSearchResultsCompany = ()=>{
	return function(dispatch, getState){
		dispatch(SearchResultsCompany({ "companylist" : [] ,"cityid" : '' ,"status" : '' ,"maxpage" : 0 ,"pagestatus" : '' ,"keywords" : '' }));
	}
}

export const UpdateSearchResultsCompany = (obj)=>{
	return function(dispatch, getState){
		dispatch(SearchResultsUpdate({ "page" : JSON.parse(obj.body).page.page ,"companylist" : [] ,"cityid" : JSON.parse(obj.body).city ,"status" : 'succsee' ,"maxpage" : 0 ,"pagestatus" : 'pending' ,"keywords" : JSON.parse(obj.body).ent_name }));
		api.FetchPost('/hyb-stu/stu_ent/search_ent',obj).then(({res}) =>{
			if(res.data.ent_list.length){
				setTimeout(()=>{
					dispatch(SearchResultsUpdate({ "page" : JSON.parse(obj.body).page.page ,"cityid" : JSON.parse(obj.body).city ,"companylist" : res.data.ent_list ,"keywords" : JSON.parse(obj.body).ent_name ,"status" : 'succsee' ,"maxpage" : res.data.total , "pagestatus" : 'succsee' }));
				},2800);
			}else{
				dispatch(SearchResultsUpdate({ "page" : JSON.parse(obj.body).page.page ,"status" : 'succsee' ,"maxpage" : res.data.total ,"pagestatus" : 'succsee' ,"cityid" : JSON.parse(obj.body).city ,"companylist" : [] ,"keywords" : JSON.parse(obj.body).ent_name }));
			}
		},(res)=>{
			dispatch(SearchResultsUpdate({ "page" : JSON.parse(obj.body).page.page ,"status" : 'error' ,"maxpage" : res.data.total ,"pagestatus" : 'succsee' ,"cityid" : JSON.parse(obj.body).city ,"companylist" : [] ,"keywords" : JSON.parse(obj.body).ent_name }));
		});
	}
}