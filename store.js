import { createStore,combineReducers } from "redux";



function woreducer (state={},action){
switch(action.type){
case 'edit':{
	let result  = {}
	result = JSON.parse(JSON.stringify(state));	
	result[action.table] = action.payload
	return result
}

default:
return state
}
}

const store = createStore(combineReducers({woreducer}))


export default store;
