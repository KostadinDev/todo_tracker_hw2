'use strict'

import { ThreeDRotationSharp, TimerSharp } from "@material-ui/icons";

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class CloseTransaction {
    constructor(currentList, item, itemIndex) {
        this.currentList = currentList;
        this.item = item;
        this.itemIndex = itemIndex;
    
    }    /**
     * This method is called by jTPS when a transaction is executed.
     */
    doTransaction() {
        this.currentList.items.splice(this.itemIndex,1);
    }
  
    
    /**
     * This method is called by jTPS when a transaction is undone.
     */
    undoTransaction() {
        this.currentList.items.splice(this.itemIndex,0, this.item);
    }
}