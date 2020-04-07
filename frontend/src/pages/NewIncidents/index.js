import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

import './style.css'
import api from '../../services/api'

export default function NewIncidents(){
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    async function handleNewIncidents(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }

        try {
            if (title === ''  || description === '' || value === '') {
                alert('Favor, preencher todos os campos!');
            }else{
                await api.post('incidents', data, {
                    headers : {
                        Authorization: ongId
                    }
                })
                history.push('/profile')
            }
                
            

        } catch (error) {
            alert('Falha. Tente novamente');
        }
    }

    return(
        <div className='new-incidents-container' >
            <div className='content'>
                <section>
                    <img src={logoImg} alt='Be The Hero'></img>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para ajudar outras ongs entenderem</p>
                    <Link  className='back-link' to='/profile'>
                    <FiArrowLeft size='16px' color='red'/>
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncidents}>
                    <input 
                        placeholder='Titulo'
                        value={title}
                        onChange={e => setTitle(e.target.value)} 
                    />
                    <textarea 
                        placeholder='Descrição'
                        value={description}
                        onChange={e => setDescription(e.target.value)} 
                    />
                    <input
                        placeholder='Valor em reais'
                        value={value}
                        onChange={e => setValue(e.target.value)} 
                    />
                    
                    <button className='button' type='submit'>Cadastrar</button>
                    
                </form>
            </div>
        </div>
    )
}
