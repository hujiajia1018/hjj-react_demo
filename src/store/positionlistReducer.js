let stateInit = {
	status : '',
	list : [],
	page : 1,
	maxpage : 0,
	city : '',
	company_size_types : [],
	industries : [],
	period_types : [],
	edu_level : [],
	time_sort : 0,
	salary_sort : '',
	database : {}
}

const PositionList = (state = stateInit ,action) =>{
	switch(action.type){
		case 'POSITION_GET_POSITIONLIST' : 
			return state = {
				status : action.status,
				list :  state.list.concat(action.list),
				page : action.page,
				maxpage : action.maxpage,
				city : action.city,
				company_size_types : action.company_size_types,
				industries : action.industries,
				period_types : action.period_types,
				edu_level : action.edu_level,
				time_sort : action.time_sort,
				salary_sort : action.salary_sort,
				database : action.database
			}
		case 'POSITION_CLEAR_POSITIONLIST' :
			return state = {
				status : action.status,
				list : action.list,
				page : action.page,
				maxpage : action.maxpage,
				city : action.city,
				company_size_types : action.company_size_types,
				industries : action.industries,
				period_types : action.period_types,
				edu_level : action.edu_level,
				time_sort : action.time_sort,
				salary_sort : action.salary_sort,
				database : action.database
			}
		default : 
			return state
	}
}

export default PositionList;