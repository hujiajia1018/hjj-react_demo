let stateInit = {
	id : '',
	money : '',
	job : '',
	direction : '',
	status : '',
	list : []
}

const AboutMyJob = (state = stateInit ,action) =>{
	switch(action.type){
		case 'USER_SET_ABOUTMYJOB' :
			return Object.assign({}, state, action);
		case 'USER_GET_ABOUTMYJOBLIST' :
			return Object.assign({}, state, action);
		default : 
			return state;
	}
}

export default AboutMyJob;