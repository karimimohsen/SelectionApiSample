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

