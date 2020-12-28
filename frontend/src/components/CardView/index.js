import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom'
import { getStacks } from '../../store/stack';
import './cardview.css';

const CardView = () => {
    const dispatch = useDispatch();
    const stacks = useSelector(state => state.stack.stacks);

    const listItems = stacks.map((stack, i) => {
        return (
            <nav key={`stack-nav-${i}`}>
                <div key={`stack-${i}`} className={`stack stack-${stack.id}`}>
                    <NavLink key={`stack-link-${i}`} to={`/stack/${stack.id}`}>{stack.name}</NavLink>
                    <p key={`stack-by-${i}`} id='by-statement'>by {stack.User.username}</p>
                    <p key={`stack-createdAt-${i}`}>created at {stack.createdAt}</p>
                </div>
            </nav>
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