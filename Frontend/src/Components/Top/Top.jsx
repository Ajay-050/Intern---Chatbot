import React, { useState } from 'react'
import './Top.css'
import info_icon from '../../assets/request.png'
import cloud_ai from '../../assets/cloud_ai2.jpg'

const Top = () => {

  const introParagraph =
  "Hello! The Cloud AI, here to assist you with all your queries related to our company. Whether you're looking for information about our services, company policies, or upcoming events, I'm here to help. You can ask me anything about Cloud Counselage, from details about our cloud solutions to career opportunities with us. My purpose is to provide you with accurate and timely information, ensuring you have everything you need to know about our company. Feel free to ask your questions, and I'll do my best to assist you.";


  const [showtooltip,setTooltip] = useState(false)

  const handleMouseEnter = ()=>{
    setTooltip(true)
  }

  const handleMouseLeave = ()=>{
    setTooltip(false)
  }


  return (
    <div className='top'>
        <div className='top-bar'>
            <div className='cloud'>
              <img id='cloud-image' src={cloud_ai} alt='' />
              <h1>Cloud AI</h1>
            </div>
            <img onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id='info' src={info_icon} alt=''/>
            {
              showtooltip &&
              <div className={`tooltip ${showtooltip?"show":""}`}>
                  {introParagraph}
              </div>
            }
        </div>
    </div>
  )
}

export default Top