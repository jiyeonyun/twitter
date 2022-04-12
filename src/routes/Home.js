import React, { useEffect, useState } from 'react';
import { dbService } from "../myBase";
import { addDoc, collection,getDocs,query } from "firebase/firestore";
const Home = (props) => {
    const[nweet,setNweet] = useState("");
    const[nweets,setNweets] = useState([]);
    const getNweets = async () => {
        const q = query(collection(dbService, "nweets"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const nweetObj = {
                ...doc.data(),
                id: doc.id,
            }
            setNweets(prev => [nweetObj, ...prev]);
        });
    }
    ;
    useEffect(() => {
        getNweets();
    }, []);
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
            <div>
                {nweets.map((nweet) =>(
                    <div key={nweet.id}>
                        <h3>{nweet.nweet}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;