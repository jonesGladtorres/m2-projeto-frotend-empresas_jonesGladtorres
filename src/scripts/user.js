import { employeesReadAll, readAllDepartments, showAllCompanies, userLoggedPorfile, userShowCompaniesById, userShowDepartmentById } from "./requests.js"


function authentication(){
    const token = localStorage.getItem('@Kenz-Empresas:authToken')

    if(!token){
        return location.replace('/index.html')
     }
}

function isAdm(){
    const isAdm = localStorage.getItem('@Kenz-Empresas:isAdm')

    if(isAdm === 'true'){
        location.replace('/src/pages/admin.html')
    }
}

function hundleLogout(){
    const button = document.querySelector('.button__register')

    button.addEventListener('click', () =>{
        localStorage.clear()
        location.replace('/src/pages/login.html')
    })
}

export async function userInfos(){
    const user = await userLoggedPorfile()
    console.log(user);
    const userName = document.querySelector('.user__page--name')
    const userEmail = document.querySelector('.user__page--email')
    const divCompanies = document.querySelector('.empresas__container')
    
    userName.innerText = user.name
    userEmail.innerText = user.email
    
    
    if(user.company_id !== null){
        const company = await userShowCompaniesById(user.company_id)
        const department = await userShowDepartmentById(user.department_id)
        
        divCompanies.insertAdjacentHTML('beforeend', 
        `
        <h1 class="user__page--companyEndDepartment">${company.name} - ${department.name}</h1>
        <div class="user__container--ulContainer">
            <ul class="ul__container--userPage"></ul>
        </div>
        `)
        const ulContainer = document.querySelector('.ul__container--userPage')

        department.employees.forEach(employee => {
            ulContainer.insertAdjacentHTML('beforeend', 
            `
            <li class="li__container--userPage">
                <h3>${employee.name}</h3>
            </li>
            `)
        })
    }else{
        divCompanies.innerHTML = ''

        divCompanies.style = `
            display: flex;
            justify-content: center;
            align-items: center;
        `
        const h1 = document.createElement('h2')
        h1.className = 'user__companyEmpty'
        h1.innerText = 'Você ainda não foi contratado'
        divCompanies.appendChild(h1)
    }
}

await userInfos()
isAdm()
authentication()
hundleLogout()