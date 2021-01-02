import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getStacks, deleteStack, updateTheStackName } from '../../store/stack';
import { getCards, createCard, deleteCard, editCard } from '../../store/card';
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
    const [editStackNameActive, setEditStackNameActive] = useState(false);
    const [selectedCard, setSelectedCard] = useState();
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [updatedFront, setUpdatedFront] = useState('');
    const [updatedBack, setUpdatedBack] = useState('');
    const [stackName, setStackName] = useState('');


    const updateFront = (e) => setFront(e.target.value);
    const updateBack = (e) => setBack(e.target.value);
    const updateUpdatedFront = (e) => setUpdatedFront(e.target.value);
    const updateUpdatedBack = (e) => setUpdatedBack(e.target.value);
    const updateStackName = (e) => setStackName(e.target.value);

    const newCard = (e) => {
        e.preventDefault();
        setNewCardActive(true);
    }

    const editTheCard = (e) => {
        e.preventDefault();
        setEditCardActive(true);
    }

    const deleteTheCard = (e) => {
        e.preventDefault();
        dispatch(deleteCard(paramsId, selectedCard.id))
        setSelectedCard(undefined);
        dispatch(getCards(paramsId));
    }

    const submitNewCard = (e) => {
        e.preventDefault();
        dispatch(createCard(paramsId, front, back));
        setFront('');
        setBack('');
        setNewCardActive(false);
    }

    const submitEditCard = (e) => {
        e.preventDefault();
        dispatch(editCard(paramsId, selectedCard.id, updatedFront, updatedBack));
        setUpdatedFront('');
        setUpdatedBack('');
        setSelectedCard(undefined)
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

    const updateEntireStackName = (e) => {
        e.preventDefault();
        dispatch(updateTheStackName(paramsId, stackName));
        dispatch(getStacks());
        setEditStackNameActive(false);
    }

    const editFields = () => {
        return (
            <div>
                <form onSubmit={submitEditCard} className='edit-stage'>
                    <label>Front:
                                        <input onChange={updateUpdatedFront} ></input>
                    </label>
                    <label>Back:
                                        <input onChange={updateUpdatedBack} ></input>
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
    }, [dispatch, paramsId, newCardActive, selectedCard])
    return (
        <>
            { stack && (
                <div className='edit-stack-body'>
                    {selectedCard && (
                        <div className='edit-stack-control-container'>
                            <div className='control-panel'>
                                <button onClick={editTheCard} id='special-button'>Edit card</button>
                                <button onClick={deleteTheCard} id='special-button'>Delete card</button>
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
                                <button onClick={(e) => setEditStackNameActive(true)} id='special-button'>Edit stack name</button>
                                <button onClick={deleteEntireStack} id='special-button'>Delete stack</button>
                            </div>
                            <form hidden={!editStackNameActive}>
                                <input onChange={updateStackName}></input>
                                <button onClick={updateEntireStackName}>Update stack name</button>
                            </form>
                            <div className='edit'>
                                {newCardActive && newCardFields()}
                            </div>
                            <div className='cards-container'>
                                {cards.map((card, i) => {
                                    return (
                                        <div onClick={(e) => selectCard(e, card.id)} key={`card-${i}`} className={`card`} value={card.id} >
                                            <p>{card.term}</p>
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