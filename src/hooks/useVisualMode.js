import { useState } from 'react'

export default function useVisualMode (initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  const transition = function (mode, replace = false) {
    if(replace){
      history.pop()
    }
    setHistory(prev => [...prev, mode])
    setMode(mode)
  }

  const back = function () {
    if(history.length >= 2) {
    history.pop()
    setMode(history[history.length -1])
    console.log('history in if', history)
    } else {
      console.log('history out of if', history)
    }
  }

  return { mode, transition, back } 
  
}