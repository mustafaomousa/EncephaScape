import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { getStacks, deleteStack } from '../../store/stack';
import './cardview.css';

const CardView = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const stacks = useSelector(state => state.stack.stacks);

    // const [deletedStack, setDeletedStack] = useState(0);

    const deleteStack = (e) => {
        // setDeletedStack(e.target.value);
        dispatch(deleteStack(4));
        history.push('/')
    };

    const listItems = stacks.map((stack) => {
        return (
            <>
                <div className={`stack stack-${stack.id}`} key={`stack-${stack.id}`}>
                    <a href='/'>{stack.name}</a>
                </div>
            </>
        )
    });

    useEffect(() => {
        dispatch(getStacks());
    }, [dispatch]);
    return (
        <>
            <h4>Top 20 Stacks:</h4>
            <div className='multiple-stacks-container'>
                {listItems}
            </div>
        </>
    )
};

export default CardView;