import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import classNames from "classnames";

import {db} from '../../ConfigFirebase';

// core components
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import Parallax from "../../components/Parallax/Parallax.js";


import styles from "../../assets/jss/material-kit-react/views/landingPage.js";

// Backgroud image
import backgroundImageHome from '../../assets/img/images/img2.jpg';

// Sections for this page
import LeftMenuSection from "./Sections/LeftMenuSection.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function PreviousTalksPage(){
    const classes = useStyles();

    const example = {
        abstract: 'Descripcion',
        date : 'fecha dada',
        speaker: 'Pablo Meré',
        title: 'DNA topology',
        video: 'https://www.youtube.com/embed/0EqHqPvXcMU',
        keywords: ['DNA','subject']
    }
    const example2 = {
        abstract: 'Descripcion 2',
        date : 'fecha dada 2',
        speaker: 'Pablo Meré 2',
        title: 'DNA topology 2',
        video: 'https://www.youtube.com/embed/zs8zmeWzC4M',
        keywords: ['DNA 2','subject 2']
    }

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

    var speakers_aux = {};
    var seasons_aux = {};

    const [seasons, setSeasons] = useState({});

    useEffect(async()=>{
        await db.collection("speakers").get()
        .then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                var idSpeaker = doc.id;
                var mi = doc.data().middle_initial;

                speakers_aux[idSpeaker] = doc.data().name + " " + 
                    (mi != null ? mi : "") + " " + doc.data().surname;
            });
            //alert("Carga de speakers exitosa")
        })
        .catch(function(error){
            alert("Cannot load some speaker");
        });

        await db.collection("talks").orderBy("date", "desc")
        .get()
        .then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                if(doc.data().date.toDate() > new Date()){
                    return;
                }

                var sea = doc.data().season;
                if(!(sea in seasons_aux)){
                    seasons_aux[sea] = []
                }
                
                const speakerID = doc.data().speaker;
                const date = doc.data().date.toDate();
                seasons_aux[sea].push(
                    {
                        speakerID: speakerID,
                        speaker: speakers_aux[speakerID],
                        title: doc.data().title,
                        keywords: doc.data().keywords,
                        date: month[date.getMonth()] + " " + date.getDate().toString() + ", " + date.getFullYear().toString(),
                        abstract: doc.data().abstract,
                        video: doc.data().video,
                        presentation: doc.data().presentation,
                    }
                );
                //alert(speakerID)
            });
        })
        .catch(function(error){
            alert(error);
        });
        //alert(seasons_aux['SPRING 2020'][0].title);
        setSeasons(seasons_aux);
    },[]);

    const[previousTalks, setPreviousTalks] = useState({
        'FALL 2020': [example2, example, example2],
        'SUMMER 2020': [example, example2, example, example2, example],
        'SPRING 2020': [example2, example, example2],
        'FALL 2019': [example, example2, example, example2, example],
        'SPRING 2019': [example2, example, example2],
        'FALL 2018': [example, example2, example, example2, example],
    });

    return(
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
                //{...rest}
            />
            <Parallax filter small image={backgroundImageHome}>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <h1 className={classes.title}>Previous talks</h1>
                            <br />
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                <LeftMenuSection previousTalks={seasons}/>
                </div>
            </div>
            <Footer />
        </div>
    );
}

