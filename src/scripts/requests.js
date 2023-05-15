import { error, sucess, toast } from "./toast.js"

const token = localStorage.getItem('@Kenz-Empresas:authToken') || ""
const baseUrl = 'http://localhost:3333'
const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
}

export async function loginRequest(loginBody){
    const login = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(loginBody)
    })
    .then(async (res) =>{
        if(res.ok){
            const response = await res.json()
            const {authToken, isAdm} = response

            localStorage.setItem('@Kenz-Empresas:authToken', authToken)
            localStorage.setItem('@Kenz-Empresas:isAdm', JSON.stringify(isAdm))

            if(isAdm){
                location.replace('/src/pages/admin.html')
            }else{
                location.replace('/src/pages/user.html')
            }
        }else{
            const response = await res.json()
            toast(error, response.message)
        }
    })
    return login
}

export async function createDepartament(createBody){
    const newDepartment = await fetch(`${baseUrl}/departments/create`,{
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(createBody)
    })
    .then(async (res) =>{
        if(res.ok){
            return res.json()
        }else{
            const response = await res.json()

            toast(error, response.message)
        }
    })
    return newDepartment
}

export async function readCompaniesById(companyId){
    const company = await fetch(`${baseUrl}/companies/readById${companyId}`,{
        method: "GET",
        headers: requestHeaders
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        }else{
            const response = await res.json()

            console.log(response.message)
        }
    })
    return company
}

export async function departmentUpdate(departmentId, departmentBody){
    const department = await fetch(`${baseUrl}/departments/update/${departmentId}`,{
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(departmentBody)
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        }else{
            const response = await res.json()

            toast(error, response.message)
        }
    })
    return department
}

export async function deleteDepartment(departmentId){
    const department = await fetch(`${baseUrl}/departments/delete/${departmentId}`,{
        method: "DELETE",
        headers: requestHeaders
    })
    .then(async (res) => {
        if(res.ok){
            toast(sucess, "Departamento excluído com sucesso!")
            return res.json()
        }else{
            const response = res.json()

            toast(error, response.message)
        }
    })
    return department
}

export async function showAllCompanies(){
    const companies = await fetch(`${baseUrl}/companies/readAll`, {
        method: "GET",
        headers: requestHeaders
    })
    .then(async (res) =>{
        if(res.ok){
            return res.json()
        }else{
            const response = res.json()
            console.log(response.message)
        }
    })
    return companies
}

export async function showAllCategories(){
    const categories = await fetch(`${baseUrl}/categories/readAll`, {
        method: "GET",
        headers: requestHeaders
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        }else{
            const response = await res.json()
            console.log(response.message)
        }
    })
    return categories
}

export async function readAllDepartments(){
    const departments = await fetch(`${baseUrl}/departments/readAll`, {
        method: "GET",
        headers: requestHeaders
    })
    .then(async (res) =>{
        if(res.ok){
            return res.json()
        }else{
            const response = await res.json()
            console.log(response.message)
            console.log(requestHeaders);
        }
    })
    return departments
}

export async function registerAccont(registerBody){
    const register = await fetch(`${baseUrl}/employees/create`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(registerBody)
    })
    .then(async (res) =>{
        if(res.ok){
            setTimeout(async () =>{
                console.log('entrou');
                toast(sucess, 'Conta criada com sucesso')
                return res.json()
            }, 3000)
        }else{
            const response = res.json()
            toast(error, response.message)
        }
    })
    return register
}

export async function employeesReadAll(){
    const employees = await fetch(`${baseUrl}/employees/readAll`, {
        method: "GET",
        headers: requestHeaders
    })
    .then(async (res) =>{
        if(res.ok){
            return res.json()
        }else{
            const response = await res.json()
            console.log(response.message)
        }
    })
    return employees
}

export async function showDepartmentById(departmentId){
    const department = await fetch(`${baseUrl}/departments/readById/${departmentId}`, {
        method: "GET",
        headers: requestHeaders
    })
    .then(async (res) =>{
        if(res.ok){
            return res.json()
        }else{
            const response = res.json()
            toast(error, response.message)
        }
    })
    return department
}

export async function hireEmployeeInDepartment(employeeId, departmentId){
    const employee = await fetch(`${baseUrl}/employees/hireEmployee/${employeeId}`, {
        method: "PATCH",
        headers: requestHeaders,
        body: `{
            "department_id": "${departmentId}"
        }`
    })
    .then(async (res) =>{
        if(res.ok){
            toast(sucess, "Usuário contratado com sucesso!")

            return res.json()
        }else{
            const response = res.json()

            toast(error, response.message)
        }
    })
    return employee
}

export async function dismissEmployee(employeeId){
    const employee = await fetch(`${baseUrl}/employees/dismissEmployee/${employeeId}`, {
        method: "PATCH",
        headers: requestHeaders
    })
    .then(async (res) =>{
        if(res.ok){
            toast(sucess, "Usuário desligado com sucesso")

            return res.json()
        }else{
            const response = res.json()

            toast(error, response.message)
        }
    })
    return employee
}

export async function updateEmployee(employeeId, employeeBody){
    const employee = await fetch(`${baseUrl}/employees/updateEmployee/${employeeId}`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(employeeBody)
    })
    .then(async (res) =>{
        if(res.ok){
            toast(sucess, "Usuário atualizado com sucesso!")

            return res.json()
        }else{
            const response = res.json()

            toast(error, response.message)
        }
    })
    return employee
}

export async function deleteEmployee(employeeId){
    const employee = fetch(`${baseUrl}/employees/deleteEmployee/${employeeId}`, {
        method: "DELETE",
        headers: requestHeaders
    })
    .then(async (res) =>{
        if(res.ok){
            toast(sucess, 'Usuário deletado com sucesso!')
            return res.json()
        }else{
            const response = res.json()
            toast(error, response.message)
        }
    })
    return employee
}

export async function userLoggedPorfile(){
    const user = fetch(`${baseUrl}/employees/profile`, {
        method: "GET",
        headers: requestHeaders
    })
    .then(async (res) =>{
        if(res.ok){
            return res.json()
        }else{
            const response = res.json()

            toast(error, response.message)
        }
    })
    return user
}

export async function userShowCompaniesById(companyId){
    const companie = await fetch(`${baseUrl}/companies/readById/${companyId}`, {
        method: "GET",
        headers: requestHeaders
    })
    .then(async (res) =>{
        if(res.ok){
            return res.json()
        }else{
            const response = res.json()

            toast(error, response.message)
        }
    })
    return companie
}

export async function userShowDepartmentById(departmentId){
    const department = await fetch(`${baseUrl}/departments/readById/${departmentId}`, {
        method: "GET",
        headers: requestHeaders
    })
    .then(async (res) =>{
        if(res.ok){
            return res.json()
        }else{
            const response = res.json()

            toast(error, response.message)
        }
    })
    return department
}