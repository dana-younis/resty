import React from 'react';
import './app.scss';
import axios from 'axios';
import { useState, useEffect, useReducer } from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Form from './components/form/form';
import History from './components/history/history';
import Results from './components/results/results';
const initialState = [];

function historyReducer(history = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'ADD-TO-HISTORY':
      console.log(history);
      history = [...history, payload];
      return history;
    default:
      return history;
  }
}
function addToHistory(url, method, result) {
  return {
    type: 'ADD-TO-HISTORY',
    payload: {
      url,
      method,
      result,
    },
  };
}
function App() {
  const [history, dispatch] = useReducer(historyReducer, initialState);
  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});
  const [requestBody, setRequestBody] = useState({});

  useEffect(async () => {
    setData(null);
    if (requestBody) {
      const result = await axios[requestParams.method](
        requestParams.url,
        JSON.parse(requestBody)
      );
      const data = {
        headers: result.headers,
        count: result.data.count,
        results: result.data.results,
      };
      setData(data);
      dispatch(addToHistory(requestParams.url, requestParams.method, data));
    } else {
      const result = await axios[requestParams.method](requestParams.url);
      const data = {
        headers: result.headers,
        count: result.data.count,
        results: result.data.results,
      };
      setData(data);
      dispatch(addToHistory(requestParams.url, requestParams.method, data));
    }
  }, [requestParams]);

  function callApi(requestParams, requestBody) {
    // mock output
    setRequestParams(requestParams);
    setRequestBody(requestBody);
  }
  function historyFunc(result) {
    setData(result);
  }
  return (
    <>
      <Header />
      <div className="divs">Request Method: {requestParams.method}</div>
      <div className="divs">URL: {requestParams.url}</div>
      <Form handleApiCall={callApi} />
      {history && <History historyFunc={historyFunc} history={history} />}
      <Results data={data} />
      <Footer />
     
    </>
  );
}
export default App;
