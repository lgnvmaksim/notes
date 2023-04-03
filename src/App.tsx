import React, {useEffect, useState} from 'react';
import {v1} from "uuid";
import {Notes} from "./Notes";


export type NoteList = {
    id: string;
    title: string;
    text: string;
    tags: string[];
}


export type AppState = {
    notes: NoteList[];
}


export const App = () => {
    const initialAppState: AppState = {
        notes: [
            {
                id: v1(),
                title: "New title1",
                text: "Привет#Петя как #milk#and your     #mom    ",
                tags:  ['']
            },
            {
                id: v1(),
                title: "New title2",
                text: "New post1",
                tags:  ['']
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

    const changeNoteTitle = (id: string, newTitle: string) => {
        setState({...state, notes: state.notes.map(el=>el.id===id ? {...el, title: newTitle} :el)})
    }
    const changeNoteText = (id: string, newTitle: string) => {
        setState({...state, notes: state.notes.map(el=>el.id===id ? {...el, text: newTitle} :el)})
    }

    const tagChanger = (id: string, tag: string, text: string) => {
        const str = text.split(' ').map(el=>el[0]===tag ? el : '')
        const res = str.filter(f=>f!=='').join(' ').replace(/[\s.,/%]/g, '')
        setState({...state, notes: state.notes.map(el=>el.id===id ? {...el, tags: [res]} : el)})
    }

    return (
        <div style={{display: 'flex', margin: '15px'}}>
            {state.notes.map((el)=>{

                return (
                    <Notes
                    key={el.id}
                    id={el.id}
                    title={el.title}
                    text={el.text}
                    tags={el.tags}
                    tagChanger={tagChanger}
                    onSaveNote={onSaveNote}
                    changeNoteTitle={changeNoteTitle}
                    changeNoteText={changeNoteText}
                    />
                )
            })}
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