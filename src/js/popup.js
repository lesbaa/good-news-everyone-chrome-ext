import "../css/popup.css";

const turnItOnButton = document.querySelector('#turn-it-on')

const turnItOn = () => {
  chrome.tabs.executeScript(null, {
    file: 'contentScript.bundle.js',
  })
}

chrome.runtime.onMessage.addListener(({ type }, sender, response) => {
  if (type === 'GOOD_NEWS_SCRIPT_LOADED') {
    fetch('http://54.77.113.203:65437/v1/subs/')
    .then(res => res.json())
    .then(json => {
      console.log('posting...', json)
      chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
        chrome.tabs.sendMessage(tab.id, { type: 'GOOD_NEWS', payload: json.data }, (response) => {
          console.log(response)
        })
      })
    })
  }
})

turnItOnButton.removeEventListener('click', turnItOn)
turnItOnButton.addEventListener('click', turnItOn)
