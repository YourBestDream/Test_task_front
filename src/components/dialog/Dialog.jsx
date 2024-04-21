import { useState, useEffect } from 'react';
import AudioRecorder from "./AudioRecorder";
import styles from './dialog.module.scss';
import api from '../../api/api';

export default function Dialog({ remainingRequests }) {
    const [count, setCount] = useState(remainingRequests);
    const [transcription, setTranscription] = useState('');

    useEffect(() => {
        setCount(remainingRequests);
    }, [remainingRequests]);

    const handleRecordingComplete = (audioBlob) => {
        if (count > 0) {
            const formData = new FormData();
            formData.append('file', audioBlob, 'audio.mp3');

            api.post('/speech2text', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                setTranscription(response.data.transcription); 
                setCount(count - 1);
                console.log('Server response:', response.data);
                api.post('/update-requests-and-history', {
                    newCount: count - 1,
                    transcription: response.data.transcription
                }).then(response => {
                    console.log('Update successful:', response.data.message);
                }).catch(error => {
                    console.error('Update error:', error);
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                setTranscription('Error processing the audio file');
            });
        } else {
            setTranscription("You ran out of tries");
        }
    };

    return (
        <div className={styles.dialog__container}>
            <span className={`${styles.dialog__counter} text-xl`}>Tries for using API left: {count}</span>
            <span className={`${styles.dialog__response} text-3xl`}>{transcription}</span>
            <AudioRecorder className={styles.dialog__record} onRecordingComplete={handleRecordingComplete} />
        </div>
    );
}
