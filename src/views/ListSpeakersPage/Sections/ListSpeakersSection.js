import React, {useEffect, useState} from "react";

import removeAccents from "remove-accents"

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";

import styles from "../../../assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import MenuOpen from '@material-ui/icons/MenuOpen';

import {db} from '../../../ConfigFirebase';
import ReactHtmlParser from 'react-html-parser';

// For modals

import Button from "../../../components/CustomButtons/Button.js";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import { AddAlertOutlined } from "@material-ui/icons";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

export default function ListSpeakersSection(){
    const classes = useStyles();
    const [speakersIDList, setSpeakersIDList] = useState([]);
    const [speakersDic, setSpeakersDic] = useState({});
    const [speakersListByLetter, setSpeakersListByLatter] = useState({});
    const [lettersInSurname, setLettersInSurname] = useState([]);
    const [visitLetters, setVisitLetters] = useState({});
    const [talks, setTalks] = useState({});

    //para modals
    const [modal, setModal] = useState(false);
    const[talkTitle,setTalkTitle] = useState('');
    const[talkDate,setTalkDate] = useState('');
    const[talkDescription,setTalkDescription] = useState('');
    const[talkVideo,setTalkVideo] = useState('');
    const[talkPresentation,setTalkPresentation] = useState('');
    const[talkSpeaker,setTalkSpeaker] = useState('');
    const[talkKeywords,setTalkKeywords] = useState([]);

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

    useEffect(async () => {
        var talks = {};

        await db.collection("talks")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(async function(doc){
                var date = doc.data().date.toDate();
                talks[doc.id] = {
                    speakerID: doc.data().speaker,
                    year: date.getFullYear(),
                    video: doc.data().video,
                    date: month[date.getMonth()] + " " + date.getDate().toString() + ", " + date.getFullYear().toString(),
                    title: doc.data().title,
                    season: doc.data().season,
                    keywords: doc.data().keywords,
                    slides: doc.data().presentation,
                    abstract: doc.data().abstract,
                };
            });
        })
        .catch(function(error) {
            alert("Cannot load some talk.");
        });

        setTalks(talks);
    
        var speakers = {};
        var speakersID = [];

        await db.collection("speakers").where("talks","!=", null)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    var mi = doc.data().middle_initial;

                    speakers[doc.id] = {
                        name: doc.data().name,
                        surname: doc.data().surname,
                        middle_initial: mi,
                        completeName: doc.data().name + " " + 
                            (mi != null ? mi : "") + " " + doc.data().surname,
                        talks: doc.data().talks,
                        years: [],
                        inList: false
                    };

                    speakersID.push(doc.id)

                    var talks_len = speakers[doc.id].talks.length;

                    // Si la unica platica del speaker no tiene video aun
                    // Creo ya no sirve para nada inList porque ahora se ponen las platicas aunque no tengan video
                    speakers[doc.id].inList = true;

                    for(var i=0; i<talks_len; i++){
                        // los ids de las platicas asociadas a un speaker son enteros en la base de datos
                        var talkYear = talks[speakers[doc.id].talks[i].toString()].year;

                        speakers[doc.id].years.push(talkYear);
                    }

                }); // Se acaba el forEach
            })
            .catch(function(error) {
                alert("Cannot load speakers");
            });

            speakersID.sort(function(a,b){
                if(removeAccents(speakers[a].surname) > removeAccents(speakers[b].surname)){
                    return 1;
                }
                if(removeAccents(speakers[a].surname) < removeAccents(speakers[b].surname)){
                    return -1;
                }
                return 0;
            });
            setSpeakersDic(speakers);
            setSpeakersIDList(speakersID);
        },[]);

    // Al modificar speakers list con el contenido se actualiza
    useEffect(() => {
        handleLettersInSurname();
    },[speakersIDList]);
      
    // Función que revisa las letras que existen para hacer listas
    function handleLettersInSurname(){
        let letterSet = new Set();
        let visitLetters = {};
        let speakersWithLetter = {};

        speakersIDList.forEach(speaker => {
            if(!speakersDic[speaker].inList){
                return;
            }

            const letter = removeAccents(speakersDic[speaker].surname.charAt(0));
            //console.log(letter);
            letterSet.add(letter);
            visitLetters[letter] = false;
            speakersWithLetter[letter] = [];
        });

        speakersIDList.forEach(speaker => {
            if(!speakersDic[speaker].inList){
                return;
            }
            const letter = removeAccents(speakersDic[speaker].surname.charAt(0));
            //console.log(letter);
            speakersWithLetter[letter].push(speaker);
        });
        
        setLettersInSurname([...letterSet]);
        setVisitLetters(visitLetters);
        setSpeakersListByLatter(speakersWithLetter); 
    }  

    function listWithLetter(letter){
        const listItems = speakersListByLetter[letter].map(speaker => {
            var firstTalk = true;
            return(
                <li style={{listStyleType:'square'}}>
                <h5 style={{fontSize: '20px', fontStyle:'normal'}}>{speakersDic[speaker].surname} {speakersDic[speaker].name} {speakersDic[speaker].middle_initial} 
                {speakersDic[speaker].talks.map(function(talkID) {
                    var talkID_aux = talkID.toString();
                    return (
                        <>
                            {firstTalk ? firstTalk=false  : ', ' }
                            <Button 
                                color='primary' 
                                className={classes.buttonList}
                                onClick = {() => {
                                setModal(true);
                                setTalkTitle(talks[talkID_aux].title);
                                setTalkVideo(talks[talkID_aux].video);
                                setTalkPresentation(talks[talkID_aux].slides);
                                setTalkDescription(talks[talkID_aux].abstract);
                                setTalkKeywords(talks[talkID_aux].keywords);
                                setTalkSpeaker(speakersDic[talks[talkID_aux].speakerID.toString()].completeName); 
                                setTalkDate(talks[talkID_aux].date); 
                            }}>
                                {talks[talkID_aux].year}</Button>
                            <Dialog
                                classes={{
                                root: classes.center,
                                paper: classes.modal
                                }}
                                open={modal}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={() => setModal(false)}
                                aria-labelledby="modal-slide-title"
                                aria-describedby="modal-slide-description"
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
                                        onClick={() => {
                                            setModal(false);
                                        }
                                    }
                                    >
                                        <Close className={classes.modalClose} />
                                    </IconButton>
                                    <h2 className={classes.modalTitle} >Talk Details</h2>
                                </DialogTitle>
                                <DialogContent
                                    id="modal-slide-description"
                                    className={classes.modalBody}
                                    >
                                    <p><b>Speaker: </b> {talkSpeaker} </p>
                                    <p><b>Title: </b>{talkTitle} </p>
                                    <p><b>Video: </b> {talkVideo === null ? 'Not available yet.' : <a href={talkVideo} target="_blank">Click here</a>} </p>
                                    {/*Cuando una talk no tiene presentacion, talkSlides es undefined, y en otro caso string*/}
                                    {typeof(talkPresentation) == "undefined" ? null : <><p><b>Slides:</b> <a href={talkPresentation} target="_blank">Click here</a></p></>}
                                    <p><b>Date: </b>{talkDate} </p>
                                    <p><b>Keywords: </b> {talkKeywords.join(', ')}</p>
                                    <p><b>Abstract: </b>{ReactHtmlParser (talkDescription)}</p>
                                </DialogContent>
                                <DialogActions className={classes.modalFooter}>
                                <Button
                                    onClick={() => setModal(false)}
                                    color="danger"
                                    simple
                                >
                                    Close
                                </Button>
                                </DialogActions>
                            </Dialog>
                        </>
                    );  
                })}
                </h5>
                </li>
            );
        }
        
        );
        
        return (
            <ul style={{textAlign: 'left'}}>{listItems}</ul>
        );
    }

    function listAlphabetical(){
        const listItems = lettersInSurname.map(letter => 
                <li 
                    style={{cursor: 'pointer'}}> 
                    <h1 className={classes.title}> 
                        {letter} <MenuOpen
                        onClick={onclickLetter.bind(this, letter)}
                        /> {visitLetters[letter] ? listWithLetter(letter) : null}
                    </h1>
                </li>
        );
        return (
            <ul style={{textAlign: 'left'}}>{listItems}</ul>
        );
    }

    const [count, setCount] = useState(0);

    function onclickLetter(letter){
        var newVisit = visitLetters;
        newVisit[letter] = !newVisit[letter];
        setVisitLetters(newVisit);
        setCount(count+1);
    }
    return(
        <div className={classes.section}> 
            {listAlphabetical()}
        </div>
    );
}