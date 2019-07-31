import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import clsx from "clsx";
import TextareaAutosize from "react-autosize-textarea";
import { makeStyles, Grid } from "@material-ui/core";
import ReturnButton from "../layout/ReturnButton";
import "./Markdown.css";

const useStyle = makeStyles(theme => ({
  container: {
    width: "100%",
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  row: {
    width: "100%",
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  grid: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%"
    }
  },
  content: {
    fontSize: "1.5rem",
    width: "80%",
    marginLeft: 20
  }
}));

const Markdown = ({ history }) => {
  const classes = useStyle();
  const [text, setText] = useState("");
  const [disallowedTypes, setDisallowedTypes] = useState([
    "inlineCode",
    "code",
    "html"
  ]);
  const fetchData = async () => {
    const data = await fetch(require("./sample.md"));
    setText(await data.text());
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={classes.container}>
      <ReturnButton history={history} />
      <div className={classes.row}>
        <h2>Tuto : Ecrire un article</h2>
        <p>
          Ci-dessous un exemple d'écriture d'un article. Vous pouvez tester et
          voir en direct comment est rendu votre paragraphe
        </p>
      </div>
      <div className={classes.grid}>
        <Grid item xs={12} sm={6}>
          <TextareaAutosize
            className={classes.content}
            placeholder="Votre commentaire..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ReactMarkdown
            className={classes.row}
            source={text}
            disallowedTypes={disallowedTypes}
            escapeHtml={false}
            linkTarget={"_blank"}
          />
        </Grid>
      </div>
    </div>
  );
};

export default Markdown;
