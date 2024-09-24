////////////////////////////////////////////////
// Elements
const balance = document.querySelector('.balance');
const mainContainer = document.querySelector('.main');
const sectionHistory = document.querySelector('.section-history');
const btnDonate = document.querySelector('.btn-donate');
const btnHistory = document.querySelector('.btn-history');
const historyListContainer = document.querySelector('.donation-history-list');
const modal = document.querySelector('.modal-form');

/////////////////////////////////////////////////
// Helper functions
const clearInputField = (input) => {
  input.value = '';
  input.blur();
};

const showModal = () => {
  my_modal_5.showModal();

  modal.addEventListener('submit', (e) => {
    e.preventDefault();
    my_modal_5.close();
  });
};

/////////////////////////////////////////////////
// Event handler
btnDonate.addEventListener('click', function () {
  mainContainer.classList.remove('hidden');
  sectionHistory.classList.add('hidden');

  btnDonate.style.backgroundColor = 'rgb(180, 244, 97)';
  btnHistory.style.backgroundColor = '#F3F3F3';
});

btnHistory.addEventListener('click', function () {
  mainContainer.classList.add('hidden');
  sectionHistory.classList.remove('hidden');

  btnDonate.style.backgroundColor = '#F3F3F3';
  btnHistory.style.backgroundColor = 'rgb(180, 244, 97)';
});

mainContainer.addEventListener('click', function (e) {
  if (!e.target.closest('.btn-donate-now')) {
    return;
  } else {
    e.preventDefault();

    const clickedBtn = e.target.closest('.btn-donate-now');
    const clickedSection = clickedBtn.closest('section');
    const sectionName = clickedSection.dataset.fund;
    const labelDonateAmount = clickedSection.querySelector(
      '.label-donation-amount'
    );
    const inputAmount = clickedSection.querySelector('.input');

    if (
      isNaN(Number(inputAmount.value)) ||
      inputAmount.value === '' ||
      Number(inputAmount.value) <= 0 ||
      inputAmount.value.includes('.')
    ) {
      clearInputField(inputAmount);
      alert('Please enter a valid number!');
    } else if (Number(inputAmount.value) > Number(balance.textContent)) {
      clearInputField(inputAmount);
      alert('You have insufficient balance!');
    } else {
      labelDonateAmount.textContent =
        Number(labelDonateAmount.textContent) + Number(inputAmount.value);
      balance.textContent =
        Number(balance.textContent) - Number(inputAmount.value);

      showModal();

      const currentDate = new Date();

      const historyItem = `
        <div
          class="donation-history p-5 md:p-8 border border-colorSecondaryDark rounded-2xl mb-5"
        >
          <p class="text-xl font-bold leading-7 mb-5">
            ${Number(
              inputAmount.value
            )} Taka is Donated for famine-${currentDate.getFullYear()} at ${sectionName}, Bangladesh
          </p>
          <p class="text-base font-light leading-7">
            Date : ${currentDate}
          </p>
        </div>
      `;
      historyListContainer.insertAdjacentHTML('beforeend', historyItem);

      clearInputField(inputAmount);
    }
  }
});
