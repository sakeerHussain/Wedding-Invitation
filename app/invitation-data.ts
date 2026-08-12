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
    bride: "Safa",
    groom: "Ayaan",
    initials: "S & A",
    sealInitials: "SA",
  },
  ceremonyDate: "14 · 11 · 26",
  ceremonyTime: "4:30 PM",
  verse: "And He placed between you affection and mercy.",
  verseReference: "Qur’an 30:21",
  venue: {
    name: "Noor Palace",
    hall: "Garden Hall",
    address: "12 Crescent Road, Bengaluru, Karnataka",
  },
  rsvp: {
    phone: "",
    message: "Assalamu alaikum, I would like to RSVP for Safa and Ayaan’s wedding.",
  },
  events: [
    {
      number: "01",
      title: "Nikah",
      day: "Saturday",
      date: "14 November 2026",
      dateTime: "2026-11-14T16:30:00+05:30",
      time: "After Asr · 4:30 PM",
      note: "Followed by dua and refreshments",
      calendarStart: "20261114T110000Z",
      calendarEnd: "20261114T130000Z",
    },
    {
      number: "02",
      title: "Walima",
      day: "Sunday",
      date: "15 November 2026",
      dateTime: "2026-11-15T19:00:00+05:30",
      time: "7:00 PM onwards",
      note: "Dinner will be served at 8:00 PM",
      calendarStart: "20261115T133000Z",
      calendarEnd: "20261115T163000Z",
    },
  ] satisfies WeddingEvent[],
} as const;

export const venueLabel = `${invitationData.venue.name}, ${invitationData.venue.hall}, ${invitationData.venue.address}`;
export const venueMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueLabel)}`;
