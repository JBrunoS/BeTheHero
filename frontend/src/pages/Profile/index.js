import React, {useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import './style.css'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api'

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization : ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleIncidents(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (error) {
            alert("Falha ao excluir um caso");
        }
    }

    function handleLogout(){
        localStorage.clear()
        history.push('/')
    }

    return (
        <div className='profile-container'>

            <header> 
                <img src={ logoImg } alt='Be The Hero'></img>
                <span> Bem vindo, {ongName}</span>

                <Link to='/incidents/new' className='button'>Cadastrar novo caso</Link>
                <button type='button' onClick={handleLogout}><FiPower size='18' color='#E02041' /></button>

            </header>   
            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incidents => (
                    <li key={incidents.id}>
                    <strong>Caso:</strong>
                    <p>{incidents.title}</p>

                    <strong>Descrição:</strong>
                    <p>{incidents.description}</p>

                    <strong>Valor:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incidents.value)}</p>

                    <button type='button' onClick={() => handleDeleIncidents(incidents.id)}>
                        <FiTrash2 size={20} color='#a8a8b3'/>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    )
    
}