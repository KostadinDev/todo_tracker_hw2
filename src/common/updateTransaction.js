'use strict'

import { ThreeDRotationSharp, TimerSharp } from "@material-ui/icons";

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class UpdateTransaction {
    constructor(currentList, item, itemIndex, newItem) {
        this.currentList = currentList;
        this.item = item;
        this.itemIndex = itemIndex;
        this.newItem = newItem;
    
    }    /**
     * This method is called by jTPS when a transaction is executed.
     */
    doTransaction() {
        if (this.currentList != undefined)
            this.currentList.items[this.itemIndex] = this.newItem;
    }
  
    
    /**
     * This method is called by jTPS when a transaction is undone.
     */
    undoTransaction() {
        console.log(this.currentList)
        this.currentList.items[this.itemIndex] = this.item;
    }
}