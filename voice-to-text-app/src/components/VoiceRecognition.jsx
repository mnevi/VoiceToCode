// Created by Max Neville
import { useEffect, useRef, useState } from 'react';

// needs browser with Speech Recognition active
const VoiceRecognition = ({ onTranscript, title }) => {
    const [transcript, setTranscript] = useState('');
    const [listening, setListening] = useState(false);
    const recognitionRef = useRef(null);
    const listeningRef = useRef(false); // Track listening state for event handlers

    useEffect(() => {
        listeningRef.current = listening;
    }, [listening]);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) { // browser requirement
            console.log('SpeechRecognition', SpeechRecognition); //debugging
            alert('Your browser does not support Speech Recognition.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            if (!listeningRef.current) return; // Ignore late events
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                interimTranscript += event.results[i][0].transcript;
            }
            setTranscript(interimTranscript);
            // pass to VoiceToCode
            if (onTranscript) {
                onTranscript(interimTranscript);
            }
        };

        // error handling
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };

        recognitionRef.current = recognition;
    }, [onTranscript]);

    const startListening = () => {
        recognitionRef.current?.start();
        setListening(true);
        listeningRef.current = true;
    };

    const stopListening = () => {
        recognitionRef.current?.stop();
        setListening(false);
        listeningRef.current = false; // stops continuous learning
        // setTranscript(''); // Clear transcript on stop
        if (onTranscript) {
            onTranscript(''); // Notify parent that transcript is cleared
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h2>{title || 'Voice To Text'}</h2>
            <button onClick={startListening} disabled={listening}>Start</button>
            <button onClick={stopListening} disabled={!listening}>Stop</button>
            <p><strong>Transcript:</strong></p>
            <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '100px' }}>
                {transcript || 'Speak...'}
            </div>
        </div>
    );

};

export default VoiceRecognition;

