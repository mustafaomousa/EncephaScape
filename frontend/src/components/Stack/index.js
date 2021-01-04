import { useState } from 'react';
import { useDispatch } from 'react-redux';

import './stack.css';

const Stack = ({ stack, cards }) => {
    const [studyEnabled, setStudyEnabled] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentCard, setCurrentCard] = useState(0);

    const nextCard = (e) => {
        if (currentCard === (cards.length - 1)) return setCurrentCard(0);
        return setCurrentCard(currentCard + 1);
    };

    const prevCard = (e) => {
        if (currentCard === 0) return setCurrentCard(cards.length - 1);
        return setCurrentCard(currentCard - 1);
    };

    if (cards) return (
        <div className='single-stack-body'>
            <div className='single-stack-control'>
                <h2>Control Panel</h2>
                <div className={studyEnabled ? 'how-to-disabled' : 'how-to-play'}>
                    <h4>How to play:</h4>
                    <p>To begin studying the stack select 'Play' below.</p>
                    <button onClick={() => setStudyEnabled(true)}>Play</button>
                </div>
                <div className={studyEnabled ? 'study-panel-buttons' : 'how-to-disabled'}>
                    <div className='study-how-to-play'>
                        <h4>How to study:</h4>
                        <p>Through repetition!!</p>
                    </div>
                    <div className='study-buttons'>
                        <button onClick={prevCard} >Prev</button>
                        <button onClick={() => setStudyEnabled(false)} > End</button>
                        <button onClick={nextCard} >Next</button>
                    </div>
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
                <div>
                    <button onClick={() => setIsFlipped(!isFlipped)}>Flip!</button>
                </div>
                <div className={`single-stack`} hidden='true'>
                    {cards[currentCard] && (<>
                        <div onClick={() => setIsFlipped(!isFlipped)} className={isFlipped ? 'card-disabled' : 'front-card'}>
                            <h5>Front</h5>
                            <p>{cards[currentCard].term}</p>
                        </div>
                        <div onClick={() => setIsFlipped(!isFlipped)} className={isFlipped ? 'front-card' : 'card-disabled'}>
                            <h5>Back</h5>
                            <p>{cards[currentCard].response}</p>
                        </div>
                    </>
                    )}
                </div>
            </div>
        </div>
    )
};

export default Stack;