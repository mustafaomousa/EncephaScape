import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const BrowsePage = () => {
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser === undefined) {
        return <Redirect to='/signup'></Redirect>
    };
    return (
        <h1>Browse all stacks: </h1>
    )
};

export default BrowsePage;