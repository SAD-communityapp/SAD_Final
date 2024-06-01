// export default async function login(data: UserLogin) {
//     // const data : UserLogin = {
//     //     "email": "talk2wisdommatt@gmail.com",
//     //     "password": "password",
//     // }
//     const res = await fetch('https://todo.fredred.tw/users/login', {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })

//     if (!res.ok) {
//       throw new Error('Failed to register')
//     }
   
//     return res.json()
// }