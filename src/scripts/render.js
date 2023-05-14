import { hundleEditEmployee, showAllDepartments, showAllEmployess } from "./admin.js"
import { employeesReadAll, readAllDepartments, showAllCategories, showAllCompanies } from "./requests.js"


export async function renderCompaniesAll(array, setor){
    const ul = document.querySelector('.ul__container')
    
    const li = document.createElement('li')
    ul.appendChild(li)
    li.className = 'li__container--companies'
    const h2 = document.createElement('h2')
    h2.innerText = array.name
    const p = document.createElement('p')
    p.innerText = setor
    li.append(h2, p)
}

export async function renderCompanies(array){
    const categories = await showAllCategories()

    array.forEach(company => {
       const result = categories.find(category => category.id === company.category_id)
        renderCompaniesAll(company, result.name)
    });
}

export async function selectSetor(array, classe){
    const select = document.querySelector(classe)

    const option = document.createElement('option')
    select.appendChild(option)
    option.innerText = array.name
}

export async function renderOptions(array, classe){

    array.forEach(element => {
        selectSetor(element, classe)
    })
}

export async function renderAllDepartments(array){
    array.forEach(department =>{
        showAllDepartments(department)
    })
}

export async function renderAllEmployees(){
    const employees = await employeesReadAll()

    employees.forEach(employee =>{
        showAllEmployess(employee)
    })
    await hundleEditEmployee()
}

export async function renderSelectCompanyById(){
    const inputSelect = document.querySelector('.selectCompanies')
    const ul = document.querySelector('.ul__container--admin')
    const adminContainer = document.querySelector('.section__container')

    inputSelect.addEventListener('change', async () =>{
        adminContainer.innerHTML = ''
        const departments = await readAllDepartments()
        const companies = await showAllCompanies()

        const company = companies.find(company => company.name === inputSelect.value)
        
        const selectDepart = departments.filter(department => department.company_id === company.id)

        if(selectDepart.length === 0){
            ul.style = 'display: none;'
            adminContainer.style = 
            `
            display: flex;
            justify-content: center;
            align-items: center;
            `
            adminContainer.insertAdjacentHTML('beforeend', 
            `
            <h1 class="admin__empty--text">Empresa ${company.name} não possui departamentos</h1>
            `
            )
        }else{
            const ul = document.createElement('ul')
            ul.className = 'ul__container--admin'
            adminContainer.appendChild(ul)
            adminContainer.style = 'justify-content: start;'

            renderAllDepartments(selectDepart)
        }
    })
}

export async function renderEmployeesInModal(){
    const employees = await employeesReadAll()
    const select = document.querySelector('.modal__select--viewDepartment')

    employees.forEach(employee => {
        const option = document.createElement('option')
        select.appendChild(option)
        option.innerText = employee.name
        option.className = `id="${option.id}"`
    })

}
