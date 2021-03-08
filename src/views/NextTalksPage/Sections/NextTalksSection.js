import React, {useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ReactHtmlParser from 'react-html-parser'; 

// @material-ui/icons

// core components
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardFooter from "../../../components/Card/CardFooter.js";

import styles from "../../../assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
import image1 from "../../../assets/img/images/speakers/sp045.png";
import image2 from "../../../assets/img/images/speakers/sp046.png";

const useStyles = makeStyles(styles);

export default function NextTalksSection(){
    
    const [talks2, setTalks2] = useState([
        {
            date: "April 9, 2021",
            speaker: "Stephen Childress",
            title: "A toy model of the inertial range",
            keywords: ["turbulence", "inertial range", "turbulent cascade"],
            abstract: "<p>In this talk we develop a simple toy model of the inertial range of turbulent flow, based upon a cascade of vortical filaments. The filaments are taken to be helical, one turn of the helix playing the role of a turbulent eddy. A binary branching structure is proposed, involving the splitting of filaments at each step into pairs of daughter filaments with differing properties, in effect two distinct simultaneous cascades. Neither of the cascades of this bimodal structure, in isolation, has the Richardson exponent of 1/3. If cascades are assumed to be initiated continuously and throughout space we obtain a model of the inertial range of stationary turbulence. We impose the constraint associated with Kolmogorov's four-fifths law and then adjust the splitting to achieve good agreement with the observed structure exponents <i>zeta<sub>p</sub></i>. The presence of two simultaneous cascades is responsible for the nonlinear dependence of <i>zeta<sub>p</sub></i> upon <i>p</i>. We also consider the intial value problem and study the flow of energy to small scales.</p><p>This is joint work with Andrew Gilbert.</p>",
        },
    ]);

    const [talks, setTalks] = useState([
        {
            date: "March 19, 2021",
            speaker: "Daniel Peralta-Salas",
            title: "Pseudo-Seifert surfaces and vortex reconnections in quantum fluids",
            keywords: ["quantum vortices", "nodal lines", "Schrödinger equation", " Gross-Pitaievskii equation", "approximation theorems"],
            abstract: "<p>The quantum vortices of a superfluid are described as nodal lines of a solution to the time-dependent "
            +"Gross-Pitaevskii equation. Experiments in Lab and extensive numerical computations show that quantum "
            +"vortices cross, each of them breaking into two parts and exchanging part of itself for part of the other. "
            +"This phenomenon, known as quantum vortex reconnection, occurs even though the superfluid does not lose "
            +"its smoothness. This usually leads to a change of topology of the quantum vortices. In this talk I will "
            +"show that, given any initial and final congurations of quantum vortices (i.e. closed curves, possibly "
            +"knotted and linked), and any way of transforming one into the other through a generic pseudo-Seifert "
            +"surface embedded in spacetime, there is an initial condition whose associatedsolution realizes this "
            +"specific vortex reconnection scenario. This allows us to track the vortex reconnection process at all "
            +"times, both locally and globally. Key to prove this result is a new Runge-type approximation theorem "
            +"for the linear Schrodinger equation.</p> "
            +"<p>This is based on joint work with Alberto Enciso.</p>",
        },
    ]);

    const classes = useStyles();
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid,
      );
      
    return(
        <GridContainer>
            <GridItem xs={12} sm={12} md={5} className={classes.nextTalk}>
                <div style={{textAlign: "center"}}><img src={image1} className={imageClasses}/></div>
            </GridItem>
            <GridItem xs={12} sm={12} md={7}>
                <GridContainer>
                    {talks.map(talk => (
                        <>
                        <GridItem xs={12} sm={12} md={12}><h1 className={classes.title}>{talk.speaker}</h1></GridItem>
                        <GridItem xs={12} sm={12} md={12}><p className={classes.smallTitle}><b>{talk.date}</b></p></GridItem>
                        <GridItem xs={12} sm={12} md={12}><p className={classes.smallTitle}><b>{"Title: "}</b>{talk.title}</p></GridItem>
                        <GridItem xs={12} sm={12} md={12}><p className={classes.smallTitle}><b>{"Abstract: "}</b> {ReactHtmlParser (talk.abstract)}</p></GridItem>
                        <GridItem xs={12} sm={12} md={12}><p className={classes.smallTitle}><b>{"Keywords: "}</b> {talk.keywords.join(", ")}</p></GridItem>
                        </>
                    ))}
                </GridContainer>
            </GridItem>
            <GridItem xs={12} sm={12} md={5} className={classes.nextTalk}>
              <div style={{textAlign: "center"}}><img src={image2} className={imageClasses}/></div>
            </GridItem>
            <GridItem xs={12} sm={12} md={7}>
                <GridContainer>
                    {talks2.map(talk => (
                        <>
                        <GridItem xs={12} sm={12} md={12}><h1 className={classes.title}>{talk.speaker}</h1></GridItem>
                        <GridItem xs={12} sm={12} md={12}><p className={classes.smallTitle}><b>{talk.date}</b></p></GridItem>
                        <GridItem xs={12} sm={12} md={12}><p className={classes.smallTitle}><b>{"Title: "}</b>{talk.title}</p></GridItem>
                        <GridItem xs={12} sm={12} md={12}><p className={classes.smallTitle}><b>{"Abstract: "}</b> {ReactHtmlParser (talk.abstract)}</p></GridItem>
                        <GridItem xs={12} sm={12} md={12}><p className={classes.smallTitle}><b>{"Keywords: "}</b> {talk.keywords.join(", ")}</p></GridItem>
                        </>
                    ))}
                </GridContainer>
                    </GridItem>
        </GridContainer>
    );
}