/* global data */

interface formElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photo: HTMLInputElement;
  notes: HTMLInputElement;
}

const $image = document.querySelector('img');
const $photo = document.querySelector('#photo');
if (!$image) throw new Error('$image does not exist');
if (!$photo) throw new Error('$photo does not exist');

/* updating the image preview after user adds url on new-entry form*/
$photo.addEventListener('input', (event: Event) => {
  const $eventTarget = event.target as HTMLInputElement;
  if ($eventTarget) {
    $image.src = $eventTarget?.value;
  }
});

const $form = document.querySelector('form') as HTMLFormElement;

/* listener for when user submits new form entry */
$form.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  /* logic for when the user is submitting a new entry */
  if (!(data.editing.entryID > 0)) {
    const $formElements = $form.elements as formElements;

    /* entry id should always increment so that no two entries share an entry id */
    const entryID = data.nextEntryId;
    const entriesDetail = {
      entryID: entryID,
      title: $formElements.title.value,
      photo: $formElements.photo.value,
      notes: $formElements.notes.value,
    };

    /* adding the new entry to the exiting data object */
    data.entries.push(entriesDetail);

    /* entry id should always increment so that no two entries share an entry id */
    data.nextEntryId = entryID + 1;

    /* updating the dom tree with the new entry */
    const $ul = document.querySelector('ul');
    if (!$ul) throw new Error('The $ul query failed');
    const $newEntry = renderEntry(entriesDetail);
    $ul.prepend($newEntry);
  } else {
    /* logic for when the user is submitting an edit to an existing entry */

    const $formElements = $form.elements as formElements;

    /* entry id should be populated from the entry that is being edited */
    const entryID = data.editing.entryID;
    const entriesDetail = {
      entryID: entryID,
      title: $formElements.title.value,
      photo: $formElements.photo.value,
      notes: $formElements.notes.value,
    };

    /* updating the entry in the data object with the edits */
    data.entries[entryID - 1] = entriesDetail;

    /* updating the the dom tree with the edits */
    const $liElement = document.querySelector(`li[data-entry-id="${entryID}"]`);
    if (!$liElement) throw new Error('$liElement is null');

    const $imgElement = $liElement.querySelector('img');
    if (!$imgElement) throw new Error('$imgElement is null');
    $imgElement.src = entriesDetail.photo;

    const $titleElement = $liElement.querySelector('h2');
    if (!$titleElement) throw new Error('$titleElement is null');
    $titleElement.textContent = entriesDetail.title;

    const $notesElement = $liElement.querySelector('p');
    if (!$notesElement) throw new Error('$notesElement is null');
    $notesElement.textContent = entriesDetail.notes;

    /* updating the title back to 'new entry' after the edit is submitted */
    const $newentryTitle = document.querySelector(
      '.new-entry-title',
    ) as HTMLElement;
    if (!$newentryTitle) throw new Error('$newentryTitle is null');
    $newentryTitle.textContent = 'New Entry';

    data.editing.entryID = 0;
    data.editing.title = '';
    data.editing.photo = '';
    data.editing.notes = '';
  }

  /* placeholder image is updated */
  $image.src = 'images/placeholder-image-square.jpg';

  /* form is reset */
  $form.reset();

  /* entries are written to local storage */
  writeEntries();

  /* user is taken to the entries view */
  viewSwap('entries');

  /* this will toggle off the placeholder text once there is an entry */
  if (data.nextEntryId === 2) {
    toggleNoEntries('off');
  } else if (data.nextEntryId === 1) {
    toggleNoEntries('on');
  }
});


 /* listener for when content is loaded */
document.addEventListener('DOMContentLoaded', function () {
  const $ul = document.querySelector('ul');
  if (!$ul) throw new Error('The $ul query failed');

  /* updates the dom tree with the data object entries */
  for (let i = 0; i < data.entries.length; i++) {
    const $result = renderEntry(data.entries[i]);
    $ul.prepend($result);
  }

  /* gets data-view from local storage so the user stays on the same view after refreshing */
  const $currentDataView = localStorage.getItem('data-view');
  if (!$currentDataView) throw new Error('$currentDataView is null');
  viewSwap($currentDataView);

  /* makes sure messaging is only toggled on if there are no entries */
  if (data.nextEntryId > 1) {
    toggleNoEntries('off');
  } else {
    toggleNoEntries('on');
  }
});

const $entryToggle = document.querySelector('.nav-item');
if (!$entryToggle) throw new Error('$entryToggle is null');

  /* if user clicks on entries in top header the view will change to the entries view */
$entryToggle.addEventListener('click', function () {
  viewSwap('entries');
});

const $newEntryToggle = document.querySelector('.new-form-entry');
if (!$newEntryToggle) throw new Error('$newEntryToggle is null');

  /* if user clicks on new from the entries view, they will be taken back to the entry-form view */
$newEntryToggle.addEventListener('click', function () {
  viewSwap('entry-form');
});

const $ulList = document.querySelector('ul');
if (!$ulList) throw new Error('$ulList is null');

  /* event listener for if a user tries to edit an entry */
$ulList.addEventListener('click', function (event) {
  const $EventTarget = event.target as HTMLElement;
  if (!$EventTarget) throw new Error('$eventTarget is null');

  /* checking to make sure that the click was on the editing pencil */
  if ($EventTarget.matches('.fa-solid.fa-pencil')) {
    viewSwap('entry-form');

    /* getting the parent li element of the pencil icon that was clicked in order to get the date-entry-id */
    const $parentLi = $EventTarget.closest('li');
    if (!$parentLi) throw new Error('$parentLi is null');
    const $entryID = $parentLi.getAttribute('data-entry-id');
    if (!$entryID) throw new Error('$entryID is null');

    /* updating the editing property of the data object with the entry information that is being edited */
    data.editing = data.entries[Number($entryID) - 1];

    /* populating placeholder info in the form based on the record that is being edited */
    const $imagePlaceholder = document.querySelector('img');
    if (!$imagePlaceholder) throw new Error('$imagePlaceholder is null');
    $imagePlaceholder.src = data.editing.photo;

    const $titlePlaceholder = document.querySelector(
      '#title',
    ) as HTMLInputElement;
    if (!$titlePlaceholder) throw new Error('$titlePlaceholder is null');
    $titlePlaceholder.value = data.editing.title;

    const $photoPlaceholder = document.querySelector(
      '#photo',
    ) as HTMLInputElement;
    if (!$photoPlaceholder) throw new Error('$photoPlaceholder is null');
    $photoPlaceholder.value = data.editing.photo;

    const $notesPlaceholder = document.querySelector(
      '#notes',
    ) as HTMLInputElement;
    if (!$notesPlaceholder) throw new Error('$notesPlaceholder is null');
    $notesPlaceholder.value = data.editing.notes;

    const $newentryTitle = document.querySelector(
      '.new-entry-title',
    ) as HTMLElement;
    if (!$newentryTitle) throw new Error('$newentryTitle is null');
    $newentryTitle.textContent = 'Edit Entry';
  }
});
