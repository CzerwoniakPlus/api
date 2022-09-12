import lessonHours from "../../json/lessonHours.json";
import lessonHoursShort from "../../json/lessonShort.json";
import Database from "../db";
import moment from "moment";

moment.locale("pl");

async function getCurrentLesson() {
  return new Promise((resolve, reject) => {
    const now = moment().utc().local();
    const format = "HH:mm";
    Database.getShortenedLessonsStatus().then((result) => {
      const isShortLessons = result ? true : false;
      const hours = result ? lessonHoursShort : lessonHours;
      /*
            And now... the most f'ed up part of this code.
            I'm sorry.
            *Psst... if you know how to improve this fragment, feel free to open a PR! I would be more than grateful*
        */
      const lesson1Start = moment(hours[1].start, format);
      const lesson1End = moment(hours[1].end, format);
      const lesson2Start = moment(hours[2].start, format);
      const lesson2End = moment(hours[2].end, format);
      const lesson3Start = moment(hours[3].start, format);
      const lesson3End = moment(hours[3].end, format);
      const lesson4Start = moment(hours[4].start, format);
      const lesson4End = moment(hours[4].end, format);
      const lesson5Start = moment(hours[5].start, format);
      const lesson5End = moment(hours[5].end, format);
      const lesson6Start = moment(hours[6].start, format);
      const lesson6End = moment(hours[6].end, format);
      const lesson7Start = moment(hours[7].start, format);
      const lesson7End = moment(hours[7].end, format);
      const lesson8Start = moment(hours[8].start, format);
      const lesson8End = moment(hours[8].end, format);
      const lesson9Start = moment(hours[9].start, format)
      const lesson9End = moment(hours[9].end, format)

      /*
        These lesson hours are rarely used, even in school's timetables, but I'm keeping them 
        just in case I need them in the future.
        ---
        const lesson10Start = moment(hours[10].start, format)
        const lesson10End = moment(hours[10].end, format)
        */

      const night = moment("19:00", format);

      // Aaand again... Why did I do this?

      if (now.day() != 6 && now.day() != 0) {
        if (
          now.isBetween(lesson1Start, lesson1End) ||
          now.isSame(lesson1Start) ||
          now.isSame(lesson1End)
        ) {
          resolve(countDuration("Lekcja", 1, now, lesson1Start, lesson1End, isShortLessons, lesson1Start));
        } else if (now.isBetween(lesson1End, lesson2Start)) {
          resolve(countDuration("Przerwa", 1, now, lesson1End, lesson2Start, isShortLessons, lesson1Start));
        } else if (
          now.isBetween(lesson2Start, lesson2End) ||
          now.isSame(lesson2Start) ||
          now.isSame(lesson2End)
        ) {
          resolve(countDuration("Lekcja", 2, now, lesson2Start, lesson2End, isShortLessons, lesson1Start));
        } else if (now.isBetween(lesson2End, lesson3Start)) {
          resolve(countDuration("Przerwa", 2, now, lesson2End, lesson3Start, isShortLessons, lesson1Start));
        } else if (
          now.isBetween(lesson3Start, lesson3End) ||
          now.isSame(lesson3Start) ||
          now.isSame(lesson3End)
        ) {
          resolve(countDuration("Lekcja", 3, now, lesson3Start, lesson3End, isShortLessons, lesson1Start));
        } else if (now.isBetween(lesson3End, lesson4Start)) {
          resolve(countDuration("Przerwa", 3, now, lesson3End, lesson4Start, isShortLessons, lesson1Start));
        } else if (
          now.isBetween(lesson4Start, lesson4End) ||
          now.isSame(lesson4Start) ||
          now.isSame(lesson4End)
        ) {
          resolve(countDuration("Lekcja", 4, now, lesson4Start, lesson4End, isShortLessons, lesson1Start));
        } else if (now.isBetween(lesson4End, lesson5Start)) {
          resolve(countDuration("Przerwa", 4, now, lesson4End, lesson5Start, isShortLessons, lesson1Start));
        } else if (
          now.isBetween(lesson5Start, lesson5End) ||
          now.isSame(lesson5Start) ||
          now.isSame(lesson5End)
        ) {
          resolve(countDuration("Lekcja", 5, now, lesson5Start, lesson5End, isShortLessons, lesson1Start));
        } else if (now.isBetween(lesson5End, lesson6Start)) {
          resolve(countDuration("Przerwa", 5, now, lesson5End, lesson6Start, isShortLessons, lesson1Start));
        } else if (
          now.isBetween(lesson6Start, lesson6End) ||
          now.isSame(lesson6Start) ||
          now.isSame(lesson6End)
        ) {
          resolve(countDuration("Lekcja", 6, now, lesson6Start, lesson6End, isShortLessons, lesson1Start));
        } else if (now.isBetween(lesson6End, lesson7Start)) {
          resolve(countDuration("Przerwa", 6, now, lesson6End, lesson7Start, isShortLessons, lesson1Start));
        } else if (
          now.isBetween(lesson7Start, lesson7End) ||
          now.isSame(lesson7Start) ||
          now.isSame(lesson7End)
        ) {
          resolve(countDuration("Lekcja", 7, now, lesson7Start, lesson7End, isShortLessons, lesson1Start));
        } else if (now.isBetween(lesson7End, lesson8Start)) {
          resolve(countDuration("Przerwa", 7, now, lesson7End, lesson8Start, isShortLessons, lesson1Start));
        } else if (
          now.isBetween(lesson8Start, lesson8End) ||
          now.isSame(lesson8Start) ||
          now.isSame(lesson8End)
        ) {
          resolve(countDuration("Lekcja", 8, now, lesson8Start, lesson8End, isShortLessons, lesson1Start));
        } else if (now.isBetween(lesson8End, lesson9Start)) {
          countDuration("Przerwa", 8, now, lesson8End, lesson9Start, isShortLessons, lesson1Start)
        } else if (now.isBetween(lesson9Start, lesson9End) || now.isSame(lesson9Start) || now.isSame(lesson9End)) {
          countDuration("Lekcja", 9, now, lesson9Start, lesson9End, isShortLessons, lesson1Start)
        }
        else if (now.isAfter(lesson9End) && now.isBefore(night)) {
          resolve({ type: "afternoon", isShortLessons: isShortLessons });
        } else if (now.isAfter(night) || now.isSame(night)) {
          resolve({ type: "evening", isShortLessons: isShortLessons });
        } else if (now.isBefore(lesson1Start)) {
          resolve(countDuration("morning", 0, now, lesson1Start, lesson1Start, isShortLessons, lesson1Start));
        }
      } else {
        resolve({ type: "weekend", isShortLessons: isShortLessons });
      }
    });
  });
}

function countDuration(type: "Lekcja" | "Przerwa" | "morning", number: number, now: moment.Moment, timeStart: moment.Moment, timeEnd: moment.Moment, isShortLessons: boolean, lesson1Start: moment.Moment): Object {
  let duration = moment.duration(now.diff(timeEnd)).humanize();

  // @ts-ignore - I don't know why this gets marked as an error, but it works.
  const percentage_complete = (now - timeStart) / (timeEnd - timeStart) * 100;
  const percentage_rounded = (Math.round(percentage_complete) / 100);

  duration = duration === "minuta" ? "1 minuta" : duration;
  duration = duration === "godzina" ? (now.isBefore(lesson1Start) ? duration : "45 minut") : duration;

  const result = {
    type: type,
    number: number,
    timeLeft: duration,
    percentage: percentage_rounded,
    isShortLessons: isShortLessons
  }

  return result;
}

export default getCurrentLesson;