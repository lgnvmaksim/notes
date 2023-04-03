import React from 'react';
import {TextChanger} from "./Components/TextChanger";
import {AppState, NoteList} from "./App";

type NotesType = {
    id: string
    title: string
    text: string
    tags: string[]
    onSaveNote: (note: NoteList)=>void
    changeNoteTitle:(id: string, newTitle: string)=>void
    changeNoteText:(id: string, newTitle: string)=>void
    tagChanger:(id: string, tag: string, text: string)=>void

}

export const Notes = ({title, text, tags, onSaveNote, id, changeNoteTitle, changeNoteText,tagChanger}: NotesType) => {

    const tagsHandler = () => {
       tagChanger(id, '#', text)
    }

    return (
        <div style={{margin: '20px', padding: '10px', border: '1px solid black'}}>

         <h2> <TextChanger title={title} changeTitle={(newTitle:string)=>{changeNoteTitle(id, newTitle)}}/></h2>
            <span><TextChanger title={text} changeTitle={(newText:string)=>{changeNoteText(id, newText)}}/></span>
            <button onClick={tagsHandler}>add tags</button>
            <ul>
                {tags.map(el=>{
                    return <li>{el}</li>
                })}
            </ul>

        </div>
    );
}

// type NoteListProps = AppState
//
// const NoteList = ({ notes }: NoteListProps) => {
//     const [filterTag, setFilterTag] = React.useState("#");
//
//     const filteredNotes = React.useMemo(() => {
//         if (!filterTag) {
//             return notes;
//         }
//         return notes.filter((note) => note.tags.includes(filterTag));
//     }, [notes, filterTag]);
//
//
//     const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setFilterTag(event.target.value);
//     };
//
//     return (
//         <div>
//             <div>
//                 <input
//                     type="text"
//                     placeholder="Filter by tag"
//                     value={filterTag}
//                     onChange={handleFilterChange}
//                 />
//             </div>
//             {filteredNotes.map((el) => (
//                 <Notes key={el.id}  note={note} />
//             ))}
//         </div>
//     );
// };
//
// export default NoteList;