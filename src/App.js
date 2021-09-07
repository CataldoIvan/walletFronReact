import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/Header';
import Login from './components/login/Login';
import Body from './components/body/Body';
import useFetch from './hooks/useFetch';
import { useJwt } from "react-jwt";
import SingIn from './components/singIn/SingIn';
import Loading from './components/loading/Loading';


function App() {
  const [singIn, setSingIn] = useState(false);
  const [url, setUrl] = useState('');
  const [requestOptions, setRequestOptions] = useState('');
  const { loading, data, error } = useFetch(url, requestOptions);
  
  
  localStorage.setItem('token', data?.token ? data.token : localStorage.getItem('token'))
  
  const { decodedToken, isExpired } = useJwt(localStorage.getItem('token'));
  
  useEffect(() => {
    if(singIn){
      if(data?.error === undefined) {
        setSingIn(false)
      }
    }
  }, [data]);


  return (
    <div className="App">
      {loading ? <Loading/> : null}
      {isExpired ? singIn ? <SingIn setUrl={setUrl} setRequestOptions={setRequestOptions} setSingIn={setSingIn} loading={loading}/> 
      : <Login setUrl={setUrl} setRequestOptions={setRequestOptions} setSingIn={setSingIn} loading={loading}/> 
      : <Body /> }
    </div>
  );
}

export default App;
