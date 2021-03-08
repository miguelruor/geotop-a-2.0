import React, {useState, useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import NavPills from "../../../components/NavPills/NavPills.js";

import styles from "../../../assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

const useStyles = makeStyles(styles);

export default function LeftMenuSection(props){
    const classes = useStyles();

    return(
        <NavPills
            color="primary"
            horizontal={{
                tabsGrid: { xs: 12, sm: 2, md: 2 },
                contentGrid: { xs: 12, sm: 10, md: 10 }
            }}
            content={props.previousTalks}
            tabs={[
                {
                    tabButton: "SPRING 2021",
                },
                {
                    tabButton: "FALL 2020",
                },
                {
                    tabButton: "SPRING 2020",
                },
                {
                    tabButton: "FALL 2019",
                },
                {
                    tabButton: "SPRING 2019",
                },
                {
                    tabButton: "FALL 2018",
                }
            ]}
            />
    );
}

