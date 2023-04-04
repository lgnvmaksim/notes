import React from 'react';
import {TextChanger} from "./Components/TextChanger";
import {AppState, NoteList, TagsType} from "./App";

type NotesType = {
    commonId: string
    title: string
    text: string
    tags: TagsType[]
    onSaveNote: (note: NoteList) => void
    changeNoteTitle: (id: string, newTitle: string) => void
    changeNoteText: (id: string, newTitle: string) => void
    tagChanger: (id: string, hashTag: string, text: string) => void
    textWithTags: (hashTag: string, text: string) => TagsType[]
    removeButtonHandler: (id: string)=>void


}


export const Notes = ({
                          title,
                          text,
                          tags,
                          onSaveNote,
                          commonId,
                          changeNoteTitle,
                          changeNoteText,
                          tagChanger,
                          removeButtonHandler,
                          textWithTags
                      }: NotesType) => {


    return (
        <div style={{margin: '20px', padding: '10px', border: '1px solid black'}}>

            <h2><TextChanger title={title} onSaveNote={() => onSaveNote({commonId, title, text, tags})}
                             changeTitle={(newTitle: string) => {
                                 changeNoteTitle(commonId, newTitle)
                             }}/>
                <button onClick={()=>removeButtonHandler(commonId)}>x</button>
            </h2>
            <span><TextChanger title={text} onSaveNote={() => onSaveNote({commonId, title, text, tags})}
                               changeTitle={(newText: string) => {
                                   changeNoteText(commonId, newText)
                               }}/></span>
            <div>
                <button onClick={() => {
                    onSaveNote({commonId, title, text, tags})
                    tagChanger(commonId, '#', text)
                }}>Add tags
                </button>
            </div>
            <ul>
                {tags.map(el => {
                    return <li key={el.commonId}>

                        {el.tag}
                    </li>
                })}
            </ul>
        </div>
    );
}

