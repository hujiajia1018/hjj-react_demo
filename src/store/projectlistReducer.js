let stateInit = {
	status : '',
	list : []
}

const ProjectList = (state = stateInit ,action) =>{
	switch(action.type){
		case 'PROJECTLIST_GET_PROJECTLIST' :
			return Object.assign({}, state, action);
		default : 
			return state;
	}
}

export default ProjectList;