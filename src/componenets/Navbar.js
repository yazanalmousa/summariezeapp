import React from 'react'
import '../App.css'

function Navbar() {
  return (
    <div>
         {/* navbar code here */}
      <div>
        <div id="navbar">
          <a href="/">HOME</a>
          <a href="/NER">Name-Entity Recognition</a>
          <a href="/chat">YOUR CHATBOT</a>
        </div>
      </div>
    </div>
  )
}

export default Navbar