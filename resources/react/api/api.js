import axios from 'axios';

const CancelToken = axios.CancelToken;

class Api {
  constructor( requestURL ) {
    this.requestURL = requestURL;

    this.index = this.index.bind(this);
  }

  _request({method, url, form, files, params, onProgress, cancel}, cb) {
    let totalProgressUpload = 0;
    let totalProgressDownload = 0;
    
    const config = {
      method: method || 'get',
      url: this.requestURL + (url || ""),
      params: params ,
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      onUploadProgress: progressEvent => {
        const progress = (progressEvent.loaded / progressEvent.total) * 100;
        totalProgressUpload = (progress / 100) * 50;

        if (onProgress) onProgress(totalProgressUpload + totalProgressDownload);
      },
      onDownloadProgress: progressEvent => {
        const progress = (progressEvent.loaded / progressEvent.total) * 100;
        totalProgressDownload = (progress / 100) * 50;

        if (onProgress) onProgress(totalProgressUpload + totalProgressDownload);
      }, 
      cancelToken: new CancelToken(c => {
        if (cancel) cancel = c;
      })
    };

    if (form || files) {
      const formData = new FormData();

      if (form) {
        Object.keys(form).forEach(key => {
          formData.append(key, form[key]);
        });
      }
      
      if ( files ) {
        for (var x = 0; x < files.length; x++) {          
          formData.append(files[x].name, files[x].file, files[x].file.name);
        } 
      }

      config.data = formData;
    }

    axios(config)
    .then(response => {
      if (response.data) cb(response.data, null);
      else cb(null, 'Data empty');
    })
    .catch(error => {
      cb(null, error);
    });
  }

  cancel(){
    if (this.cancelRequest) this.cancelRequest();
  }

  index({ params , url }, cb, onProgress) {
    this._request({
      method: 'get' ,
      params ,
      url ,
      onProgress
    }, cb);
  }

  store({ form , url, params , files }, cb , onProgress) {
    this._request({
      method: 'post' ,
      params ,
      form ,
      files ,
      url ,
      onProgress
    }, cb);
  }

  view({ params , id }, cb , onProgress) {
    this._request({
      method: 'get' ,
      params ,
      url: `/${id}` ,
      onProgress
    }, cb);
  }

  update({ form , params , files, id = "", url = "" }, cb , onProgress) {
    this._request({
      method: 'post' ,
      params ,
      form ,
      files ,
      url: `${url}/${id}` ,
      onProgress
    }, cb);
  }

  destroy({ params , id }, cb , onProgress) {
    this._request({
      method: 'delete' ,
      params ,
      url: `/${id}` ,
      onProgress
    }, cb);
  }
}

export default Api;