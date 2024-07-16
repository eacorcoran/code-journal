"use strict";
let data = {
    view: 'entry-form',
    entries: readEntries(),
    editing: null,
    nextEntryId: readNextEntryID(),
};
function writeEntries() {
    const entriesJSON = JSON.stringify(data.entries);
    const nextEntryJSON = JSON.stringify(data.nextEntryId);
    localStorage.setItem('journal-entries', entriesJSON);
    localStorage.setItem('nextEntryID', nextEntryJSON);
}
;
function readEntries() {
    let newEntries = [];
    const readJSON = localStorage.getItem('journal-entries');
    if (readJSON === null) {
        newEntries = [];
    }
    else {
        newEntries = JSON.parse(readJSON);
    }
    return newEntries;
}
function readNextEntryID() {
    let newEntryID = 1;
    const readJSON = localStorage.getItem('nextEntryID');
    if (readJSON === null) {
        newEntryID = 1;
    }
    else {
        newEntryID = JSON.parse(readJSON);
    }
    return newEntryID;
}
