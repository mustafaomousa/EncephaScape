import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories } from '../../store/category';
import CardView from '../CardView';
import './homepage.css';

const HomePage = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.category.categories);

    const categoryItems = categories.map((category) => {
        return (
            <>
                <div className={`category category-${category.id}`} key={`category-${category.id}`}>
                    <a href='/'>{category.name}</a>
                </div>
            </>
        )
    });

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch])
    return (
        <>
            <h1>Home</h1>
            <div className='slideshow'>
                Slideshow goes here
            </div>
            <h4>Most recent stacks:</h4>
            <CardView />
            <h4>Browse by category:</h4>
            <div className='categories-container'>
                <div className='categories'>
                    {categoryItems}
                </div>
            </div>
        </>
    )
};

export default HomePage;