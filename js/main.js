"use strict";
/* global data */
const $image = document.querySelector('img');
const $photo = document.querySelector('#photo');
if (!$image)
    throw new Error('$image does not exist');
if (!$photo)
    throw new Error('$photo does not exist');
$photo.addEventListener('input', (event) => {
    const $eventTarget = event.target;
    if ($eventTarget) {
        $image.src = $eventTarget?.value;
    }
});
const $form = document.querySelector('form');
$form.addEventListener('submit', (event) => {
    event.preventDefault();
    const $formElements = $form.elements;
    const entryID = data.nextEntryId;
    const entriesDetail = {
        entryID: entryID,
        title: $formElements.title.value,
        photo: $formElements.photo.value,
        notes: $formElements.notes.value,
    };
    data.entries.push(entriesDetail);
    data.nextEntryId = entryID + 1;
    $image.src = 'images/placeholder-image-square.jpg';
    $form.reset();
    writeEntries();
    const $ul = document.querySelector('ul');
    if (!$ul)
        throw new Error('The $ul query failed');
    const $newEntry = renderEntry(entriesDetail);
    $ul.prepend($newEntry);
    viewSwap('entries');
    if (data.nextEntryId > 1) {
        toggleNoEntries('off');
    }
    else {
        toggleNoEntries('on');
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const $ul = document.querySelector('ul');
    if (!$ul)
        throw new Error('The $ul query failed');
    for (let i = 0; i < data.entries.length; i++) {
        const $result = renderEntry(data.entries[i]);
        $ul.prepend($result);
    }
    const $currentDataView = localStorage.getItem('data-view');
    if (!$currentDataView)
        throw new Error('$currentDataView is null');
    viewSwap($currentDataView);
    if (data.nextEntryId > 1) {
        toggleNoEntries('off');
    }
    else {
        toggleNoEntries('on');
    }
});
const $entryToggle = document.querySelector('.nav-item');
if (!$entryToggle)
    throw new Error('$entryToggle is null');
$entryToggle.addEventListener('click', function () {
    viewSwap('entries');
});
const $newEntryToggle = document.querySelector('.new-form-entry');
if (!$newEntryToggle)
    throw new Error('$newEntryToggle is null');
$newEntryToggle.addEventListener('click', function () {
    viewSwap('entry-form');
});
const $ulList = document.querySelector('ul');
if (!$ulList)
    throw new Error('$ulList is null');
$ulList.addEventListener('click', function (event) {
    const $EventTarget = event.target;
    if (!$EventTarget)
        throw new Error('$eventTarget is null');
    if ($EventTarget.matches('.fa-solid.fa-pencil')) {
        viewSwap('entry-form');
        const $parentLi = $EventTarget.closest('li');
        if (!$parentLi)
            throw new Error('$parentLi is null');
        const $entryID = $parentLi.getAttribute('data-entry-id');
        if (!$entryID)
            throw new Error('$entryID is null');
        data.editing = data.entries[Number($entryID) - 1];
        const $imagePlaceholder = document.querySelector('img');
        if (!$imagePlaceholder)
            throw new Error('$imagePlaceholder is null');
        $imagePlaceholder.src = data.editing.photo;
        const $titlePlaceholder = document.querySelector('#title');
        if (!$titlePlaceholder)
            throw new Error('$titlePlaceholder is null');
        $titlePlaceholder.value = data.editing.title;
        const $photoPlaceholder = document.querySelector('#photo');
        if (!$photoPlaceholder)
            throw new Error('$photoPlaceholder is null');
        $photoPlaceholder.value = data.editing.photo;
        const $notesPlaceholder = document.querySelector('#notes');
        if (!$notesPlaceholder)
            throw new Error('$notesPlaceholder is null');
        $notesPlaceholder.value = data.editing.notes;
        const $newentryTitle = document.querySelector('.new-entry-title');
        if (!$newentryTitle)
            throw new Error('$newentryTitle is null');
        $newentryTitle.textContent = 'Edit Entry';
    }
});
