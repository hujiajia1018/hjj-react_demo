import { CompanyList } from './actions'
import api from 'api/api'

const companylist  = ({company_size ,industry_belong ,period ,companyList ,status ,maxpage ,pagestatus ,cityid ,page ,citydatabase}) => ({
	type : CompanyList.COMPANY_GET_COMPANYLIST,
	companyList : companyList,
	status : status,
	maxpage : maxpage,
	pagestatus : pagestatus,
	cityid : cityid,
	page : page,
	citydatabase : citydatabase,
	company_size,
	industry_belong,
	period
})
const clearcompanylist  = ({company_size ,industry_belong ,period ,companyList ,status ,maxpage ,pagestatus ,cityid ,citydatabase ,page}) => ({
	type : CompanyList.COMPANY_CLEAR_COMPANYLIST,
	companyList : companyList,
	status : status,
	maxpage : maxpage,
	pagestatus : pagestatus,
	cityid : cityid,
	citydatabase : citydatabase,
	page : page,
	company_size,
	industry_belong,
	period
})

export const clearCompanyList = () =>{ 
	return function(dispatch, getState){
		dispatch(clearcompanylist({ "company_size" : [] ,"industry_belong" : [] ,"period" : [] ,"companyList" : [] ,"status" : '' ,"maxpage" : 0 ,"pagestatus" : '' ,"cityid" : '' ,"citydatabase" : getState().Company.citydatabase ,"page" : 1 }));
	}
}

export const FetchCompanyList = (obj) =>{
	return function(dispatch, getState){
		const pagesize = JSON.parse(obj.body).page.page,
			  citydatabase = JSON.parse(obj.body).citydatabase,
			  cityid = JSON.parse(obj.body).city,
			  company_size = JSON.parse(obj.body).company_size,
			  industry_belong = JSON.parse(obj.body).industry_belong,
			  period = JSON.parse(obj.body).period,
			  pagestatus = pagesize > 1 ? 'pending' : '',
			  status = pagesize==1 ? 'pending' : 'succsee';

		dispatch(companylist({ "citydatabase" : citydatabase ,"page" : pagesize ,"companyList" : [] ,"status" : status ,"maxpage" : 0 ,"pagestatus" : pagestatus ,"cityid" : cityid }));
		api.FetchPost('/hyb-stu/stu_ent/search',obj).then(({res ,userKey}) =>{
			if(res.data.ent_list.length){
				let onlive = [] ,nolive = [] ,newlist = [];
				newlist = res.data.ent_list;

				for(let index of newlist.keys()){
					if(newlist[index].status==1){
						onlive = onlive.concat(newlist[index]);
					}else{
						nolive = nolive.concat(newlist[index]);
					}
				}
				onlive = onlive.concat(nolive);
				setTimeout(()=>{ 
					dispatch(companylist({ "period" : period ,"industry_belong" : industry_belong ,"company_size" : company_size ,"citydatabase" : citydatabase ,"page" : pagesize ,"companyList" : onlive ,"status" : 'succsee' ,"maxpage" : res.data.total , "pagestatus" : 'succsee' ,"cityid" : cityid }));
				},500);
			}else{
				pagesize==1 ? dispatch(companylist({ "period" : period ,"industry_belong" : industry_belong ,"company_size" : company_size ,"citydatabase" : citydatabase ,"page" : pagesize ,"status" : 'nodata' ,"companyList" : [] ,"maxpage" : res.data.total , "pagestatus" : 'succsee' ,"cityid" : cityid }))
					: dispatch(companylist({ "period" : period ,"industry_belong" : industry_belong ,"company_size" : company_size ,"citydatabase" : citydatabase ,"page" : pagesize ,"status" : 'succsee' ,"companyList" : [] ,"maxpage" : res.data.total , "pagestatus" : 'succsee' ,"cityid" : cityid }))
			}
		},(res)=>{
			pagesize==1 && dispatch(companylist({ "period" : period ,"industry_belong" : industry_belong ,"company_size" : company_size ,"citydatabase" : citydatabase ,"page" : pagesize ,"status" : 'error' ,"companyList" : [] ,"maxpage" : res.data.total , "pagestatus" : 'succsee' ,"cityid" : cityid }));
		});
	}
}
