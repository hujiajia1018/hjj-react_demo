import React, { Component } from 'react'
import { render } from 'react-dom'
import RouterConfig from 'router/routerConfig'
import { Router ,hashHistory } from 'react-router'
import { createStore ,applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './store'

const store = createStore(reducer ,applyMiddleware(thunk));

render(
	<Provider store={store}> 
		<Router history={hashHistory} routes={RouterConfig} />
	</Provider>,
	document.getElementById('root')
);
