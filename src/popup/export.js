'use strict';

/**
* Retrieve the original tab url.
*
* @function getTabUrl
* @param {string} url - the url in the tab.
* @return {string} - the original url if found otherwise the input url.
*/
function getTabUrl(url) {
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
  let session = {} //null;
  // const windows = [];
  // const windowIds = [];
  const tabs = await chrome.tabs.query({});

  for (let i = 0; i !== tabs.length; i++) {
    const url = getTabUrl(tabs[i].url);
    // const windowId = tabs[i].windowId;

    // console.log(windows, windowId);
    // if (windows[windowId] == null) {
    //   windows[windowId] = {};
    //   windowIds.push(windowId);
    //   session = windows[windowId];
    // } else {
    //   session = windows[windowId];
    // }
    // console.dir(windows, windowIds);
    if (tabs[i].pinned && groupName !== '__pinned__') {
      groupName = '__pinned__';
      session[groupName] = [];
    } else if (tabs[i].groupId !== groupId) {
      groupId = tabs[i].groupId;
      if (groupId > -1) {
        groupName = await chrome.tabGroups.get(groupId);
        groupName = groupName.title;
      } else {
        groupName = '-1';
      }
      if (!(groupName in session)) {
        session[groupName] = [];
      }
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
