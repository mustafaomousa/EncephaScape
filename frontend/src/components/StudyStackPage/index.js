import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCards } from "../../store/card";
import { getStacks } from "../../store/stacks";
import Stack from "../Stack";

const StudyStackPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const paramsId = parseInt(id);
  const stack = useSelector((state) =>
    state.stack.stacks.find((stack) => stack.id === paramsId)
  );
  const cards = useSelector((state) => state.card.cards);
  useEffect(() => {
    // dispatch(getStacks());
    dispatch(getCards(paramsId));
  }, [dispatch, paramsId]);

  if (!stack) return null;
  if (!cards) return null;

  return <Stack stack={stack} cards={cards} />;
};

export default StudyStackPage;
