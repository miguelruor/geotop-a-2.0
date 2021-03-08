import { title } from "../../../material-kit-react.js";

const workStyle = {
  section: {
    padding: "70px 0"
  },
  title: {
    ...title,
    marginBottom: "10%",
    marginLeft: "2%",
    marginRight: "2%",
    minHeight: "30px",
    textDecoration: "none",
    textAlign: "center"
  },
  subtitle: {
   ...title,
   marginBottom: "10px",
   margin: "10px",
   minHeight: "30px",
   textDecoration: "none",
   textAlign: "left",
   color: "#407294",
 },
  description: {
    color: "black",
    textAlign: "left",
    //marginLeft: "10px",
  },
  nextTalks:{
    color: "black",
    textAlign: "left",
    marginLeft: "10px",
    margin: "12px"
  },
  textCenter: {
    textAlign: "center"
  },
  textArea: {
    marginRight: "15px",
    marginLeft: "15px"
  }
};

export default workStyle;
