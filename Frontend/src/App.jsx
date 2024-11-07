import React from 'react'
import './App.css'
import Top from './Components/Top/Top'
import send from './assets/icons8-send-48.png'
import { useState,useRef,useEffect } from 'react'
import cloud from './assets/cloud_ai2.jpg'
import user from './assets/user.png'

const App = () => {

  const [inputText,setInputText] = useState('')
  const [introText,setIntroText] = useState('')
  const [isVisibility, setVisibility] = useState(true);
  const [messages,setMessages] = useState(() => {
    const storedMessages = sessionStorage.getItem('chatMessages');
    return storedMessages ? JSON.parse(storedMessages) : [];
  })
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const introParagraph = "Heey! The Cloud AI, here to assist you with all your queries related to our company. Whether you're looking for information about our services, company policies, or upcoming events, I'm here to help. You can ask me anything about Cloud Counselage, from details about our cloud solutions to career opportunities with us. My purpose is to provide you with accurate and timely information, ensuring you have everything you need to know about our company. Feel free to ask your questions, and I'll do my best to assist you.";


  useEffect(() => {
    if (!sessionStorage.getItem('introShown')) {
      let currentLetterIndex = 0;
      const intervalId = setInterval(() => {
        if (currentLetterIndex < introParagraph.length-1) {
          setIntroText((prev) => prev + introParagraph[currentLetterIndex]);
          currentLetterIndex++;
        } else {
          clearInterval(intervalId);
          setTimeout(() => {
            setVisibility(false);
            sessionStorage.setItem('introShown', 'true');
          }, 1000);
        }
      }, 50); // Adjust interval time as needed

      return () => clearInterval(intervalId);
    } else {
      setVisibility(false);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleclick = ()=>{

    if(inputText.trim() !== ' '){

      const newMsg = {
        text: inputText,
        sender: 'user',
      }
     
      fetch("http://localhost:4000/sendmsg",{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(newMsg)
      })
      .then(resp=>{
        if(!resp.ok){
          throw new Error('Network response was not ok ' + resp.statusText);
        }
        return resp.json();
      })
      .then((data)=>{
        console.log(data)
        const updatedMessages = [...messages, newMsg, data];
        setMessages(updatedMessages);
      })
      
      setInputText('');
    }
  }

  const handleKeydown = (e)=>{
    if(e.key === 'Enter'){
      e.preventDefault()
      handleclick()
    }
  }

  const handleChange= (e)=>{
    setInputText(e.target.value)
  }

  return (
    <div className='app'>
        <Top/>
        <hr className='app-hr'/>
        {
        isVisibility && 
          <div className='intro'>
            <p>{introText.trim()}</p>
          </div>
        }
        
        <div className='chat-container' ref={chatContainerRef}>
        {
          messages.map((message,index)=>(
            <div key={index} className={`msg-container ${message.sender}`}>
              {
                message.sender === "user"?(
                
                  <>
                    <div  className={`message ${message.sender}`} >
                      {message.text}
                    </div>
                    <div className='message-img'>
                      {message.sender === 'Bot'?<img id='cloud-img' src={cloud} alt=''/>:<img id='user-img' src={user} alt=''/>}
                    </div>
                  </>
                )
                :(
                
                  <>
                    <div className='message-img'>
                      {message.sender === 'Bot'?<img id='cloud-img' src={cloud} alt=''/>:<img id='user-img' src={user} alt=''/>}
                    </div>
                    <div  className={`message ${message.sender}`} >
                      {message.text}
                    </div>
                  </>
                )
              }
            </div>    
          ))
        }
        </div>
        <div className='bottom'>
          <textarea placeholder='Enter your prompt here' value={inputText} onChange={handleChange} onKeyDown={handleKeydown} ></textarea>
          <button onClick={handleclick}><img src={send} alt=''/></button>
        </div>
    </div>
  )
}

export default App