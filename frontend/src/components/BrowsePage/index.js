import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { getStacks } from '../../store/stack';
import CardView from '../CardView';
import './browsepage.css';

const BrowsePage = () => {
    const dispatch = useDispatch();

    const [search, setSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const sessionUser = useSelector((state) => state.session.user);
    const stacks = useSelector(state => state.stack.stacks.filter(stack => stack.name.toLowerCase().includes(searchTerm.toLowerCase())));

    const updateSearchTerm = (e) => setSearchTerm(e.target.value);

    useEffect(() => {
        dispatch(getStacks())
    }, [dispatch])

    if (sessionUser === undefined) {
        return <Redirect to='/signup'></Redirect>
    };

    const browseAll = () => {
        return (
            <div className='stack-browse'>
                <h1>Browse all stacks: </h1>
                <CardView />
            </div>
        )
    };

    const browseSearch = () => {
        return (
            <div className='stack-browse'>
                <h1>Search result: </h1>
                {searchItems}
            </div>
        )
    };

    const onSearch = (e) => {
        e.preventDefault();
        setSearch(true);
    };

    const onReset = (e) => {
        e.preventDefault();
        setSearch(false);
    }

    const searchItems = stacks.map((stack, i) => {
        if (!searchTerm) return null;
        return (
            <nav key={`stack-nav-${i}`}>
                <div key={`stack-${i}`} className={`stack stack-${stack.id}`}>
                    <NavLink key={`stack-link-${i}`} to={`/stack/${stack.id}`}>{stack.name}</NavLink>
                    <p key={`stack-by-${i}`} id='by-statement'>by {stack.User.username}</p>
                    <p key={`stack-createdAt-${i}`}>created at {stack.createdAt}</p>
                    {/* {isOwner && <button onClick={onEdit} className='edit'>Edit in Brainfolio</button>} */}
                </div>
            </nav>
        )
    });


    return (
        <div className='browse-page body'>
            <h1>Search:</h1>
            <div className='stack-browse-tools'>
                <form>

                    <input onChange={updateSearchTerm} value={searchTerm}></input>
                    <button onClick={(e) => onSearch(e)}>Search</button>
                    <button onClick={(e) => onReset(e)}>Reset</button>
                </form>
            </div>
            <div className='stack-browse-container'>
                {!search && browseAll()}
                {search && browseSearch()}
            </div>

        </div>
    )
};

export default BrowsePage;