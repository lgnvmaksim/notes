import {ChangeEvent, useState, KeyboardEvent} from "react";
import s from '../styles/inputStyles.module.scss';
import c from '../styles/buttonStyles.module.scss'

type InputType = {
    callback: (text: string) => void
}


export const UniversalInput = (props: InputType) => {
    const [text, setText] = useState('')
    // const [error, setError] = useState<string | null>(null)

    const onChangeTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
        // setError(null)
    }
    const addTaskButtonHandler = () => {
        if (text.trim()) {
            props.callback(text.trim())
            setText('')
        } else {
            // setError('Лососни тунца')
        }
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskButtonHandler()
        }
    }
    return <div>
        <input
            className={s.input}
            value={text}
    onChange={onChangeTextHandler}
    onKeyDown={onKeyDownHandler}
    // className={error ? a.error : undefined}
    />
    <button onClick={addTaskButtonHandler} className={c.button} >+</button>
    {/*{error && <div className={a.errorMessage}>{error}</div>}*/}
        </div>
    }