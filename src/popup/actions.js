'use strict';

/**
* Check if the url header does not start with the specific cases.
*
* @function checkHeader
* @param {string} url - the url in the tab.
* @return {boolean} - true if the url starts with one of the cases.
*/
function checkHeader(url) {
  return (url.startsWith('file://') ||
          url.startsWith('chrome://') ||
          url.startsWith('about:blank') ||
          url.startsWith('chrome-extension://'));
};

/**
* Check if the url header does not start with the specific cases.
*
* @function suspendURL
* @param {string} title - the title of the web page in the tab.
* @param {string} url - the url in the tab.
* @return {string} - the final url for the suspended tab with it's parameter.
*/
function suspendURL(title, url) {
  const uri = `url=${encodeURIComponent(url)}`;
  const ttl = `ttl=${encodeURIComponent(title)}`;
  const base = 'suspended/suspended.html';

  return `${base}?${ttl}&${uri}`;
}

/**
* Set the active tab in the active window in suspended mode.
*
* @async
* @function toggleSleep
*/
async function toggleSleep() {
  const [tab] = await chrome.tabs.query({active: true, currentWindow: true});

  if (!checkHeader(tab.url)) {
    await chrome.tabs.update(tab.id, {url: suspendURL(tab.title, tab.url)});
  }
}

/**
* Set the all tab except the active tab in the active window in suspended mode.
*
* @async
* @function toggleAllSleep
*/
async function toggleAllSleep() {
  const tabs = await chrome.tabs.query({active: false, currentWindow: true});

  for (let i = 0; i != tabs.length; i++) {
    if (!checkHeader(tabs[i].url)) {
      await chrome.tabs.update(tabs[i].id, {url: suspendURL(tabs[i].title, tabs[i].url)});
    }
  }
}

/**
* Wake all tab from the active window.
*
* @async
* @function wakeAllAsleep
*/
async function wakeAllAsleep() {
  const tabs = await chrome.tabs.query({currentWindow: true});

  for (let i = 0; i != tabs.length; i++) {
    if (tabs[i].url.startsWith(`chrome-extension://${chrome.runtime.id}`)) {
      const url = decodeURIComponent(tabs[i].url.slice(tabs[i].url.indexOf('url') + 4));
      await chrome.tabs.update(tabs[i].id, {url: url});
    }
  }
}

document.getElementById('sleep').addEventListener('click', toggleSleep);
document.getElementById('wake').addEventListener('click', wakeAllAsleep);
document.getElementById('sleepall').addEventListener('click', toggleAllSleep);
