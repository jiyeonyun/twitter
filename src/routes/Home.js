import React, { useEffect, useState } from 'react';
import { dbService } from "../myBase";
import { addDoc, collection,query,orderBy,onSnapshot } from "firebase/firestore";
import Nweet from '../components/Nweet';
const Home = ({userObj}) => {
    const[nweet,setNweet] = useState("");
    const[nweets,setNweets] = useState([]);
    const[fileURL , setFileURL] = useState();
    useEffect(() => {
        const q = query(
            collection(dbService, "nweets"),
            orderBy("createdAt", "desc")
            );

            onSnapshot(q, (snapshot) => {
                const nweetArr = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setNweets(nweetArr);
                });
    }, []);

    const onSubmit = async(event) =>{
        event.preventDefault();
            const docRef = await addDoc(collection(dbService,"nweets"),{
                text:nweet,
                createdAt : Date.now(),
                creatorId: userObj.uid, 
            });
        setNweet("");
    };
    const onChange = (event)=>{
        const {target:{value},
            } = event;
            setNweet(value);
    };
    const onFileChange = (event) =>{
        const {target : {files},
        } = event;
        const theFile = files[0];
        const reader =new FileReader();
        reader.onloadend = (finishedEvent) =>{
            const {currentTarget:{
                result,}
            } = finishedEvent;
            setFileURL(result);
        }
        reader.readAsDataURL(theFile);
    };
    const onClearPhotoClick = ()=> setFileURL(null);
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" value={nweet} onChange={onChange} placeholder="what's on your mind?" maxLength={120}/>
                <input type='file' accept='image/*' onChange={onFileChange}/>
                <input type='submit' value='nweet'/>
                {
                    fileURL && 
                        (<div>
                        <img src={fileURL} width='50px' height='50px'/>
                        <button onClick={onClearPhotoClick}>Clear</button>
                        </div>)
                }
            </form>
            <div>
                {nweets.map((nweet) =>(
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    );
};

export default Home;