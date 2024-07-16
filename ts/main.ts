/* global data */

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
