import { useState, useEffect, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.png'
import api from '../../services/api'

function Home() {

  const [user, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {

      const usersFromAPI = await api.get('/users');
      setUsers(usersFromAPI.data);
  }

  async function postUsers() {
    const name = inputName.current.value.trim();
    const email = inputEmail.current.value.trim();
    const age = inputAge.current.value.trim();
  
    if (!name || !email || !age) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
  
    try {
      await api.post('/users', {
        email,
        name,
        age
      });
  
      inputName.current.value = "";
      inputEmail.current.value = "";
      inputAge.current.value = "";
  
      getUsers();
    } catch (error) {
      console.error("Erro ao registrar usuario:", error);
      alert("Erro ao registrar usuario. Tente novamente.");
    }
  }
  

  async function deleteUsers(id) {
    await api.delete(`/users/${id}`);

    getUsers();
}
  

  useEffect(() => {
    getUsers();
  }, [])
  

  return (
      <div className='container'>
        <form onSubmit={(e) => e.preventDefault()}>
          <h1>User Registration</h1>
          <input name="Name" type='text' placeholder='Name' ref={inputName}/>
          <input name="Email" type='email' placeholder='E-mail' ref={inputEmail}/>
          <input name="Age" type='number' placeholder='Age' ref={inputAge}/>
          <button type='button' onClick={postUsers}>Register</button>
        </form>

        {user.map((user) => (
        <div key={user.id} className='card'>
          <div>
            <p>Name: <span>{user.name}</span></p>
            <p>Email: <span>{user.email}</span></p>
            <p>Age: <span>{user.age}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
              <img src={Trash} alt="Delete" />
          </button>
      </div>
      ))}
      </div>
      

  )
}

export default Home
