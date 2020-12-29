import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getStacks } from "../../store/stack";
import Stack from '../Stack';
// import './stack.css'

const StudyStackPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const paramsId = parseInt(id);
    const stack = useSelector(state => state.stack.stacks.find(stack => stack.id === paramsId));

    useEffect(() => {
        dispatch(getStacks());
    }, [dispatch])

    if (!stack) return null;

    return (
        <Stack stack={stack} />
    )
};

export default StudyStackPage;