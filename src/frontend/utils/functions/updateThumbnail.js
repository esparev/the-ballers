/**
 * Updates thumbnail when the user has dragged 
 * and dropped the image on the drop zone
 * @param {*} dropZoneElement - html tag
 * @param {*} file - image file
 */
const updateThumbnail = (dropZoneElement, file) => {
  let thumbnailElement = dropZoneElement.querySelectorAll('.drop-zone--thumb');

  if (dropZoneElement.querySelector('.drop-zone--prompt')) {
    dropZoneElement
      .querySelector('.form__image-labels')
      .classList.add('drop-zone--label');
    dropZoneElement.querySelector('.form__image--label').remove();
    dropZoneElement.querySelector('.form__image--label-button').remove();
  }

  if (thumbnailElement) {
    thumbnailElement = document.createElement('div');
    thumbnailElement.classList.add('drop-zone--thumb');
    dropZoneElement.appendChild(thumbnailElement);
  }

  // Show thumbnail for image file
  if (file.type.startsWith('image/')) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
};

export default updateThumbnail;
