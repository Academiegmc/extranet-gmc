import React from "react";
import PropTypes from "prop-types";
import { Grid, Button, TextField } from "@material-ui/core";
const Comment = ({ handleSubmit, text, setText, setComment, auth }) => {
  return (
    <Grid item xs={12}>
      <form onSubmit={handleSubmit}>
        <TextField
          multiline
          onChange={e => {
            setText(e.target.value);
            setComment({ text: e.target.value, user: auth.user.id });
          }}
          rowsMax="4"
          margin="normal"
          placeholder="Entrer votre commentaire..."
          value={text}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
        >
          Commenter
        </Button>
      </form>
    </Grid>
  );
};

Comment.propTypes = {
  auth: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  setComment: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};
export default Comment;
