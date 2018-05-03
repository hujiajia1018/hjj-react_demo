let stateInit = {
	companyList : [],
	status : '',
	maxpage : '',
	pagestatus : '',
	cityid : '',
	page : 1,
	citydatabase : {},
	company_size : [],
	industry_belong : [],
	period : []
}

const CompanyList = (state = stateInit ,action) =>{
	switch(action.type){
		case 'COMPANY_GET_COMPANYLIST' : 
			return state = {
				companyList : state.companyList.concat(action.companyList),
				status : action.status,
				maxpage : action.maxpage,
				pagestatus : action.pagestatus,
				cityid : action.cityid,
				page : action.page,
				citydatabase : action.citydatabase,
				company_size : action.company_size,
				industry_belong : action.industry_belong,
				period : action.period
			}
		case 'COMPANY_CLEAR_COMPANYLIST' :
			return state = {
					companyList : [],
					status : '',
					maxpage : '',
					pagestatus : '',
					cityid : '',
					page : action.page,
					citydatabase : action.citydatabase,
					company_size : action.company_size,
					industry_belong : action.industry_belong,
					period : action.period
			}
		default : 
			return state
	}
}

export default CompanyList;