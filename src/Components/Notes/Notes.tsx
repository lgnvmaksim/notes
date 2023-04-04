import React from 'react';
import {TextChanger} from "../TextChanger";
import {TagsType} from "../../App";
import s from './Notes.module.scss'
import c from './../../styles/buttonStyles.module.scss'

type NotesType = {
    commonId: string
    title: string
    text: string
    tags: TagsType[]
    onSaveNote: () => void
    changeNoteTitle: (id: string, newTitle: string) => void
    changeNoteText: (id: string, newTitle: string) => void
    tagChanger: (id: string, hashTag: string, text: string) => void
    textWithTags: (hashTag: string, text: string) => TagsType[]
    removeButtonHandler: (id: string) => void


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
                      }: NotesType) => {


    return <div className={s.body}>

        <div className={s.notesBlock}>
            <h2 className={s.title}>
                <TextChanger
                    tagChanger={()=> tagChanger(commonId, '#', text)}
                    title={title}
                             onSaveNote={() => onSaveNote()}
                             changeTitle={(newTitle: string) => {
                                 changeNoteTitle(commonId, newTitle)
                             }}/>
                <button className={c.button} onClick={() => removeButtonHandler(commonId)}>x</button>
            </h2>
            <span>
                <TextChanger
                    tagChanger={()=> tagChanger(commonId, '#', text)}
                    title={text}
                    onSaveNote={() => onSaveNote()}
                    changeTitle={(newText: string) => {
                        changeNoteText(commonId, newText)
                    }}/>
            </span>
         

            <ul className={s.tag}>
                Tags:
                {tags.map(el => {
                    return <li className={s.tagsStyle} key={el.commonId}>
                        {el.tag}
                    </li>
                })}
            </ul>
        </div>

    </div>
}

