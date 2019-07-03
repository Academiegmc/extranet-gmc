import React from "react";
import PropTypes from "prop-types";
import Downshift from "downshift";
import { makeStyles } from "@material-ui/core";
import { deburr } from "lodash";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 250
  },
  container: {
    flexGrow: 1,
    position: "relative"
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  chip: {
    margin: theme.spacing(0.5, 0.25)
  },
  inputRoot: {
    flexWrap: "wrap"
  },
  inputInput: {
    width: "auto",
    flexGrow: 1
  },
  divider: {
    height: theme.spacing(2)
  }
}));
const AutoCompleteHelper = ({ InputProps, classes, ref }) => {
  const classes = useStyles();
  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
    />
  );
};

AutoCompleteHelper.propTypes = {};

const renderSuggestion = ({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem
}) => {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || "").indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
};
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired
};

const getSuggestions = (value, { showEmpty = false } = {}) => {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 && !showEmpty
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
};
export default AutoCompleteHelper;
