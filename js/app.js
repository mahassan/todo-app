const form = document.querySelector('#form');
const inputField = document.querySelector('#new-item');
const ul = document.querySelector('#items');
const clear = document.querySelector('#clr');
const listItems = ul.children;
const allButton = document.querySelector('.footer');
const items = [];


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(inputField.value !== ''){
        createListItem(inputField.value)
        //localstorage
        savetoLS(inputField.value);
        inputField.value = '';
    }
})

function deleteEntry(e){
    if(e.target.tagName === 'BUTTON'){
       e.target.parentElement.remove()
    }
    removeFromLS()
}
function clearList(){
   
    //spreading because HTMLCollection is not iterable despite it having a length like an array
    [...listItems].map(item =>{
            if(item.children[0].checked){
                item.children[0].checked = false;
            }
    })
}
//filter functionality
function filterOnType(){
    if([...listItems].length > 1){
        [...listItems].filter(li => {
            if(!li.children[1].innerText.includes(inputField.value)){
                //check is the li contain the word being typed
                li.style.display = "none";
                //display just the one that is true otherwise hide other
            }else{
                li.style.display = "flex";
            }
        })
    }
}

function savetoLS(li){
    //when the use enter submit, 
    // the value should be added to local storage
    items.push(li)
    localStorage.setItem('todo', JSON.stringify(items))
    
    //when the user refresh the page, if LS has item it in, display it in the list
}
//remove item from LS when x is pressed
function removeFromLS(item){
    //when user click x button next to item, it deletes from the UI but it should also delete from LS
    if(localStorage.getItem('todo') !== ''){
        const listOfItems = JSON.parse(localStorage.getItem('todo'));
        listOfItems.filter((text, index)=>{
            if(text === listItems[index].innerText){
                console.log(localStorage.removeItem(listOfItems.splice(0,1, text)))
                localStorage.removeItem(listOfItems.splice(0,1, text))
            }
        })
    }
    //json parse the LS property
    //find the word that has been removed
    //remove it
}

clear.addEventListener('click', clearList);
inputField.addEventListener('keydown', filterOnType);

window.addEventListener("DOMContentLoaded", ()=>{
    if(localStorage.getItem('todo')){
        const ls = localStorage.getItem('todo');
        const processed = JSON.parse(ls);
        processed.map(item => getItemsFromLS(item))
    }
})

function createListItem(text){
                    //create a checkbox
                    const input = document.createElement('input');
                    input.type = 'checkbox';
                    //add checked attribute to every list item
                    input.addEventListener('click', toggleCheckbox)
                    //create a new li
                    const li = document.createElement('li');
                    li.className = `items`
                    //create text node
                    const p = document.createElement('p');
                    p.className = 'item'
                    p.innerText = text;
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
}
function getItemsFromLS(text){
    if(!listItems.length >= 1){
        const ls = localStorage.getItem('todo');
        const processed = JSON.parse(ls);
        processed.map(item =>{
                //create a checkbox
                    const input = document.createElement('input');
                    input.type = 'checkbox';
                //create a new li
                const li = document.createElement('li');
                li.className = `items`
            //create text node
                const p = document.createElement('p');
                p.className = 'item'
                p.innerText = item;
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
        });
    }
}
function toggleCheckbox(e){
    if(e.target.checked){
        e.target.parentElement.classList.add('checked');
    }else{
        e.target.parentElement.classList.remove('checked');
    }
}