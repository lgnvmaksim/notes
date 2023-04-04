import React, {useEffect, useState} from 'react';
import {Notes} from "./Notes";
import {UniversalInput} from "./Components/InputSuper";


export type NoteList = {
    commonId: string;
    title: string;
    text: string;
    tags: TagsType[];
}

export type TagsType = {
    commonId: string
    tag: string
}


export type AppState = {
    notes: NoteList[];
}


export const App = () => {

    const initialAppState: AppState = {
        notes: [
            {
                commonId: '1',
                title: "New title1",
                text: "What need to buy: #orange, #milk, #bread",
                tags: [
                    {
                        commonId: '1',
                        tag: ''
                    }
                ]
            }
        ]
    }
    const [state, setState] = useState<AppState>(initialAppState)



    const onSaveNote = (note: NoteList) => {
        const index = state.notes.findIndex((n) => n.commonId === note.commonId);
        if (index >= 0) {
            state.notes[index] = note;
            setState({notes: state.notes});
        } else {
            const notes = [...state.notes, note];
            setState({notes});
        }
        // localStorage.setItem("notes", JSON.stringify(state.notes));
    };

    useEffect(()=>{
        localStorage.setItem("notes", JSON.stringify(state.notes))
    },[state])


    const changeNoteTitle = (id: string, newTitle: string) => {
        setState({...state, notes: state.notes.map(el => el.commonId === id ? {...el, title: newTitle} : el)})
    }
    const changeNoteText = (id: string, newTitle: string) => {
        setState({...state, notes: state.notes.map(el => el.commonId === id ? {...el, text: newTitle} : el)})
    }
    const textWithTags = (hashTag: string, text: string) => {
        const str = text.replace(/[.,/%]/g, '').split(' ').map(el => el[0] === hashTag ? el : '').filter(f => f !== '')
        const arr = Object.assign({}, str)
        return Object.entries(arr).map(([commonId, tag]) => ({commonId, tag}));
    }

    const tagChanger = (idTag: string, hashTag: string, text: string) => {
        setState({
            ...state,
            notes: state.notes.map(el => el.commonId === idTag ? {...el, tags: textWithTags(hashTag, text)} : el)
        })
    }

    const addNewNote = (newTitle: string) => {
        let randomId: string
        const generateRandomId = () => {
            if (!randomId) {
                randomId = "randomNum_" + Math.floor(Math.random() * 1000000).toString();
            }
            return randomId;
        }
        const newNote = {
            commonId: generateRandomId(),
            title: newTitle,
            text: "You can change your #text",
            tags: [
                {
                    commonId: generateRandomId(),
                    tag: '#text'
                }
            ]
        }
        setState({...state, notes: [...state.notes, newNote]})
    }

    const removeButtonHandler = (id: string) => {
        setState({ ...state,
            notes: state.notes.filter(f=>f.commonId!==id)})
    }


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
        <div style={{display: 'flex', margin: '15px'}}>
            <UniversalInput callback={addNewNote}/>
            {state.notes.map((el) => {

                return (
                    <Notes
                        key={el.commonId}
                        commonId={el.commonId}
                        title={el.title}
                        text={el.text}
                        tags={el.tags}
                        tagChanger={tagChanger}
                        onSaveNote={onSaveNote}
                        changeNoteTitle={changeNoteTitle}
                        changeNoteText={changeNoteText}
                        textWithTags={textWithTags}
                        removeButtonHandler={removeButtonHandler}
                    />
                )
            })}
        </div>
    );
}


