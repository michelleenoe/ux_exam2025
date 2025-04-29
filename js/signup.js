// import { USERS_BASE_URL } from './utils.js'

// const handleError = msg => alert(msg)

// const birthInput = document.querySelector('#txtBirthDate')
// birthInput.max = new Date().toISOString().split('T')[0]

// document.querySelector('#frmSignup').addEventListener('submit', async e => {
//   e.preventDefault()

//   const pwd    = e.target.txtPassword.value.trim()
//   const repeat = e.target.txtRepeatPassword.value.trim()
//   const pwdOK  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{9,}$/.test(pwd)
//   if (!pwdOK)        { handleError('Password must be at least 9 characters and include uppercase, lowercase, number and special character'); return }
//   if (pwd !== repeat){ handleError('Passwords must match'); return }

//   if (new Date(e.target.txtBirthDate.value) > new Date()){
//     handleError('Birth date cannot be in the future'); return
//   }

//   const body = new URLSearchParams({
//     email:        e.target.txtEmail.value.trim(),
//     password:     pwd,
//     first_name:   e.target.txtFirstName.value.trim(),
//     last_name:    e.target.txtLastName.value.trim(),
//     address:      e.target.txtAddress.value.trim(),
//     phone_number: e.target.txtPhone.value.trim(),
//     birth_date:   e.target.txtBirthDate.value
//   })

//   try{
//     const res  = await fetch(`${USERS_BASE_URL}/users`, { method:'POST', body })
//     const data = await res.json()
//     if (data.error){ handleError(data.error); return }
//     window.location.href = 'login.html'
//   }catch{ handleError('Network error') }
// })
