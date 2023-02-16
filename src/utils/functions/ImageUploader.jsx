import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * Imgur Image Uploader API scripts
 * @returns HTML src tags in React Helmet
 */
const ImageUploader = () => {
  return (
    <Helmet>
      <script
        defer
        src='https://cdn.jsdelivr.net/gh/esparev/imgur-uploader@3f5db4181ff51cd8c3d21c88bd447bffad043981/imgur.js'
        type='text/javascript'
      ></script>
      <script
        defer
        src='https://cdn.jsdelivr.net/gh/esparev/imgur-uploader@master/upload.js'
        type='text/javascript'
      ></script>
    </Helmet>
  );
};

export default ImageUploader;
