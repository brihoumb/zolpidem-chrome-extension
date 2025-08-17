## Functions

<dl>
<dt><a href="#checkHeader">checkHeader(url)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if the url header does not start with the specific cases.</p>
</dd>
<dt><a href="#suspendURL">suspendURL(title, url)</a> ⇒ <code>string</code></dt>
<dd><p>Check if the url header does not start with the specific cases.</p>
</dd>
<dt><a href="#toggleSleep">toggleSleep()</a></dt>
<dd><p>Set the active tab in the active window in suspended mode.</p>
</dd>
<dt><a href="#toggleAllSleep">toggleAllSleep()</a></dt>
<dd><p>Set the all tab except the active tab in the active window in suspended mode.</p>
</dd>
<dt><a href="#wakeAllAsleep">wakeAllAsleep()</a></dt>
<dd><p>Wake all tab from the active window.</p>
</dd>
</dl>

<a name="checkHeader"></a>

## checkHeader(url) ⇒ <code>boolean</code>
Check if the url header does not start with the specific cases.

**Kind**: global function  
**Returns**: <code>boolean</code> - - true if the url starts with one of the cases.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | the url in the tab. |

<a name="suspendURL"></a>

## suspendURL(title, url) ⇒ <code>string</code>
Check if the url header does not start with the specific cases.

**Kind**: global function  
**Returns**: <code>string</code> - - the final url for the suspended tab with it's parameter.  

| Param | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | the title of the web page in the tab. |
| url | <code>string</code> | the url in the tab. |

<a name="toggleSleep"></a>

## toggleSleep()
Set the active tab in the active window in suspended mode.

**Kind**: global function  
<a name="toggleAllSleep"></a>

## toggleAllSleep()
Set the all tab except the active tab in the active window in suspended mode.

**Kind**: global function  
<a name="wakeAllAsleep"></a>

## wakeAllAsleep()
Wake all tab from the active window.

**Kind**: global function  
