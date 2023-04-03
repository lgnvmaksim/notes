import React from 'react';
import {TextChanger} from "./Components/TextChanger";
import {NoteList, TagsType} from "./App";

type NotesType = {
    idNote: string
    title: string
    text: string
    tags: TagsType[]
    onSaveNote: (note: NoteList)=>void
    changeNoteTitle:(id: string, newTitle: string)=>void
    changeNoteText:(id: string, newTitle: string)=>void
    tagChanger:( hashTag: string, text: string)=>void

}


export const Notes = ({title, text, tags, onSaveNote, idNote, changeNoteTitle, changeNoteText,tagChanger}: NotesType) => {


    return (
        <div style={{margin: '20px', padding: '10px', border: '1px solid black'}}>

         <h2> <TextChanger title={title} changeTitle={(newTitle:string)=>{changeNoteTitle(idNote, newTitle)}}/></h2>
            <span><TextChanger title={text} changeTitle={(newText:string)=>{changeNoteText(idNote, newText)}}/></span>
            <div>
                <button onClick={()=>tagChanger( '#', text)}>Add tags</button>
            </div>
            <ul>
                {tags.map(el=>{
                    return <li key={el.id}>
                        {el.tag}
                    </li>
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