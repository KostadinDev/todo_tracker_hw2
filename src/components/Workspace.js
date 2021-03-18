// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';
import { ThreeSixty } from '@material-ui/icons';

class Workspace extends Component {
  constructor(props) {
    super(props);
  }

 
  render() {
      let availability = this.props.toDoListItems.length == 0? 'unavailable': 'available';
      console.log(availability);
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
             {this.props.tps.hasTransactionToUndo()?   <Undo
              id="undo-button"
              className="list-item-control material-icons highlight todo-button"
              onClick = {this.props.undo}
            />:  <Undo
            id="undo-button"
            className="list-item-control material-icons highlight disable todo-button"
            onClick = {this.props.undo}
          />}
          
             {this.props.tps.hasTransactionToRedo()?  <Redo
              id="redo-button"
              className="list-item-control material-icons highlight todo-button"
              onClick = {this.props.redo}
            />:  <Redo
            id="redo-button"
            className="list-item-control material-icons highlight disable todo-button"
            onClick = {this.props.redo}
          />}
           
            
        
             {this.props.loaded==true?     <AddBox
              id="add-item-button"
              className="list-item-control material-icons highlight todo-button"
              onClick = {this.props.addItem}
            />: <AddBox
            id="add-item-button"
            className="list-item-control material-icons highlight disable todo-button"
            onClick = {this.props.addItem}
          />}
               {this.props.loaded==true?   <Delete
              id="delete-list-button"
              className="list-item-control material-icons highlight todo-button"
              onClick={this.props.handleClickOpen}
            />: <Delete
            id="delete-list-button"
            className="list-item-control material-icons highlight todo-button disable"
            onClick={this.props.handleClickOpen}
          />}
          
            {this.props.loaded==true? <Close
              id={"close-list-button highlight " + availability}
              className="list-item-control material-icons highlight todo-button"
              onClick = {this.props.close}
            />: <Close
            id={"close-list-button highlight " + availability}
            className="list-item-control material-icons highlight todo-button disable"
            onClick = {this.props.close}
          />}
          
          </div>
        </div>
        <div id="todo-list-items-div">
          {this.props.toDoListItems.map((toDoListItem, index) => (
            <ToDoItem
              key={toDoListItem.id}
              toDoListItem={toDoListItem} // PASS THE ITEM TO THE CHILDREN
              updateList={this.props.updateList}
              submitForm = {this.props.submitForm}
              idx = {index}
              len ={this.props.toDoListItems.length}
            />
          ))}
        </div>
        <br />
      </div>
    );
  }
}

export default Workspace;