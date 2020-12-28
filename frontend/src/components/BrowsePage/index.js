import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CardView from '../CardView';
import './browsepage.css';

const BrowsePage = () => {
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser === undefined) {
        return <Redirect to='/signup'></Redirect>
    };
    return (
        <div className='browse-page'>
            <div className='stack-browse-tools'>
                <form>
                    <label>Search</label>
                    <input></input>
                    <button>Search</button>
                </form>
            </div>
            <div className='stack-browse'>
                <h1>Browse all stacks: </h1>
                <CardView />
            </div>

        </div>
    )
};

export default BrowsePage;