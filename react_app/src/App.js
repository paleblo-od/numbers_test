import React, { useEffect, useState } from 'react';
import Home from "./pages/home/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Link } from "react-router-dom";
import './/pages/home/home.scss'
import Widget from '../src/components/widget/Widget'
import Feature from '../src/components/feature/Feature'
import Chart from '../src/components/chart/Chart'

function App() {
  const [appState, setAppState] = useState({
    loading: false,
    repos: null,
  });

  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:5000/api/users/register';
    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos) => {
        setAppState({ loading: true, repos: repos });
      });
  }, [setAppState]);


  var resp = appState.repos
  console.log(resp)
  if (!appState.loading) return (<b> Загрузка</b>);
    return (
    <div className="home">
        <div className="homeContainer">
          <div className='widgets' >
            <Widget type='orders' response={resp.counts}/>
            <Widget type='earnings' response ={resp.usd}/>
            <Widget type='balance' response ={resp.rub}/>
          </div>
          <div className="charts">
            <Feature response ={resp.feature}/>
            <Chart response ={resp.chart}/>
          </div>
        </div>
    </div>
    );
}
export default App;


