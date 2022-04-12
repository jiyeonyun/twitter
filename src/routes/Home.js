import React, { useState } from 'react';
import { dbService } from "../myBase";
import { addDoc, collection } from "firebase/firestore";
const Home = (props) => {
    const[nweet,setNweet] = useState("");
    const onSubmit = async(event) =>{
        event.preventDefault();
            const docRef = await addDoc(collection(dbService,"nweets"),{
                nweet,
                createdAt : Date.now(),
            });
        setNweet("");
    };
    const onChange = (event)=>{
        const {target:{value},
            } = event;
            setNweet(value);
    };
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" value={nweet} onChange={onChange} placeholder="what's on your mind?" maxLength={120}/>
                <input type='submit' value='nweet'/>
            </form>
        </div>
    );
};

export default Home;