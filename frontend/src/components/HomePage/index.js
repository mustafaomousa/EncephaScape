import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllCategories } from '../../store/category';
import './homepage.css';

const HomePage = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.category.categories);

    const categoryItems = categories.map((category) => {
        return (
            <ul className={`category-${category.id}`} key={`category-${category.id}`}>
                <NavLink className='category-nav-link' key={`${category.id}`} to='/'>{category.name}</NavLink>
            </ul>
        )
    });

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch])
    return (
        <div className='home-body'>
            <div className='slideshow'>
                <h1>SLIDESHOW HERE</h1>
            </div>
            <div className='recent-stacks'>
                <h1>RECENT STACKS HERE</h1>
            </div>
            <h4>view our categories</h4>
            <div className='categories'>
                {categoryItems}
            </div>
        </div>
    )
};

export default HomePage;