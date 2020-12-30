import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getStacks, deleteStack } from '../../store/stack';
import { getCards, createCard } from '../../store/card';
import './editstack.css';

const EditStack = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const paramsId = parseInt(id);

    const stack = useSelector(state => state.stack.stacks.find(stack => stack.id === paramsId));
    const cards = useSelector(state => state.card.cards);

    const [newCardActive, setNewCardActive] = useState(false);
    const [editCardActive, setEditCardActive] = useState(false);
    const [selectedCard, setSelectedCard] = useState();
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');

    const updateFront = (e) => setFront(e.target.value);
    const updateBack = (e) => setBack(e.target.value);

    const newCard = (e) => {
        e.preventDefault();
        setNewCardActive(true);
    }

    const editCard = (e) => {
        e.preventDefault();
        setEditCardActive(true);
    }

    const submitNewCard = (e) => {
        e.preventDefault();
        dispatch(createCard(paramsId, front, back));
        setNewCardActive(false);
    }

    const submitEditCard = (e) => {
        e.preventDefault();
        alert('feature coming soon')
        setEditCardActive(false);
    }

    const selectCard = (e, cardId) => {
        e.preventDefault();
        console.log(cardId)
        setSelectedCard(cards.find(card => card.id === cardId));
    };

    const deleteEntireStack = () => {
        dispatch(deleteStack(paramsId));
        dispatch(getStacks());
        return history.push('/brainfolio');
    };

    const editFields = () => {
        return (
            <div>
                <form onSubmit={() => alert('feature coming soon')} className='edit-stage'>
                    <label>Front:
                                        <input onChange={updateFront}></input>
                    </label>
                    <label>Back:
                                        <input onChange={updateBack}></input>
                    </label>
                    <button id='special-button'>Edit</button>
                </form>
            </div>
        )
    };

    const newCardFields = () => {
        return (
            <div>
                <form onSubmit={submitNewCard} className='edit-stage'>
                    <label>Front:
                                        <input onChange={updateFront} value={front}></input>
                    </label>
                    <label>Back:
                                        <input onChange={updateBack} value={back}></input>
                    </label>
                    <button id='special-button'>Create</button>
                </form>
            </div>
        )
    }

    useEffect(() => {
        dispatch(getStacks());
        dispatch(getCards(paramsId))
    }, [dispatch, paramsId, newCardActive])
    return (
        <>
            { stack && (
                <div className='edit-stack-body'>
                    {selectedCard && (
                        <div className='edit-stack-control-container'>
                            <div className='control-panel'>
                                <button onClick={editCard} id='special-button'>Edit card</button>
                                <button id='special-button'>Delete card</button>
                            </div>
                            {editCardActive && editFields()}
                            <div className='selected-card-div'>
                                <div className='card'>
                                    <p style={{ fontWeight: 'bolder' }}>{selectedCard.term}</p>
                                </div>
                                <div className='card'>
                                    <p>{selectedCard.response}</p>
                                </div>
                            </div>
                        </div>)}
                    <div className='stack-card'>
                        <div className='stack-card-container'>
                            <h2>Stack name: {stack.name}</h2>
                            <div className='card-buttons'>
                                <button onClick={newCard} id='special-button'>New card</button>
                                <button id='special-button'>Edit stack name</button>
                                <button onClick={deleteEntireStack} id='special-button'>Delete stack</button>
                            </div>
                            <div className='edit'>
                                {newCardActive && newCardFields()}
                            </div>
                            <div className='cards-container'>
                                {cards.map((card, i) => {
                                    return (
                                        <div onClick={(e) => selectCard(e, card.id)} key={`card-${i}`} className={`card`} value={card.id} >
                                            <h3>{card.term}</h3>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
};

export default EditStack;