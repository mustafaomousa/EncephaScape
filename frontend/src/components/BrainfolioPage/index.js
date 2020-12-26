import { useState, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createStack } from '../../store/stack';
import { AppContext } from '../../context/AppContextProvider';
import { getAllCategories } from '../../store/category';

const Brainfolio = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState(null);

    const { user } = useContext(AppContext);

    const updateStackName = (e) => setName(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name,
            categoryId,
            userId: user.id
        };
        return dispatch(createStack(name));
    };


    useEffect(() => {
        dispatch(getAllCategories())
    }, [dispatch]);

    return (
        <>
            <h1>Brainfolio</h1>
            <div className='create-stack-container'>
                <form onSubmit={onSubmit}>
                    <label>Create a new stack:</label>
                    <input onChange={updateStackName} type='text' placeholder='Stack Name' required></input>
                    <select required>
                        <option value='5'>Select a category</option>

                    </select>
                    <button>Create</button>
                </form>
            </div>
        </>
    )
};

export default Brainfolio;