// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import jsTPS from './common/jsTPS'

// // THESE ARE OUR REACT COMPONENTS
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import Workspace from './components/Workspace'
import Transaction from './common/transaction'
import { ThreeSixty, TimerSharp } from '@material-ui/icons';
import CloseTransaction from './common/closeTransaction';
import UpdateTransaction from './common/updateTransaction';
import MoveTransaction from './common/moveTransaction'
import useEventListener from '@use-it/event-listener'
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import OpenTransaction from './common/openTransaction';
{/*import ItemsListHeaderComponent from './components/ItemsListHeaderComponent'
import ItemsListComponent from './components/ItemsListComponent'
import ListsComponent from './components/ListsComponent'
*/}
class App extends Component {
  constructor(props) {
    // ALWAYS DO THIS FIRST
    super(props);

    // // DISPLAY WHERE WE ARE
    console.log("App constructor");

    // MAKE OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS();

    // CHECK TO SEE IF THERE IS DATA IN LOCAL STORAGE FOR THIS APP
    let recentLists = localStorage.getItem("recentLists");
    console.log("recentLists: " + recentLists);
    if (!recentLists) {
      recentLists = JSON.stringify(testData.toDoLists);
      localStorage.setItem("toDoLists", recentLists);
    }
    recentLists = JSON.parse(recentLists);

    // // FIND OUT WHAT THE HIGHEST ID NUMBERS ARE FOR LISTS
    let highListId = -1;
    let highListItemId = -1;
    for (let i = 0; i < recentLists.length; i++) {
      let toDoList = recentLists[i];
      if (toDoList.id > highListId) {
        highListId = toDoList.id;
      }
      for (let j = 0; j < toDoList.items.length; j++) {
        let toDoListItem = toDoList.items[j];
        if (toDoListItem.id > highListItemId) highListItemId = toDoListItem.id;
      }
    }

    // SETUP OUR APP STATE
    this.state = {
      toDoLists: recentLists,
      currentList: { items: [] },
      nextListId: highListId + 1,
      nextListItemId: highListItemId + 1,
      useVerboseFeedback: true,
      loaded: true,
      open:false
    };
  }

  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    this.tps.clearAllTransactions();
    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    const nextLists = this.state.toDoLists.filter(
      (testList) => testList.id !== toDoList.id
    );
    nextLists.unshift(toDoList);
    
    this.setState({
      toDoLists: nextLists,
      currentList: toDoList,
      loaded:true,
    });
  
  };

  handleUpdateList= (event) =>{
    console.log("SURPRISE IT OWRKS");
    event.preventDefault();
  }

  addNewList = () => {
    let newToDoListInList = [this.makeNewToDoList()];
    let newToDoListsList = [...newToDoListInList, ...this.state.toDoLists];
    let newToDoList = newToDoListInList[0];

    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState(
      {
        toDoLists: newToDoListsList,
        currentList: newToDoList,
        nextListId: this.state.nextListId + 1,
      },
      this.afterToDoListsChangeComplete
    );
  };

  makeNewToDoList = () => {
    let newToDoList = {
      id: this.highListId,
      name: "Untitled",
      items: [],
    };
    return newToDoList;
  };

  
  undo = () => {
    console.log(this.tps.transactions, this.tps.mostRecentTransaction, "THIS LINE");



   
      this.tps.undoTransaction();
      this.setState({currentList:this.state.currentList})
      
   
  }

  redo = () =>{
    console.log(this.tps.transactions, this.tps.mostRecentTransaction, "THIS LINE");

    this.tps.doTransaction();
    this.setState({currentList:this.state.currentList});
  }

  addItem = () =>{
    
  
    let transaction = new OpenTransaction(this.state.currentList);
    this.tps.addTransaction(transaction);
    this.setState({currentList:this.state.currentList})
  }

  closeList = () =>{
    this.tps.clearAllTransactions();
    this.setState({currentList:{items:[]}, loaded:false})
  }

  deleteList = () =>{
    for (let i =0;i<this.state.toDoLists.length;i++){
      if (this.state.toDoLists[i].id == this.state.currentList.id){
        this.state.toDoLists.splice(i,1);
      }
    }
    this.tps.clearAllTransactions();
    this.setState({toDoLists:this.state.toDoLists, currentList:{items:[]}, open:false, loaded:false});
  }

  makeNewToDoListItem = () => {
    let newToDoListItem = {
      description: "No Description",
      due_date: "none",
      status: "incomplete",
    };
    return newToDoListItem;
  };
 
  updateLists = (event) =>{
    console.log(event.target.value)
    this.state.currentList.name = event.target.value;
    this.setState({currentState: this.state.currentList});
    
  }



  f = (event) => {
    let id = event.target.id.split("-").slice(-1)[0];
    let box = event.target.id.split("-")[0];

    for (let i = 0; i < this.state.currentList.items.length; i++) {
      if (this.state.currentList.items[i].id == id) {
        if (box === "description" ) {
          let temp = JSON.parse(JSON.stringify(this.state.currentList.items[i]));
          temp.description = event.target.value;
          let transaction = new UpdateTransaction(this.state.currentList, this.state.currentList.items[i], i,temp );
          this.tps.addTransaction(transaction);
          this.setState({ currentList: this.state.currentList });
        }
        if (box === "due_date") {
  
          let temp = JSON.parse(JSON.stringify(this.state.currentList.items[i]));
          temp.due_date = event.target.value.toString();
          let transaction = new UpdateTransaction(this.state.currentList, this.state.currentList.items[i], i,temp );
          this.tps.addTransaction(transaction);
          this.setState({ currentList: this.state.currentList });
        }
        if (box === "status") {
          let temp = JSON.parse(JSON.stringify(this.state.currentList.items[i]));
          temp.status = event.target.value;
          let transaction = new UpdateTransaction(this.state.currentList, this.state.currentList.items[i], i,temp );
          this.tps.addTransaction(transaction);
          this.setState({ currentList: this.state.currentList });
        }
        if (box === 'arrowUp'){
          if (i!=0){
            let transaction = new MoveTransaction(this.state.currentList,i,i-1);
            this.tps.addTransaction(transaction);

            this.setState({ currentList: this.state.currentList });
            break;
          }

        }
        if (box === 'arrowDown'){
          if (i!=this.state.currentList.items.length-1){
            let transaction = new MoveTransaction(this.state.currentList,i,i+1);
            this.tps.addTransaction(transaction);

            this.setState({ currentList: this.state.currentList });
            break;
          }
        }
        if (box == 'close'){
          let transaction = new CloseTransaction(this.state.currentList, this.state.currentList.items[i], i);
          this.tps.addTransaction(transaction);
          this.setState({ currentList: this.state.currentList });
          
        }

      }
    }


 
  };

  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  afterToDoListsChangeComplete = () => {
    console.log("App updated currentToDoList: " + this.state.currentList);

    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recent_work", toDoListsString);
  };

  
  render() {

    const handleClickOpen = () => {
  
      this.setState({open:true});
    };
  
    const handleClose = () => {
      this.setState({open:false});
    };
  
    return (
      <div id="root">
        <Navbar />
        <LeftSidebar
          toDoLists={this.state.toDoLists}
          loadToDoListCallback={this.loadToDoList}
          addNewListCallback={this.addNewList}
          firstId={this.state.currentList.id}
          updateLists={this.updateLists}
          loaded = {this.state.loaded}
        />
        <Workspace
          toDoListItems={this.state.currentList.items}
          updateList={this.f}
          addItem={this.addItem}
          close={this.closeList}
          delete={this.deleteList}
          undo={this.undo}
          redo={this.redo}
          submitForm={this.submitForm}
          tps={this.tps}
          handleClickOpen={handleClickOpen}
          loaded = {this.state.loaded}
        />

        <KeyboardEventHandler handleKeys={["ctrl+y"]} onKeyEvent={this.redo} />
        <KeyboardEventHandler handleKeys={["ctrl+z"]} onKeyEvent={this.undo} />

        <Dialog
          open={this.state.open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description dark"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete the list?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteList} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default App;