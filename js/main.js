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
