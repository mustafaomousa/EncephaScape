import { useState } from 'react';

import './stack.css';

const Stack = ({ stack }) => {
    const [studyEnabled, setStudyEnabled] = useState(false);

    return (
        <div className='single-stack-body'>
            <div className='single-stack-control'>
                <h2>Control Panel</h2>
                <div className='how-to-play'>
                    <h4>How to play:</h4>
                    <p>To begin studying the stack select 'Play' below.</p>
                </div>
                <button onClick={() => setStudyEnabled(!studyEnabled)}>Play</button>
                <div className='control-panel-buttons'>

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

                </div>
            </div>
        </div>
    )
};

export default Stack;