/** */
const getSelection = () => window.getSelection();

const anchorbtn = document.querySelector('#anchor');
anchorbtn.addEventListener('click', (e) => {
    const selection = getSelection();
    if (selection.type !== 'Range') return;
    console.log('anchor node:\r')
    console.dir(selection.anchorNode);    
    console.dir(selection.anchorOffset);

    console.log('focus node:\r')
    console.dir(selection.focusNode);    
    console.dir(selection.focusOffset);

    console.log(`compaire node: ${selection.anchorNode === selection.focusNode}`);
});