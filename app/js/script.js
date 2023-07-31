document.addEventListener('DOMContentLoaded', async () => {
    const cardList = document.querySelector('.card-list');
    const modalInfo = document.querySelector('.modal-info');
    const searchForm = document.querySelector('.search-form');
    let data;

    const render = (arr) => {
        const cardList = document.querySelector('.card-list');
        cardList.innerHTML = '';
        arr.forEach((card, index) => {
            cardList.insertAdjacentHTML('beforeend', `
                <div class="card-item" data-id="${index}">
                    <h3 class="card-title">${card.name}</h3>
                    <p class="card-text card-phone">${card.phone}</p>
                    <p class="card-text card-mail">${card.email}</p>
                </div>
            `)
        });
    }

    const getData = async (query) => {
        return await fetch(`http://127.0.0.1:3000/${query ? '?term=' + query : ''}`)
            .then(res => res.json())
            .then(res => data = res);
    }

    const toggleModal = () => modalInfo.classList.toggle('modal-active');

    const renderModal = (data) => {
        const modalTitle = document.querySelector('.modal-title');

        const modalPhone = modalInfo.querySelector('.modal-phone');
        const modalMail = modalInfo.querySelector('.modal-mail');
        const modalHireDate = modalInfo.querySelector('.modal-hire-date');
        const modalPosName = modalInfo.querySelector('.modal-pos-name');
        const modalDepartment = modalInfo.querySelector('.modal-department');

        modalTitle.innerHTML = data.name;

        modalPhone.innerHTML = data.phone;
        modalMail.innerHTML = data.email;
        modalHireDate.innerHTML = data.hire_date;
        modalPosName.innerHTML = data.position_name;
        modalDepartment.innerHTML = data.department;
    }

    render(await getData());

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const searchInput = searchForm.querySelector('input');
        render(await getData(searchInput.value));
        searchInput.value = '';
    })

    cardList.addEventListener('click', (event) => {
        const target = event.target;
        if (target.closest('.card-item')) {
            const currentData = data[target.closest('.card-item').dataset.id];
            renderModal(currentData);
            toggleModal();
        }
    })

    modalInfo.addEventListener('click', (event) => {
        const target = event.target;
        if (!target.closest('.modal-content') || target.closest('.modal-close')) toggleModal();
    })
})


