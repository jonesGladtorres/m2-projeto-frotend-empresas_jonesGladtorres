import { renderAllDepartments, renderAllEmployees, renderEmployeesInModal, renderOptions, renderSelectCompanyById } from "./render.js"
import { createDepartament, deleteDepartment, deleteEmployee, departmentUpdate, dismissEmployee, employeesReadAll, hireEmployeeInDepartment, readAllDepartments, showAllCategories, showAllCompanies, showDepartmentById, updateEmployee } from "./requests.js"
import { error, sucess, toast } from "./toast.js"


function isAdm(){
    const isAdm = localStorage.getItem('@Kenz-Empresas:isAdm')

    if(isAdm === 'false'){
        location.replace('/src/pages/user.html')
    }
}

function hundleLogout(){
    const button = document.querySelector('.button__register')

    button.addEventListener('click', () =>{
        localStorage.clear()
        location.replace('/src/pages/login.html')
    })
}

export async function hundleCreateModal(){
    const buttonModal = document.querySelector('.button__createModal')
    const modalController = document.querySelector('.modal__controller--createDepartament')

    buttonModal.addEventListener('click', async () =>{
        modalController.showModal()
        renderOptions(await showAllCompanies(), '.select__modal--createDepartament')

        const closeModalX = document.querySelector('.closeModal')

        closeModalX.addEventListener('click', () =>{
            modalController.close()
        })
    })
    hundleCreateDepartment()
}

export async function showAllDepartments(array){
    const ul = document.querySelector('.ul__container--admin')
    const name = array.name
    const description = array.description
    const companies = await showAllCompanies()
    const nameCompany = companies.find(company => company.id === array.company_id)

    ul.insertAdjacentHTML('beforeend',
    `
        <li class="li__container">
            <div class="names__container">
                <h3>${name}</h3>
                <p>${description}</p>
                <p>${nameCompany.name}</p>
            </div>
            <div class="icons__container">
                <img id="${array.id}" class="button__view buttonDepartment" src="../icons/index/view.svg" alt="Olho de visualização">
                <img id="${array.id}" class="button__edit buttonDepartment" src="../icons/index/edit.svg" alt="Lapis de edição">
                <img id="${array.id}" class="button__delete buttonDepartment" src="../icons/index/delete.svg" alt="Lixeira para Excluir">
            </div>
        </li>
    `
    )
    hundleViewDepartment()
    hundleEditDepartment()
    hundleDeleteDepartment()
}

export async function showAllEmployess(array){
    const ul = document.querySelector('.users__ul--container')
    const name = array.name
    const companies = await showAllCompanies()

    const nameCompany = companies.find(company => company.id === array.company_id)

    if(array.company_id === null){
        array.company_id = 'Desempregado(a)'
    }else{
        array.company_id = nameCompany.name
    }

    ul.insertAdjacentHTML('beforeend', 
    `
    <li class="users__li--container">
        <div class="names__container">
            <h3>${name}</h3>
            <p>${array.company_id}</p>
        </div>
        <div class="icons__container">
            <img id="${array.id}" class="button__edit--users" src="../icons/index/edit.svg" alt="Lapis de edição">
            <img id="${array.id}" class="button__edit--delete" src="../icons/index/delete.svg" alt="Lixeira para Excluir">
        </div>
    </li>
    `
    )
    hundleEditEmployee()
    hundleDeleteEmployee()
}

export async function inputSelectShowCompanies(){
    const inputSelect = document.querySelector('.selectCompanies')
    const companies = await showAllCompanies()

    companies.forEach(company => {
        const option = document.createElement('option')
        option.innerText = company.name
        inputSelect.appendChild(option)
    });
}

export async function hundleDeleteDepartment(){
    const buttonsDelete = document.querySelectorAll('.button__delete')
    const modalController = document.querySelector('.modal__container--confirmDelete')
    const buttonClose = document.querySelector('.button__close--deleteDepartament')
    const buttonConfirm = document.querySelector('.button__confirmDelete')
    const ulContainer = document.querySelector('.ul__container--admin')
    
    
    buttonsDelete.forEach(button => {
        button.addEventListener('click', (event) =>{
            modalController.showModal()

            const departmentId = event.target.id

            buttonConfirm.addEventListener('click', async () =>{
                deleteDepartment(departmentId)
                modalController.close()
                setTimeout(()=>{
                    location.reload()
                },2000)
            })


            buttonClose.addEventListener('click', () =>{
                modalController.close()
            })
        })
    
    })

}

export async function hundleCreateDepartment(){
    const button = document.querySelector('.modal__buttonSubmit')
    const inputName = document.querySelector('.createDepartament__input--name')
    const inputDescription = document.querySelector('.createDepartament__input--description')
    const inputSelect = document.querySelector('.createDepartament__input--select')
    const inputs = document.querySelectorAll('.inputs')
    const companies = await showAllCompanies()
    const ulContainer = document.querySelector('.ul__container--admin')
    const modalController = document.querySelector('.modal__controller--createDepartament')
    let count = 0   

    button.addEventListener('click', async (e) =>{
        e.preventDefault()
        inputs.forEach(input => {
            if(input.value.trim() === ''){
                count++
            }
        })
        
        if(count !== 0){
            count = 0
            return toast(error, "Por favor, preencha todos os campos!")
        }else{
            const company = companies.find(company => company.name === inputSelect.value)
            const createBody = {
                name: inputName.value,
                description: inputDescription.value,
                company_id: company.id
            }
            const token = await createDepartament(createBody)
            toast(sucess, "Departamento adicionado com sucesso")

            ulContainer.innerHTML = ''
            renderAllDepartments(await readAllDepartments())
            modalController.close()
            return token
            
        }
    })
}

export async function hundleEditDepartment(){
    const buttonsEdit = document.querySelectorAll('.button__edit')
    const modalController = document.querySelector('.modal__container--editDepartment')
    const buttonClose = document.querySelector('.button__close--editDepartment')
    const input = document.querySelector('.input__editDepartment')
    const buttonSubmit = document.querySelector('.button__editDepartment')
    const ulContainer = document.querySelector('.ul__container--admin')
    let updateBody = {}

    buttonsEdit.forEach(button => 
        button.addEventListener('click', async (event) =>{
            event.preventDefault()
            modalController.showModal()
            const departmentId = event.target.id

            buttonSubmit.addEventListener('click',async () =>{
                updateBody.description = input.value
                departmentUpdate(departmentId, updateBody)
                
                input.value = ''

                modalController.close()
                toast(sucess, 'Departamento editado com sucesso!')
                setTimeout(async () =>{
                    ulContainer.innerHTML = ''
                    renderAllDepartments(await readAllDepartments())    
                },1000)
            })

            buttonClose.addEventListener('click', () =>{
                modalController.close()
            })
        })
    )
}

export async function hundleViewDepartment(){
    const buttonsView = document.querySelectorAll('.button__view')
    const modalContainer = document.querySelector('.modal__container--viewDepartment')
    const modalController = document.querySelector('.modal__controller--viewDepartment')
    

    buttonsView.forEach(button => {
        button.addEventListener('click', async (event) =>{
            modalController.innerHTML = ''
            modalContainer.showModal()
            const department = await showDepartmentById(event.target.id)
            
            modalController.insertAdjacentHTML('beforeend', 
            `
            <p class="modal__close--viewDepartment">X</p>
            <h1 class="modal__h1--viewDepartment">${department.name}</h1>
            <h3 class="modal__h3--viewDepartment">${department.description}</h3>
            <p class="modal__p--viewDepartment">${department.company.name}</p>
            <div class="container__select--viewDepartment">
                <select class="modal__select--viewDepartment">
                    <option value="" hidden>Selecionar usuário</option>
                </select>
                <button class="modal__buttonContrat--viewDepartment">Contratar</button>
            </div>
            <div class="divUl__container--viewDepartment">
                <ul class="ul__container--viewDepartment"></ul>
            </div>
            `
            )
            const buttonClose = document.querySelector('.modal__close--viewDepartment')

            buttonClose.addEventListener('click', () =>{
                modalContainer.close()
            })

            if(department.employees.length > 0){
                const ul = document.querySelector('.ul__container--viewDepartment')
                
                department.employees.forEach(employee => {
                    const li = document.createElement('li')
                    li.className = 'li__container--viewDepartment'
                    ul.appendChild(li)
                    const h3 = document.createElement('h3')
                    h3.innerText = employee.name
                    const p = document.createElement('p')
                    p.innerText = department.company.name
                    const button = document.createElement('button')
                    button.className = 'button__desligar--viewDepartment'
                    button.id = employee.id
                    button.innerText = 'Desligar'
                    li.append(h3, p, button)
                })
            }else{
                const div = document.querySelector('.divUl__container--viewDepartment')
                const ul = document.querySelector('.ul__container--viewDepartment')
                ul.style = 'display: none;'
                div.style = 'justify-content: center;'
                const h2 = document.createElement('h2')
                h2.innerText = 'Não há funcionários neste departamento'
                h2.className = 'modal__h2Empyt--viewDepartment'
                div.appendChild(h2)
            }

            
            

            const buttonContrat = document.querySelector('.modal__buttonContrat--viewDepartment')
            buttonContrat.addEventListener('click', async () =>{
                const input = document.querySelector('.modal__select--viewDepartment')
                const employees = await employeesReadAll()

                const findEmployee = employees.find(employee => employee.name === input.value)

                await hireEmployeeInDepartment(findEmployee.id, department.id)

                input.value = ''
                modalContainer.close()
                setTimeout(()=>{
                    location.reload()
                }, 3000)
            })

            const buttonDesligar = document.querySelectorAll('.button__desligar--viewDepartment')

            buttonDesligar.forEach(button => {
                button.addEventListener('click', (event) =>{
                    dismissEmployee(event.target.id)

                    modalContainer.close()
                    setTimeout(()=>{
                        location.reload()
                    }, 3000)
                })
            })


            await renderEmployeesInModal()
        })
    })
}

export async function hundleEditEmployee(){
    const buttonsOpenModal = document.querySelectorAll('.button__edit--users')
    const modalContainer = document.querySelector('.modal__container--editUsers')
    const buttonCloseModal = document.querySelector('.modal__buttonClose--editUsers')
    const buttonSubmit = document.querySelector('.modal__button--editUsers')
    const inputs = document.querySelectorAll('.modal__inputs--editUsers')
    const inputName = document.querySelector('.input__name--editUsers')
    const inputEmail = document.querySelector('.input__email--editUsers')
    const ulContainer = document.querySelector('.users__ul--container')
    let count = 0

    buttonsOpenModal.forEach(button => {
        button.addEventListener('click', async (event) =>{
            modalContainer.showModal()
            event.preventDefault()
            buttonCloseModal.addEventListener('click', () => {
                modalContainer.close()
            })
            buttonSubmit.addEventListener('click', async () =>{

                inputs.forEach(input => {
                    if(input.value.trim() === ''){
                        count++
                    }
                })
        
                if(count !== 0){
                    count = 0
                    return toast(error, "Por favor, preencha todos os campos!")
                }else{
                    const employeeId = event.target.id
                    const employeeBody = {
                        name: inputName.value,
                        email: inputEmail.value
                    }
    
                    await updateEmployee(employeeId, employeeBody)
    
                    setTimeout(()=>{
                        toast(sucess, 'Usuário editado com sucesso')
                        modalContainer.close()
                        ulContainer.innerHTML = ''
                        renderAllEmployees()
                    },3000)
                }
        
            })
        })
    
    })
}

export async function hundleDeleteEmployee(){
    const buttonsDelete = document.querySelectorAll('.button__edit--delete')
    const modalContainer = document.querySelector('.modal__container--deleteUsers')
    const modalController = document.querySelector('.modal__controller--deleteUsers')
    const employees = await employeesReadAll()
    
    const ulContainer = document.querySelector('.users__ul--container')

    buttonsDelete.forEach(button => {
        button.addEventListener('click', (event) =>{
            modalContainer.showModal()
            const userName = employees.find(employee => employee.id === event.target.id)
            
            modalController.insertAdjacentHTML('beforeend', 
            `
            <p class="modal__buttonClose--deleteUsers">X</p>
            <h1>Realmente deseja remover o usuário ${userName.name}</h1>
            <button class="modal__buttonRemove--deleteUsers">Remover</button>
            `
            )
            const buttonCloseModal = document.querySelector('.modal__buttonClose--deleteUsers')
            const buttonConfirmDelete = document.querySelector('.modal__buttonRemove--deleteUsers')

            buttonCloseModal.addEventListener('click', () =>{
                modalController.innerHTML = ''
                modalContainer.close()
            })
    
            buttonConfirmDelete.addEventListener('click',async () =>{
                await deleteEmployee(event.target.id)
                ulContainer.innerHTML = ''
                renderAllEmployees()
                modalController.innerHTML = ''
                modalContainer.close()
            })
        })
    })
}

renderSelectCompanyById()
inputSelectShowCompanies()
renderAllEmployees()
renderAllDepartments(await readAllDepartments())
isAdm()
hundleCreateModal()
hundleLogout()
