import { loginRequest } from "./requests.js"
import { error, toast } from "./toast.js"


function authentication(){
    const token = localStorage.getItem('@Kenz-Empresas:authToken')

    if(token){
        return location.replace('/src/pages/user.html')
     }
}

export function redirectRegister(){
    const buttons = document.querySelectorAll('.button__register')
    const home = document.querySelector('#button__right')

    buttons.forEach(element =>{
        element.addEventListener('click', () =>{
            location.replace('/src/pages/register.html')
        })
    })

    home.addEventListener('click', () =>{
        location.replace('/')
    })
}

export async function hundleLogin(){
    const inputs = document.querySelectorAll('.input__login')
    const button = document.querySelector('.button__login')
    let loginBody = {}
    let count = 0

    button.addEventListener('click', async (e) => {
        e.preventDefault()
        inputs.forEach( input => {
            if(input.value.trim() == ''){
                count++
            }
            loginBody[input.name] = input.value
        })

        if(count !== 0){
            count = 0
            return toast(error, "Por favor, preencha todos os campos")
        }else{
            const token = await loginRequest(loginBody)

            return token
        }
    })
}

authentication()
hundleLogin()
redirectRegister()