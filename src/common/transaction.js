'use strict'

import { TimerSharp } from "@material-ui/icons";

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class Transaction {
    constructor(currentList) {
        this.currentList = currentList;
        this.oldList = JSON.parse(JSON.stringify(currentList));
    
    }    /**
     * This method is called by jTPS when a transaction is executed.
     */
    doTransaction() {
        console.log("doTransaction - MISSING IMPLEMENTATION");
    }
    
    /**
     * This method is called by jTPS when a transaction is undone.
     */
    undoTransaction() {
        this.currentList.items = this.oldList.items
    }
}