import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DateAndTimePicker(props) {
  const classes = useStyles();
  return (
    <form className={classes.container} noValidate>
      {props.date && <TextField
        id="time-picker"
        label="Choose date and time"
        type="datetime-local"
        defaultValue={props.date}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) =>  props.setDate(e)}
      /> }
    </form>
  );
}
