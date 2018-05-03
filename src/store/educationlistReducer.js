let stateInit = {
	status : '',
	list : []
}

const EducationList = (state = stateInit ,action) =>{
	switch(action.type){
		case 'EDUCATION_GET_EDUCATIONLIST' :
			return Object.assign({}, state, action);
		default : 
			return state;
	}
}

export default EducationList;