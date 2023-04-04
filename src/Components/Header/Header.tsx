import React from 'react';
import s from './Header.module.scss'
import {UniversalInput} from "../InputSuper";

type HeaderType={
    addNewNote:(newTitle: string)=>void
}

export const Header = ({addNewNote}:HeaderType) => {
    return (
        <div  className={s.header}>
            Welcome to Notes
            <UniversalInput callback={addNewNote}/>
        </div>
    );
};
