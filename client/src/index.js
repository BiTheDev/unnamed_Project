import React from 'react';
//import ReactDOM from 'react-dom'
import {Provider} from 'react-redux';
//import {configureStore, applyMiddleware, compose} from 'redux';
import App from './App';
import './index.css';
import { configureStore,compose,applyMiddleware } from '@reduxjs/toolkit'
import { createRoot } from 'react-dom/client';
import thunk from 'redux-thunk';
import CombineReducers from './Reducers/CombineReducers';
const container = document.getElementById('root');
const root = createRoot(container);

const store = configureStore({reducer:CombineReducers},compose(applyMiddleware(thunk)));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
    //document.getElementById('root')
);