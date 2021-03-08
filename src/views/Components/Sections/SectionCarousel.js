import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";

// core components
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import Card from "../../../components/Card/Card.js";

import styles from "../../../assets/scss/plugins/_plugin-react-slick.scss";

//import styles from "../../../assets/jss/material-kit-react/views/componentsSections/carouselStyle.js";

//const useStyles = makeStyles(styles);

function renderCarouselImage(src) {
  return (
    <>
    <div style={{padding: "10px"}}>
      <img 
        src={src} 
        alt="First slide" 
        className="slick-image" />
    </div>
    </>
  );
}

function renderImages(images) {
  const n_images = images.length

  let imgs = []
  for (let i = 0; i<n_images; i++) {
    imgs.push(renderCarouselImage(images[i].default));
  }

  return imgs;
}

export default function SectionCarousel() {
  
  //const classes = useStyles();
  
  const settings = {
    //dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    variableWidth: true,
    adaptiveHeight: true
  };

  // Funcion para leer todos los archivos de una carpeta (npm install --save-dev webpack@4.44.2 webpack-cli)
  function importAll(r) {
    return r.keys().map(r);
  }
  const geometryImages = importAll(require.context('../../../assets/img/images/Pics_Geometry', true, /\.(png|jpe?g|svg)$/));
  const topologyImages = importAll(require.context('../../../assets/img/images/Pics_Topology', true, /\.(png|jpe?g|svg)$/));
  
  return (
    //<div className={classes.section}>
    //  <div className={classes.container}>
    //    <GridContainer>
    //      <GridItem xs={12} sm={12} md={8} className={classes.marginAuto}>
          <Card carousel>
            <Carousel {...settings}>
              {renderImages(geometryImages)}
              {renderImages(topologyImages)}
            </Carousel>
          </Card>
    //      </GridItem>
    //    </GridContainer>
    //  </div>
    //</div>
  );
}