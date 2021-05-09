import React, { useEffect, useState } from "react";
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

import styles from "../../assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import SubscribeSection from "./Sections/SubscribeSection.js";

// Background Image
import backgroundImageHome from '../../assets/img/images/img1.jpg';

import {db} from '../../ConfigFirebase';

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

export default function HomePage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  var speakers = {};

  var talks = {};

  const [speakers1, setSpeakers] = useState({});

  const [talks1, setTalks] = useState({});


  useEffect(async() => {
    await db.collection('speakers').get()
    .then(function(querySnapshot){
        querySnapshot.forEach(async function(doc){
            var mi = doc.data().middle_initial;
            speakers[doc.id] = {
                surname: doc.data().surname,
                completeName: doc.data().name + " " + 
                (mi != null ? mi : "") + " " + doc.data().surname,
                middle_initial: mi,
                name: doc.data().name,
                talks: doc.data().talks,
                institution: doc.data().place,
                country: "",
                state: "",
                city: "",
                research_interests: [""],
                email: "",
                homepage: "",
                google_scholar_url: ""
            };
        })
    })
    .catch(function(error){
        alert("Some speakers cannot load.");
    });

    await db.collection("talks").get()
    .then(function(querySnapshot){
        querySnapshot.forEach(async function(doc){

          let date = doc.data().date.toDate(); 

            talks[doc.id] = {
                speaker_id: doc.data().speaker,
                timestamp: doc.data().date,
                date: month[date.getMonth()] + " " + date.getDate().toString() + ", " + date.getFullYear().toString(),
                video: doc.data().video,
                title: doc.data().title,
                keywords: doc.data().keywords,
                slides: doc.data().presentation,
                abstract: doc.data().abstract,
                warning: doc.data().warning,
                season: doc.data().season,
                numberViewsYoutube: 0,
                numberLikesYoutube: 0,
                numberDislikesYoutube: 0
            };
            
        });
    })
    .catch(function(error){
        alert("Cannot load some talk")
    });

    setSpeakers(speakers);
    setTalks(talks);
  });

  var json1 = JSON.stringify(talks1);
  var json2 = JSON.stringify(speakers1);

  console.log(Object.keys(talks1));

  //var json1 = "hola";
  //var json2 = "adios";

  return (
    <div>
      <Header
        color="blue"
        //routes={dashboardRoutes}
        brand="Seminar GEOTOP-A"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax filter image={backgroundImageHome}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Subscribe to our seminar!</h1>
              <h4>
                Get regularly updated of upcoming web-seminars
              </h4>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}> 
          <SubscribeSection />
        </div>
      </div>

      <div className={classes.container}>
      <h1 style={{color:"black"}}>{"JSON platicas"}</h1>
        <p style={{color:"black"}}>
        {json1}
        </p>
      <h1 style={{color:"black"}}>{"JSON speakers"} </h1>
        <p style={{color:"black"}}>
        {json2}
        </p>
      </div>
      
      <Footer />
    </div>
  );
}


