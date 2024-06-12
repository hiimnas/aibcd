import { createContext, useState } from "react";
import chat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function() {
            setResultData(prev => prev + nextWord);
        }, 75*index)
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async(prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input);
        let response = '';
        if (prompt !== undefined) {
            response = await chat(prompt);
            setRecentPrompt(prompt);
        }
        else {
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await chat(input);
        }
        setInput("");
        let formatted = response.replace(/##\s*(.+)/g, '<h2>$1</h2>').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*\s(.+)/g, '<li>$1</li>').replace(/(<li>.+<\/li>)/g, '<ul>$1</ul>').replace(/\n/g, '<br>');
        formatted = formatted.replace(/<br><ul>/g, '<ul>').replace(/<\/ul><br>/g, '</ul>').replace(/<br><h2>/g, '<h2>').replace(/<\/h2><br>/g, '</h2>').replace('><br><', '><');
        let final = formatted.split(' ');
        for (let i = 0; i < final.length; i++) {
            const next = final[i];
            delayPara(i, next + ' ');
        }
        setLoading(false);
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    };

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider