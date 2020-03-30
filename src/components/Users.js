import React, { useState, useEffect, Fragment } from "react";
import { getData } from "../fetchData";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { green, pink } from "@material-ui/core/colors";
import UserModal from "./UsersModal";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "20rem",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500]
  },
  green: {
    color: "#fff",
    backgroundColor: green[500]
  },
  listItem: {
    cursor: "pointer"
  }
}));

const Users = () => {
  const classes = useStyles();

  const [users, selecteduser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const fetchData = async () => {
    setLoading(true);
    const response = await getData();
    if (response.status >= 200 && response.status < 400) {
      console.log(response);
      setLoading(false);

      selecteduser(response.data.members);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return (
      <div className="loader">
        <CircularProgress disableShrink />
      </div>
    );
  }
  return (
    <div className="users">
      <div className="heading">
        <Typography variant="h6" color="secondary">
          User's List
        </Typography>
      </div>
      <List className={classes.root}>
        {users.map((item, index) => {
          return (
            <Fragment key={item.id}>
              <ListItem
                alignItems="flex-start"
                className={classes.listItem}
                onClick={() => {
                  setSelectedUser(item);
                  setOpenModal(!openModal);
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    className={`${
                      index % 2 === 0 ? classes.pink : classes.green
                    }`}
                  >
                    {item.real_name[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.real_name}
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                      className={classes.inline}
                    >
                      {item.tz}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </Fragment>
          );
        })}
      </List>
      <UserModal
        hanndleClose={() => setOpenModal(!openModal)}
        open={openModal}
        data={selectedUser}
      />
      {/* id: "W012A3CDE"
real_name: "Egon Spengler"
tz: "America/Los_Angeles"
activity_periods: Array(3)
0: {start_time: "Feb 1 2020  1:33PM", end_time: "Feb 1 2020 1:54PM"}
1: {start_time: "Mar 1 2020  11:11AM", end_time: "Mar 1 2020 2:00PM"}
2: {start_time: "Mar 16 2020  5:33PM", end_time: "Mar 16 2020 8:02PM"} */}
    </div>
  );
};

export default Users;