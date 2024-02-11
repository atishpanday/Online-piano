import React, { KeyboardEvent, useState } from "react";

import Screen from "./components/Screen.tsx";
import Key from "./components/Key.tsx";

import keyMapping from './helper/keyMapping.ts';
import notes from "./helper/notes.ts";

import * as Tone from 'tone'

const Piano = () => {
    const [on, setOn] = useState<boolean>(false);
    const [pressed, setPressed] = useState<string>('');
    const [notesPlayed, setNotesPlayed] = useState<string[]>([]);

    const synth = new Tone.Synth().toDestination();

    const turnOn = () => {
        setOn(prev => !prev);
        setNotesPlayed([])
    }

    const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
        setPressed(keyMapping[event.key]);
        playSound(event);
        setNotesPlayed(prev => [...prev, keyMapping[event.key]]);
    }
    const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
        setPressed('');
    }

    const playSound = (event: KeyboardEvent<HTMLDivElement>) => {
        synth.triggerAttackRelease(keyMapping[event.key], 0.001);
    }

    const playRecording = (notesPlayed: string[]) => {
        notesPlayed.map((note, i) => (
            synth.triggerAttackRelease(note, 0.001, `+${i * 0.2}`)
        ))
    }

    const download = () => {
        const recorder = new Tone.Recorder()

        synth.connect(recorder)

        recorder.start()

        notesPlayed.map((note, i) => (
            synth.triggerAttackRelease(note, 0.001, `+${i * 0.2}`)
        ))

        setTimeout(async () => {
            const recording = await recorder.stop();
            const url = URL.createObjectURL(recording);
            const anchor = document.createElement("a");
            anchor.download = "recording.webm";
            anchor.href = url;
            anchor.click();
        }, 4000);
    }

    return (
        <div className="piano-app" tabIndex={0} onKeyDown={(e) => on && handleKeyPress(e)} onKeyUp={handleKeyUp}>
            <div className="piano">
                <div className="recorder">
                    <button className={`${on ? 'stop' : 'start'} btn`} onClick={() => turnOn()}>{`${on ? 'Turn off' : 'Turn on'}`}</button>
                    <Screen notesPlayed={notesPlayed} on={on} />
                    <div className="recording-btn-container">
                        <button className="play btn" onClick={() => playRecording(notesPlayed)}>Play</button>
                        <button className="download btn" onClick={() => download()} disabled={notesPlayed.length === 0}>Download</button>
                    </div>
                </div>
                <div className="piano-keys">
                    {[...Array(5)].map((_, i) => (
                        <>
                            {notes.map((key, j) =>
                                <Key key={key} index={i * 12 + j} id={`${key}${i + 1}`} keyNote={key} pressed={pressed} />
                            )}
                        </>
                    ))}
                    <Key index={60} id={`C6`} keyNote={"C"} pressed={pressed} />
                </div>
            </div>
        </div>
    );
}

export default Piano;
