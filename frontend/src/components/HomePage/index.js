import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories } from '../../store/category';
import './homepage.css';

const HomePage = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.category.categories);

    const categoryItems = categories.map((category) => {
        return (
            <div className={`category category-${category.id}`} key={`category-${category.id}`}>
                <a key={`${category.id}`} href='/'>{category.name}</a>
            </div>
        )
    });

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch])
    return (
        <div className='home-body'>
            <div className='slideshow'>
                <h1>Home</h1>
                Slideshow goes here
            </div>
            <div className='recent-stacks'>
                <h4>Most recent stacks:</h4>
            </div>
            <div className='categories-container'>
                <h4>Browse by category:</h4>
                <div className='categories'>
                    {categoryItems}
                </div>
            </div>
        </div>
    )
};

export default HomePage;