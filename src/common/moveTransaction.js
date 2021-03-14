'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class MoveTransaction {
    constructor(currentList, indexBefore, IndexAfter) {
        this.currentList = currentList;
        this.indexBefore = indexBefore;
        this.indexAfter = IndexAfter;
    
    }    /**
     * This method is called by jTPS when a transaction is executed.
     */
    doTransaction() {
        let temp = this.currentList.items[this.indexBefore];
        this.currentList.items[this.indexBefore] = this.currentList.items[this.indexAfter];
        this.currentList.items[this.indexAfter] = temp

    }
  
    
    /**
     * This method is called by jTPS when a transaction is undone.
     */
    undoTransaction() {
        let temp = this.currentList.items[this.indexAfter];
        this.currentList.items[this.indexAfter] = this.currentList.items[this.indexBefore];
        this.currentList.items[this.indexBefore] = temp
    }
}