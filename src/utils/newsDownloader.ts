import { parseString } from "xml2js";
import got from "got";
import sanitizeHtml from "sanitize-html";
import fs from "fs";

const getNewsFromSchoolWebsite = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const feedURL =
        "http://www.zs1rowecki.pl/index.php?option=com_content&view=category&id=10&Itemid=147&format=feed&type=atom";
      const newsXML = (await got(feedURL)).body;
      parseString(newsXML, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const newsArrFromFeed = result.feed.entry;
          let newsArr = [];
          for (let news of newsArrFromFeed) {
            const cleanContent = sanitizeHtml(news.content[0]._, {
              allowedTags: [],
            }).replace(/(\r\n|\n|\r)/gm, " ");
            newsArr.push({
              title: news.title[0],
              content: cleanContent,
              link: news.id[0],
            });
          }
          resolve(newsArr);
        }
      });
    } catch (ex) {
      console.log(ex);
    }
  });
};

const refreshNews = async () => {
  const news = await getNewsFromSchoolWebsite();
  fs.writeFileSync("./json/news.json", JSON.stringify(news));
};

export default refreshNews;
