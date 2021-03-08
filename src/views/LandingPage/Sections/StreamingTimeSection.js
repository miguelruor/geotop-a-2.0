import React from 'react';

// Lines for Clock's
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

import { makeStyles } from "@material-ui/core/styles";
import styles from "../../../assets/jss/material-kit-react/views/landingPageSections/workStyle.js";
import Times from "../../../components/Clock/Times.js";

//https://material-ui.com/es/components/grid/
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";

const useStyles = makeStyles(styles);

export default function StreamingTime(){
    const classes = useStyles();

    const UTCMexicoCity = 360;
    const StreamingTimeMexicoCity = 600;

    const d = new Date();
    const localOffset = d.getTimezoneOffset();

    const StreamingTimeLocal = (StreamingTimeMexicoCity + UTCMexicoCity - localOffset + 1440)%1440;


    return(
        <GridContainer style={{paddingLeft: "10%", paddingRight:"10%"}} justify = "left">
            <GridItem>
                <h1 className={classes.title}>Streaming time</h1>
            </GridItem>

            <GridItem>
                <Times 
                    timeLabel={"CDMX time"}
                    timeLeftInMinutes={StreamingTimeLocal}
                    color='#282c34'
                    bordercolor='#9c27b0'
                />
            </GridItem>
        </GridContainer>
    );
}