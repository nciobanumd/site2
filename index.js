const toDoList = localStorage.getItem('myToDo') ? JSON.parse(localStorage.getItem('myToDo')) : []

const addToDoForm = document.getElementById('addToDo')
const incompleteToDo = document.getElementById('incompleteToDo')
const copletedToDo = document.getElementById('completedToDo')
const formTitle = document.getElementById('toDoTitle')
const formDescription = document.getElementById('toDoDescription')


const addListItem = (arr, parrent) => {
    const listTitle = document.createElement('div')
    const listDescription = document.createElement('div')
    const listCheck= document.createElement('input')
    const wrapper = document.createElement('div')
    const toDoDetailsWrapper = document.createElement('div')

    wrapper.classList.add('toDoWrapper')
    listCheck.setAttribute('type', 'checkbox')
    arr.forEach((item) => {
        listTitle.innerText = item.title
        listDescription.innerText = item.description
        toDoDetailsWrapper.appendChild(listTitle)
        toDoDetailsWrapper.appendChild(listDescription)
        wrapper.appendChild(listCheck)
        wrapper.appendChild(toDoDetailsWrapper)


        parrent.appendChild(wrapper)
        listCheck.addEventListener('click', (event) => {
            if(event.target.checked) {
                copletedToDo.appendChild(wrapper)
            } else {
                incompleteToDo.appendChild(wrapper)
            }
        })
        
    })
}


addListItem(toDoList, incompleteToDo)

const addToDo = (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const toDo = Object.fromEntries(data.entries())
    toDoList.push(toDo)
    localStorage.setItem('myToDo', JSON.stringify(toDoList))
    addListItem(toDoList, incompleteToDo)
    formTitle.value =''
    formDescription.value =''
    
}

addToDoForm.addEventListener('submit', addToDo)
