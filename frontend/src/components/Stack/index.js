import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStacks } from "../../store/stack";
import './stack.css'

const Stack = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const stackId = parseInt(id);
    const stack = useSelector(state => state.stack.stacks.find(stack => stack.id === stackId));



    useEffect(() => {
        dispatch(getStacks);
    }, [dispatch])

    if (!stack) return null;

    const stackView = (
        <div className='single-stack-container'>
            <div className={`single-stack stack-${stack.id}`} key={`stack-${stack.id}`}>
                <a href={`/stack/${stack.id}`}>{stack.name}</a>
                <p id='by-statement'>by {stack.User.username}</p>
                <p>created at {stack.createdAt}</p>
            </div>
        </div>
    )


    return (
        stackView
    )
};

export default Stack;