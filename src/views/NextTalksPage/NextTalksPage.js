import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import Parallax from "../../components/Parallax/Parallax.js";

import styles from "../../assets/jss/material-kit-react/views/nextTalkPage.js";

// Backgroud image
import backgroundImageHome from '../../assets/img/images/img2.jpg';

// Sections for this page
import ProductSection from "../../views/LandingPage/Sections/ProductSection.js";
import TeamSection from "../../views/LandingPage/Sections/TeamSection.js";
import NextTalkSection from "./Sections/NextTalksSection.js";
import StreamingTimeSection from '../../views/LandingPage/Sections/StreamingTimeSection.js';

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function NextTalksPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="blue"
        routes={dashboardRoutes}
        brand="Seminar GEOTOP-A"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={backgroundImageHome}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Next talks</h1>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}  >
        <div className={classes.containerContent} >
          <NextTalkSection />
          <StreamingTimeSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
