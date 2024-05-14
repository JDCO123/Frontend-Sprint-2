import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/Home-styles.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [data, setData] = useState();
  const [cat, setCat] = useState("Guajolote");
  const cambiarpag = useNavigate();

  const produ = async () => {
    try {
      const link = await axios.get("http://localhost:3000/productos");
      return link.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function foodata() {
      const data = await produ();
      setData(data);
    }

    foodata();
  }, []);



  function click(e) {
    setCat(e);
  }

  function detail(id) {
    cambiarpag(`/Details/${id}`)
  }

  return (
    <div className="container">
      <h1>Nada como una Guajolota para empezar el día</h1>
      <input className="search" type="text" placeholder="Sabor de guajolota, bebida..." />
      <div className="menu">
        <button
          className="sanduches"
          onClick={() => click("Guajolote")}
        >
          Guajolotas
        </button>
        <button
          className="cafes"
          onClick={() => click("Bebida")}
        >
          Bebidas
        </button>
        <button
          className="tamales"
          onClick={() => click("Tamal")}
        >
          Tamales
        </button>
      </div>
      <div className="items">
        {data?.map((producto) => {
          if (producto?.cat === cat) {
            return (
              <div className="prod" key={producto.id}>
                <img
                  src={producto.Image}
                  alt={producto.Title}
                  onClick={() => detail(producto.id)}
                />
                <p>{producto.Title}</p>
                <span>{producto.price}</span>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Home;
