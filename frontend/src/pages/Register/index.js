import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'

import './style.css'


import logoImg from '../../assets/logo.svg'
import api from '../../services/api'

export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');

    const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();

        const data = {
            name,
            email, 
            whatsapp,
            city,
            uf
        }
        console.log({data});
        try {
            const response = await api.post('ongs', data)

            if (name === '' || email === '' || whatsapp === '' || city === '' || uf === '') {
                alert('Favor Preencher todos os dados');
            }else{
                alert(`Seu Id de Acesso ${response.data.id}`)
                history.push('/');
            }

                
        } catch (error) {
            alert('Não foi possível')
        }
        
    }

    return(
        <div className='register-container' >
            <div className='content'>
                <section>
                    <img src={logoImg} alt='Be The Hero'></img>
                    <h1>Cadastro</h1>
                    <p>Faça aqui seu cadastro para conhecer todos as necessidades das ONGS</p>
                    <Link  className='back-link' to='/'>
                    <FiArrowLeft size='16px' color='red'/>
                        Já Tenho Cadastro
                    </Link>
                </section>

                <form onSubmit={handleSubmit}>
                    <input 
                        placeholder='ONG' 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                    />
                    <input 
                        type='email' 
                        placeholder='Email' 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder='whatsapp' 
                        value={whatsapp} 
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className='input-group'>
                        <input 
                            placeholder='Cidade' 
                            value={city} 
                            onChange={e => setCity(e.target.value)}
                        />
                        <input 
                            placeholder='UF' 
                            style={{ width: 80 }} 
                            value={uf} 
                            onChange={e => setUF(e.target.value)}
                        />
                    </div>
                    
                    <button className='button' type='submit'>Cadastrar</button>

                </form>
            </div>
        </div>
    )
}