import { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStack } from '../../store/stack';
import { AppContext } from '../../context/AppContextProvider';
import { getAllCategories } from '../../store/category';
import CardView from '../CardView';
import { useHistory } from 'react-router-dom';
import './brainfolio.css';

const Brainfolio = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState(null);

    const { user } = useContext(AppContext);
    const categories = useSelector(state => state.category.categories);
    const sessionUser = useSelector((state) => state.session.user);

    const updateStackName = (e) => setName(e.target.value);
    const updateCategoryId = (e) => setCategoryId(e.target.value);


    const onSubmit = (e) => {
        const payload = {
            name,
            categoryId,
            userId: user.id
        };

        return dispatch(createStack(payload));
    };


    useEffect(() => {
        if (sessionUser === undefined) {
            alert('Please login or sign-up');
            return history.push('/signup');
        };

        dispatch(getAllCategories());
    }, [dispatch, history, sessionUser]);

    return (
        <div className='brainfolio-body'>
            <div className='brainfolio-browse-tools'>
                <h1>Brainfolio</h1>
                <div className='create-stack-container'>
                    <form onSubmit={onSubmit}>
                        <label>Create a new stack:</label>
                        <input onChange={updateStackName} type='text' placeholder='Stack Name' required></input>
                        <select onChange={updateCategoryId} required>
                            <option>Select a category</option>
                            {categories.map((category, i) => {
                                return (
                                    <option key={`category-${i}`} value={category.id}>{category.name}</option>
                                )
                            })}
                        </select>
                        <button>Create</button>
                    </form>
                </div>

            </div>
            <div className='brainfolio-browse'>

                <h4>Your stack library:</h4>
                <CardView />
            </div>
        </div>
    )
};

export default Brainfolio;