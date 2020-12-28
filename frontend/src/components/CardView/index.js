import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom'
import { getStacks } from '../../store/stack';
import { AppContext } from '../../context/AppContextProvider';
import './cardview.css';

const CardView = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { user } = useContext(AppContext);
    const stacks = useSelector(state => state.stack.stacks);
    const userStacks = useSelector(state => state.stack.stacks.filter(stack => stack.userId === user.id));

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

    const userItems = userStacks.map((stack, i) => {
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

    console.log(userStacks)

    useEffect(() => {
        dispatch(getStacks());
    }, [dispatch]);

    return (
        <>
            <div className='multiple-stacks-container'>
                {location.pathname.includes('brainfolio') ? userItems : listItems}
            </div>
        </>
    )
};

export default CardView;