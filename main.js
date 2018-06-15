/** */
const container = document.querySelector('#container');
// const selection = container.getSelection();

const getSelection = () => window.getSelection();

const anchorbtn = document.querySelector('#anchor');
anchorbtn.addEventListener('click', (e) => {
    const selection = getSelection();
    if (selection.type !== 'Range') return;
    
});