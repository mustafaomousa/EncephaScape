import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./category-browse.css";
import { getStacks } from "../../store/stacks";
import { getAllCategories } from "../../store/category";
const BrowseByCategoryPage = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const id = parseInt(categoryId);

  const categories = useSelector((state) => state.category.categories);
  const categoryStacks = useSelector((state) =>
    state.stack.stacks.filter((stack) => stack.categoryId === id)
  );

  const categoryStacksRendered = categoryStacks.map((stack, i) => {
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

  useEffect(() => {
    // dispatch(getStacks());
    // dispatch(getAllCategories());
  }, [dispatch]);
  return (
    <div className={"browse-category-body"}>
      {categories && (
        <div className="browse-category-control">
          {categories.map((category, i) => {
            if (category.id === id)
              return (
                <h2 key={`category-${i}`}>Stacks about {category.name}...</h2>
              );
          })}
        </div>
      )}
      <div className="browse-category-result">{categoryStacksRendered}</div>
    </div>
  );
};

export default BrowseByCategoryPage;
