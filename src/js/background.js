import '../img/icon-128.png'
import '../img/icon-34.png'

const storage = chrome.storage.local

chrome.runtime.onInstalled.addListener(() => {
  // also check every week or something
  fetch('http://54.77.113.203:65437/v1/subs/')
  .then(res => res.json())
  .then(json => {
    // error handle
    storage.set({ 'subs': json.data })
  })
})

chrome.runtime.onMessage.addListener(({ type }, sender, response) => {
  if (type === 'GOOD_NEWS_SCRIPT_LOADED') {
    storage.get('isActive', ({ isActive }) => {
      if (isActive) {
        chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
          console.log('bg send message')
          chrome.tabs.sendMessage(tab.id, { type: 'GOOD_NEWS' }, (response) => {
            console.log('backgroundScript', response)
          })
        })
      }
    })
  }
})