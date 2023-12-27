import '../summarypage.css'
import { useEffect,useRef,useState } from 'react';

function SummaryPage(props) {
    const [text,setText] = useState('')
    const textareaRef = useRef(null)
    useEffect(() => {
        const adjustHeight =() => {
            if(textareaRef.current){
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
                textareaRef.current.focus();
            }
        }
        adjustHeight();
    },[text])
     useEffect(() => {
        setText(props.summary)
     },[props.summary])
  return (
    <div className='summary-container'>
        <div className='actual-summary'>
            <h1>{props.title}<span><i className="fa-solid fa-robot"></i></span></h1>
            <div className='text-area'>
            <textarea value={text} ref={textareaRef} className="form-control" placeholder="Summary" id="floatingTextarea2Disabled"></textarea>
            </div>
            

            
        </div>

    </div>
  )
}

export default SummaryPage