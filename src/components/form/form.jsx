

import './form.scss';

import { useState,useEffect } from 'react';

function Form(props) {
  let [showPostTextArea,setShowPostTextArea] = useState(false);
  let [method, methodFunc] = useState('get');
  let [url, urlFunc] = useState("https://pokeapi.co/api/v2/pokemon");
  let [requestBody, setRequestBody] = useState("https://pokeapi.co/api/v2/pokemon");


  function handleSubmit(e){
    e.preventDefault();
    const Data1 = {
      method:method,
      url:url
    };
    props.handleApiCall(Data1, requestBody);
  }

  function handlePostTextArea(e){
    setShowPostTextArea(!showPostTextArea);
    methodFunc(e.target.id);  
  }

  function setMethod(e){
    methodFunc(e.target.id);
  }

  function handleUrl(e){
    urlFunc(e.target.value);
  }

  function handleRequestBody(e){
    setRequestBody(e.target.value);
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label >
        <span>URL: </span>
        <input name='url' type='text' onChange={handleUrl} />
        <button type="submit" data-testid="submit">GO!</button>
      </label>
      <label className="methods">
        <span id="get" onClick={setMethod}>GET</span>
        <span id="post" onClick={handlePostTextArea}>POST</span>
        <span id="put" onClick={handlePostTextArea}>PUT</span>
        <span id="delete" onClick={setMethod}>DELETE</span>
      </label>
      {showPostTextArea && <textarea name="postAndPut" rows="5" cols="20" onChange={handleRequestBody}/>}
    </form>
  </>
  )
}

export default Form