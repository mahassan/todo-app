const form = document.querySelector('#form');
const inputField = document.querySelector('#new-item');
const ul = document.querySelector('#items');
const clear = document.querySelector('#clr');
const listItems = ul.children;
const allButton = document.querySelector('.footer');
const items = [];

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(inputField.value !== '' || inputField !== 0){
        createListItem(inputField.value)
        //localstorage
            savetoLS(li);
    }
})

function deleteEntry(e){
    if(e.target.tagName === 'BUTTON'){
       e.target.parentElement.remove()
    }
}
function clearList(){
   
    //spreading because HTMLCollection is not iterable despite it having a length like an array
    [...listItems].map(item =>{
        item.remove();
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
    items.push(li.children[1].innerText)
    localStorage.setItem('todo', JSON.stringify(items))
    
    //when the user refresh the page, if LS has item it in, display it in the list
}
clear.addEventListener('click', clearList);
inputField.addEventListener('keydown', filterOnType);

window.addEventListener("DOMContentLoaded", ()=>{
    if(localStorage.getItem('todo').length >= 1){
        const ls = localStorage.getItem('todo');
        const processed = JSON.parse(ls);
        processed.map(item => createListItem(item))
    }
})

//As the code for adding in repeating on window onload and submit, lets make it into a function
function createListItem(text){
    if(localStorage.getItem('todo').length >= 1){
        const ls = localStorage.getItem('todo');
        const processed = JSON.parse(ls);
        processed.map(item =>{
                //create a checkbox
                    const input = document.createElement('input');
                    input.type = 'checkbox';
    //refactor following code
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
        });
    }
}