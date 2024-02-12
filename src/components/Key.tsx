import React from 'react'
import { mapping } from '../helper/keyMapping.ts';
import '../styles/styles.css'

type KeyProps = {
    index: number,
    id: string,
    keyNote: string,
    pressed: string,
}

const Key = ({ index, id, keyNote, pressed }: KeyProps) => {
    return (
        <div
            className={`${keyNote && keyNote.length > 1 ? 'black key' : 'white key'} ${pressed === id ? 'pressed' : ''}`}
            id={keyNote}>
            <text className={keyNote && keyNote.length > 1 ? 'white-mapping' : 'black-mapping'}>{mapping[index]}</text>
            <text className={keyNote && keyNote.length > 1 ? 'white-note' : 'black-note'}>{keyNote}</text>
        </div>
    );
}

export default Key;