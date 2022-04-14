import { async } from '@firebase/util';
import React, { useState } from 'react';
import { dbService } from '../myBase';
import { doc, deleteDoc, updateDoc }from"firebase/firestore";

const Nweet = ({nweetObj , isOwner}) => {
    const [editing,setEditing] = useState(false);
    const [newNweet,setNewNweet] = useState(nweetObj.text);

    const NweetTextRef =doc(dbService, "nweets", `${nweetObj.id}`);
    const onDeleteClick = async()=>{
        const ok = window.confirm('이 트윗을 삭제 하시겠습니까?');
        if(ok){
            await deleteDoc(NweetTextRef ); 
        }
    };
    const toggleEditing = () => setEditing((prev)=> !prev);
    const onSubmit = async (event)=>{
        event.preventDefault();
        await updateDoc(NweetTextRef, {
            text: newNweet,
            });
        setEditing(false);
    };
    const onChange = (event)=>{
        const{
            target: {value},
        } = event;
        setNewNweet(value);
    };
    return(
        <div>
            {editing ? 
            <>
            {isOwner && 
            <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" placeholder="수정하세요" value={newNweet} required/>
                <input type="submit" value="Update"/>
            </form>
            <button onClick={toggleEditing}>Cancle</button>
            </>
            }
            </>
            :
            <>
                <h3>{nweetObj.text}</h3>
                {nweetObj.attachmentUrl && ( <> <img src={nweetObj.attachmentUrl} width='50px' height={'50px'}/> </>) }
                {isOwner && (
                    <>
                    <button onClick={onDeleteClick}>delete</button>
                    <button onClick={toggleEditing}>edit</button>
                    </>
                    )
                }      
            </>
            }
        </div>
    );       
};

export default Nweet;