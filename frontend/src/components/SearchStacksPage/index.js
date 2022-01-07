import {
  Box,
  Button,
  Checkbox,
  Chip,
  Grid,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  Stack as MuiStack,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import PageviewIcon from "@mui/icons-material/Pageview";
import { fetch } from "../../store/csrf";
import Stack from "../Stack";

const useStyles = makeStyles(() => ({
  root: {
    width: "min(90%, 1200px)",
    marginInline: "auto",
    padding: "140px 0",
    minHeight: "100vh",
  },
  searchStacksSection: {
    paddingBottom: "40px",
  },
}));

const SearchStacksPage = () => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState(null);
  const [anchor, setAnchor] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const updateSearchTerm = (e) => setSearchTerm(e.target.value);
  const handleSelectedCategories = (event) => {
    setSelectedCategories(event.target.value);
  };

  useEffect(() => {
    (async () => {
      await fetch("/api/categories").then((response) =>
        setCategories(response.data.categories)
      );
    })();
  }, []);

  const selectCategoriesOpen = Boolean(anchor);

  const handleSelectCategoriesOpen = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearchResults(null);
    let categoriesString = selectedCategories
      .map((categoryId) => `&category=${categoryId}`)
      .join("");
    await fetch(
      `/api/stacks/features/search/?search=${searchTerm}${categoriesString}`
    ).then((response) => setSearchResults(response.data.results));
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.searchStacksSection}>
        <MuiStack alignItems="flex-end" marginBottom={2}></MuiStack>
        <Box>
          <TextField
            fullWidth
            color="secondary"
            variant="outlined"
            value={searchTerm}
            onChange={updateSearchTerm}
            placeholder="Search stacks"
            InputProps={{
              sx: { backgroundColor: "#fff" },
              endAdornment: (
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  <SearchIcon />
                </Button>
              ),
            }}
          />
          <MuiStack
            direction="row"
            justifyContent="space-between"
            spacing={1}
            paddingTop={2}
          >
            <Box>
              <Button
                id="categories-button"
                aria-controls={
                  selectCategoriesOpen ? "categories-menu" : undefined
                }
                aria-haspopup={true}
                aria-expanded={selectCategoriesOpen ? true : undefined}
                onClose={() => setAnchor(null)}
                onClick={handleSelectCategoriesOpen}
                color="secondary"
                variant="contained"
                size="small"
              >
                Categories
                <FilterListIcon />
              </Button>
              <Menu
                id="categories-menu"
                anchorEl={anchor}
                open={selectCategoriesOpen}
                onClose={() => setAnchor(null)}
                MenuListProps={{ "aria-labelledby": "categories-button" }}
                PaperProps={{ sx: { display: "none" } }}
              >
                <Select
                  open={selectCategoriesOpen}
                  onClose={() => setAnchor(null)}
                  multiple
                  onChange={handleSelectedCategories}
                  value={selectedCategories}
                  sx={{ display: "none", width: 0, height: 0 }}
                  inputProps={{ sx: { display: "none" } }}
                  MenuProps={{ anchorEl: anchor, sx: { top: 20, right: 20 } }}
                >
                  {categories &&
                    categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        <Checkbox
                          checked={selectedCategories.indexOf(category.id) > -1}
                          size="small"
                        />
                        <ListItemText
                          primary={category.name}
                          value={category.id}
                        />
                      </MenuItem>
                    ))}
                </Select>
              </Menu>
            </Box>
            {categories && (
              <MuiStack
                direction="row"
                spacing={0.5}
                rowGap={1}
                alignItems="center"
                justifyContent={"flex-end"}
                flexWrap={"wrap"}
              >
                {selectedCategories.map((categoryId) => (
                  <Box>
                    {categories.map(
                      (category) =>
                        category.id === categoryId && (
                          <Zoom in={true}>
                            <Chip
                              label={category.name}
                              color="secondary"
                              variant="outlined"
                            />
                          </Zoom>
                        )
                    )}
                  </Box>
                ))}
              </MuiStack>
            )}
          </MuiStack>
        </Box>
      </Box>
      <Typography
        variant="h3"
        color="secondary"
        fontWeight="bold"
        gutterBottom={1}
      >
        Search results
      </Typography>
      <Box
        className={classes.searchStacksSection}
        sx={{
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
          // direction: "column",
          backgroundColor: "rgba(0,0,0,0.1)",
          borderRadius: "0.2em",
          border: "2px solid #c66b3d",
          padding: "40px",
        }}
      >
        {searchResults ? (
          <Grid container direction="row" spacing={4}>
            {searchResults.map((stack, i) => {
              return (
                <Zoom
                  in={true}
                  style={{ transitionDelay: `${i === 0 ? 25 : i * 50}ms` }}
                >
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Stack stack={stack} />
                  </Grid>
                </Zoom>
              );
            })}
          </Grid>
        ) : (
          <MuiStack alignItems="center" justifyContent="center">
            <PageviewIcon
              color="secondary"
              sx={{ fontSize: "40px", marginRight: 2 }}
            />
            <Typography variant="button" color="secondary">
              No search results
            </Typography>
          </MuiStack>
        )}
      </Box>
    </Box>
  );
};

export default SearchStacksPage;
