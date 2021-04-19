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
    return decodeURIComponent(url.slice(url.indexOf('url') + 4));
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
  let groupId = 0;
  let groupName = '';
  const session = {};
  const tabs = await chrome.tabs.query({});

  for (let i = 0; i != tabs.length; i++) {
    const url = getOrigin(tabs[i].url);
    console.log(tabs[i].groupId, groupId);
    if (tabs[i].groupId != groupId) {
      groupId = tabs[i].groupId;
      if (groupId > -1) {
        groupName = await chrome.tabGroups.get(groupId);
        groupName = groupName.title;
      } else {
        groupName = '-1';
      }
      console.log(groupName);
      session[groupName] = [];
    }
    if (url) {
      session[groupName].push(url);
    }
  }
  const blob = new Blob([JSON.stringify(session, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  chrome.downloads.download({
    url: url,
    filename: 'session.json',
  });
};

document.getElementById('export').addEventListener('click', exportSession);
