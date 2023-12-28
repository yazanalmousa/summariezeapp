import React, { useEffect } from 'react'
import { useState,useRef } from 'react';
import Navbar from './Navbar';
import SummaryPage from './SummaryPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import '../App.css'

function Main() {

  const [error,setError] = useState(false)

  const [length,setLength] = useState(3)
  const [selectValue,SetselectValue] = useState('Abstract')
  const [showBtn,setBtn] = useState(false)


  const [summary, setSummary] = useState('');
  const [ner, setNer] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const [droppedFile, setDroppedFile] = useState(null);

  const loaderStyles = css`
  marging: auto;
`;

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setDroppedFile(file)
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    // Check if only one file is dropped
    if (droppedFiles.length === 1) {
      const file = droppedFiles[0];
      // Check if the dropped file is of the allowed types
      if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setDroppedFile(file);
        console.log(droppedFile)
      } else {
        toast.error('Invalid file type. only PDF and DOCX are accepted');
      }
    } else {
      toast.error('Only one file is accepted at a time.');
    }
  };

  const handleDrag = (event) => {
    event.preventDefault();
  };


  const handleSummaryButtonClick = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file_upload',droppedFile) 
    formData.append('summary_length',length) 
    formData.append('details_level',selectValue) 


    try{
      const endPoint = 'http://localhost:8000/uploadfile/'
      const response = await fetch(endPoint, {
        method:"POST",
        body: formData
      })
      if(response.ok){
        let data = await response.json()
        console.log("file Uploaded")
        console.log(data.summary)
        setSummary(data.summary)
        setNer(data.ner)
        setBtn(true)
      }else{
        toast.error('Failed to upload!');
        console.error("failed to upload")
      }
    }catch(error){
      toast.error('Something went wrong!');
      console.error("connection failed")
    } finally{
      setLoading(false);
    }
  };
  const handleLengthChange = (e) => {
      const checkData = e.target.value
      if (!/^[0-9]+$/.test(checkData) && checkData !== "") {
        // Display an alert if the value is not numeric
        setError(true)
        e.target.value = ""
      } else {
        setError(false)
        // Handle saving settings logic here
        setLength(checkData)
        console.log('Settings saved:', { checkData });
      }
      
  }
  const handleSelectChange = (e) => {
    const selectCheck = e.target.value
    if(e.target.value !== 'Select level of Details'){
    console.log(selectCheck)
    SetselectValue(selectCheck)
    }else{
      SetselectValue('Abstract')
      console.log(selectValue)
    }
  }

  return (
    <>
        <div id="container">
        <ToastContainer />
          <h1 style={{ textAlign: "center" }}>YOUR DOCUMENT SUMMARIZER</h1>
          <div className="file-upload-container">
            <div className="file-upload-box">
              <form onDragOver={handleDrag} onDrop={handleDrop}>
              <input
                type="file"
                id="file-upload"
                accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                hidden
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <label htmlFor="file-upload"><i class='bx bx-upload'style={{fontSize : "100px"}} ></i><br/>{droppedFile ? droppedFile.name:"Drag & Drop file Here or click to Browse"}</label>
              </form>
            </div>
            <div className="settings-box">
              <div><i className='bx bx-cog' style={{ fontSize: "100px" }}></i></div>
              <label for = 'length'>Set the number of sentences</label>
              <input type="text" id="length" name="firstname" placeholder="Enter the length of the summary" className={error ? "error-message" : "normal-input"} onChange={handleLengthChange}/>
              <label for='summary-type'>set the level of details</label>
              <select
                id="summary-type"
                onChange={handleSelectChange}
              >
                <option value="Abstract">Abstract</option>
                <option value="Detailed">Detailed</option>
              </select>
            </div>
          </div>
          <p className='note'>*Note: Summary Setting Are Optional <span><i class="fa-solid fa-filter"></i></span></p>
          <button className='summary-btn' id="summary-button" onClick={handleSummaryButtonClick}><b>{!loading ? "Summarize":(<ClipLoader css={loaderStyles} size={35} color={'#36D7B7'} loading={loading} />)}</b></button>
            
           <SummaryPage title="Generated Summary " summary={summary} ner={ner}/>
            
           {showBtn && <a href='/chat' className='chatbot-direct'><button className='chatbot-btn'><i className="fa-solid fa-robot"></i> Chat With Your Data <i class="fa-solid fa-arrow-right"></i></button></a>}
        </div>
    </>
  )
}

export default Main