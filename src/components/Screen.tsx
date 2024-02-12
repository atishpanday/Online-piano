import React from "react";

type ScreenProps = {
    notesPlayed: string[],
    on: boolean,
}

const Screen = ({ notesPlayed, on }: ScreenProps) => {
    return (
        <div className={`screen ${on ? 'on' : 'off'}`}>
            {notesPlayed.map((note, i) => <text className="screen-notes">{note && `${note} `}</text>)}
            {on && notesPlayed.length === 0 &&
                <div className="welcome-txt">
                    <text>Welcome to online piano</text>
                </div>}
        </div>
    );
}

export default Screen;