import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllCategories } from '../../store/category';
import { getStacks, getTopStacks } from '../../store/stack';
import './homepage.css';

const HomePage = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.category.categories);
    const newStacks = useSelector(state => state.stack.newestStacks);

    const categoryItems = categories.map((category) => {
        return (
            <ul className={`category-${category.id}`} key={`category-${category.id}`}>
                <NavLink className='category-nav-link' key={`${category.id}`} to='/'>{category.name}</NavLink>
            </ul>
        )
    });

    const newestStacks = newStacks.map((stack, i) => {
        return (
            <div className='newest-stack' >
                <NavLink className='stack' to={`/stack/${stack.id}`}>{stack.name}</NavLink>
            </div >
        )
    });


    useEffect(() => {
        dispatch(getAllCategories());
        dispatch(getStacks());
        dispatch(getTopStacks());
    }, [dispatch])
    return (
        <div className='home-body'>
            <div className='slideshow'>
                <h1>SLIDESHOW HERE</h1>
            </div>
            <h4>newest stacks...</h4>
            <div className='recent-stacks'>
                {newestStacks}
            </div>
            <h4>view our categories</h4>
            <div className='categories'>
                {categoryItems}
            </div>
        </div>
    )
};

export default HomePage;