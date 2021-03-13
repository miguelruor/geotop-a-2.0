import React, {useState, useEffect} from "react";
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

import removeAccents from "remove-accents"

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

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

export default function     ListSpeakersSection(){
    const classes = useStyles();
    let keywords_aux = {};
    // keywords_aux sera un diccionario indexado por todas las keywords que almacena listas de objetos 
    // del tipo [talk.id, surname, year]

    const [keywords, setKeywords] = useState({});
    const [keywordsListByLetter,setKeywordsListByLatter] = useState([]);
    const [lettersInKeywords, setLettersInKeywords] = useState([]);
    const [visitLetters, setVisitLetters] = useState({});
    const [speakersById,setSpeakersById] = useState({});
    const [allTalks, setTalks] = useState({});
    const [modal, setModal] = useState(false);
    const[talkTitle,setTalkTitle] = useState('');
    const[talkDate,setTalkDate] = useState('');
    const[talkDescription,setTalkDescription] = useState('');
    const[talkVideo,setTalkVideo] = useState('');
    const[talkPresentation,setTalkPresentation] = useState('');
    const[talkSpeaker,setTalkSpeaker] = useState('');
    const[talkKeywords,setTalkKeywords] = useState([]);
    const[warningNote, setWarningNote] = useState('');

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
    
    useEffect(async()=>{
        
        var speakers = {};
        await db.collection('speakers').get()
        .then(function(querySnapshot){
            querySnapshot.forEach(async function(doc){
                var mi = doc.data().middle_initial;
                speakers[doc.id] = {
                    surname: doc.data().surname,
                    completeName: doc.data().name + " " + 
                    (mi != null ? mi : "") + " " + doc.data().surname
                };
            })
        })
        .catch(function(error){
            alert("Some speakers cannot load.");
        });

        var talks = {};

        await db.collection("talks").get()
        .then(function(querySnapshot){
            querySnapshot.forEach(async function(doc){
                
                let keys = doc.data().keywords;
                let keys_len = keys.length;
                for(let i=0; i<keys_len; i++){
                    // Checo si encuentro una keyword nueva
                    if(!(keys[i] in keywords_aux)){
                        keywords_aux[keys[i]] = []
                    }
                    keywords_aux[keys[i]].push(doc.id); 
                }
                var idx = doc.data().speaker;
                var date = doc.data().date.toDate();
                talks[doc.id] = {
                    surname: speakers[idx].surname,
                    speaker: speakers[idx].completeName,
                    year: date.getFullYear(),
                    video: doc.data().video,
                    date: month[date.getMonth()] + " " + date.getDate().toString() + ", " + date.getFullYear().toString(),
                    title: doc.data().title,
                    keywords: doc.data().keywords,
                    slides: doc.data().presentation,
                    abstract: doc.data().abstract,
                    warning: doc.data().warning,
                };
                
            });
        })
        .catch(function(error){
            alert("Cannot load some talk")
        });
        setKeywords(keywords_aux);
        setTalks(talks);
    },[]);

    // Al modificar speakers list con el contenido se actualiza
    useEffect(() => {
        handleLettersInKeyWords();
    },[keywords]);

    // Función que revisa las letras que existen para hacer listas
    function handleLettersInKeyWords(){
        let letterSet = new Set();
        let visitLetters = {};
        let keywordsWithLetter = {};
        for(var k in keywords){
            var letter = k.charAt(0).toUpperCase();
            letterSet.add(letter);
            visitLetters[letter] = false;
            keywordsWithLetter[letter] = [];
        }
        for(var k in keywords){
            var letter = k.charAt(0).toUpperCase() ;
            var copy = {};
            copy[k] = keywords[k];
            keywordsWithLetter[letter].push(copy);
        }
        var auxLetterSet = [...letterSet];
        auxLetterSet.sort();

        setLettersInKeywords(auxLetterSet);
        setVisitLetters(visitLetters);
        setKeywordsListByLatter(keywordsWithLetter); 
    }  

    function listWithLetter(letter){
        var orderedKeywords = keywordsListByLetter[letter];
        orderedKeywords.sort(function(a,b){
            if(removeAccents((Object.keys(a))[0]).toLowerCase() > removeAccents((Object.keys(b))[0]).toLowerCase()){
                return 1;
            }
            if(removeAccents((Object.keys(a))[0]).toLowerCase() < removeAccents((Object.keys(b))[0]).toLowerCase()){
                return -1;
            }
            return 0;
        });
        const listItems = orderedKeywords.map(keyword =>{
            return(
            <li style={{listStyleType:'square'}}> 
            <h5 style={{fontSize: '20px', fontStyle:'normal'}}> 
                {Object.keys(keyword).map(function(k) {
                    let result = '';
                    let first = true;    
                    
                    return (
                       <> 
                       {k} <br/>
                       {keywords[k].map((data) =>{ 
                        return (
                            <>{first ? first = false : ','} {allTalks[data].surname + " "} 
                            <Button 
                                color='primary' 
                                className={classes.buttonList}
                                onClick = {() => {
                                setModal(true);
                                setTalkTitle(allTalks[data].title);
                                setTalkVideo(allTalks[data].video);
                                setTalkPresentation(allTalks[data].slides);
                                setTalkDescription(allTalks[data].abstract);
                                setTalkKeywords(allTalks[data].keywords);
                                setTalkSpeaker(allTalks[data].speaker); 
                                setTalkDate(allTalks[data].date); 
                                setWarningNote(allTalks[data].warning);
                            }}>
                                {allTalks[data].year}</Button>
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
                                    {typeof(warningNote) == "undefined" ? null : <><p><b>Warning: </b>{warningNote}</p></>}
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
                        )
                       })} </>    
                    )})}
            </h5>
            </li>
            );
        });
        
        return (
            <ul style={{listStyleType:'none'}}>
                {listItems}
            </ul>
        );
    }

    function listAlphabetical(){
        const listItems = lettersInKeywords.map(letter => 
                <li
                    style={{listStyleType:'none'}} > 
                    <h1 className={classes.title}> 
                        {letter} <MenuOpen
                        onClick={onclickLetter.bind(this, letter)}
                        style={{cursor: 'pointer'}}
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
        let newVisit = visitLetters;
        newVisit[letter] = !newVisit[letter];
        setVisitLetters(newVisit);
        setCount(count+1);
    }

    return(
        <div className={classes.section} > 
            {listAlphabetical()}
        </div>
    );
}