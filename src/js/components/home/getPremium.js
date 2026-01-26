import gsap from 'gsap';

  gsap.fromTo(
    '.getpremium__container',
    { x: -500, opacity: 0 },
    {
      opacity: 1,
      x: 0,
      scrollTrigger: {
        trigger: '.biography__container',
        start: '900',
        end: '500',
        scrub: 4,
      },
    }
  );