import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStacks } from '../../store/stack';
import './cardview.css';

const CardView = () => {
    const dispatch = useDispatch();
    const stacks = useSelector(state => state.stack.stacks);

    const listItems = stacks.map((stack) => {
        return (
            <div className={`stack stack-${stack.id}`} key={`stack-${stack.id}`}>
                <a href='/'>{stack.name}</a>
            </div>
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