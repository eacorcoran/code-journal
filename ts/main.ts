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

$photo.addEventListener('input', (event: Event) => {
  const $eventTarget = event.target as HTMLInputElement;
  if ($eventTarget) {
    $image.src = $eventTarget?.value;
  }
});

const $form = document.querySelector('form') as HTMLFormElement;

$form.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const $formElements = $form.elements as formElements;
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
