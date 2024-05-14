import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import "./styles/Details-styles.css"
import { Button, Modal } from "react-bootstrap";
import Carrito from "./Carrito";

export const Details = () => {
  const [data, setData] = useState();
  const { id } = useParams();
  const patras = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const produ = async () => {
    try {
      const link = await axios.get(`http://localhost:3000/productos/${id}`);
      console.log(link)
      return link.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    foodata();
  }, []);

  async function foodata() {
    const data = await produ();
    setData(data);
    console.log(data);
  }

  function volver() {
    patras(`/Home`)
  }

  const [contador, setContador] = useState(1);

  const sumar = () => {
    setContador(contador + 1);
  };
  const restar = () => {
    setContador(Math.max(contador - 1, 0));
  };

  return (
    <div>
      <div>
        <button onClick={() => volver()}>back</button>
      </div>
            <div className="prod">
              <img
                src={data?.Image}
                alt={data?.Title}
              />
              <h2 class="precio">{data?.price}</h2>
            </div>
      <div>
        <button onClick={sumar}>+</button>
        <h1>{contador}</h1>
        <button onClick={restar}>-</button>
      </div>
      <div>
        <h1>Sabor</h1>
         {
         (data?.cat === 'Guajolote' || data?.cat === 'Tamal')? 
            (
              <section class="saborGuajolota">
                <img src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1705875787/Mexfood/naie6vdda1bjo6qtwcyf.png" alt="Verde" />
                <img src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1705875787/Mexfood/ffqddid77xan0pf4dgft.png" alt="Mole" />
                <img src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1705875788/Mexfood/irchgwassm0gd1kfuuhc.png" alt="Rajas" />
                <img src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1705875788/Mexfood/cie9tisdrxqsuymfpucf.png" alt="Piña" />
                <img src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1705875788/Mexfood/lb87sapcp55stxvdqxq9.png" alt="Pasas" />
                <img src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1705875787/Mexfood/rfnvnfuyer5d8hheuvqi.png" alt="Guayaba" />
              </section>
            )
           : 
             (
              <section class="saborCoffe">
                <img src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1705875788/Mexfood/oiquywisckoulywzfnfi.png" alt="Champurrado" />
                <img src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1705875788/Mexfood/mgbrrllpilmekncqirye.png" alt="ArrozConLeche" />
                <img src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1705875788/Mexfood/ntsizqc4lftlfcyxzfpv.png" alt="Chocolate" />
                <img src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1705875787/Mexfood/yh0nph9dlu2gcaxlwmq1.png" alt="Cafe" />
              </section>
            )
          
        }
      </div>
      <div>
        <h2>Guajolocombo</h2>
        <p>Selecciona la bebida que más te guste y disfruta de tu desayuno.</p>
      </div>
      <div>
        <h1>CAFES IMG</h1>
         {
           (data?.cat === 'Bebida')? 
               (
                <div class="extras">
                  <img
                    src={data.Image}
                    alt={data.Title}
                  />
                  <h2>{data.Title}</h2>
                  <h4 class="precio">{data.price}</h4>
                </div>
              )
            
           : 
             (data?.id === id) &&
               (
                <div class="extras" >
                  <img
                    src={data.Image}
                    alt={data.Title}
                  />
                  <h2>{data.Title}</h2>
                  <h4 class="precio">{data.price}</h4>
                </div>
              )
            
          
        }
      </div>
      <footer>
        <button onClick={handleShow}>Agregar al carrito</button>
      </footer>
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>Carrito de Compra</Modal.Title>
        </Modal.Header>
        <Modal.Body><Carrito datos={data} cantidad={contador}/></Modal.Body>
        
      </Modal>
    </div>
  );
};

export default Details;
