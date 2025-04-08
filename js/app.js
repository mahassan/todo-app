const form = document.querySelector('#form');
const inputField = document.querySelector('#new-item');
const ul = document.querySelector('#items');
const clear = document.querySelector('#clr')


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(inputField.value !== '' || inputField !== 0){
        //create a checkbox
            const input = document.createElement('input');
            input.type = 'checkbox';
        //create a new li
            const li = document.createElement('li');
            li.className = `items`
        //create text node
            const p = document.createElement('p');
            p.innerText = inputField.value;
            // li.innerText = inputField.value;
        //connect the input and li, so that li is first then input type
            input.insertAdjacentElement('afterend', li);
        //create a close icon
            const button = document.createElement('button');
            button.className = `delete-${inputField.value}`;
            button.style.cursor = "pointer";
            button.innerText = 'x';
        //add eventlistener to every button
            button.addEventListener('click', deleteEntry)
        //attach to the ul
            ul.insertAdjacentElement('afterbegin', li);
            li.insertAdjacentElement('beforeend', input);
            input.insertAdjacentElement('afterend',p);
            p.insertAdjacentElement('afterend', button);
            inputField.value = ""
    }
})

function deleteEntry(e){
    if(e.target.tagName === 'BUTTON'){
       e.target.parentElement.remove()
    }
}
function clearList(){
    const listItems = ul.children;
    //spreading because HTMLCollection is not iterable despite it having a length like an array
    [...listItems].map(item =>{
        item.remove();
    })
    //console.dir(ul.children)
}
clear.addEventListener('click', clearList)