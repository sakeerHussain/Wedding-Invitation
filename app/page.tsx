"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { invitationData, venueLabel, venueMapUrl, type WeddingEvent } from "./invitation-data";

const floralShowerPieces = Array.from({ length: 30 }, (_, index) => ({
  x: (index * 37 + 7) % 100,
  delay: (index % 10) * 0.11,
  duration: 3.4 + (index % 6) * 0.32,
  drift: (index % 2 === 0 ? 1 : -1) * (18 + (index % 5) * 9),
  rotation: (index * 47) % 180,
  kind: index % 3,
}));

function downloadCalendar(event: WeddingEvent) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Safa and Ayaan//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${event.title.toLowerCase()}-safa-ayaan-2026@wedding-invitation`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`,
    `DTSTART:${event.calendarStart}`,
    `DTEND:${event.calendarEnd}`,
    `SUMMARY:${event.title} — Safa & Ayaan`,
    `LOCATION:${venueLabel.replace(/,/g, "\\,")}`,
    `DESCRIPTION:${event.note}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  const url = URL.createObjectURL(new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `safa-ayaan-${event.title.toLowerCase()}.ics`;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 500);
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [detailsRevealed, setDetailsRevealed] = useState(false);
  const [showerActive, setShowerActive] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    document.body.classList.toggle("invitation-locked", !opened || !detailsRevealed);
    return () => document.body.classList.remove("invitation-locked");
  }, [opened, detailsRevealed]);

  useEffect(() => {
    if (!showerActive) return;
    const timer = window.setTimeout(() => setShowerActive(false), 5200);
    return () => window.clearTimeout(timer);
  }, [showerActive]);

  useEffect(() => {
    if (!detailsRevealed) return;
    const hero = heroRef.current;
    if (!hero) return;
    let frame = 0;

    const paint = () => {
      const progress = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.92)));
      hero.style.setProperty("--scroll-blur", `${progress * 8}px`);
      hero.style.setProperty("--content-opacity", `${Math.max(0, 1 - progress * 1.8)}`);
      hero.style.setProperty("--content-shift", `${progress * -42}px`);
      hero.style.setProperty("--art-scale", `${1 + progress * 0.035}`);
      hero.style.setProperty("--art-opacity", `${1 - progress * 0.78}`);
      frame = 0;
    };
    const update = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [detailsRevealed]);

  useEffect(() => {
    if (!detailsRevealed) return;
    const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.14, rootMargin: "0px 0px -8%" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [detailsRevealed]);

  const openInvitation = () => {
    setOpened(true);
    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      headingRef.current?.focus({ preventScroll: true });
    }, 900);
  };

  const revealCelebration = () => {
    setDetailsRevealed(true);
    setShowerActive(true);
  };

  const { couple, events, venue } = invitationData;

  const invitationClassName = [
    "invitation",
    opened && "invitation--open",
    detailsRevealed && "invitation--celebrating",
  ].filter(Boolean).join(" ");

  return (
    <main className={invitationClassName}>
      <section className="envelope-scene" aria-hidden={opened} aria-label="Wedding invitation envelope">
        <div className="ambient ambient--one" />
        <div className="ambient ambient--two" />
        <p className="eyebrow envelope-eyebrow">A celebration written by destiny</p>
        <div className="envelope-wrap">
          <div className="envelope-shadow" />
          <div className="envelope">
            <div className="envelope__lining" />
            <div className="envelope__paper">
              <span lang="ar" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</span>
              <strong>{couple.initials}</strong>
            </div>
            <div className="envelope__left" />
            <div className="envelope__right" />
            <div className="envelope__bottom" />
            <div className="envelope__flap" />
            <button className="seal" onClick={openInvitation} aria-label="Open the wedding invitation">
              <span>{couple.sealInitials}</span>
            </button>
          </div>
        </div>
        <button className="open-hint" onClick={openInvitation}>
          <span>Tap the seal to open</span>
          <i aria-hidden="true">↓</i>
        </button>
      </section>

      {showerActive && (
        <div className="floral-shower" aria-hidden="true">
          {floralShowerPieces.map((piece, index) => (
            <span
              className={`floral-piece floral-piece--${piece.kind}`}
              key={index}
              style={{
                "--piece-x": `${piece.x}vw`,
                "--piece-delay": `${piece.delay}s`,
                "--piece-duration": `${piece.duration}s`,
                "--piece-drift": `${piece.drift}vw`,
                "--piece-rotation": `${piece.rotation}deg`,
              } as CSSProperties}
            />
          ))}
        </div>
      )}

      <div className="invitation-content" aria-hidden={!opened}>
        <section ref={heroRef} className="hero">
          <div className="hero__fixed">
            <div className="paper-noise" />
            <div className="hero-art-stage" aria-hidden="true">
              <Image
                className="hero-art-backdrop"
                src="/hero-watercolor-backdrop.webp"
                fill
                sizes="100vw"
                unoptimized
                alt=""
              />
              <Image
                className="hero-art hero-art--desktop"
                src="/hero-watercolor-v3.webp"
                width={1024}
                height={1536}
                sizes="(max-aspect-ratio: 2/3) 100vw, 67vh"
                priority
                alt=""
              />
              <Image
                className="hero-art hero-art--mobile"
                src="/hero-watercolor-mobile-v3.webp"
                width={854}
                height={1842}
                sizes="100vw"
                priority
                alt=""
              />
            </div>
            <div className="arch">
              <div className="arch__inner">
                <p className="bismillah" lang="ar" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</p>
                <p className="eyebrow">Together with their families</p>
                <div className="ornament" aria-hidden="true"><span>✦</span></div>
                <h1 ref={headingRef} tabIndex={-1}><span>{couple.bride}</span><small>&amp;</small><span>{couple.groom}</span></h1>
                <p className="invitation-copy">request the honour of your presence<br />as they begin their forever</p>
                <div className="date-lockup card-secondary">
                  <span>{events[0].day}</span><strong>{invitationData.ceremonyDate}</strong><span>{invitationData.ceremonyTime}</span>
                </div>
                <p className="verse card-secondary">“{invitationData.verse}”</p>
                <span className="verse-ref card-secondary">{invitationData.verseReference}</span>
              </div>
            </div>
            {opened && !detailsRevealed && (
              <button className="card-reveal-action" onClick={revealCelebration} aria-label="Reveal the wedding details and continue">
                <span>Tap the card to reveal the celebration</span>
                <i aria-hidden="true">✦</i>
              </button>
            )}
          </div>
        </section>

        <section className="details" aria-label="Wedding celebration details" aria-hidden={!detailsRevealed}>
          <div className="details__intro reveal">
            <p className="eyebrow">With gratitude to Allah</p>
            <h2>Our joyful<br /><em>beginning</em></h2>
            <p>We warmly invite you to share in our happiness and bless our union with your presence and duas.</p>
          </div>

          <div className="event-grid" id="events">
            {events.map((event) => (
              <article className="event-card reveal" key={event.title}>
                <span className="event-card__number" aria-hidden="true">{event.number}</span>
                <div className="event-card__mark" aria-hidden="true">✦</div>
                <p>{event.day}</p>
                <h3>{event.title}</h3>
                <div className="event-card__rule" aria-hidden="true" />
                <time dateTime={event.dateTime}>{event.date}</time>
                <span>{event.time}</span>
                <small>{event.note}</small>
                <button className="card-action" onClick={() => downloadCalendar(event)}>
                  Add to calendar <span aria-hidden="true">＋</span>
                </button>
              </article>
            ))}
          </div>

          <article className="venue-card reveal" id="venue">
            <div className="venue-card__top">
              <div>
                <p className="eyebrow">The venue</p>
                <h3>{venue.name}</h3>
              </div>
              <span className="venue-card__symbol" aria-hidden="true">⌖</span>
            </div>
            <address>{venue.hall}<br />{venue.address}</address>
            <a href={venueMapUrl} target="_blank" rel="noreferrer">
              Get directions <span aria-hidden="true">↗</span>
            </a>
          </article>

          <article className="dua-card reveal">
            <span className="crescent" aria-hidden="true">☾</span>
            <p className="dua-card__arabic" lang="ar" dir="rtl">بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ</p>
            <p>May Allah bless you both, shower His blessings upon you, and unite you in goodness.</p>
          </article>

          <footer>
            <div className="monogram" aria-label={`${couple.bride} and ${couple.groom}`}>{couple.bride[0]} <i>&amp;</i> {couple.groom[0]}</div>
            <p>Your presence is the greatest gift.</p>
            <span>We can’t wait to celebrate with you</span>
          </footer>
        </section>
      </div>
    </main>
  );
}
