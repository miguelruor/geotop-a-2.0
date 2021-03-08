import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// core components
import GridContainer from "../Grid/GridContainer.js"  //"../components/Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js" // "../components/Grid/GridItem.js";

import styles from "../../assets/jss/material-kit-react/components/navPillsStyle.js";
import ReactHtmlParser from 'react-html-parser';

import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js"
import Button from "../../components/CustomButtons/Button.js";

import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";

import Close from "@material-ui/icons/Close";

import imagenPrueba from "../../assets/img/faces/avatar.jpg";


const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function NavPills(props) {

  const[talkModal,setTalkModal] = useState({'keywords': ['cool','col']});
  const[talkTitle,setTalkTitle] = useState('');
  const[talkDate,setTalkDate] = useState('');
  const[talkDescription,setTalkDescription] = useState('');
  const[talkVideo,setTalkVideo] = useState('');
  const[talkPresentation,setTalkPresentation] = useState('');
  const[talkSpeaker,setTalkSpeaker] = useState('');
  const[talkKeywords,setTalkKeywords] = useState([]);
  const[speakerID,setSpeakerID] = useState(0);


  const {content} = props;
  const keySeason =  Object.keys(content);


  const [active, setActive] = React.useState(props.active);
  const [classicModal, setClassicModal] = React.useState(false);
  const handleChange = (event, active) => {
    setActive(active);
    //alert('cambio');
  };
  const handleChangeIndex = index => {
    setActive(index);
  };
  const classes = useStyles();
  const { tabs, direction, color, horizontal, alignCenter } = props;
  const flexContainerClasses = classNames({
    [classes.flexContainer]: true,
    [classes.horizontalDisplay]: horizontal !== undefined
  });

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRounded,
    classes.imgFluid
  );
  const tabButtons = (
    <Tabs
      classes={{
        root: classes.root,
        fixed: classes.fixed,
        flexContainer: flexContainerClasses,
        indicator: classes.displayNone
      }}
      value={active}
      onChange={handleChange}
      centered={alignCenter}
    >
      {tabs.map((prop, key) => {
        var icon = {};
        if (prop.tabIcon !== undefined) {
          icon["icon"] = <prop.tabIcon className={classes.tabIcon} />;
        }
        const pillsClasses = classNames({
          [classes.pills]: true,
          [classes.horizontalPills]: horizontal !== undefined,
          [classes.pillsWithIcons]: prop.tabIcon !== undefined
        });
        return (
          <Tab
            label={prop.tabButton}
            key={key}
            {...icon}
            classes={{
              root: pillsClasses,
              selected: classes[color],
              wrapper: classes.tabWrapper
            }}
          />
        );
      })}
    </Tabs>
  );

  // Funcion para leer todos los archivos de una carpeta (npm install --save-dev webpack@4.44.2 webpack-cli)
  function importAll(r) {
    return r.keys().map(r);
  }
  const speakerImages = importAll(require.context('../../assets/img/images/speakers', false, /\.(png|jpe?g|svg)$/));
  
  const tabContent = (
    <div className={classes.contentWrapper}>
      <SwipeableViews
        axis={direction === "rtl" ? "x-reverse" : "x"}
        index={active}
        onChangeIndex={handleChangeIndex}
      >
          {tabs.map((prop, key) => {
            return (
              <div className={classes.tabContent} key={key}>
                <GridContainer alignItems="center">
                  {keySeason.length > 0 && content[keySeason[key]].map(talk =>    
                    {
                    return (
                    <GridItem xs={12} sm={6} md={4} >
                    <Card plain>
                      <h4 className={classes.cardTitle} style={{textAlign:'left'}}>
                        <small className={classes.smallTitle}>{talk['date']}</small>
                      </h4>
                      <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                        <img src={speakerImages[talk['speakerID']].default} alt="..." className={imageClasses} />
                      </GridItem>
                      <h4 className={classes.cardTitle}>
                        {talk['speaker']}
                        <br />
                    <small className={classes.smallTitle}>{talk['title']}</small>
                      </h4>
                      <Button 
                        round 
                        color='primary' 
                        className={classes.button}
                        onClick={() => {setClassicModal(true); 
                            setTalkTitle(talk['title']);
                            setTalkVideo(talk['video']);
                            setTalkPresentation(talk['presentation']);
                            setTalkDescription(talk['abstract']);
                            setTalkKeywords(talk['keywords']);
                            setTalkSpeaker(talk['speaker']); 
                            setTalkDate(talk['date']); 
                            setSpeakerID(talk['speakerID']); 
                          }}
                      >
                          Details
                        </Button>
                      <Dialog
                        classes={{
                          root: classes.center,
                          paper: classes.modal
                        }}
                        open={classicModal}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={() => setClassicModal(false)}
                        aria-labelledby="classic-modal-slide-title"
                        aria-describedby="classic-modal-slide-description"
                      >
                        <DialogTitle
                          id="classic-modal-slide-title"
                          disableTypography
                          className={classes.modalHeader}
                        >
                          <IconButton
                            className={classes.modalCloseButton}
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={() => setClassicModal(false)}
                          >
                            <Close className={classes.modalClose} />
                          </IconButton>
                          <h2 className={classes.modalTitle}>Talk Details</h2>
                        </DialogTitle>
                        <DialogContent
                          id="classic-modal-slide-description"
                          className={classes.modalBody}
                        >
                          <p><b>Speaker: </b> {talkSpeaker} </p>
                          <p><b>Title: </b>{talkTitle} </p>
                          <p><b>Video: </b> {talkVideo === null ? 'Not available yet.' : <a href={talkVideo} target="_blank">Click here</a>} </p>
                          {typeof(talkPresentation) == "undefined" ? null : <><p><b>Slides:</b> <a href={talkPresentation} target="_blank">Click here</a></p></>}
                          <p><b>Date: </b>{talkDate} </p>
                          <p><b>Keywords: </b> {talkKeywords.join(', ')}</p>
                          <p><b>Abstract: </b>{ReactHtmlParser(talkDescription)}</p>
                            
                        </DialogContent>
                        <DialogActions className={classes.modalFooter}>
                          <Button
                            onClick={() => setClassicModal(false)}
                            color="danger"
                            simple
                          >
                            Close
                          </Button>
                        </DialogActions>
                      </Dialog>

                    </Card>
                  </GridItem>
                  );})}
                </GridContainer>
              </div>
            );
          })}
      </SwipeableViews>
    </div>
  );
  return horizontal !== undefined ? (
    <GridContainer>
      <GridItem {...horizontal.tabsGrid}>{tabButtons}</GridItem>
      <GridItem {...horizontal.contentGrid}>{tabContent}</GridItem>
    </GridContainer>
  ) : (
    <div>
      {tabButtons}
      {tabContent}
    </div>
  );
}

NavPills.defaultProps = {
  active: 0,
  color: "primary"
};

NavPills.propTypes = {
  // index of the default active pill
  active: PropTypes.number,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabButton: PropTypes.string,
      tabIcon: PropTypes.object,
      tabContent: PropTypes.node
    })
  ).isRequired,
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose"
  ]),
  direction: PropTypes.string,
  horizontal: PropTypes.shape({
    tabsGrid: PropTypes.object,
    contentGrid: PropTypes.object
  }),
  alignCenter: PropTypes.bool
};
