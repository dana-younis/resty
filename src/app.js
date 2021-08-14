import React from 'react';
import './app.scss';
import axios from 'axios';
import { useState, useEffect, useReducer } from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Form from './components/form/form';
import History from './components/history/history';
import Results from './components/results/results';

const initialState = {
  history: [],
};

function historyReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'ADD-TO-HISTORY':
      const history = [...state.history, payload.history];
      return { history };
    default:
      return state;
  }
}

function historyAction(history) {
  return {
    type: 'ADD-TO-HISTORY',
    payload: { history },
  };
}

function App() {
  const [state, dispatch] = useReducer(historyReducer, initialState);
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
        count: 2,
        method: data.method,
        results: [
          { name: 'fake thing 1', url: 'http://fakethings.com/1' },
          { name: 'fake thing 2', url: 'http://fakethings.com/2' },
        ],
      };
      setData(data);
      dispatch(historyAction(requestParams.url, requestParams.method, data));
    } else {
      const result = await axios[requestParams.method](requestParams.url);
      const data = {
        headers: result.headers,
        count: result.data.count,
        results: result.data.results,
      };
      setData(data);
      dispatch(historyAction(requestParams.url, requestParams.method, data));
    }
  }, [requestParams]);

  function callApi(requestParams, requestBody) {
    // mock output
    setRequestParams(requestParams);
    setRequestBody(requestBody);
    dispatch(historyAction(requestParams));
  }
  function historyfunc(result) {
    setData(result);
    dispatch(historyAction(result));
  }
 
  return (
    <>
      <Header />
      <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div>
      <Form handleApiCall={callApi} />
      {history && <History historyfunc={historyfunc} history={state.history} />}
      <Results data={data} />
      <Footer />
    </>
  );
}
export default App;
