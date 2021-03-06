import React from 'react';


const ToDoList = (props) =>{
    let highlight = props.idx == 0 ? "toplist" : "";
    console.log(highlight, " sdd")
    return (
      <div
        className={"todo-list-button " + highlight}
        onClick={(event) => {
          console.log(props.listy, "ehm");
          props.loadToDoListCallback(props.listy);
        }}
      >
        {props.idx == 0 ? (
          <input
            type="text"
            value={props.name}
            onChange={props.updateLists}
            className="list-input top"
          ></input>
        ) : (
          <div> {props.name}</div>
        )}
      </div>
    );
} 
export default ToDoList;