import React from 'react'
import { Table } from 'react-bootstrap'

export default function Carrito({datos, cantidad}) {
  const precioFinal = parseInt(cantidad) * parseInt(datos.price.substr(1,3))

    console.log()
  return (
    <div>
      <Table>
      <tbody>
        <tr>
          <td><img src={datos.Image}/></td>
          <td><p>{datos.Title}<br/> X{cantidad}</p></td>
          <td>{precioFinal}</td>
        </tr>
      </tbody>
    </Table>
    </div>
  )
}
