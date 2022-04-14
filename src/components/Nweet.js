import React from 'react';

const Nweet = ({nweetObj , isOwner}) => {
    
    return(
        <div>
            <h3>{nweetObj.text}</h3>
            {isOwner && (
                <><button>delete</button>
                <button>edit</button>
                </>)
            }         
        </div>
    );       
};

export default Nweet;