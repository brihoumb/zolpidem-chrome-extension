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
* Retrieve all the url in each tab and their group and respective window and export them as a JSON.
*
* @async
* @function exportSession
*/
async function exportSession() {
  let groupId = 0;
  let session = {};
  let groupName = '';
  const windows = {};
  const tabs = await chrome.tabs.query({});

  for (let i = 0; i !== tabs.length; i++) {
    const targetWindow = tabs[i].windowId;
    const url = getTabUrl(tabs[i].url);

    console.log(`${windows}, ${targetWindow}`);
    if (!windows[targetWindow]) {
      windows[targetWindow] = {}
    }
    if (tabs[i].pinned && groupName !== '__pinned__') {
      groupName = '__pinned__';
      groupId = -2;
    } else if (tabs[i].groupId !== groupId) {
      groupId = tabs[i].groupId;
      if (groupId > -1) {
        groupName = await chrome.tabGroups.get(groupId);
        groupName = groupName.title;
      } else {
        groupName = '-1';
      }
    }
    if (!(groupName in windows[targetWindow])) {
      windows[targetWindow][groupName] = [];
    }
    if (url) {
      windows[targetWindow][groupName].push(url);
    }
  }
  const blob = new Blob([JSON.stringify({windows}, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  chrome.downloads.download({
    url: url,
    filename: 'session.json',
  });
};

document.getElementById('export').addEventListener('click', exportSession);
