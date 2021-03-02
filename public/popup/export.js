'use strict';

function getOrigin(url) {
  if (url.indexOf('url') !== -1 && url.indexOf(chrome.runtime.id) !== -1)
    return url.slice(url.indexOf('url') + 4);
  else
    return url;
}

document.getElementById('button').addEventListener('click', export_session);

async function export_session() {
  let groupid = 0;
  let session = {};
  let tabs = await chrome.tabs.query({});

  for(let i = 0; i != tabs.length; i++) {
    let url = getOrigin(tabs[i].url);

    if (tabs[i].groupId != groupid) {
      groupid = tabs[i].groupId.toString();
      session[groupid] = [];
    }
    if (url)
      session[groupid].push(url);
  }
  chrome.downloads.download({
    url: URL.createObjectURL(new Blob([JSON.stringify(session)], {type:'application/json'})),
    filename: 'session.json'
  });
};
