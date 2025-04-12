import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import { getTareasMaterial } from "../../services/ObtenerTareasMaterialService";

const ListadoTareasMaterialMaestro = () => {
  const { idTema } = useParams();

  //recargar tareas
  useEffect(() => {
    const fetchTareasMaterial = async () => {
      const response = await getTareasMaterial(idTema);
      // console.log(response)
    };
    fetchTareasMaterial();
  }, []);


  return <Navbar></Navbar>;
};

export default ListadoTareasMaterialMaestro;
