let stateInit = {
	status : '',
	cityid : '',
	companylist : [],
	keywords : '',
	maxpage : '',
	pagestatus : '',
	page : 1
}

const SearchCompany = (state = stateInit ,action) =>{
	switch(action.type){
		case 'COMPANY_SEARCH_COMPANYRESULTS' :
			return Object.assign({}, state, action);
		case 'COMPANY_SEARCHUPDATE_COMPANYRESULTS' : 
			return state = {
				companylist : state.companylist.concat(action.companylist),
				cityid : action.cityid,
				status : action.status,
				maxpage : action.maxpage,
				pagestatus : action.pagestatus,
				keywords : action.keywords,
				page : action.page
			};
		default : 
			return state;
	}
}

export default SearchCompany;