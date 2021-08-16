import React from 'react';
import axios from 'axios';
function History(props) {
    function historyfunc(result) {
        setData(result);
        dispatch(historyAction(result));
      }
      
    

    


  return (
    <div>
      <ul>
        {props.history.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => {
      
                props.historyfunc(item,index);
              }}
            >
              {item.method} {item.url}
            </li>
          );
        })}
      </ul>
    </div>
  );
    }
export default History;
