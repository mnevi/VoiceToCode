import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import VoiceRecognition from './components/VoiceRecognition'
import VoiceToCode from './components/VoiceToCode'
import './App.css'

function App() {
  const [mode, setMode] = useState('text'); // 'text' or 'code'

  // toggle for two different modes
  return (
    <div className="App">
      <div style={{ margin: '20px' }}>
        <button onClick={() => setMode('text')} disabled={mode === 'text'}>
          Voice to Text
        </button>
        <button onClick={() => setMode('code')} disabled={mode === 'code'} style={{ marginLeft: '10px' }}>
          Voice to Code
        </button>
      </div> 
      {mode === 'text' ? <VoiceRecognition /> : <VoiceToCode />} 
    </div>
  );
}

export default App
