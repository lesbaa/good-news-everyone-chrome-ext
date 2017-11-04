const encodeString = raw => raw.replace(/[\u00A0-\u9999<>\&]/gim, i => '&#'+i.charCodeAt(0)+';')

const storage = chrome.storage.local
storage.set({'oldHtml': document.body.innerHTML}, n => n)

const replace = () => {
  storage.get('subs', ({ subs }) => {
    const newHTML = subs.reduce((acc, sub) => {
      const { nasty, nice } = sub
      const regex = new RegExp('(\\b)' + nasty + '(\\b)', 'igm')
      return acc.replace(regex, encodeString(nice))
    }, document.body.innerHTML)
    document.body.innerHTML = newHTML
  })
}

const unreplace = () => {
  storage.get('oldHtml', ({ oldHtml }) => {
    document.body.innerHTML = oldHtml
  })
}

chrome.runtime.onMessage.addListener(({ type, payload }) => {
  if (type === 'GOOD_NEWS') {
    replace()
  }
  if (type === 'BAD_NEWS') {
    unreplace()
  }

})

window.addEventListener('popstate', replace)

chrome.runtime.sendMessage({ type: 'GOOD_NEWS_SCRIPT_LOADED' })