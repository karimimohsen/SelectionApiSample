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