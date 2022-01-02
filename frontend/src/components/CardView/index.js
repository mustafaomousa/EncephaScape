import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { getStacks } from "../../store/stacks";
import { AppContext } from "../../context/AppContextProvider";
import "./cardview.css";

const CardView = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useContext(AppContext);
  const stacks = useSelector((state) => state.stack.stacks);
  const userStacks = useSelector((state) =>
    state.stack.stacks.filter((stack) => stack.userId === user.id)
  );
  const sessionUser = useSelector((state) => state.session.user);

  const listItems = stacks.map((stack, i) => {
    let isOwner = stack.userId === sessionUser.id;
    return (
      <nav key={`stack-nav-${i}`}>
        <div key={`stack-${i}`} className={`stack stack-${stack.id}`}>
          <NavLink key={`stack-link-${i}`} to={`/stack/${stack.id}`}>
            {stack.name}
          </NavLink>
          <p key={`stack-by-${i}`} id="by-statement">
            by {stack.User.username}
          </p>
          <p key={`stack-createdAt-${i}`}>created at {stack.createdAt}</p>
          {isOwner && (
            <NavLink to={`/stack/${stack.id}/edit`} id="edit-button">
              Edit
            </NavLink>
          )}
        </div>
      </nav>
    );
  });

  useEffect(() => {
    // dispatch(getStacks());
  }, [dispatch]);

  const userItems = userStacks.map((stack, i) => {
    return (
      <nav key={`stack-nav-${i}`}>
        <div key={`stack-${i}`} className={`stack stack-${stack.id}`}>
          <NavLink key={`stack-link-${i}`} to={`/stack/${stack.id}`}>
            {stack.name}
          </NavLink>
          <p key={`stack-by-${i}`} id="by-statement">
            by {stack.User.username}
          </p>
          <p key={`stack-createdAt-${i}`}>created at {stack.createdAt}</p>
          <nav>
            <NavLink to={`/stack/${stack.id}/edit`} id="edit-button">
              Edit
            </NavLink>
          </nav>
        </div>
      </nav>
    );
  });

  return (
    <>
      <div className="multiple-stacks-container">
        {location.pathname.includes("brainfolio") ? userItems : listItems}
      </div>
    </>
  );
};

export default CardView;
