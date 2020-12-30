import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getStacks } from '../../store/stack';
import './editstack.css';

const EditStack = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const paramsId = parseInt(id);
    const stack = useSelector(state => state.stack.stacks.find(stack => stack.id === paramsId));


    useEffect(() => {
        dispatch(getStacks());
    }, [dispatch])
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
                                <button id='special-button'>New card</button>
                                <button id='special-button'>Edit stack name</button>
                                <button id='special-button'>Delete stack</button>
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