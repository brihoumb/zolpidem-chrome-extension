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
    if (sParameterName === sParam) {
      return decodeURIComponent(sParameterValue);
    }
  }
  return null;
}

/**
* Change the current suspended tab to the original website.
*
* @function restore
*/
function restore() {
  window.location.replace(getURLParameter('url') ?? window.location.href);
}

(() => {
  document.getElementById('url').innerText = getURLParameter('url');
  document.title = getURLParameter('ttl') ?? 'Suspended tab';
  document.getElementById('title').innerText = document.title;
  if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
    restore();
  }
})();

const body = document.getElementsByTagName('body')[0];
body.addEventListener('click', () => restore());
