'use strict';
const sPageURL = window.location.search.substring(1);

/**
* Retrieve the parameter from the url.
*
* @author https://stackoverflow.com/a/22607328/7178091
* @function getURLParameter
* @param {string} sParam - the requested parameter.
* @return {string} - the value for the parameter otherwise null.
*/
function getURLParameter(sParam) {
  const sURLVariables = sPageURL.split('&');
  for (let i = 0; i != sURLVariables.length; i++) {
    const [sParameterName, sParameterValue] = sURLVariables[i].split('=');
    if (sParameterName == sParam) {
      return decodeURI(sParameterValue);
    }
  }
  return null;
}

/**
* Retrieve the original url from the parameter.
*
* @function getURL
* @return {string} - the original url of the tab.
*/
function getURL() {
  return decodeURI(sPageURL.slice(sPageURL.indexOf('url') + 4));
}

/**
* Change the current suspended tab to the original website.
*
* @function restore
*/
function restore() {
  window.location.replace(getURL() ?? window.location.href);
}

(() => {
  document.title = getURLParameter('ttl') ?? 'Suspended tab';
  if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    restore();
  }
})();

const body = document.getElementsByTagName('body')[0];
body.addEventListener('click', () => restore());
