import gsap from 'gsap';

gsap.fromTo(
  '.mainhero__container',
  { opacity: 1 },
  {
    opacity: 0,
    scrollTrigger: {
      trigger: '.mainhero__container',
      start: 'center',
      end: '500',
      scrub: 2,
    },
  }
);
