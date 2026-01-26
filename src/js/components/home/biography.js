import gsap from 'gsap';

gsap.fromTo(
  '.biography__column-first',
  { x: -250, opacity: 0 },
  {
    opacity: 1,
    x: 0,
    scrollTrigger: {
      trigger: '.biography__column-first',
      start: '-50',
      end: '800',
      scrub: 3,
    },
  }
);
gsap.fromTo(
  '.biography__column-second',
  { x: 250, opacity: 0 },
  {
    opacity: 1,
    x: 0,
    scrollTrigger: {
      trigger: '.biography__column-second',
      start: '-50',
      end: '800',
      scrub: 3,
    },
  }
);
