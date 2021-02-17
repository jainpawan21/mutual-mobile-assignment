import React, { useEffect, useState } from "react";
import { Container, Grid } from "@material-ui/core";
import AppBar from "./AppBar";
import Card from "./Card";
import DatePicker from "./DatePicker";
import { checkOpen, extractTime, getDate } from "../utils";
import axios from "axios";

const Main = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [day, setDay] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://run.mocky.io/v3/b0f3e975-b815-4e88-8a6a-84af59fe32eb")
      .then((res) => {
        var temp = [];
        for (var i = 0; i < res.data.length; i++) {
          var name = res.data[i]["Kushi Tsuru"];
          var time = extractTime(res.data[i]["Mon-Sun 11:30 am - 9 pm"]);
          temp.push({ name: name, time: time });
        }
        setLoading(false);
        setRestaurants(temp);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  }, [day]);

  const handleChangeDate = (e) => {
    var changedDate = e.target.value;
    var tempDate = new Date(changedDate);
    var tempDay = tempDate.getDay();
    if (tempDay === 0) {
      tempDay = 6;
    } else {
      tempDay = tempDay - 1;
    }
    setDay(tempDay);
    changedDate = changedDate.split("T");
    var myDate = changedDate[0].split("-");
    var year = myDate[0];
    var month = myDate[1];
    var day1 = myDate[2];
    var myTime = changedDate[1].split(":");
    var hours = myTime[0];
    var minutes = myTime[1];
    var seconds = myTime[2];
    setTime(`${hours}:${minutes}:${seconds}`);
    setDate(`${year}-${month}-${day1}T${hours}:${minutes}:${seconds}`);
  };

  useEffect(() => {
    const todayDate = new Date();
    const date = getDate(todayDate);
    setDate(
      `${date.year}-${date.month}-${date.day}T${date.hours}:${date.minutes}:${date.seconds}`
    );
    setTime(`${date.hours}:${date.minutes}:${date.seconds}`);
    const weekDay = todayDate.getDay();
    if (weekDay === 0) {
      setDay(6);
    } else {
      setDay(weekDay - 1);
    }
    var hours = todayDate.getHours();
    var minutes =
      todayDate.getMinutes() < 10
        ? "0" + todayDate.getMinutes()
        : todayDate.getMinutes();
    var seconds = todayDate.getSeconds();
    var todayTime = hours + ":" + minutes + ":" + seconds;
    setTime(todayTime);
  }, []);
  return (
    <div>
      <AppBar />
      <Container>
        <Grid container>
          <Grid item>
            <DatePicker date={date} setDate={handleChangeDate} />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          justify="center"
          alignContent="center"
          alignItems="center"
        >
          {restaurants.length === 0 ? (
            <span> loading ...</span>
          ) : (
            restaurants.map((item, index) => {
              if (checkOpen(item.time[day], time) === true) {
                return (
                  <Grid key={index} item sm={12} md={6} lg={3}>
                    {/* <div>Hello</div> */}
                    <Card item={item} day={day} />
                  </Grid>
                );
              } else {
                return null;
              }
            })
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Main;
