'use strict';
let WINDOW_ID = -1;

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && !tab.active & tab.windowId === WINDOW_ID) {
    chrome.tabs.discard(tabId);
  }
})

async function createTab(url) {
  if (WINDOW_ID === -1) {
    const window = await chrome.windows.create({focused: false});
    WINDOW_ID = window.id;
  }
  const tab = await chrome.tabs.create({url: url, active: false, windowId: WINDOW_ID});
  return tab.id;
}

async function setToGroup(tabs, key) {
  if (key !== '-1') {
    const groupid = await chrome.tabs.group({tabIds: tabs, createProperties: {windowId: WINDOW_ID}});
    return groupid;
  } else {
    return -1;
  }
}

function readFile(file) {
  const reader = new FileReader();

  reader.readAsText(file, 'UTF-8');
  reader.onload = async(event) => {
    const session = JSON.parse(event.target.result);
    for (let key in session) {
      let tabs = [];
      for (let value in session[key]) {
        tabs.push(await createTab(session[key][value]));
      }
      setToGroup(tabs, key);
    }
  }
  reader.onerror = () => {
    console.log('error reading file');
  }
}

function importSession(event) {
  const file = event.target.files[0];

  removeClass(event);
  if (file)
    readFile(file);
}

function dropHandler(event) {
  event.preventDefault();
  removeClass(event);
  if (event.dataTransfer.items) {
    for (let i = 0; i < event.dataTransfer.items.length; i++) {
      if (event.dataTransfer.items[i].kind === 'file')
        readFile(event.dataTransfer.items[i].getAsFile());
    }
  } else {
    for (let i = 0; i < event.dataTransfer.files.length; i++)
      readFile(event.dataTransfer.files[i]);
  }
}

function dragOverHandler(event) {
  event.preventDefault();
  console.log(event.target.classList);
  if (!event.target.classList.contains('dragover'))
    event.target.classList.add('dragover');
}

function removeClass(event) {
  event.target.classList.remove('dragover');
}

document.getElementById('lfile').addEventListener('drop', dropHandler, false);
document.getElementById('file').addEventListener('change', importSession, false);
document.getElementById('lfile').addEventListener('dragend', removeClass, false);
document.getElementById('lfile').addEventListener('dragexit', removeClass, false);
document.getElementById('lfile').addEventListener('dragleave', removeClass, false);
document.getElementById('lfile').addEventListener('dragover', dragOverHandler, false);
