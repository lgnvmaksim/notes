import React from 'react';
import {AppState} from "./App";

type NotesType = {
    state: AppState
}

export const Notes = ({state}: NotesType) => {
    return (
        <div>
<div>
    {state.notes.map((el=>{
        return <div key={el.id}>
            <h2>{el.title}</h2>
            <p>{el.text}</p>
            <ul>{el.tags.map((elTag)=>{
                return <li key={elTag.id}>
                    {elTag.tag}
                </li>
            })}</ul>
        </div>
    }))}
</div>
        </div>
    );
}