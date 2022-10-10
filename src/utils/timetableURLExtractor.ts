import got from "got";
import {JSDOM} from "jsdom";

const getTimetableURL = async (): Promise<string | null> => {
  return new Promise(async (resolve, reject) => {
    const homePage = await got('http://zs1rowecki.pl');
    const homePageDocument = new JSDOM(homePage.body).window.document;
    const timetablePageURL = homePageDocument
      .querySelector('li.item-417')
      ?.querySelector('a')?.href;
    if (timetablePageURL) {
      const timetablePage = await got(
        `http://zs1rowecki.pl/${timetablePageURL}`,
      );
      const timetablePageDocument = new JSDOM(timetablePage.body).window
        .document;
      const timetableURL = timetablePageDocument
        .querySelector('div.item-page')
        ?.querySelector('p')
        ?.querySelector('a')?.href;
      if (!timetableURL) throw new Error('Timetable URL not found');
      resolve(`http://zs1rowecki.pl/${timetableURL}`);
    }
  });
};

export default getTimetableURL;
