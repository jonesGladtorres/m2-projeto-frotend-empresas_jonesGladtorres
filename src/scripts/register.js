import { registerAccont } from "./requests.js"
import { error, sucess, toast } from "./toast.js"

function authentication(){
    const token = localStorage.getItem('@Kenz-Empresas:authToken')

    if(token){
        return location.replace('/src/pages/user.html')
     }
}

export function redirectLogin(){
    const buttons = document.querySelectorAll('.button__back')
    const login = document.querySelector('#button__right')

    buttons.forEach(element => {
        element.addEventListener('click', () =>{
            location.replace('/')
        })
    })

    login.addEventListener('click', () =>{
        location.replace('/src/pages/login.html')
    })
}

export async function register(){
    const inputs = document.querySelectorAll('.input__register')
    const registerBody = {}
    const button = document.querySelector('.button__cadastrar')
    let count = 0

    button.addEventListener('click', async () =>{
        inputs.forEach(({value, name}) =>{
            if(value.trim() === ''){
                count++
            }
            registerBody[name] = value
        })
        if(count !== 0){
            count = 0

            return toast(error,'Preencha todos os campos')
        }else{
            await registerAccont(registerBody)
                
            inputs.forEach((input) =>{
                input.value = ''    
            })
            
            location.replace('/src/pages/login.html') 
        }
    })
}

authentication()
register()
redirectLogin()
