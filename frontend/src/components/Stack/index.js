import { useState } from 'react';

import './stack.css';

const Stack = ({ stack }) => {
    const [studyEnabled, setStudyEnabled] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className='single-stack-body'>
            <div className='single-stack-control'>
                <h2>Control Panel</h2>
                <div className={studyEnabled ? 'how-to-disabled' : 'how-to-play'}>
                    <h4>How to play:</h4>
                    <p>To begin studying the stack select 'Play' below.</p>
                    <button onClick={() => setStudyEnabled(true)}>Play</button>
                </div>
                <div className={studyEnabled ? 'study-panel-buttons' : 'how-to-disabled'}>
                    <button>Prev</button>
                    <button onClick={() => setStudyEnabled(false)} > End</button>
                    <button>Next</button>
                </div>
            </div>
            <div className={!studyEnabled ? 'stack-container' : 'stack-study-container-disabled'}>
                <div className={`single-stack stack-${stack.id}`} key={`stack-${stack.id}`}>
                    <a href={`/stack/${stack.id}`}>{stack.name}</a>
                    <p id='by-statement'>by {stack.User.username}</p>
                    <p>created at {stack.createdAt}</p>
                </div>
            </div>
            <div className='stack-study-container' className={studyEnabled ? 'stack-study-container-enabled' : 'stack-study-container-disabled'}>
                <div className={`single-stack`} hidden='true'>
                    <div className={isFlipped ? 'card-disabled' : 'front-card'}>
                        <p>Front of the card</p>
                    </div>
                    <div className={isFlipped ? 'front-card' : 'card-disabled'}>
                        <p>Back of the card</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Stack;