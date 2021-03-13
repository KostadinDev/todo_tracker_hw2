// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';

class Workspace extends Component {
  constructor(props) {
    super(props);
  }

 
  render() {
    return (
      <div id="workspace">
        <div id="todo-list-header-card" className="list-item-card">
          <div id="task-col-header" className=" todo-button item-input">
            Task
          </div>
          <div id="date-col-header" className="todo-button item-input">
            Due Date
          </div>
          <div id="status-col-header" className=" todo-button item-input">
            Status
          </div>
          <div
            className=""
            display="flex"
            flexDirection="row"
            flexWrap="nowrap"
          >
            <Undo
              id="undo-button"
              className="list-item-control material-icons todo-button"
              onClick = {this.props.undo}
            />
            <Redo
              id="redo-button"
              className="list-item-control material-icons todo-button"
            />
            <AddBox
              id="add-item-button"
              className="list-item-control material-icons todo-button"
              onClick = {this.props.addItem}
            />
            <Delete
              id="delete-list-button"
              className="list-item-control material-icons todo-button"
              onClick={this.props.delete}
            />
            <Close
              id="close-list-button"
              className="list-item-control material-icons todo-button"
              onClick = {this.props.close}
            />
          </div>
        </div>
        <div id="todo-list-items-div">
          {this.props.toDoListItems.map((toDoListItem) => (
            <ToDoItem
              key={toDoListItem.id}
              toDoListItem={toDoListItem} // PASS THE ITEM TO THE CHILDREN
              updateList={this.props.updateList}
            />
          ))}
        </div>
        <br />
      </div>
    );
  }
}

export default Workspace;