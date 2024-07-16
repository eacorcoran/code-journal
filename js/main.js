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
    const entries = {
        entryID: entryID,
        title: $formElements.title.value,
        photo: $formElements.photo.value,
        notes: $formElements.notes.value,
    };
    data.nextEntryId += entryID;
    data.entries.push(entries);
    console.log('Entries: ', entries);
    console.log('data', data);
    $image.src = 'images/placeholder-image-square.jpg';
    $form.reset();
});
