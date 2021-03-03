'use strict';
/// <reference path="node_module/@types/chrome/index.d.ts" />
import { chrome } from 'chrome';

// chrome.runtime.onInstalled.addListener(() => {});

chrome.commands.onCommand.addListener(async (command:string):Promise<void> => {
  switch (command) {
    case 'toggle_sleep': toggle_sleep(); break;
    case 'wake_all_asleep': wake_all_asleep(); break;
    case 'toggle_all_sleep': toggle_all_sleep(); break;
    default: break;
  }
});

const header = (url:string):boolean => {
  return (url.startsWith('file://') ||
          url.startsWith('chrome://') ||
          url.startsWith('about:blank') ||
          url.startsWith('chrome-extension://'));
};

const toggle_sleep = async ():Promise<void> => {
  const [tab]:chrome.tabs.Tab = await chrome.tabs.query({active: true, currentWindow: true});

  if (!header(tab.url)) {
    await chrome.tabs.update(tab.id, {url: `suspended/suspended.html?ttl=${encodeURI(tab.title)}&url=${encodeURI(tab.url)}`});
  }
}

const toggle_all_sleep = async ():Promise<void> => {
  const tabs:Array<chrome.tabs.Tab> = await chrome.tabs.query({active: false, currentWindow: true});

  for (let i = 0; i != tabs.length; i++) {
    if (!header(tabs[i].url)) {
      await chrome.tabs.update(tabs[i].id, {url: `suspended/suspended.html?ttl=${encodeURI(tabs[i].title)}&url=${encodeURI(tabs[i].url)}`});
    }
  }
}

const wake_all_asleep = async ():Promise<void> => {
  const tabs:Array<chrome.tabs.Tab> = await chrome.tabs.query({active: false, currentWindow: true});

  for (let i = 0; i != tabs.length; i++) {
    if (tabs[i].url.startsWith(`chrome-extension://${chrome.runtime.id}`)) {
      await chrome.tabs.update(tabs[i].id, {url: tabs[i].url.slice(tabs[i].url.indexOf('url') + 4)})
    }
  }
}
