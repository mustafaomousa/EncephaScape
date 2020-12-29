import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getStacks } from '../../store/stack'
import './stack.css';

const Stack = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const paramsId = parseInt(id);
    const stack = useSelector(state => state.stack.stacks.find(stack => stack.id === paramsId));


    useEffect(() => {
        dispatch(getStacks());
    }, [dispatch])
    return (
        <div className='single-stack-body'>
            <div className='single-stack-control'>
                <h2>Control Panel</h2>
                <div className='how-to-play'>
                    <h4>How to play:</h4>
                    <p>To begin studying the stack select 'Play' below.</p>
                </div>
                <button>Play</button>
                <div className='control-panel-buttons'>

                </div>
            </div>
            <div className='stack-container'>
                <div className={`single-stack stack-${stack.id}`} key={`stack-${stack.id}`}>
                    <a href={`/stack/${stack.id}`}>{stack.name}</a>
                    <p id='by-statement'>by {stack.User.username}</p>
                    <p>created at {stack.createdAt}</p>
                </div>
            </div>
        </div>
    )
};

export default Stack;