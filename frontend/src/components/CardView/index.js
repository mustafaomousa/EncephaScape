import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStacks } from '../../store/stack';

const CardView = () => {
    const dispatch = useDispatch();
    dispatch(getStacks());
    useEffect(() => {
    }, []);
    return (
        <>
            <h4>Cards:</h4>
        </>
    )
};

export default CardView;