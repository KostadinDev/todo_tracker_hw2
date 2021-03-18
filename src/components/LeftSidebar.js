// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import ListLink from './ListLink'
import AddBox from '@material-ui/icons/AddBox';
import ToDoList from './ToDoList'

class LeftSidebar extends Component {
    constructor(props) {
        super(props);
    }

    handleAddNewList = () => {
        this.props.addNewListCallback();
    }

    handleLoadList = (event, list) => {
      console.log(list, 'here')
      this.props.loadToDoListCallback(list);
  }
    render() {
        return (
          <div id="left-sidebar">
            <div id="left-sidebar-header" className="section-header">
              <span >Todolists</span>
              <span class="left-sidebar-controls" id="add-undo-redo-box">
                {!this.props.loaded?   <AddBox
                  id="add-list-button"
                  className="material-icons todo_button highlight"
                  onClick={this.handleAddNewList}
                />: ""}
             
              </span>
            </div>
  
            <div id="todo-lists-list" className = "left-sidebar-header-text">
              {this.props.toDoLists.map((toDoList,index) => (
                <ToDoList name = {toDoList.name}
                loadToDoListCallback={this.props.loadToDoListCallback}
                listy = {toDoList}
                updateLists = {this.props.updateLists}
                idx = {index}/>
                // <ListLink
                //   key={Math.random().toString(36).substr(2, 9)}
                //   toDoList={toDoList} // PASS THE LIST TO THE CHILDREN
                //   loadToDoListCallback={this.props.loadToDoListCallback}
                //   firstId={this.props.firstId}
                //   updateLists={this.props.updateLists}
                // /> // PASS THE CALLBACK TO THE CHILDREN
              ))}
            </div>
          </div>
        );
    }
}

export default LeftSidebar;