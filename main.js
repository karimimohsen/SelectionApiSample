const getSelection = () => window.getSelection();
Array.from(document.querySelectorAll('.no-focus'))
    .forEach(item => item.addEventListener('mousedown', e => e.preventDefault()));

/**
 * Properties:
 *      isCollapsed, selectionType, rangeCount, anchor, anchorOffset, focus, focusOffset
 */
const anchorbtn = document.querySelector('#anchor');
anchorbtn.addEventListener('click', (e) => {
    const selection = getSelection();
    console.log(`isCollapsed: ${selection.isCollapsed}`);
    console.log(`selectionType: ${selection.type}`);
    console.log(`range count: ${selection.rangeCount}`);

    if (selection.type !== 'Range') return;
    console.log('anchor node:\r')
    console.dir(selection.anchorNode);
    console.dir(selection.anchorOffset);

    console.log('focus node:\r')
    console.dir(selection.focusNode);
    console.dir(selection.focusOffset);

    console.log(`compaire node: ${selection.anchorNode === selection.focusNode}`);

});

/**
 * Methods:
 *      
 */

const collapse = document.querySelector('#collapse');
collapse.addEventListener('click', (e) => {
    const span = document.querySelector('#container > p > span');
    const selection = getSelection();
    selection.collapse(span, 0);
});

const collapseEnd = document.querySelector('#collapse-end');
collapseEnd.addEventListener('click', (e) => {
    const selection = getSelection();
    if (selection.type === 'None') {
        console.log('you must select a range');
        return;
    }
    selection.collapseToEnd();
});

const collapseStart = document.querySelector('#collapse-start');
collapseStart.addEventListener('click', (e) => {
    const selection = getSelection();
    if (selection.type === 'None') {
        console.log('you must select a range');
        return;
    }
    selection.collapseToStart();
});

const containsNode = document.querySelector('#contains-node');
containsNode.addEventListener('click', (e) => {
    const selection = getSelection();
    const span = document.querySelector('#container > p > span');
    console.log(`contains node:${selection.containsNode(span, false)}`);
    console.log(`contains node partial:${selection.containsNode(span, true)}`);
});

const deleteBtn = document.querySelector('#delete');
deleteBtn.addEventListener('click', (e) => {
    const selection = getSelection();
    selection.deleteFromDocument();
});

const extend = document.querySelector('#extend');
extend.addEventListener('click', (e) => {
    const n = document.querySelector('#container > p:last-child')
    const selection = getSelection();

    selection.extend(n, 1);
});

const selectAll = document.querySelector('#selectAll');
selectAll.addEventListener('click', (e) => {
    const container = document.querySelector('#container');
    const selection = getSelection();

    selection.selectAllChildren(container);
});

const baseExtend = document.querySelector('#baseExtend');
baseExtend.addEventListener('click', (e) => {
    const span = document.querySelector('#container > p > span');
    const focus = document.querySelector('#container > p:last-child');
    const selection = getSelection();

    selection.setBaseAndExtent(span, 0, focus, 0);
});


const tostring = document.querySelector('#tostring');
tostring.addEventListener('click', (e) => {
    const selection = getSelection();
    if (selection.type === 'Range')
        console.log(selection.toString());
});

const range = document.querySelector('#range');
range.addEventListener('click', (e) => {
    if (getSelection().type === 'None') return;
    const range = getSelection().getRangeAt(0);
    console.log(`collapsed: ${range.collapsed}`);

    console.group('commonAncestorContainer')
    console.dir(range.commonAncestorContainer);
    console.groupEnd();

    console.group('start');
    console.dir(range.startContainer);
    console.dir(range.startOffset);
    console.groupEnd();

    console.group('end');
    console.dir(range.endContainer);
    console.dir(range.endOffset);
    console.groupEnd();
});

const startendrange = document.querySelector('#startendrange');
startendrange.addEventListener('click', (e) => {
    const range = document.createRange();
    const span = document.querySelector('#container p span');
    const startOffset = 0;
    const endOffset = 1;
    range.setStart(span, startOffset);
    range.setEnd(span, endOffset);
    console.group('setStartsetEnd');
    console.groupEnd();

    // add to selection
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    setTimeout(() => {
        const p = document.querySelectorAll('#container p');
        const beforerange = document.createRange();
        beforerange.setStartBefore(p.item(0));
        beforerange.setEndBefore(p.item(1));

        // add to selection
        selection.removeAllRanges();
        selection.addRange(beforerange);
        console.group('setStartBeforesetEndBefore');
        console.groupEnd();
    }, 2000);

    setTimeout(() => {
        const p = document.querySelectorAll('#container p');
        const afterrange = document.createRange();
        afterrange.setStartAfter(p.item(0));
        afterrange.setEndAfter(p.item(1));

        // add to selection
        selection.removeAllRanges();
        selection.addRange(afterrange);
        console.group('setStartAftersetEndAfter');
        console.groupEnd();
    }, 4000);
});

const selectnoderange = document.querySelector('#selectnoderange');
selectnoderange.addEventListener('click', (e) => {
    setTimeout(() => {
        const range = document.createRange();
        const span = document.querySelector('#container p span');
        range.selectNode(span);

        // add to selection
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        console.group('selectNode: window.getSelection');
        console.log(selection);
        console.groupEnd();

        const ranged = selection.getRangeAt(0);
        console.group('selectNode: window.getSelection().getRangedAt');
        console.log(ranged);
        console.groupEnd();
    }, 0);

    setTimeout(() => {
        const range = document.createRange();
        const span = document.querySelector('#container p span');
        range.selectNodeContents(span);

        // add to selection
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        console.group('selectNodeContents: window.getSelection');
        console.log(selection);
        console.groupEnd();

        const ranged = selection.getRangeAt(0);
        console.group('selectNodeContents: window.getSelection().getRangedAt');
        console.log(ranged);
        console.groupEnd();
    }, 2000);
});

const collapserange = document.querySelector('#collapserange');
collapserange.addEventListener('click', (e) => {
    const range = document.createRange();

    const p = document.querySelector('#container p span');
    range.selectNode(p)
    range.collapse(true);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
});

const insertrange = document.querySelector('#insertrange');
insertrange.addEventListener('click', (e) => {
    const range = document.createRange();

    const h1 = document.createElement('h1');
    h1.textContent = 'Mohsen';

    const p = document.querySelector('#container p span');
    range.selectNode(p);
    range.collapse(true);
    range.insertNode(h1);
    // const selection = window.getSelection();
    // selection.removeAllRanges();
    // selection.addRange(range);
});

const comparerange = document.querySelector('#comparerange');
comparerange.addEventListener('click', (e) => {
    const spans = document.querySelectorAll('#container p  *');

    const range = document.createRange();
    range.selectNode(spans[0]);

    const sourcerange = document.createRange();
    sourcerange.selectNode(spans[1]);
    console.group('-1:before  0:equal  1:after');
    console.group('Range.START_TO_START');
    console.log(range.compareBoundaryPoints(Range.START_TO_START, sourcerange));
    console.groupEnd();

    console.group('Range.START_TO_END');
    console.log(range.compareBoundaryPoints(Range.START_TO_END, sourcerange));
    console.groupEnd();

    console.group('Range.END_TO_START');
    console.log(range.compareBoundaryPoints(Range.END_TO_START, sourcerange));
    console.groupEnd();

    console.group('Range.END_TO_END');
    console.log(range.compareBoundaryPoints(Range.END_TO_END, sourcerange));
    console.groupEnd();
    console.groupEnd();
});

const comparepointrange = document.querySelector('#comparepointrange');
comparepointrange.addEventListener('click', (e) => {
    const spans = document.querySelectorAll('#container p  *');

    const range = document.createRange();
    range.selectNode(spans[0]);

    console.group('-1:before  0:equal  1:after');
    console.log(range.comparePoint(spans[0], 0));
    console.groupEnd();
});

const contextualfragmentrange = document.querySelector('#contextualfragmentrange');
contextualfragmentrange.addEventListener('click', (e) => {
    const tagString = `<h2>Hello</h2>`;
    const range = document.createRange();

    const doc = range.createContextualFragment(tagString);
    document.body.appendChild(doc);
});

const clonerange = document.querySelector('#clonerange');
clonerange.addEventListener('click', (e) => {
    const node = document.querySelector('#container p span');
    const range = document.createRange();
    range.selectNode(node);
    const clone = range.cloneRange();
    clone.setEnd(node, 2);

    const selection = getSelection();
    selection.removeAllRanges();
    selection.addRange(clone);
});

const surroundContents = document.querySelector('#surroundContents');
surroundContents.addEventListener('click', (e) => {
    const node = document.querySelector('#container p span');
    const range = document.createRange();
    range.selectNode(node);

    const bold = document.createElement('b');
    range.surroundContents(bold);
});

const deleteContentsrange = document.querySelector('#deleteContentsrange');
deleteContentsrange.addEventListener('click', (e) => {
    const node = document.querySelector('#container p span');
    const range = document.createRange();
    
    range.selectNode(node);
    range.deleteContents();
});

const extractContentsrange = document.querySelector('#extractContentsrange');
extractContentsrange.addEventListener('click', (e) => {
    const node = document.querySelector('#container p span');
    const range = document.createRange();
    
    range.selectNode(node);
    const move = range.extractContents();
    document.querySelector('#container').appendChild(move);
});

