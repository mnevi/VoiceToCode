// VoiceToCode.jsx
// This component combines voice recognition with a code editor (Monaco).
// When you speak, the transcript is sent to the code editor in real time.
// Now, it uses a local Llama model (via Ollama) to turn natural language into code.

import { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import VoiceRecognition from './VoiceRecognition';

const VoiceToCode = () => {
  // State to hold the code shown in the editor
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  // Async function to call local Llama (Ollama) API
  const generateCodeFromTranscript = async (transcript) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3', // or 'llama2' if you use that
          // prompt needs to be as precise as possible for accurate responses
          prompt: `Only output the Python code. Do not include any explanation or comments. Instruction: ${transcript}`,
          stream: false
        })
      });
      const data = await response.json();
      setCode(data.response || '');
    } catch (err) {
      setCode('// Error connecting to local Llama API');
    } finally {
      setLoading(false);
    }
  };

  // Handler to receive transcript from VoiceRecognition and update code
  const handleTranscript = (transcript) => {
    if (transcript && transcript.trim()) {
      generateCodeFromTranscript(transcript);
    }
  };

  return (
    // Layout: voice recognition on top, code editor below
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Pass title prop to change h2 to 'Voice To Code' */}
      <VoiceRecognition onTranscript={handleTranscript} title="Voice To Code" />
      <div style={{ flex: 1, marginTop: 20 }}>
        {/* MonacoEditor displays and allows editing of code */}
        <MonacoEditor
          height="60vh"
          defaultLanguage="javascript"
          value={code}
          onChange={setCode}
          theme="vs-dark"
          options={{ readOnly: loading }}
        />
        {loading && <div style={{ color: 'orange', marginTop: 10 }}>Generating code from AI...</div>}
      </div>
    </div>
  );
};

export default VoiceToCode;
