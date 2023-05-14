import { renderCompanies, renderCompaniesAll, renderOptions } from "./render.js"
import { showAllCategories, showAllCompanies } from "./requests.js"

function authentication(){
    const token = localStorage.getItem('@Kenz-Empresas:authToken')

    if(token){
        return location.replace('/src/pages/user.html')
     }
}

export function redirectButton (){
    const login = document.querySelector('#button__right')
    const register = document.querySelector('.button__register')

    login.addEventListener('click', ()=>{
        location.replace('/src/pages/login.html')
    })

    register.addEventListener('click', ()=>{
        location.replace('/src/pages/register.html')
    })
}   

export async function filterSetor(){
    const ul = document.querySelector('.ul__container')
    const inputSelect = document.querySelector('.selected__item')
    const companies = await showAllCompanies()
    const categories = await showAllCategories()
    
    inputSelect.addEventListener('change', async () =>{
        if(inputSelect.value !== ''){
            const categoryFiltered = categories.find(category => category.name === inputSelect.value)

            const filtered = companies.filter(category => category.category_id  === categoryFiltered.id)
            ul.innerHTML = ''

            renderCompanies(filtered)
        }else{
            renderCompanies(await showAllCompanies())
        }
    })    
}

authentication()
filterSetor()
renderOptions(await showAllCategories(), '.selected__item')
redirectButton()
renderCompanies(await showAllCompanies())