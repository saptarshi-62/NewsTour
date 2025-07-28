//import logo from './logo.svg';
import './App.css';
import NavBar from "./components/NavBar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";

import React,{useState} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App =()=> {
  const pageSize=24;
  const apiKey=process.env.REACT_APP_NEWS_API;
  const[progress,setProgress]=useState(0)
  
  
    return (
      
      <Router>
          <div>
        <NavBar/>
        <LoadingBar
        height={3}
        color="#f11946"
        progress={progress}
      />
        {/*<News setProgress={setProgress} pageSize={pageSize} country="us" category='science'/>*/}
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="us" category='general'/>}></Route>
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="us" category='business'/>}></Route>
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="us" category='entertainment'/>}></Route>
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="us" category='general'/>}></Route>
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="us" category='health'/>}></Route>
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="us" category='science'/>}></Route>
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="us" category='sports'/>}></Route>
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="us" category='technology'/>}></Route>
        </Routes>
        </div>
      </Router>
      
    )
  }

export default App;