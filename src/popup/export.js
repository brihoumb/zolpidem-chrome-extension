'use strict';

/**
* Retrieve the original tab url.
*
* @function getOrigin
* @param {string} url - the url in the tab.
* @return {string} - the original url if found otherwise the input url.
*/
function getOrigin(url) {
  if (url.indexOf('url') !== -1 && url.indexOf(chrome.runtime.id) !== -1) {
    return url.slice(url.indexOf('url') + 4);
  } else {
    return url;
  }
}

/**
* Retrieve all the url in each tab and their group and export them as a JSON.
*
* @async
* @function exportSession
*/
async function exportSession() {
  let groupid = 0;
  const session = {};
  const tabs = await chrome.tabs.query({});

  for (let i = 0; i != tabs.length; i++) {
    const url = getOrigin(tabs[i].url);
    if (tabs[i].groupId != groupid) {
      groupid = tabs[i].groupId.toString();
      session[groupid] = [];
    }
    if (url) {
      session[groupid].push(url);
    }
  }
  const blob = new Blob([JSON.stringify(session)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  chrome.downloads.download({
    url: url,
    filename: 'session.json',
  });
};

document.getElementById('button').addEventListener('click', exportSession);
