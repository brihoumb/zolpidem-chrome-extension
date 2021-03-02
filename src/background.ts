'use strict';

chrome.runtime.onInstalled.addListener();

chrome.commands.onCommand.addListener(async (command:string):void => {
  switch (command) {
    case 'toggle_sleep': toggle_sleep(); break;
    case 'wake_all_asleep': wake_all_asleep(); break;
    case 'toggle_all_sleep': toggle_all_sleep(); break;
    default: break;
  }
});

String.prototype.header = ():void => {
  return (this.startsWith('file://') ||
          this.startsWith('chrome://') ||
          this.startsWith('about:blank') ||
          this.startsWith('chrome-extension://'));
};

const toggle_sleep = async ():void => {
  const [tab]:Tab = await chrome.tabs.query({active: true, currentWindow: true});

  if (!tab.url.header()) {
    await chrome.tabs.update(tab.id, {url: `suspended/suspended.html?ttl=${encodeURI(tab.title)}&url=${encodeURI(tab.url)}`});
  }
}

const toggle_all_sleep = async ():void => {
  const tabs:Array<Tab> = await chrome.tabs.query({active: false, currentWindow: true});

  for (let i = 0; i != tabs.length; i++) {
    if (!tabs[i].url.header()) {
      await chrome.tabs.update(tabs[i].id, {url: `suspended/suspended.html?ttl=${encodeURI(tabs[i].title)}&url=${encodeURI(tabs[i].url)}`});
    }
  }
}

const wake_all_asleep = async ():void => {
  const tabs:Array<Tab> = await chrome.tabs.query({active: false, currentWindow: true});

  for (let i = 0; i != tabs.length; i++) {
    if (tabs[i].url.startsWith(`chrome-extension://${chrome.runtime.id}`)) {
      await chrome.tabs.update(tabs[i].id, {url: tabs[i].url.slice(tabs[i].url.indexOf('url') + 4)})
    }
  }
}
