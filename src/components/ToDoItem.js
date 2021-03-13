// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';

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

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem render");
        let listItem = this.props.toDoListItem;
        let statusType = "complete";
        if (listItem.status === "incomplete")
            statusType = "incomplete";

        return (
          <div id={"todo-list-item-" + listItem.id} className="list-item-card">
            {/* <div className='item-col task-col'>{listItem.description}</div> */}

            <form>
              <label>
                <input
                  id={"description-" + listItem.id}
                  type="text"
                  className="item-input"
                  name="task"
                  onChange={this.props.updateList}
                  value={listItem.description}
                />
              </label>
            </form>
            <form>
              <label>
                <input
                  id={"dueDate-" + listItem.id}
                  type="date"
                  className="item-input"
                  name="date"
                  onChange={this.props.updateList}
                  value={listItem.dueDate}
                />
              </label>
            </form>

            {/* <div className="item-col due-date-col">{listItem.due_date}</div> */}

            <form>
              <label>
                <select
                  id={"status-" + listItem.id}
                  className={statusType}
                  name="status"
                  onChange={this.props.updateList}
                  value={listItem.status}
                >
                  <option className ='option'>complete</option>
                  <option className = 'option'>incomplete</option>
                </select>
              </label>
            </form>

            {/* <div className="item-col status-col" className={statusType}>
              {listItem.status}
            </div> */}
            <div className="item-col test-4-col"></div>
            <div className="item-col list-controls-col">
              <KeyboardArrowUp className="list-item-control todo-button" />
              <KeyboardArrowDown className="list-item-control todo-button" />
              <Close className="list-item-control todo-button" />
              <div className="list-item-control"></div>
              <div className="list-item-control"></div>
            </div>
          </div>
        );
    }
}

export default ToDoItem;