/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown.js";
import Button from "../../components/CustomButtons/Button.js";

import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";



const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <Link to="/" className={classes.link}>
        <ListItem className={classes.listItem}>
          <Button 
          type="button" 
          color="transparent"
          className={classes.navLink}  
          round>
            Homepage 
          </Button>
        </ListItem>
      </Link>

      <Link to="/NextTalks" className={classes.link}>
        <ListItem className={classes.listItem}>
            <Button   
              noLiPadding
              type = "button"
              color="transparent"
              className={classes.navLink}
              round>
                Next Talks
            </Button>
        </ListItem>
      </Link>  

      <Link to="/PreviousTalks" className={classes.link}>
        <ListItem className={classes.listItem}>
          <Button
          type = "button"
          color="transparent"
          className={classes.navLink}
          round>
            Previous Talks
          </Button>
        </ListItem>
      </Link>

      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Search talks by:"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          dropdownList={[
            <Link to="/ListSpeakers" className={classes.dropdownLink}>
              Speakers
            </Link>,
            <Link to="/ListKeywords" className={classes.dropdownLink}>
              Keywords
            </Link>
          ]}
        />
      </ListItem>

      <Link to="/Subscribe" className={classes.link}>
        <ListItem className={classes.listItem}>
          <Button
          type = "button"
          color="transparent"
          className={classes.navLink}
          round>
            <a>Subscribe</a>
          </Button>
        </ListItem>
      </Link>
    </List>
  );
}
