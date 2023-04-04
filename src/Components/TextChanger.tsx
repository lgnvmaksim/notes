import {ChangeEvent, useState} from "react";
import {NoteList} from "../App";

type TextChangerType = {
    title: string
    changeTitle: (newTitle: string) => void
    style?: {}
    // tagChanger?:(idTag: string, hashTag: string, text: string)=>void
    // tagsId?: string
    onSaveNote: () => void
}

export const TextChanger = ({title, changeTitle, style, onSaveNote}: TextChangerType) => {
    const [text, setText] = useState(title)
    const [open, setOpen] = useState(false)

    const openMode = () => {
        onSaveNote()
        if (text.trim() !== '') {
            changeTitle(text.trim())
        } else {
            setText(title)
        }

        setOpen(!open)

    }

    const onChangeTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    return open
        ?
        <input onBlur={openMode} onChange={onChangeTextHandler} style={style} autoFocus value={text} onKeyDown={(e) => {
            if (e.key === 'Enter') {
                openMode()
            }
        }}/>
        : <span onClick={() => setOpen(!open)}>{title}</span>
}