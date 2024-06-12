import React, { useContext } from 'react';
import './main.css';
import {Context} from '../../context/Context';

function Main() {
    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context);

    const handleForm = (e) => {
        e.preventDefault();
        onSent();
    }

  return (
    <div className='main'>
        <div className='nav'>
            <a className='link' href='./'>
                <img className='logo' src='./logo.png' alt='AIbcd logo' />
            </a>
            <a className='link' href='#'>
                <img className='user' src='./user.png' alt='User icon' />
            </a>
        </div>
        <div className='main-container'>
            {!showResult
            ? <>
                <div className='greet'>
                    <h1 className='display-1'><span>Hello, Admin.</span></h1>
                    <h2 className='display-2'>How can I help you today?</h2>
                </div>
                <div className='cards'>
                    <div className='card'>
                        <p>Suggest beautiful places to see on an upcoming road trip</p>
                        <i className='bi bi-compass'></i>
                    </div>
                    <div className='card'>
                        <p>Briefly summarize this concept: urban planning</p>
                        <i className='bi bi-lightbulb'></i>
                    </div>
                    <div className='card'>
                        <p>Brainstorm team bonding activities for our work retreat</p>
                        <i className='bi bi-chat-dots'></i>
                    </div>
                    <div className='card'>
                        <p>Improve the readability of the following code</p>
                        <i className='bi bi-code-square'></i>
                    </div>
                </div>
            </>
            :
            <div className='result'>
                <div className='result-title'>
                    <img className='user' src='./user.png' alt='User icon' />
                    <p>{recentPrompt}</p>
                </div>
                <div className='result-data'>
                    <img className='user' src='./icon.png' alt='AIbcd icon' />
                    {loading
                    ?
                    <div className='loader'>
                        <img src='./loading.gif' alt='Loading icon' />
                    </div>
                    : <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    }
                    
                </div>
                
            </div>
            
            }
            
        </div>
        <div className='main-bottom'>
            <form className='search-box' onSubmit={handleForm}>
                <input type='text' placeholder='Please enter a prompt here...' onChange={(e) => setInput(e.target.value)} value={input} />
                <div>
                    <a className='link' href='#'>
                        <i className='bi bi-images'></i>
                    </a>
                    <a className='link' href='#'>
                        <i className='bi bi-mic'></i>
                    </a>
                    <a className='link' href='#' onClick={() => onSent()}>
                        <i className='bi bi-send'></i>
                    </a>
                </div>
            </form>
            <p className='bottom-info'>
                <b>Based on Google's Gemini API.</b> Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
            </p>
        </div>
    </div>
  )
}

export default Main
