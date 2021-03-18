// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';
import { Fragment } from "react";
import { MDBBtn, MDBIcon } from "mdbreact";
class ToDoItem extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " did mount");
    }

    handleTask = (event) =>{
            console.log(this.props.updateList)
            console.log(event)
    }

    getInverseStatus(status){

        return status == "complete" ? "incomplete" : "complete";
    }

    handleSubmit = (event) =>{
      event.preventDefault();
      this.props.submitForm.bind(this);
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem render");
        let listItem = this.props.toDoListItem;
        let statusType = "complete";
        if (listItem.status === "incomplete")
            statusType = "incomplete";
        console.log("INDEX: ",this.props.index)
        return (
          <div id={"todo-list-item-" + listItem.id} className="list-item-card">
            {/* <div className='item-col task-col'>{listItem.description}</div> */}

            <input
              id={"description-" + listItem.id}
              type="text"
              className="item-input"
              name="task"
              onChange={this.props.updateList}
              value={listItem.description}
            />

            <input
              id={"due_date-" + listItem.id}
              type="date"
              className="item-input"
              name="date"
              onChange={this.props.updateList}
              value={listItem.due_date}
            />

            {/* <div className="item-col due-date-col">{listItem.due_date}</div> */}

            <select
              id={"status-" + listItem.id}
              className={statusType}
              name="status"
              onChange={this.props.updateList}
              value={listItem.status}
            >
              <option className="option">complete</option>
              <option className="option">incomplete</option>
            </select>

            {/* <div className="item-col status-col" className={statusType}>
              {listItem.status}
            </div> */}
            <div className="">
              <KeyboardArrowUp
                id={"arrowUp-" + listItem.id}
                onClick={this.props.updateList}
                className="list-item-control highlight todo-button inv"
              />
              <KeyboardArrowUp
                id={"arrowUp-" + listItem.id}
                onClick={this.props.updateList}
                className="list-item-control highlight todo-button inv"
              />
              {!(this.props.idx == 0) ? (
                <MDBIcon
                icon="angle-down"
                size="lg"
                  id={"arrowUp-" + listItem.id}
                  onClick={this.props.updateList}
                  className="highlight todo-button bttns"
                />
              ) : (
                <MDBIcon
                icon="angle-down"
                size="lg"
                  id={"arrowUp-" + listItem.id}
                  onClick={this.props.updateList}
                  className=" highlight todo-button disable bttns"
                />
              )}
              {this.props.idx != this.props.len - 1 ? (
                <MDBIcon
                  icon="angle-up"
                  size="lg"
                  id={"arrowDown-" + listItem.id}
                  onClick={this.props.updateList}
                  className=" highlight todo-button bttns"
                />
              ) : (
                <MDBIcon
                  icon="angle-up"
                  size="lg"
                  id={"arrowDown-" + listItem.id}
                  onClick={this.props.updateList}
                  className=" highlight todo-button disable bttns "
                />
              )}

              <MDBIcon
                icon="times"
                size="lg"
                id={"close-" + listItem.id}
                onClick={this.props.updateList}
                className=" highlight todo-button bttns"
              />

              {/* <Close
                id={"close-" + listItem.id}
                onClick={this.props.updateList}
                className="list-item-control highlight todo-button"
              /> */}
            </div>
          </div>
        );
    }
}

export default ToDoItem;