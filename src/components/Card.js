import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Chip,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: green[500],
  },
  cardHeader: {
    // maxHeight: '40px',
    WebkitLineClamp: "1",
  },
}));

export default function MyCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.item.name.charAt(0)}
          </Avatar>
        }
        title={props.item.name}
      />
      <CardMedia
        className={classes.media}
        image={`https://picsum.photos/300/200?random=${Math.floor(
          Math.random() * 10
        )}`}
        title={props.item.name}
      />
      <CardContent>
        <Chip label="opened" color="primary" />
        <div style={{ marginTop: "8px" }}>
          {props.item.time[props.day].startTime} -{" "}
          {props.item.time[props.day].endTime}
        </div>
      </CardContent>
    </Card>
  );
}
