import React from 'react';
import Loading from '../Loading/Loading.jsx';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

function Results(props) {
  return (
    <section>
    { props.data ?<><h2>Headers</h2><JSONPretty  data={props.data.headers}></JSONPretty><h2>Result</h2><JSONPretty data-testid="renderedData" data={props.data.results}></JSONPretty></>  :  <Loading/>}
  </section>
  )
}

export default Results