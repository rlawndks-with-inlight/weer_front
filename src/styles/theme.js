

const size = {
  mobileS: "480px",
  mobileL: "770px",
  tabletS: "1023px",
  tabletL: "1280px",
  laptop: "1460px",
  desktop: "1700px",
}

const theme = {
  color: {
    first: "#8e44ad",
    secondary: "#9b59b6",
    third: "#cd84f1",
    strong: "#1a1a1a",
    light: "#ababab",
    background1:"#81ecec",
    background2:"#81ecec",
    background3:"#00cec911",
    font1:"#000",
    font2:"#5a5a5a",
    font3:"#cccccc"
  },
  size: {
    mobileS: `(max-width: ${size.mobileS})`,
    mobileL: `(max-width: ${size.mobileL})`,
    tabletS: `(max-width: ${size.tabletS})`,
    tabletL: `(max-width: ${size.tabletL})`,
    laptop: `(max-width: ${size.laptop})`,
    desktop: `(max-width: ${size.desktop})`,
  },
  font: {
    thin: "SpoqaHanSansNeo-Thin",
    light: "SpoqaHanSansNeo-Light",
    regular: "SpoqaHanSansNeo-Regular",
    medium: "SpoqaHanSansNeo-Medium",
    
  },
  boxShadow: "0px 3px 6px #00000029"
}

export default theme