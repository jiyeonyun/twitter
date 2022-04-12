import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { authService } from '../myBase';

const Auth = (props) => {
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[newAcount,setNewAcount] = useState(true);
    const[error,setError] = useState(''); 
    const onChange=(event)=>{ 
        const {target:{name,value}} = event;
        if(name === 'email'){
            setEmail(value);
        }
        else if(name === 'password'){
            setPassword(value);
        }
    };
    const onSubmit = async(event)=>{
        event.preventDefault();
        try{
            let data;
            if(newAcount){
                data = await createUserWithEmailAndPassword(authService,email,password);
            }   
            else{
                data = await signInWithEmailAndPassword(authService,email,password);
            }
            console.log(data);   
        }
        catch(error){
            setError(error.message.replace("Firebase: ", ""));
        };
        };
    const toggleAcount = ()=>{
        setNewAcount((prev)=>!prev);
    };
    const onSocialClick = async(event)=>{
        const {
            target : {name},
        } = event;
        let provider;
        if(name === 'google'){
            provider = new GoogleAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);
        console.log(data);
    };
    return(
    <div>
            <form onSubmit={onSubmit}>
                <input 
                    name='email'
                    type="text" 
                    placeholder='Email' 
                    required 
                    value={email}
                    onChange={onChange}
                />
                <input 
                    name='password'
                    type="password" 
                    placeholder='password' 
                    required 
                    value={password}
                    onChange={onChange}/>
                <input 
                    type="submit" 
                    value={newAcount ? "Create Acouunt" : "Login"}
                    required/>
                    {error}
            </form>
            <span onClick={toggleAcount}>{newAcount ? "Sign in" : "Create Acount"} </span>
        <div>
            <button name='google' onClick={onSocialClick}>continue with Google</button>
        </div>
    </div>
    );
};

export default Auth;