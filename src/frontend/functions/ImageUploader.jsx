import React from 'react';
import { Helmet } from 'react-helmet';

/* Imgur Image Uploader API scripts */
const ImageUploader = () => {
  return (
    <Helmet>
      <script
        defer
        src='https://cdn.jsdelivr.net/gh/esparev/imgur-uploader@6e81d570de9d3a9d8ca1f38c4daeee17edccf1e7/imgur.js'
        type='text/javascript'
      ></script>
      <script
        defer
        src='https://cdn.jsdelivr.net/gh/esparev/imgur-uploader@6e81d570de9d3a9d8ca1f38c4daeee17edccf1e7/upload.js'
        type='text/javascript'
      ></script>
    </Helmet>
  );
};

export default ImageUploader;
