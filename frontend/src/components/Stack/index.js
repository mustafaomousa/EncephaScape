import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
  Stack as MuiStack,
  Menu,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import MoreIcon from "@mui/icons-material/MoreHoriz";
import PlayArrowOutlined from "@mui/icons-material/PlayArrowOutlined";
import BookmarkAddOutlined from "@mui/icons-material/BookmarkAddOutlined";
import { useState } from "react";

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 350,
  },
}));

const Stack = ({ stack }) => {
  const classes = useStyles();
  const [stackEl, setStackEl] = useState(null);

  const open = Boolean(stackEl);

  const handleDropdownClick = (e) => setStackEl(e.currentTarget);
  const handleDropdownClose = () => setStackEl(null);

  return (
    <Card className={classes.root} sx={{ backgroundColor: "#333333" }}>
      <CardHeader
        title={
          <Typography color="white" variant="body1">
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
              <MoreIcon sx={{ color: "white" }} />
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
              <MenuItem>Play</MenuItem>
              <MenuItem>Bookmark</MenuItem>
              <MenuItem>Edit</MenuItem>
              <MenuItem>Delete</MenuItem>
            </Menu>
          </>
        }
      />
      <Divider />
      <CardContent sx={{ padding: 0 }}>
        <MuiStack
          minHeight={135}
          alignItems="center"
          justifyContent="center"
          sx={{ backgroundColor: "#ffffff" }}
        >
          <Typography variant="h6" gutterBottom={1} fontWeight="bold">
            {stack.name}
          </Typography>
          <Typography variant="caption">{stack.Category.name}</Typography>
          <Typography fontSize="10px">{stack.Cards.length} cards</Typography>
        </MuiStack>
      </CardContent>
      <Divider />
      <CardActions>
        <MuiStack direction="row" justifyContent="space-between" width="100%">
          <IconButton sx={{ width: 40, height: 40 }}>
            <BookmarkAddOutlined sx={{ color: "white" }} />
          </IconButton>
          <IconButton sx={{ width: 40, height: 40 }}>
            <PlayArrowOutlined sx={{ color: "white" }} />
          </IconButton>
        </MuiStack>
      </CardActions>
    </Card>
  );
};

export default Stack;
