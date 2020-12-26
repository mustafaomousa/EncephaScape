import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStacks } from '../../store/stack';

const CardView = () => {
    const dispatch = useDispatch();
    const stacks = useSelector(state => state.stack.stacks);

    useEffect(() => {
        dispatch(getStacks());
    }, [dispatch]);
    return (
        <>
            <h4>Top 20 Stacks:</h4>
            <div className='multiple-stacks-container'>
                {stacks && stacks.forEach((stack, i) => {
                    if (i === 19) return;
                    return (
                        <div key={`stack-${i}`} >
                            <label>{stack.name}</label>
                        </div>
                    )
                })}
            </div>
        </>
    )
};

export default CardView;