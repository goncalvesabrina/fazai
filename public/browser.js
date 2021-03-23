function itemTemplate(item) {
    return `<li class='list-group-item list-group-item-action d-flex align-items-center justify-content-between'>
                <span class='item-text'>${item.text}</span>
                <div>
                    <button data-id='${item._id}' class='edit-me btn btn-secondary btn-sm mr-1'>Errei</button>
                    <button data-id='${item._id}' class='delete-me btn btn-danger btn-sm'>Já fiz</button>
                </div>
            </li>`
}

let myHTML = items.map((item) => {
    return itemTemplate(item)
}).join('')

document.getElementById('item-list').insertAdjacentHTML('beforeend', myHTML)

let createField = document.getElementById('create-field')

document.getElementById('create-form').addEventListener('submit', (e) => {
    e.preventDefault()

    axios.post('/create-item', { text: createField.value }).then((response) => {
        document.getElementById('item-list').insertAdjacentHTML('beforeend', itemTemplate(response.data))
        createField.value = ''
        createField.focus()
    }).catch(() => {
        console.log('Tenta de novo fí :)')
    })
})

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-me')) {
        let userInput = prompt('Edita aí:', e.target.parentElement.parentElement.querySelector('.item-text').innerHTML)
        if (userInput) {
            axios.post('/update-item', { text: userInput, id: e.target.getAttribute('data-id') }).then(() => {
                e.target.parentElement.parentElement.querySelector('.item-text').innerHTML = userInput
            }).catch(() => {
                console.log('Tenta de novo fí :)')
            })
        }
    }

    if (e.target.classList.contains('delete-me')) {
        if (confirm('Cê tem certeza?')) {
            axios.post('/delete-item', { id: e.target.getAttribute('data-id') }).then(() => {
                e.target.parentElement.parentElement.remove()
            }).catch(() => {
                console.log('Tenta de novo fí :)')
            })
        }
    }
})