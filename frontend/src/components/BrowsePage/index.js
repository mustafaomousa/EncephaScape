import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CardView from '../CardView';
import './browsepage.css';

const BrowsePage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const [search, setSearch] = useState(false);

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

    return (
        <div className='browse-page body'>
            <div className='stack-browse-tools'>
                <form>
                    <label>Search</label>
                    <input></input>
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