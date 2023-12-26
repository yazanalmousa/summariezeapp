import React from 'react'
import { useState,useRef,useEffect } from 'react';
import Navbar from './Navbar';
import Warning from './Warning';
import SummaryPage from './SummaryPage';

function Main() {
  const [file, setFile] = useState(null);
  const [summaryWordCount, setSummaryWordCount] = useState('');
  const [summaryType, setSummaryType] = useState('Abstract');
  const [message, setMessage] = useState('');
  const [summary, setSummary] = useState('');
  const [clicked,setClicked] = useState(false)
  const fileInputRef = useRef(null);

  const [droppedFile, setDroppedFile] = useState(null);
  const [warning1,setWarning] = useState(false)
  const [warning2,setWarning2] = useState(false)




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
        setWarning2(true)
      }
    } else {
      setWarning(true)
    }
  };

  const handleDrag = (event) => {
    event.preventDefault();
  };


  const handleSummaryButtonClick = async () => {
    setMessage('Generating summary...');
    // Simulate summary generation (replace this with your actual logic)
    const generatedSummary = `This is a simulated summary for the file "${file ? file.name : ''}" with summary type "${summaryType}" and word count "${summaryWordCount}".`;
    setClicked(current => !current)

    // send to bacend here

    const formData = new FormData();
    formData.append('file_upload',droppedFile) 

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
      }else{
        console.error("failed to upload")
      }
    }catch(error){
      console.error("connection failed")
    }


  };
  // if(warning1){
  //   return (<Warning message={"Please Enter Only One File"}/>)
  // }
  // if(warning2){
  //   return (<Warning message={"Please Enter Only PDF Or DOCX"}/>)
  // }

  return (
    <>
        <Navbar/>
        {<div className='warnings-container1'>
          {warning1 && <Warning message={"Please Enter Only One File"}/>}
          {warning2 && <Warning message={"Please Enter Only PDF Or DOCX"}/>}
        </div>}
        <div id="container">
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
              <label htmlFor="file-upload"><i className='bx bxs-download' style={{ fontSize: "100px" }}></i><br />{droppedFile ? droppedFile.name:"Drag & Drop file Here or click to Browse"}</label>
              </form>
            </div>
            <div className="settings-box">
              <i className='bx bx-cog' style={{ fontSize: "100px" }}></i>
              <input type="text" id="fname" name="firstname" placeholder="Enter the length of the summary"
                value={summaryWordCount}
                onChange={e => setSummaryWordCount(e.target.value)}/>
              <select
                id="summary-type"
                value={summaryType}
                onChange={e => setSummaryType(e.target.value)}
              >
                <option value="">Select level of Details</option>
                <option value="High">Detailed</option>
                <option value="Medium">Abstract</option>
              </select>
            </div>
          </div>

          <button id="summary-button" onClick={handleSummaryButtonClick}>Summarize</button>
          {clicked && <SummaryPage summary={summary}/>}
        </div>
    </>
  )
}

export default Main