'use strict';
let WINDOW_ID = -1;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!tab.active &&
      tab.windowId === WINDOW_ID &&
      changeInfo.status === 'complete') {
    chrome.tabs.discard(tabId);
  }
});

/**
* Create a new tab in the window with the given url.
*
* @async
* @function createTab
* @param {string} url - the url for the tab.
* @return {string} - the id generated for the tab.
*/
async function createTab(url) {
  if (WINDOW_ID === -1) {
    const window = await chrome.windows.create({focused: false});
    WINDOW_ID = window.id;
  }
  const tab = await chrome.tabs.create({
    url: url,
    active: false,
    windowId: WINDOW_ID,
  });
  return tab.id;
}

/**
* Assign a group to a list of given tabs if the key isn't -1 (no group).
*
* @async
* @function setToGroup
* @param {Array.<number>} tabs - the list of tabs id.
* @param {string} key - the name of the group as a string (-1 if no group).
* @return {number} - the id of the created group or -1 if no group were created.
*/
async function setToGroup(tabs, key) {
  if (key !== '-1') {
    const groupId = await chrome.tabs.group({
      tabIds: tabs,
      createProperties: {windowId: WINDOW_ID},
    });
    await chrome.tabGroups.update(groupId, {title: key});
    return groupId;
  } else {
    return -1;
  }
}

/**
* Load the content of the blob file and recreate the content in it.
*
* @function ReadFile
* @param {Blob} file - the blob of the file sent in input.
*/
function readFile(file) {
  const reader = new FileReader();

  reader.readAsText(file, 'UTF-8');
  reader.onload = async (event) => {
    const session = JSON.parse(event.target.result);
    for (let key in session) {
      const tabs = [];
      for (let value in session[key]) {
        tabs.push(await createTab(session[key][value]));
      }
      setToGroup(tabs, key);
    }
  };
  reader.onerror = () => {
    console.log('error reading file');
  };
}

/**
* Get the file given in the input HTML tag.
*
* @event onChange
* @function importSession
* @param {Event} event - see https://developer.mozilla.org/en-US/docs/Web/API/Event.
*/
function importSession(event) {
  const file = event.target.files[0];

  removeClass(event);
  if (file) {
    readFile(file);
  }
}

/**
* Get the file given when dropped on the HTML tag.
*
* @event onDrop
* @function dropHandler
* @param {Event} event - see https://developer.mozilla.org/en-US/docs/Web/API/Event.
*/
function dropHandler(event) {
  event.preventDefault();
  removeClass(event);
  if (event.dataTransfer.items) {
    for (let i = 0; i < event.dataTransfer.items.length; i++) {
      if (event.dataTransfer.items[i].kind === 'file') {
        readFile(event.dataTransfer.items[i].getAsFile());
      }
    }
  } else {
    for (let i = 0; i < event.dataTransfer.files.length; i++) {
      readFile(event.dataTransfer.files[i]);
    }
  }
}

/**
* Change the HTML tag class to highlight the event.
*
* @event onDragOver
* @function dragOverHandler
* @param {Event} event - see https://developer.mozilla.org/en-US/docs/Web/API/Event.
*/
function dragOverHandler(event) {
  event.preventDefault();
  console.log(event.target.classList);
  if (!event.target.classList.contains('dragover')) {
    event.target.classList.add('dragover');
  }
}

/**
* Remove the HTML tag class to stop the highlight of the onDragOver event.
*
* @event onDragEnd, onDragExit, onDragLeave
* @function removeClass
* @param {Event} event - see https://developer.mozilla.org/en-US/docs/Web/API/Event.
*/
function removeClass(event) {
  event.target.classList.remove('dragover');
}

const inputFile = document.getElementById('file');
const labelFile = document.getElementById('lfile');
labelFile.addEventListener('drop', dropHandler, false);
labelFile.addEventListener('dragend', removeClass, false);
inputFile.addEventListener('change', importSession, false);
labelFile.addEventListener('dragexit', removeClass, false);
labelFile.addEventListener('dragleave', removeClass, false);
labelFile.addEventListener('dragover', dragOverHandler, false);
