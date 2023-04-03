import {ChangeEvent, useState} from "react";

type TextChangerType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const TextChanger = ({title, changeTitle}: TextChangerType) => {
    const [text, setText] = useState(title)
    const [open, setOpen] = useState(false)

    const openMode = () => {
        setOpen(!open)
        if (text.trim() !== '') {
            changeTitle(text.trim())
        } else {
            setText(title)
        }
    }

    const onChangeTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    return open
        ? <input onBlur={openMode} onChange={onChangeTextHandler} autoFocus value={text} onKeyDown={(e) => {
            if (e.key === 'Enter') {
                openMode()
            }
        }}/>
        : <span onClick={openMode}>{title}</span>
}