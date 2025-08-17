## Functions

<dl>
<dt><a href="#createTab">createTab(url)</a> ⇒ <code>string</code></dt>
<dd><p>Create a new tab in the window with the given url.</p>
</dd>
<dt><a href="#setToGroup">setToGroup(tabs, key, colour)</a> ⇒ <code>number</code></dt>
<dd><p>Assign a group to a list of given tabs if the key isn&#39;t -1 (no group).</p>
</dd>
<dt><a href="#retrieveSessionContent">retrieveSessionContent(instances, colours)</a></dt>
<dd><p>Create tabs in their respective window from the session Object.</p>
</dd>
<dt><a href="#readFile">readFile(file)</a></dt>
<dd><p>Load the content of the blob file into a JSON Object.</p>
</dd>
<dt><a href="#importSession">importSession(event)</a></dt>
<dd><p>Get the file given in the input HTML tag.</p>
</dd>
<dt><a href="#dropHandler">dropHandler(event)</a></dt>
<dd><p>Get the file given when dropped on the HTML tag.</p>
</dd>
<dt><a href="#dragOverHandler">dragOverHandler(event)</a></dt>
<dd><p>Change the HTML tag class to highlight the event.</p>
</dd>
<dt><a href="#removeClass">removeClass(event)</a></dt>
<dd><p>Remove the HTML tag class to stop the highlight of the onDragOver event.</p>
</dd>
</dl>

<a name="createTab"></a>

## createTab(url) ⇒ <code>string</code>
Create a new tab in the window with the given url.

**Kind**: global function  
**Returns**: <code>string</code> - - the id generated for the tab.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | the url for the tab. |

<a name="setToGroup"></a>

## setToGroup(tabs, key, colour) ⇒ <code>number</code>
Assign a group to a list of given tabs if the key isn't -1 (no group).

**Kind**: global function  
**Returns**: <code>number</code> - - the id of the created group or -1 if no group were created.  

| Param | Type | Description |
| --- | --- | --- |
| tabs | <code>Array.&lt;number&gt;</code> | the list of tabs id. |
| key | <code>string</code> | the name of the group as a string (-1 if no group). |
| colour | <code>string</code> | the colour string for group. |

<a name="retrieveSessionContent"></a>

## retrieveSessionContent(instances, colours)
Create tabs in their respective window from the session Object.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| instances | <code>Object</code> | the instances JSON Object loaded from file. |
| colours | <code>Object</code> | the colours JSON Object loaded from file. |

<a name="readFile"></a>

## readFile(file)
Load the content of the blob file into a JSON Object.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>Blob</code> | the blob of the file sent in input. |

<a name="importSession"></a>

## importSession(event)
Get the file given in the input HTML tag.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | see https://developer.mozilla.org/en-US/docs/Web/API/Event. |

<a name="dropHandler"></a>

## dropHandler(event)
Get the file given when dropped on the HTML tag.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | see https://developer.mozilla.org/en-US/docs/Web/API/Event. |

<a name="dragOverHandler"></a>

## dragOverHandler(event)
Change the HTML tag class to highlight the event.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | see https://developer.mozilla.org/en-US/docs/Web/API/Event. |

<a name="removeClass"></a>

## removeClass(event)
Remove the HTML tag class to stop the highlight of the onDragOver event.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | see https://developer.mozilla.org/en-US/docs/Web/API/Event. |

