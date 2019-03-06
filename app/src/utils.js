export const tokenType = "jwtToken";
export const userLoginUrl = `http://${
  process.env.REACT_APP_NODE_API
}/api/users/login`;
export const adUrl = `http://${process.env.REACT_APP_NODE_API}/api/annonces`;
export const newsUrl = `http://${process.env.REACT_APP_NODE_API}/api/news`;
export const jobUrl = `http://${process.env.REACT_APP_NODE_API}/api/jobs`;
export const userUrl = `http://${process.env.REACT_APP_NODE_API}/api/users`;

export const urls = {
  admin: "/admin",
  news: "/news",
  jobboard: "/jobboard",
  ads: "/annonces",
  dashboard: "/",
  hypperplanning: "http://agmc-paris.com/",
  mails: "https://mail.google.com/",
  classroom: "https://classroom.google.com/",
  trombinoscope: "/trombinoscope",
  ri: `http://${
    process.env.REACT_APP_NODE_API
  }/reglement-interieur/2019-2020-Reglement-Interieur.pdf`
};
