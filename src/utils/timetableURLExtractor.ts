import got from "got";
import jsdom from "jsdom";

const getTimetableURL = async (): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    try {
      got("http://zs1rowecki.pl").then((response) => {
        const dom = new jsdom.JSDOM(response.body).window.document;
        const timetablePageURL = dom
          .querySelector("li.item-417")
          ?.querySelector("a")?.href;
        if (timetablePageURL) {
          got(`http://zs1rowecki.pl/${timetablePageURL}`).then((response) => {
            const { JSDOM } = jsdom;
            const dom = new JSDOM(response.body).window.document;
            const timetableURL = dom
              .querySelector("div.item-page")
              ?.querySelector("p")
              ?.querySelector("a")?.href;
            if (timetableURL) {
              resolve(`http://zs1rowecki.pl/${timetableURL}`);
            } else {
              resolve(null);
            }
          });
        } else {
          resolve(null);
        }
      });
    } catch (ex) {
      console.log(ex);
      resolve(null);
    }
  });
};

export default getTimetableURL;
