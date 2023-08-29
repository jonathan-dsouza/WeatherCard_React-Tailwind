import moonNew from "../Assets/moon-new.svg";
import waxingCresent from "../Assets/moon-waxing-crescent.svg";
import firstQuarter from "../Assets/moon-first-quarter.svg";
import waxingGibbous from "../Assets/moon-waxing-gibbous.svg";
import moonFull from "../Assets/moon-full.svg";
import waningGibbous from "../Assets/moon-waning-gibbous.svg";
import lastQuarter from "../Assets/moon-last-quarter.svg";
import waningCresent from "../Assets/moon-waning-crescent.svg";

const getMoonPhaseImage = (moonPhaseValue) => {
  let moonPhaseImage = null;
  let moonPhaseDescription = "";

  if (moonPhaseValue === 0) {
    moonPhaseImage = moonNew;
    moonPhaseDescription = "New Moon";
  } else if (moonPhaseValue > 0 && moonPhaseValue <= 0.25) {
    moonPhaseImage = waxingCresent;
    moonPhaseDescription = "Waxing Crescent";
  } else if (moonPhaseValue === 0.25) {
    moonPhaseImage = firstQuarter;
    moonPhaseDescription = "First Quarter";
  } else if (moonPhaseValue > 0.25 && moonPhaseValue <= 0.5) {
    moonPhaseImage = waxingGibbous;
    moonPhaseDescription = "Waxing Gibbous";
  } else if (moonPhaseValue === 0.5) {
    moonPhaseImage = moonFull;
    moonPhaseDescription = "Full Moon";
  } else if (moonPhaseValue > 0.5 && moonPhaseValue <= 0.75) {
    moonPhaseImage = waningGibbous;
    moonPhaseDescription = "Waning Gibbous";
  } else if (moonPhaseValue === 0.75) {
    moonPhaseImage = lastQuarter;
    moonPhaseDescription = "Last Quarter";
  } else if (moonPhaseValue > 0.75 && moonPhaseValue <= 1) {
    moonPhaseImage = waningCresent;
    moonPhaseDescription = "Waning Crescent";
  }

  return { image: moonPhaseImage, description: moonPhaseDescription };
};

export default getMoonPhaseImage;
