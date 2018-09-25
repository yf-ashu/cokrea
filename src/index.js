import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.scss';
import Layout from './js/Layout';

const wrapper = document.getElementById('App');
wrapper ? ReactDOM.render(<Layout />, wrapper) : false;
