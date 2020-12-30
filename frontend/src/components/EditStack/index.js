import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getStacks } from '../../store/stack';
import { getCards, createCard } from '../../store/card';
import './editstack.css';

const EditStack = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const paramsId = parseInt(id);

    const stack = useSelector(state => state.stack.stacks.find(stack => stack.id === paramsId));
    const cards = useSelector(state => state.card.cards);

    const [newCardActive, setNewCardActive] = useState(false);
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');

    const updateFront = (e) => setFront(e.target.value);
    const updateBack = (e) => setBack(e.target.value);

    const newCard = (e) => {
        e.preventDefault();
        setNewCardActive(true);
    }

    const submitNewCard = (e) => {
        e.preventDefault();
        dispatch(createCard(paramsId, front, back));
        setNewCardActive(false);
    }

    const editFields = () => {
        return (
            <form onSubmit={submitNewCard} className='edit-stage'>
                <label>Front:
                                        <input onChange={updateFront} value={front}></input>
                </label>
                <label>Back:
                                        <input onChange={updateBack} value={back}></input>
                </label>
                <button id='special-button'>Create</button>
            </form>
        )
    };

    useEffect(() => {
        dispatch(getStacks());
        dispatch(getCards(paramsId))
    }, [dispatch, paramsId, newCardActive])
    return (
        <>
            { stack && (
                <div className='edit-stack-body'>
                    <div className='edit-stack-control-container'>
                        <div className='control-panel'>
                            <button id='special-button'>Edit card</button>
                            <button id='special-button'>Delete card</button>
                        </div>
                        <div>
                            Render inputs using ajax here to change card info
                        </div>
                    </div>
                    <div className='stack-card'>
                        <div className='stack-card-container'>
                            <h2>Stack name: {stack.name}</h2>
                            <div className='card-buttons'>
                                <button onClick={newCard} id='special-button'>New card</button>
                                <button id='special-button'>Edit stack name</button>
                                <button id='special-button'>Delete stack</button>
                            </div>
                            <div className='edit'>
                                {newCardActive && editFields()}
                            </div>
                            <div className='cards-container'>
                                {cards.map((card, i) => {
                                    return (
                                        <div className='card'>
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