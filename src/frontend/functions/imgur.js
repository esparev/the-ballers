class Imgur {
  constructor(options) {
    if (!this || !(this instanceof Imgur)) {
      return new Imgur(options);
    }

    if (!options) {
      options = {};
    }

    if (!options.clientId) {
      throw 'Provide a valid Client Id here: https://api.imgur.com/';
    }

    this.clientId = options.clientId;
    this.endpoint = 'https://api.imgur.com/3/image';
    this.callback = options.callback || undefined;
    this.dropzone = document.getElementById('drop-zone');
    //Start
    this.run();
  }
  //* Fourth and last
  //? connects with matchFiles
  post(path, data, callback) {
    var xhttp = new XMLHttpRequest();

    xhttp.open('POST', path, true);
    xhttp.setRequestHeader('Authorization', 'Client-ID ' + this.clientId);
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 300) {
          var response = '';
          try {
            response = JSON.parse(this.responseText);
          } catch (err) {
            response = this.responseText;
          }
          callback.call(window, response);
        } else {
          throw new Error(this.status + ' - ' + this.statusText);
        }
      }
    };
    xhttp.send(data);
    xhttp = null;
  }
  //* Third
  //? connects with upload
  matchFiles(file) {
    if (file.type.match(/image/) && file.type !== 'image/svg+xml') {
      var fd = new FormData();
      fd.append('image', file);

      this.post(
        this.endpoint,
        fd,
        function (data) {
          typeof this.callback === 'function' && this.callback.call(this, data);
        }.bind(this)
      );
    } else {
      console.log('NEL PASTEL');
    }
  }
  //* Second
  //? connects to createDragZone
  upload(zone) {
    var file, target, i, len;

    zone.addEventListener(
      'change',
      function (e) {
        try {
          if (
            e.target &&
            e.target.nodeName === 'INPUT' &&
            e.target.type === 'file'
          ) {
            target = e.target.files;

            for (i = 0, len = target.length; i < len; i += 1) {
              file = target[i];
              this.matchFiles(file, zone, [i, target.length]);
            }
          }
        } catch (error) {
          console.log('ERROR', error);
        }
      }.bind(this),
      false
    );
  }
  //* Init
  //? runs createDragZone
  run() {
    console.log("I'm running");
    this.upload(this.dropzone);
  }
}

export default Imgur;
