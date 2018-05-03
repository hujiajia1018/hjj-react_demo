let stateInit = {
	status : '',
	list : []
}

const InternShipList = (state = stateInit ,action) =>{
	switch(action.type){
		case 'INTERNSHIPLIST_GET_INTERNSHIPLIST' :
			return Object.assign({}, state, action);
		default : 
			return state;
	}
}

export default InternShipList;