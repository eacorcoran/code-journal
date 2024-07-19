"use strict";
let data = {
    view: 'entry-form',
    entries: readEntries(),
    editing: {},
    nextEntryId: readNextEntryID(),
};
/* writing entries (and edits) to local storage */
function writeEntries() {
    const entriesJSON = JSON.stringify(data.entries);
    const nextEntryJSON = JSON.stringify(data.nextEntryId);
    localStorage.setItem('journal-entries', entriesJSON);
    localStorage.setItem('nextEntryID', nextEntryJSON);
}
/* reading entries from local storage */
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
/* get next entry ID from local storage */
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
/* updating the dom tree with new entries */
function renderEntry(entry) {
    const $entryRow = document.createElement('li');
    $entryRow.setAttribute('class', 'individual-entry');
    $entryRow.setAttribute('data-entry-id', entry.entryID.toString());
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
    const $columnRow1 = document.createElement('div');
    $columnRow1.setAttribute('class', 'row-pencil');
    $columnHalf2.appendChild($columnRow1);
    const $entryTitle = document.createElement('h2');
    $entryTitle.textContent = entry.title;
    $columnRow1.appendChild($entryTitle);
    const $pencilIcon = document.createElement('a');
    $pencilIcon.setAttribute('style', 'float: right');
    $pencilIcon.setAttribute('href', '#');
    $pencilIcon.setAttribute('class', 'fa-solid fa-pencil');
    $columnRow1.appendChild($pencilIcon);
    const $columnRow2 = document.createElement('div');
    $columnRow2.setAttribute('class', 'row');
    $columnHalf2.appendChild($columnRow2);
    const $entryNotes = document.createElement('p');
    $entryNotes.textContent = entry.notes;
    $columnRow2.appendChild($entryNotes);
    return $entryRow;
}
/* toggling the default messaging on and off based on if entries exist*/
function toggleNoEntries(toggle) {
    const $hideMessage = document.querySelector('.show-message');
    const $showMessage = document.querySelector('.show-no-message');
    if (toggle === 'off' && $hideMessage?.className === 'show-message') {
        $hideMessage.className = 'show-no-message';
    }
    else if (toggle === 'on' && $showMessage?.className === 'show-no-message') {
        $showMessage.className = 'show-message';
    }
}
/* function to swap views between entry-form and entries */
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
        localStorage.setItem('data-view', data.view);
        /* this will toggle off the placeholder text once there is an entry */
        const nonullentries = data.entries.filter(isNotNull);
        if (nonullentries.length > 0) {
            toggleNoEntries('off');
        }
        else if (nonullentries.length === 0) {
            toggleNoEntries('on');
        }
    }
    else if (viewName === 'entry-form') {
        $entriesList.setAttribute('class', 'hidden');
        $entryForm.setAttribute('class', '');
        data.view = 'entry-form';
        localStorage.setItem('data-view', data.view);
    }
}
function isNotNull(entry) {
    return entry !== null && entry !== undefined;
}
/* function to populate placeholder info in the form based on the record that is being edited */
function populatePlaceholder(editing) {
    const $imagePlaceholder = document.querySelector('img');
    if (!$imagePlaceholder)
        throw new Error('$imagePlaceholder is null');
    $imagePlaceholder.src = editing.photo;
    const $titlePlaceholder = document.querySelector('#title');
    if (!$titlePlaceholder)
        throw new Error('$titlePlaceholder is null');
    $titlePlaceholder.value = editing.title;
    const $photoPlaceholder = document.querySelector('#photo');
    if (!$photoPlaceholder)
        throw new Error('$photoPlaceholder is null');
    $photoPlaceholder.value = editing.photo;
    const $notesPlaceholder = document.querySelector('#notes');
    if (!$notesPlaceholder)
        throw new Error('$notesPlaceholder is null');
    $notesPlaceholder.value = editing.notes;
    const $newentryTitle = document.querySelector('.new-entry-title');
    if (!$newentryTitle)
        throw new Error('$newentryTitle is null');
    $newentryTitle.textContent = 'Edit Entry';
}
/* function to create delete entry link and the dialog box to confirm deleting entry */
function createDialogConfirmation() {
    const $submitRow = document.querySelector('.right-align');
    if (!$submitRow)
        throw new Error('$submitRow is null');
    const $deleteEntry = document.createElement('a');
    $deleteEntry.setAttribute('href', '#');
    $deleteEntry.setAttribute('class', 'delete-entry');
    $deleteEntry.textContent = 'Delete Entry';
    $submitRow.prepend($deleteEntry);
    const $dialogBox = document.createElement('dialog');
    $submitRow.append($dialogBox);
    const $dialogText = document.createElement('h2');
    $dialogText.setAttribute('class', 'h2-modal');
    $dialogText.textContent = 'Are you sure you want to delete this entry?';
    $dialogBox.append($dialogText);
    const $modalActions = document.createElement('div');
    $modalActions.setAttribute('class', 'modal-actions');
    $dialogBox.append($modalActions);
    const $cancelModal = document.createElement('a');
    $cancelModal.setAttribute('href', '#');
    $cancelModal.setAttribute('class', 'dismiss-modal-cancel');
    $cancelModal.textContent = 'CANCEL';
    $modalActions.append($cancelModal);
    const $confirmModal = document.createElement('a');
    $cancelModal.setAttribute('href', '#');
    $confirmModal.setAttribute('class', 'dismiss-modal-confirm');
    $confirmModal.textContent = 'CONFIRM';
    $modalActions.append($confirmModal);
}
