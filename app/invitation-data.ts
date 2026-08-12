export type WeddingEvent = {
  number: string;
  title: string;
  day: string;
  date: string;
  dateTime: string;
  time: string;
  note: string;
  calendarStart: string;
  calendarEnd: string;
};

export const invitationData = {
  couple: {
    bride: "Amina",
    groom: "Sakeer",
    initials: "S & A",
    sealInitials: "SA",
  },
  ceremonyDate: "24 · 12 · 26",
  ceremonyTime: "11:00 AM onwards",
  verse: "And He placed between you affection and mercy.",
  verseReference: "Qur’an 30:21",
  venue: {
    name: "Sana Auditorium",
    hall: "Marriage Hall",
    address: "Kallumthazham, kollam, Kerala",
  },
  rsvp: {
    phone: "",
    message: "Assalamu alaikum, I would like to RSVP for Amina and Sakeer’s wedding.",
  },
  events: [
    {
      number: "01",
      title: "Nikah",
      day: "Thursday",
      date: "24 December 2026",
      dateTime: "2026-12-24T11:00:00+05:30",
      time: "11:00 AM onwards",
      note: "Followed by dua and refreshments",
      calendarStart: "20261224T053000Z",
      calendarEnd: "20261224T073000Z",
    },
    // {
    //   number: "02",
    //   title: "Walima",
    //   day: "Sunday",
    //   date: "15 November 2026",
    //   dateTime: "2026-11-15T19:00:00+05:30",
    //   time: "7:00 PM onwards",
    //   note: "Dinner will be served at 8:00 PM",
    //   calendarStart: "20261115T133000Z",
    //   calendarEnd: "20261115T163000Z",
    // },
  ] satisfies WeddingEvent[],
} as const;

export const venueLabel = `${invitationData.venue.name}, ${invitationData.venue.hall}, ${invitationData.venue.address}`;
export const venueMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueLabel)}`;
