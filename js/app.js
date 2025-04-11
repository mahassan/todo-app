const form = document.querySelector('#form');
const inputField = document.querySelector('#new-item');
const ul = document.querySelector('#items');
const clear = document.querySelector('#clr');
const listItems = ul.children;
const allButton = document.querySelector('.footer');


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
            p.className = 'item'
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
               
            }
        })
    }
}
clear.addEventListener('click', clearList);
inputField.addEventListener('keydown', filterOnType)

//disable all button
// const buttons = [...allButton.children].map((button)=>{
//     button.setAttribute('disabled', true)
// })