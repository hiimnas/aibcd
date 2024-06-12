import React, { useContext, useState } from 'react';
import './sidebar.css';
import { Context } from '../../context/Context';

function Sidebar() {
    const [extended, setExtended] = useState(false);
    const {onSent, prevPrompts, setRecentPrompt, newChat} = useContext(Context);

    const loadPrompt = async(prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    }

  return (
    <div className='sidebar'>
        <div className='top'>
            <div className={'menu'}>
                <a className='link' role='button' onClick={() => setExtended(prev => !prev)}>
                    <i className='bi bi-list'></i>
                </a>
                <a className='new-chat link' role='button' onClick={() => newChat()}>
                    <i className='bi bi-plus'></i>
                    {extended ? <p>New Chat </p> : null}
                </a>
            </div>
            {extended ? 
            <div className='recent'>
                <p className='recent-title'>Recent</p>
                {prevPrompts.map((item, i) => {
                    return (
                        <a className='recent-entry link' role='button' onClick={() => loadPrompt(item)}>
                            <i className='bi bi-chat-left'></i>
                            <p>{item.length > 13 ? item.substring(0, 13) + "..." : item}</p>
                        </a>
                    )
                })}
                
            </div>
            : null
            }
            
        </div>
        <div className='bottom'>
            <a className='bottom-item link' href='#'>
                <i className='bi bi-question-circle'></i>
                {extended ? <p>Help</p> : null}
            </a>
            <a className='bottom-item link' href='#'>
                <i className='bi bi-clock-history'></i>
                {extended ? <p>Activity</p> : null}
            </a>
            <a className='bottom-item link' href='#'>
                <i className='bi bi-gear'></i>
                {extended ? <p>Settings</p> : null}
            </a>
        </div>
    </div>
  )
}

export default Sidebar