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
function renderEntry(entry) {
    const $entryRow = document.createElement('li');
    $entryRow.setAttribute('class', 'individual-entry');
    const $lineRow = document.createElement('div');
    $lineRow.setAttribute('class', 'row');
    $entryRow.appendChild($lineRow);
    const $columnHalf = document.createElement('div');
    $columnHalf.setAttribute('class', 'column-half');
    $lineRow.appendChild($columnHalf);
    const $entryImage = document.createElement('img');
    $entryImage.setAttribute('src', entry.photo);
    $columnHalf.appendChild($entryImage);
    const $columnHalf2 = document.createElement('div');
    $columnHalf2.setAttribute('class', 'column-half');
    $lineRow.appendChild($columnHalf2);
    const $entryTitle = document.createElement('h2');
    $entryTitle.textContent = entry.title;
    $columnHalf2.appendChild($entryTitle);
    const $entryNotes = document.createElement('p');
    $entryNotes.textContent = entry.notes;
    $columnHalf2.appendChild($entryNotes);
    return $entryRow;
}
function toggleNoEntries(toggle) {
    if (toggle === 'off') {
        const $hideMessage = document.querySelector('.show-message');
        if (!$hideMessage)
            throw new Error('$hidemessage is null');
        $hideMessage.className = 'show-no-message';
    }
    else if (toggle === 'on') {
        const $showMessage = document.querySelector('.show-no-message');
        if (!$showMessage)
            throw new Error('$hideEntries is null');
        $showMessage.className = 'show-message';
    }
}
function viewSwap(viewName) {
    const $entryForm = document.querySelector("div[data-view='entry-form']");
    const $entriesList = document.querySelector("div[data-view='entries']");
    if (!$entryForm)
        throw new Error('$entryForm is null');
    if (!$entriesList)
        throw new Error('$entryForm is null');
    if (viewName === 'entries') {
        $entryForm.setAttribute('class', 'hidden');
        $entriesList.setAttribute('class', '');
        data.view = 'entries';
    }
    else if (viewName === 'entry-form') {
        $entriesList.setAttribute('class', 'hidden');
        $entryForm.setAttribute('class', '');
        data.view = 'entry-form';
    }
}
