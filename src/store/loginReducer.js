let stateInit = {
	user : '',
	userKey : '',
	token : '',
	isSignIn : false
}

const UserState = (state = stateInit ,action) =>{
	switch(action.type){
		case 'USERSTATE_LOGIN' :
			return Object.assign({}, state, action);
		default : 
			return state
	}
}

export default UserState;