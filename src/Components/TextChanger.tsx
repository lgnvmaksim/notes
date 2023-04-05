import {ChangeEvent, useEffect, useState} from "react";
import s from './../styles/inputStyles.module.scss'

type TextChangerType = {
    title: string
    changeTitle: (newTitle: string) => void
    onSaveNote: () => void
    tagChanger?:()=>void
}

export const TextChanger = ({title, changeTitle, onSaveNote,tagChanger}: TextChangerType) => {
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

    useEffect(()=>{
        if (tagChanger!==undefined){
            tagChanger()
        }
    },[open])

    const onChangeTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    return open
        ?
        <input className={s.input} onBlur={openMode} onChange={onChangeTextHandler} autoFocus value={text} onKeyDown={(e) => {
            if (e.key === 'Enter') {
                openMode()
            }
        }}/>
        : <span onClick={() => setOpen(!open)}>{title}</span>
}