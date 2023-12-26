import '../summarypage.css'
import { useEffect,useState } from 'react';

function SummaryPage(props) {
    // const [summary,setSummary] = useState('')
    // useEffect(() => {
    //     setSummary("You Summary Appears Here");
    // },[])
    function handleHieght(){
        const textarea = document.querySelector("textarea");
        textarea.addEventListener("keyup", e => {
         textarea.style.height = 'auto'
        let scHeigth = e.target.scrollHeight;
        textarea.style.height = `${scHeigth}px `
        })
      }
  return (
    <div className='summary-container'>
        <div className='actual-summary'>
            <h1>Generated Summary <span><i className="fa-solid fa-robot"></i></span></h1>
            <div className='text-area'>
            <textarea value={props.summary} className="form-control" placeholder="Summary" id="floatingTextarea2Disabled" style={{height: "100px"}} onChange={handleHieght}  ></textarea>
            </div>
        </div>

    </div>
  )
}

export default SummaryPage