export let apiUrl;
if (process.env.NODE_ENV !== "production") {
  apiUrl = process.env.REACT_APP_NODE_API_DEV;
} else {
  apiUrl = process.env.REACT_APP_NODE_API_PROD;
}
export const tokenType = "jwtToken";
export const userLoginUrl = `${apiUrl}/api/users/login`;
export const adUrl = `${apiUrl}/api/annonces`;
export const newsUrl = `${apiUrl}/api/news`;
export const jobUrl = `${apiUrl}/api/jobs`;
export const userUrl = `${apiUrl}/api/users`;

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
  ri: `${apiUrl}/reglement-interieur/2019-2020-Reglement-Interieur.pdf`
};
