import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Stack as MuiStack,
  Menu,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import MoreIcon from "@mui/icons-material/MoreHoriz";
import PlayArrowOutlined from "@mui/icons-material/PlayArrowOutlined";
import BookmarkAdd from "@mui/icons-material/BookmarkAdd";
import BookmarkAdded from "@mui/icons-material/BookmarkAdded";
import { useState } from "react";
import { deleteUserStack } from "../../store/stacks";
import { useHistory } from "react-router-dom";
import { createUserBookmark, deleteUserBookmark } from "../../store/bookmarks";

const useStyles = makeStyles(() => ({}));

const Stack = ({ stack }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const bookmarks = useSelector((state) => state.bookmarks);
  const [stackEl, setStackEl] = useState(null);

  const open = Boolean(stackEl);

  const handleDropdownClick = (e) => setStackEl(e.currentTarget);
  const handleDropdownClose = () => setStackEl(null);

  const deleteStack = (e) => {
    e.preventDefault();
    handleDropdownClose();
    dispatch(deleteUserStack(stack.id));
  };

  const bookmarkStack = (e) => {
    e.preventDefault();
    dispatch(createUserBookmark(stack.id));
  };

  const unbookmarkStack = (e) => {
    e.preventDefault();
    dispatch(deleteUserBookmark(bookmarks[stack.id].id));
  };

  return (
    <Card sx={{ backgroundColor: "#fff" }}>
      <CardHeader
        title={
          <Typography color="primary" variant="body1">
            {stack.User.username}
          </Typography>
        }
        action={
          <>
            <IconButton
              id="stack-menu-button"
              aria-controls={open ? "stack-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleDropdownClick}
              sx={{ width: 40, height: 40 }}
            >
              <MoreIcon />
            </IconButton>
            <Menu
              id="stack-menu"
              anchorEl={stackEl}
              open={open}
              onClose={handleDropdownClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              MenuListProps={{ sx: { minWidth: 200 } }}
            >
              <MenuItem onClick={() => history.push(`/stacks/${stack.id}`)}>
                Play
              </MenuItem>
              <MenuItem>Bookmark</MenuItem>
              {sessionUser && sessionUser.id === stack.User.id && (
                <>
                  <MenuItem>Edit</MenuItem>
                  <MenuItem onClick={deleteStack}>Delete</MenuItem>
                </>
              )}
            </Menu>
          </>
        }
      />
      <CardContent sx={{ padding: 0 }}>
        <MuiStack minHeight={135} alignItems="center" justifyContent="center">
          <Typography
            variant="h6"
            gutterBottom={1}
            fontWeight="bold"
            color="primary"
          >
            {stack.name}
          </Typography>
          <Typography variant="caption" color="secondary">
            {stack.Category.name}
          </Typography>
          <Typography fontSize="10px" color="secondary">
            {stack.Cards.length} cards
          </Typography>
        </MuiStack>
      </CardContent>
      <CardActions>
        <MuiStack direction="row" justifyContent="space-between" width="100%">
          {bookmarks && stack.id in bookmarks ? (
            <IconButton
              sx={{ width: 40, height: 40 }}
              onClick={unbookmarkStack}
            >
              <BookmarkAdded sx={{ color: "green" }} />
            </IconButton>
          ) : (
            <IconButton sx={{ width: 40, height: 40 }} onClick={bookmarkStack}>
              <BookmarkAdd />
            </IconButton>
          )}
          <IconButton
            sx={{ width: 40, height: 40 }}
            onClick={() => history.push(`/stacks/${stack.id}`)}
          >
            <PlayArrowOutlined />
          </IconButton>
        </MuiStack>
      </CardActions>
    </Card>
  );
};

export default Stack;
