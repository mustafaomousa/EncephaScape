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
            <ul className={`category category-${category.id}`} key={`category-${category.id}`}>
                <NavLink className='category-nav-link' key={`${category.id}`} to={`/category/${category.id}`}>{category.name}</NavLink>
            </ul>
        )
    });

    const newestStacks = newStacks.map((stack, i) => {
        return (
            <div key={`category-${stack.id}`} className='newest-stack' >
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
            <div className='welcome'>
                <h1>Welcome</h1>
                <br />
                <p>The beginning of our name "Encepha" derives from the Greek word "Encephalon" meaning "brain".
                Here at EncephaScape we believe in the wonders that our brains can perform through studying.
                Join today to access tens of our members stacks and to create your own 'Brainfolio!'
            </p>
            </div>
            <h4>browse our members newest stacks...</h4>
            <div className='recent-stacks'>
                {newestStacks}
            </div>
            <h4>browse our stack categories</h4>
            <div className='categories'>
                {categoryItems}
            </div>
        </div>
    )
};

export default HomePage;