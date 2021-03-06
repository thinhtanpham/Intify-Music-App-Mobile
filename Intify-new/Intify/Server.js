import React, {Component} from 'react';
import api from './api';

const apiGet = 'http://localhost:3002'; //http://192.168.0.124:3002  //http://10.0.0.100:3002

const getListMusics = async () => {
  try {
    const response = await fetch('http://'+ api +':3002');
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export default getListMusics;
