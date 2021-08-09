import React from 'react'
import Loading from '../Loading/Loading.jsx'

function Results(props) {
  return (
    <section>
    <pre data-testid="renderedData">{props.data ? JSON.stringify(props.data, undefined, 2) : <Loading/>}</pre>
  </section>
  )
}

export default Results