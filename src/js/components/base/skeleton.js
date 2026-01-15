if (document.querySelector('[data-component="skeleton"]')) {
  import('/styles/components/base/skeleton.scss');
}
const skeleton = document.querySelector('.skeleton');
const container = document.querySelector('.skeleton__container');
const homeNftContainer = document.querySelector('.homenft__container ');
homeNftContainer.style.display = 'none';
function renderSkeletonCard(count) {
  let cardSkeleton = '';
  for (let i = 0; i < count; i++) {
    cardSkeleton += `
    <div class="SKELETON__CARD gap-[50px] skeleton__slide rounded-lg
     bg-slate-400 w-[350px]">
      <div class="skeleton__header h-[45px] bg-slate-700 rounded-t-lg"></div>
      <div class="skeleton__main relative bg-slate-400 h-[250px]">
      <p class=" font-proxima text-[24px] flex justify-center w-full font-thin text-white absolute bottom-10">404 Not Found</p>
      <p class=" font-proxima text-[12px] flex justify-center w-full font-thin text-white absolute bottom-7">( сервер не відповідає )</p>
      </div>
      <div class="skeleton__footer bg-slate-700 h-[200px] rounded-b-lg flex flex-col">
         <div class="skeleton__footer-title ml-[10px] bg-slate-400  h-[35px] mt-[20px] max-w-[200px] rounded-md"></div>
         <div class="skeleton__footer-info bg-slate-400  h-[100px] mt-[10px] mx-[20px] rounded-md"></div>
         <div class="skeleton__info flex justify-between gap-[10px] items-center mx-[20px] mt-[20px] pb-[20px]">
         <div class="skeleton__footer-left bg-slate-400 w-[150px]  h-[50px]  rounded-md"></div>
         <div class="skeleton__footer-right bg-slate-400 w-[100px]  h-[50px] rounded-md"></div>
      </div>
      </div>
     </div>
    `;
  }

  container.innerHTML = cardSkeleton;
}

export function removeSkeleton() {
  skeleton.style.display = 'none';
  homeNftContainer.style.display = 'block';
}
function getCountByWidth() {
  const width = window.innerWidth;
  if (width > 1370) {
    return 3;
  } else if (width > 600) {
    return 2;
  }
  return 1;
}

function updateSkeletons() {
  const count = getCountByWidth();
  renderSkeletonCard(count);
}

window.addEventListener('resize', updateSkeletons);
updateSkeletons();
