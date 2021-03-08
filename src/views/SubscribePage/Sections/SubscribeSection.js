import React, {useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import emailjs from "emailjs-com";

// @material-ui/icons

// core components
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import CustomInput from "../../../components/CustomInput/CustomInput.js";
import Button from "../../../components/CustomButtons/Button.js";

import styles from "../../../assets/jss/material-kit-react/views/landingPageSections/workStyle.js";

const useStyles = makeStyles(styles);

export default function SubscribeSection() {

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [message,setMessage] = useState('');

  function handleChangeName(event){
    setName(event['target'].value);
  }

  function handleChangeEmail(event){
    setEmail(event['target'].value);
  }

  function handleChangeMessage(event){
    setMessage(event['target'].value);
  }

  function handleSumbit(e){
    e.preventDefault();
    
    emailjs
      .sendForm(
        "service_5nxp327",
        "template_kjs6r07",
        e.target,
        "user_9vgc4yH3Zzx5b8J7xMbDT"
      )
      .then(
        (result) => {
          alert("Email sent succesfully!");
        },
        (error) => {
          alert("Email didnt sent");
        }
      )
  }

  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Subscribe to GEOTOP-A</h2>
          <h4 className={classes.description}>
            Send us your details to receive automatic reminders of upcoming seminars
          </h4>
          <form onSubmit={handleSumbit}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Name"
                  id="name"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name:"from_name",
                    onChange: handleChangeName
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Email"
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name:"email",
                    onChange: handleChangeEmail,
                  }}
                />
              </GridItem>
              <CustomInput
                labelText="Your Message"
                id="message"
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea
                }}
                inputProps={{
                  multiline: true,
                  rows: 5,
                  name: "message",
                  value: message,
                  onChange: handleChangeMessage
                }}
              />
              <GridItem xs={12} sm={12} md={4}>
                <Button color="primary" type='sumbit'>Send Message</Button>
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}