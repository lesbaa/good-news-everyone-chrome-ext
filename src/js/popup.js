import "../css/popup.css";

const turnItOnButton = document.querySelector('#turn-it-on')
const storage = chrome.storage.local

storage.get('isActive', ({ isActive }) => {
  turnItOnButton.checked = isActive
})

const toggleActiveState = () => {
  storage.get('isActive', ({ isActive }) => {
    storage.set({ 'isActive': !isActive }, n => n)
    turnItOnButton.classList.toggle('active')
    chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
      if (!isActive) {
        chrome.tabs.sendMessage(tab.id, { type: 'GOOD_NEWS' }, (response) => {
          console.log('popup', response)
        })
      } else {
        chrome.tabs.sendMessage(tab.id, { type: 'BAD_NEWS' }, (response) => {
          console.log('popup', response)
        })
      }
    })
  })
}

turnItOnButton.removeEventListener('click', toggleActiveState)
turnItOnButton.addEventListener('click', toggleActiveState)

