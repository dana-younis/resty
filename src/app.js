import React from 'react';
import './app.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Form from './components/form/form';
import Results from './components/results/results';

function App() {
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
    } else {
      const result = await axios[requestParams.method](requestParams.url);
      const data = {
        headers: result.headers,
        count: result.data.count,
        results: result.data.results,
      };
      setData(data);
    }
  }, [requestParams]);

  function callApi(requestParams, requestBody) {
    // mock output
    setRequestParams(requestParams);
    setRequestBody(requestBody);
  }
  return (
    <>
      <Header />
      <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div>
      <Form handleApiCall={callApi} />
      <Results data={data} />
      <Footer />
    </>
  );
}
export default App;
