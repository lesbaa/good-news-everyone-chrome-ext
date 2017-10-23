const encodeString = raw => raw.replace(/[\u00A0-\u9999<>\&]/gim, i => '&#'+i.charCodeAt(0)+';')

chrome.runtime.onMessage.addListener(({ type, payload }) => {
  if (type === 'GOOD_NEWS' && payload) {
    const newHTML = payload.reduce((acc, sub) => {
      const { nasty, nice } = sub
      const regex = new RegExp('(\\b)' + nasty + '(\\b)', 'igm')
      return acc.replace(regex, encodeString(nice))
    }, document.body.innerHTML)
    document.body.innerHTML = newHTML
  }
})

chrome.runtime.sendMessage({ type: 'GOOD_NEWS_SCRIPT_LOADED' }, res => { console.log(res) })