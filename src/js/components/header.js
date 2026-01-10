if (document.querySelector('[data-component="header"]')) {
  import('/styles/components/header.scss');
}

// ВИБІР МОВИ САЙТУ
const dropdownLanguage = document.querySelectorAll('.dropdown-language');
const btnSelectLanguage = document.querySelectorAll('.btn-language');
dropdownLanguage.forEach(dropBtn =>
  dropBtn.addEventListener('click', e => {
    const itemLanguage = e.target.closest('[data-language]');
    if (!itemLanguage) return;

    e.preventDefault();

    btnSelectLanguage.forEach(btn => (btn.textContent = itemLanguage.textContent));
    btnSelectLanguage.forEach(btn => (btn.dataset.language = itemLanguage.dataset.language));
  })
);
