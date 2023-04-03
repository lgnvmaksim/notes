import React, {useEffect, useState} from 'react';
import {v1} from "uuid";
import {Notes} from "./Notes";


 type NoteList = {
    id: string;
    title: string;
    text: string;
    tags: TagsType[];
}

type TagsType = {
    id: string
    tag: string
}

export type AppState = {
    notes: NoteList[];
}


export const App = () => {
    const initialAppState: AppState = {
        notes: [
            {
                id: v1(),
                title: "New title",
                text: "New post",
                tags: [{
                    id: v1(),
                    tag: 'New tag'
                }],
            }]
    }
    const [state, setState] = useState<AppState>(initialAppState)

    const onSaveNote = (note: NoteList) => {
        const index = state.notes.findIndex((n) => n.id === note.id);
        if (index >= 0) {
            state.notes[index] = note;
            setState({notes: state.notes});
        } else {
            const notes = [...state.notes, note];
            setState({notes});
        }
        localStorage.setItem("notes", JSON.stringify(state.notes));
    };

    useEffect(() => {
        const data = localStorage.getItem("notes");
        if (data) {
            const notes = JSON.parse(data);
            setState({notes});
        } else {
            setState(initialAppState);
        }
    }, []);

    return (
        <div>
<Notes state={state}/>
        </div>
    );
}



{/*<button onClick={()=>onSaveNote(*/}
{/*    {*/}
{/*        id: v1(),*/}
{/*        title: "Новая заметка",*/}
{/*        text: "Текст заметки",*/}
{/*        tags: [{*/}
{/*            id: v1(),*/}
{/*            tag: 'Новый тег'*/}
{/*        }],*/}
{/*    }*/}
{/*)}>Test</button>*/}