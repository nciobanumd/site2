const toDoList = localStorage.getItem('myToDo') ? JSON.parse(localStorage.getItem('myToDo')) : []

const addToDoForm = document.getElementById('addToDo')
const inclompleteToDo = document.getElementById('incopleteToDo')
const completedToDo = document.getElementById('completedToDo')
const formTitle = document.getElementById('toDoTitle')
const formDecription = document.getElementById('toDoDescription')
const openIcon = document.getElementById('openModalIcon')
const closeIcon = document.getElementById('closeModalIcon')
const closeEditIcon = document.getElementById('closeEditModalIcon')
const modal = document.getElementById('formModal')
const editModal = document.getElementById('editModal')
const deleteIcons = document.getElementsByClassName('ri-delete-bin-2-fill')
const editInput = document.getElementById('editTitle')
const editBtn = document.getElementById('editToDoBtn')

let toDoToChange = ''

openIcon.addEventListener('click', () => {
    modal.classList.add('activeModal')
})

const closeModal = () => {
    editModal.classList.remove('activeModal')
    modal.classList.remove('activeModal')    
}

const changeStatus = (item) =>{    
    const index = toDoList.findIndex(element => item.title === element.title);
    const found = toDoList.find(element => item.title === element.title)    
    toDoList.splice(index, 1, found)    
    localStorage.setItem('myToDo', JSON.stringify(toDoList))    
}

closeIcon.addEventListener('click', closeModal)
closeEditIcon.addEventListener('click', closeModal)

const addListItem = (item) => {
    const listTitle = document.createElement('div')   
    const listCheck = document.createElement('input')
    const deleteIcon = document.createElement('i')
    const editIcon = document.createElement('i')
    deleteIcon.classList.add('ri-delete-bin-2-fill')
    editIcon.classList.add("ri-pencil-fill")

    deleteIcon.addEventListener('click', ()=>{
        deleteToDo(item)
    })

    editIcon.addEventListener('click', () => {
        editModal.classList.add('activeModal')
        editInput.value = item.title
        toDoToChange = item.title

    })

    listCheck.checked = item.checked
    const wrapper = document.createElement('div')
    const icons = document.createElement('span')
    const details = document.createElement('div')
    details.classList.add('toDoDetails')  
    wrapper.classList.add('toDoWrapper')
    listCheck.setAttribute('type', 'checkbox')
    listTitle.innerText = item.title   
    
    icons.appendChild(editIcon)
    icons.appendChild(deleteIcon)  
    

    details.appendChild(listCheck)
    details.appendChild(listTitle) 
       
   
    wrapper.appendChild(details)
    wrapper.appendChild(icons)

    const parrent = item.checked ? completedToDo : inclompleteToDo

    parrent.appendChild(wrapper)
    listCheck.addEventListener('click', (event) => {
        if (event.target.checked) {
            completedToDo.appendChild(wrapper)        
        } else {
            inclompleteToDo.appendChild(wrapper)
        }
        item.checked = !item.checked
        changeStatus(item)
    })
}

const renderList = () => {
    inclompleteToDo.innerHTML = ' '  
    completedToDo.innerHTML = ' ' 

    toDoList.forEach(item => addListItem(item))
}

function deleteToDo(item) {
    const index = toDoList.findIndex(element => item.title === element.title);
    toDoList.splice(index, 1)
    localStorage.setItem('myToDo', JSON.stringify(toDoList)) 
    renderList()
}

function editToDo(event) {
    event.preventDefault()
    const index = toDoList.findIndex(item => item.title === toDoToChange)
    toDoList.splice(index, 1, {...toDoList[index], title: editInput.value})

    localStorage.setItem('myToDo', JSON.stringify(toDoList))
    renderList()
    closeModal()
    
}

editBtn.addEventListener('click', editToDo)
renderList()

const addToDo = (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const toDo = Object.fromEntries(data.entries())
    toDo.checked = false
    const found = toDoList.find(item => item.title === toDo.title)
    if(found) return alert('You already have this to do')
    toDoList.push(toDo)
    localStorage.setItem('myToDo', JSON.stringify(toDoList))
    addListItem(toDo)
    formTitle.value = '' 
    closeModal()  

}

addToDoForm.addEventListener('submit', (event) => {
    addToDo(event)
})





