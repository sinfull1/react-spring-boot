import React, { Component } from "react";
import UploadService from "../services/upload-files.service";

import './upload.css';

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);
    this.clickView = this.clickView.bind(this);
    this.publish = this.publish.bind(this);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      fileInfos: [],
      publishInfo: []
    };
  }

  componentDidMount() {
  //get the file in the temp folder
    UploadService.getFiles().then((response) => {
      this.setState({
        fileInfos: response.data,
      });
    });
//get the file in the publish folder
    UploadService.getPublishFiles().then((response) => {
      this.setState({
        publishInfo: response.data,
      });
    });
  }

  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files,
    });
  }

  upload() {
    let currentFile = this.state.selectedFiles[0];
    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadService.upload(currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
        return UploadService.getFiles();
      })
      .then((files) => {
        this.setState({
          fileInfos: files.data,
        });
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
        });
      });

    this.setState({
      selectedFiles: undefined,
    });
  }

clickView(event)
{
  var URL = 'https://localhost:8443/api/downloadView?fileName='+event.target.text;
  window.open(URL);
}
async publish(data)
 {
    let response = await UploadService.publishFile(data);
    if(response.data){
       await this.setState({ publishInfo: [...this.state.publishInfo, {url:"", name:data}]});
     }
    else{
      alert("Already Published. Publish new version?");
    }
}

async delete(data)
 {
    let response = UploadService.deleteFile(data);
    response.then( e =>{if(e.data){
      UploadService.getFiles().then((response) => {
        this.setState({
          fileInfos: response.data,
        });
      });
    }
  });
 }



  render() {
    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      fileInfos,
      publishInfo
    } = this.state;
    console.table(publishInfo);
      return (
      <div className="upload">
        {currentFile && progress!=100 &&(
          <div className="progress">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}
        <div className="bar-upload">
        
          <input type="file" onChange={this.selectFile} />
          <button className="button3"   disabled={!selectedFiles} onClick={this.upload} >
          Upload
        </button>
        
       
    </div>
        <div className="alert alert-light" role="alert">
          {message}
        </div>

        <div className="card-upload">
          <div className="card-header">List of Files</div>
          <ul className="list-group list-group-flush">
            {fileInfos &&
              fileInfos.map((file, index) => (
                <div className="bar-upload">
                <li className="list-group-item" key={index}>
                  { 
                  publishInfo.map(e=>e.name ==file.name).includes(true)?  
                                <div className="led-box"> <div className="led-green"></div></div>
                                :<div className="led-box"> <div className="led-grey"></div></div>}
                  <a className="a-upload" onClick={this.clickView}>{file.name}</a>
                  <a className="button1"  onClick={()=>this.publish(file.name)}>Publish </a>
                  <a className="button1"  onClick={()=>this.delete(file.name)}>Delete </a>
                 </li>
                </div>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}