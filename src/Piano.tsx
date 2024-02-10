import Key from "./components/Key.tsx";
import notes from "./helper/notes.ts";
import React, { KeyboardEvent, useState } from "react";
import keyMapping from './helper/keyMapping.ts';
import * as Tone from 'tone'

const playSound = (event: KeyboardEvent<HTMLDivElement>) => {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(keyMapping[event.key], 0.001);
}

const Piano = () => {
    const [pressed, setPressed] = useState<string>('');

    const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
        setPressed(keyMapping[event.key]);
        playSound(event);
    }
    const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
        setPressed('');
    }

    return (
        <div className="piano-app" tabIndex={0} onKeyDown={handleKeyPress} onKeyUp={handleKeyUp}>
            <div className="piano">
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
