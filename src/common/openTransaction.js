'use strict'

import { ThreeDRotationSharp, TimerSharp } from "@material-ui/icons";

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class OpenTransaction {
    constructor(currentList) {
        this.currentList = currentList;
    
        this.itemIndex = currentList.items.length;
    }    /**
     * This method is called by jTPS when a transaction is executed.
     */
    doTransaction() {
        let newToDoListItem = {
            description: "No Description",
            due_date: "none",
            status: "incomplete",
            id: Math.random().toString(36).substr(2, 9),
          };
        this.currentList.items.push(newToDoListItem);
    }
  
    
    /**
     * This method is called by jTPS when a transaction is undone.
     */
    undoTransaction() {
        this.currentList.items.splice(this.itemIndex, 1);
    }
}