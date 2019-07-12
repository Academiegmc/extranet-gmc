import React from "react";
import PropTypes from "prop-types";
import UserIcon from "../../assets/user_icon.png";
import { Typography, makeStyles, Avatar, Grid } from "@material-ui/core";
import "./Comments.css";
const useStyles = makeStyles(theme => ({
  cardHader: {
    backgroundColor: "#2F4858",
    color: "white"
  },
  root: {
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottom: "1px solid black",
    [theme.breakpoints.up("sm")]: {
      flexFlow: "row wrap",
      justifyContent: "center"
    }
  },
  divider: {
    marginTop: "20px"
  },
  bigAvatar: {
    width: 80,
    height: 80
  },
  title: {
    color: "white"
  },
  gridItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      flexDirection: "column"
    }
  }
}));
const Comments = ({ comments }) => {
  const classes = useStyles();
  let image = null;
  let displayComments = null;
  if (comments.length > 0) {
    displayComments = comments.map((comment, index) => {
      if (comment.user.profile_pic !== undefined) {
        image = `${process.env.REACT_APP_NODE_API}/api/users/image/${
          comment.user.profile_pic
        }`;
      } else {
        image = UserIcon;
      }
      return (
        <Grid className={classes.root} container item key={index}>
          <Grid className={classes.gridItem} item xs={12} sm={6}>
            <Avatar
              className={classes.bigAvatar}
              src={image}
              alt={comment.user.name}
            />
            <Typography variant="body2" component="body2">
              {comment.user.name}
            </Typography>
          </Grid>
          <Grid className={classes.gridItem} item xs={12} sm={6}>
            <Typography
              variant="p"
              component="p"
              style={{ overflowY: "scroll" }}
            >
              {comment.text}
            </Typography>
          </Grid>
        </Grid>
      );
    });
  }
  return displayComments;
  // let img;
  // const comments =
  //   this.props.comments.length > 0
  //     ? this.props.comments.map((comment, index) => {
  //         if (comment.user.profile_pic !== undefined)
  //           img = `${process.env.REACT_APP_NODE_API}/api/users/image/${
  //             comment.user.profile_pic
  //           }`;
  //         else img = UserIcon;
  //         return (
  //           <div
  //             className="d-flex flex-row align-items-center p-3 w-100 h-100"
  //             key={index}
  //           >
  //             <div className="col-6 col-md-2 d--flex flex-row justify-content-center mr-2">
  //               <img
  //                 className="img-fluid w-50 h-50 rounded-circle align-self-center"
  //                 src={img}
  //                 alt="User pic"
  //               />
  //             </div>
  //             <div className="col-6 col-md-2 d-flex flex-column">
  //               <h6 className="card-title font-weight-bold">
  //                 {comment.user.name}
  //               </h6>
  //               <small className="card-text text-wrap">{comment.text}</small>
  //             </div>
  //           </div>
  //         );
  //       })
  //     : null;
  // return comments;
};

Comment.propTypes = {
  comments: PropTypes.array.isRequired
};
export default Comments;
