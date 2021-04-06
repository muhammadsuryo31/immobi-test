import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js';
const axios = require('axios');
const baseUrl = 'http://localhost:3000/expenses'

function App() {
  
  const [category, setCategory] = useState('Transmission-Expenses')
  const [monthId, setMonthId] = useState('2020-11')
  const [target, setTarget] = useState(0)
  const [achievement, setAchievement] = useState(0)
  const [delta, setDelta] = useState(0)
  function categoryChange( event) {
      let input = event.target.value
      setCategory(input)
  }
  function monthChange( event) {
    let input = event.target.value
    setMonthId(input)
  }
  function submitter() {
    console.log(monthId);
        console.log(category);
        axios({
          method: "GET",
          url: `${baseUrl}?month_id=${monthId}&category=${category}`
        })
        .then (response => {
          console.log(response.data[0].target);
          setTarget(response.data[0].target)
          setAchievement(response.data[0].achievement)
          setDelta(response.data[0].achievement-response.data[0].target)
          console.log(target);
          console.log(achievement);
          console.log(delta);
        })
        .catch (err => {
          console.log('error di axios');
          console.log(err);
        })
        
  }
  return (
    
    <div className="App">
      <div style={{width: '300px'}}>
        <form>
        <h5>select category type</h5>
        <select className="form-select" aria-label="Default select example" onChange= {categoryChange}>
        <option value='Transmission-Expenses' defaultValue>Transmission Expenses</option>
        <option value="Power-Expenses">Power Expenses</option>
        <option value="Radio-Frequency-Usage">Radio Frequency Usage</option>
      </select>
      <h5>select Month</h5>
        <select className="form-select" aria-label="Default select example" onChange= {monthChange}>
        <option value='2020-11' defaultValue>2020-11</option>
        <option value='2020-12' >2020-12</option>
        <option value='2021-01' >2021-01</option>
        <option value='2021-02' >2021-02</option>
      </select>
      <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mt-4" type="button" onClick ={ submitter }>Submit</button>
        </form>
      </div>
      <div>
        <Plot
          data={[
            // {
            //   x: ['target', 'target + Delta', 'achievement'],
            //   y: [target, delta, achievement],
            //   type: 'scatter',
            //   mode: 'markers',
            //   marker: {color: 'yellow'},
            // },
            {type: 'bar', x: ['target', 'target & Delta', 'achievement'], y: [target, target, 0], name: 'Target'},
            {type: 'bar', x: ['target', 'target & Delta', 'achievement'], y: [0, delta, 0], name: 'Delta'},
            {type: 'bar', x: ['target', 'target & Delta', 'achievement'], y: [0, 0, achievement], name: 'achievment'}
          ]}
          layout={{width: 700, height: 550, title: 'Expenses Plot', barmode: 'stack'}}
        />
      </div>
    </div>
  );
}

export default App;
