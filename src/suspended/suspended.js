'use strict';
const sPageURL = window.location.search.substring(1);
const body = document.getElementsByTagName('body')[0];

function GetURLParameter(sParam) {
  const sURLVariables = sPageURL.split('&');
  for (let i = 0; i != sURLVariables.length; i++) {
    const [sParameterName, sParameterValue] = sURLVariables[i].split('=');
    if (sParameterName == sParam)
      return decodeURI(sParameterValue);
  }
  return undefined;
}

function getURL() {
  return decodeURI(sPageURL.slice(sPageURL.indexOf('url') + 4))
}

function restore() {
  window.location.replace(getURL() ?? window.location.href);
}

body.addEventListener('click', () => {restore()});

(() => {
  document.title = GetURLParameter('ttl');
  if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    restore()
  }}
)();
