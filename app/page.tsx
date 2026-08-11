"use client";

import { useEffect, useRef, useState } from "react";

const events = [
  {
    number: "01",
    title: "Nikah",
    day: "Saturday",
    date: "14 November 2026",
    time: "After Asr · 4:30 PM",
    note: "Followed by dua and refreshments",
  },
  {
    number: "02",
    title: "Walima",
    day: "Sunday",
    date: "15 November 2026",
    time: "7:00 PM onwards",
    note: "Dinner will be served at 8:00 PM",
  },
];

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [blur, setBlur] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!opened) return;
    const update = () => {
      const height = heroRef.current?.offsetHeight || window.innerHeight;
      setBlur(Math.min(1, Math.max(0, window.scrollY / (height * 0.7))));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [opened]);

  const openInvitation = () => {
    setOpened(true);
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 450);
  };

  return (
    <main className={opened ? "invitation invitation--open" : "invitation"}>
      <section className="envelope-scene" aria-hidden={opened}>
        <div className="ambient ambient--one" />
        <div className="ambient ambient--two" />
        <p className="eyebrow envelope-eyebrow">A celebration written by destiny</p>
        <div className="envelope-wrap">
          <div className="envelope-shadow" />
          <div className="envelope">
            <div className="envelope__lining" />
            <div className="envelope__paper">
              <span>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</span>
              <strong>S &amp; A</strong>
            </div>
            <div className="envelope__left" />
            <div className="envelope__right" />
            <div className="envelope__bottom" />
            <div className="envelope__flap" />
            <button className="seal" onClick={openInvitation} aria-label="Open the wedding invitation">
              <span>SA</span>
            </button>
          </div>
        </div>
        <button className="open-hint" onClick={openInvitation}>
          <span>Tap the seal to open</span>
          <i aria-hidden="true">↓</i>
        </button>
      </section>

      <div className="invitation-content" aria-hidden={!opened}>
        <section
          ref={heroRef}
          className="hero"
          style={{ "--scroll-blur": `${blur * 10}px`, "--scroll-fade": `${1 - blur * 0.34}` } as React.CSSProperties}
        >
          <div className="hero__fixed">
            <div className="paper-noise" />
            <img
              className="hero-art"
              src="/hero-watercolor-v2.png"
              alt="Watercolour Islamic garden scene framed by ivory and blush flowers, with a newlywed couple seen from behind"
            />

            <div className="arch">
              <div className="arch__inner">
                <p className="bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</p>
                <p className="eyebrow">Together with their families</p>
                <div className="ornament"><span>✦</span></div>
                <h1><span>Safa</span><small>&amp;</small><span>Ayaan</span></h1>
                <p className="invitation-copy">request the honour of your presence<br />as they begin their forever</p>
                <div className="date-lockup">
                  <span>Saturday</span><strong>14 · 11 · 26</strong><span>4:30 PM</span>
                </div>
                <p className="verse">“And He placed between you affection and mercy.”</p>
                <span className="verse-ref">Qur’an 30:21</span>
              </div>
            </div>
            <div className="scroll-cue"><span>Discover our celebration</span><i>↓</i></div>
          </div>
        </section>

        <section className="details">
          <div className="details__intro reveal">
            <p className="eyebrow">With gratitude to Allah</p>
            <h2>Our joyful<br /><em>beginning</em></h2>
            <p>We warmly invite you to share in our happiness and bless our union with your presence and duas.</p>
          </div>

          <div className="event-grid">
            {events.map((event) => (
              <article className="event-card" key={event.title}>
                <span className="event-card__number">{event.number}</span>
                <div className="event-card__mark">✦</div>
                <p>{event.day}</p>
                <h3>{event.title}</h3>
                <div className="event-card__rule" />
                <strong>{event.date}</strong>
                <span>{event.time}</span>
                <small>{event.note}</small>
              </article>
            ))}
          </div>

          <article className="venue-card">
            <div className="venue-card__top">
              <div>
                <p className="eyebrow">The venue</p>
                <h3>Noor Palace</h3>
              </div>
              <span className="venue-card__symbol" aria-hidden="true">⌖</span>
            </div>
            <p>Garden Hall, 12 Crescent Road<br />Bengaluru, Karnataka</p>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer">View on map <span>↗</span></a>
          </article>

          <article className="dua-card">
            <span className="crescent" aria-hidden="true">☾</span>
            <p className="dua-card__arabic">بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ</p>
            <p>May Allah bless you both, shower His blessings upon you, and unite you in goodness.</p>
          </article>

          <footer>
            <div className="monogram">S <i>&amp;</i> A</div>
            <p>Your presence is the greatest gift.</p>
            <span>We can’t wait to celebrate with you</span>
          </footer>
        </section>
      </div>
    </main>
  );
}
