import React from 'react'
import imgLoad from '../../imagen/loading.gif'
import './Carga.css'

export default function Carga() {
  return (
    <div>
        <img src={imgLoad} alt='img not found' className='imgCarga'/>
    </div>
  )
}
