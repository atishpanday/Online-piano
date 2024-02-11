import React from "react";

type ScreenProps = {
    notesPlayed: string[],
    on: boolean,
}

const Screen = ({ notesPlayed, on }: ScreenProps) => {
    return (
        <div className={`screen ${on ? 'on' : 'off'}`}>
            {notesPlayed.map((note, i) => <text className="screen-notes">{note && `${note} `}</text>)}
            {on && notesPlayed.length === 0 && <text className="welcome-txt">Welcome to online piano</text>}
        </div>
    );
}

export default Screen;