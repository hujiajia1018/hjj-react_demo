let stateInit = {
	status : '',
	list : []
}

const WorkList = (state = stateInit ,action) =>{
	switch(action.type){
		case 'WORKLIST_GET_WORKLIST' :
			return Object.assign({}, state, action);
		default : 
			return state;
	}
}

export default WorkList;