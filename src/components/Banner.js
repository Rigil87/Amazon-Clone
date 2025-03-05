import React from 'react';
import '../styles/banner.css'; // Create a separate CSS file for the banner component

function Banner() {
  return (
    <div className="banner">
      <img
        className="banner__image"
        src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
        alt="Banner"
      />
    </div>
  );
}

export default Banner;
