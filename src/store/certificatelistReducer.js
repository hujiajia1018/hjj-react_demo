let stateInit = {
	status : '',
	list : []
}

const CertificateList = (state = stateInit ,action) =>{
	switch(action.type){
		case 'CERTIFICATELIST_GET_CERTIFICATELIST' :
			return Object.assign({}, state, action);
		default : 
			return state;
	}
}

export default CertificateList;