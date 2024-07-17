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
});
document.addEventListener('DOMContentLoaded', function () {
    const $ul = document.querySelector('ul');
    if (!$ul)
        throw new Error('The $ul query failed');
    for (let i = 0; i < data.entries.length; i++) {
        const $result = renderEntry(data.entries[i]);
        $ul.appendChild($result);
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
