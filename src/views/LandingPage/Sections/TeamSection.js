import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardFooter from "../../../components/Card/CardFooter.js";

import styles from "../../../assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import team1 from "../../../assets/img/faces/org1.jpg";
import team2 from "../../../assets/img/faces/org2.jpg";
import team3 from "../../../assets/img/faces/org3.jpg";
import team4 from "../../../assets/img/faces/org4.jpg";
import team5 from "../../../assets/img/faces/org5.jpg";
import team6 from "../../../assets/img/faces/org6.jpg";

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h1 className={classes.title}>Scientific Committee</h1>
      <div className={classes.team}>
        <GridContainer justify='center'>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team6} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Alicia Dickenstein
                <br />
                <small className={classes.smallTitle}>University of Buenos Aires, Argentina</small>
              </h4>
              {/*<CardBody>
                <p className={classes.description}>
                  You can write here details about one of your team members. You
                  can give more details about what they do.
                </p>
              </CardBody>*/}
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team1} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                José-Carlos Gómez-Larrañaga
                <br />
                <small className={classes.smallTitle}>CIMAT, Mexico</small>
              </h4>
              {/*<CardBody>
                <p className={classes.description}>
                  You can write here details about one of your team members. You
                  can give more details about what they do.
                </p>
              </CardBody>*/}
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team2} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Kathryn Hess
                <br />
                <small className={classes.smallTitle}>École Polytechnique Fédérale de Lausanne, Switzerland</small>
              </h4>
              {/*<CardBody>
                <p className={classes.description}>
                  You can write here details about one of your team members. You
                  can give more details about what they do.
                </p>
              </CardBody>*/}
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team3} alt="..." className={imageClasses} />
              </GridItem> 
              <h4 className={classes.cardTitle}>
                Neza Mramor-Kosta
                <br />
                <small className={classes.smallTitle}>University of Ljubljana, Slovenia</small>
              </h4>
              {/*<CardBody>
                <p className={classes.description}>
                  You can write here details about one of your team members. You
                  can give more details about what they do.
                </p>
              </CardBody>*/}
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team4} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Renzo L. Ricca
                <br />
                <small className={classes.smallTitle}>University of Milano-Bicocca, Italy</small>
              </h4>
              {/*<CardBody>
                <p className={classes.description}>
                  You can write here details about one of your team members. You
                  can give more details about what they do.
                </p>
              </CardBody>*/}
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team5} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                De Witt L. Sumners
                <br />
                <small className={classes.smallTitle}>Florida State University, USA</small>
              </h4>
              {/*<CardBody>
                <p className={classes.description}>
                  You can write here details about one of your team members. You
                  can give more details about what they do.
                </p>
              </CardBody>*/}
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
