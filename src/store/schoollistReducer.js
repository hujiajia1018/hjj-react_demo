let stateInit = {
	status : '',
	list : []
}

const SchoolList = (state = stateInit ,action) =>{
	switch(action.type){
		case 'SCHOOLLIST_GET_SCHOOLLIST' :
			return Object.assign({}, state, action);
		default : 
			return state;
	}
}

export default SchoolList;