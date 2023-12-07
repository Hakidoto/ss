"use client";

import React,{useState, useEffect} from 'react'
import { Table, Card, CardHeader, CardBody, Tabs, Tab } from '@nextui-org/react'
import CardU from '../components/CardU'
//import style from "../styles/FichaUsuario.module.css"
import style from "../components/style/CardU.module.css"
import Cursos from './components/Cursos';
import Certificaciones from './components/Certificaciones';
import Lenguas from './components/Lenguas';
import { useSession } from 'next-auth/react';

export default function Page() {
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState();
  const [user, setUser] = useState(null);
  const [cursos, setCursos] = useState([]);
  const [certificaciones, setCertificaciones] = useState([]);
  const [lenguas, setLenguas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rfcUsuario, setRfcUsuario] = useState("");
  let tabs = [
    {
      id: "cursos",
      label: "Cursos",
    },
    {
      id: "certificaciones",
      label: "Certificaciones",
    },
    {
      id: "lenguas",
      label: "Lenguas",
    },
  ];

  async function fetchData() {
    setLoading(true);
    try {
      const UsuarioId = session.user.id; // Reemplaza con el ID del usuario que deseas obtener
      const response = await fetch(`/api/usuario/${UsuarioId}`);
  
      if (response.ok) {
        const user = await response.json();
        setUser(user);
        // Luego de obtener los datos del usuario, puedes llamar a fetchUserExpData
        setRfcUsuario(user.RFC)
        await fetchUserCursos(user);
        await fetchUserCertificaciones(user);
        await fetchUserLenguas(user);
      } else {
        console.error('Error al obtener datos de la API');
      }
    } catch (error) {
      console.error('Error al conectarse a la API', error);
    }
  }


  async function fetchUserCursos(user) {
    setLoading(true);
    try {
      const response = await fetch(`/api/usuario/curriculo/cursos/curso/${encodeURIComponent(user.RFC)}`);
      if (response.ok) {
        const data = await response.json();
        setCursos(data);
        setLoading(false);
      } else {
        console.error('Error al obtener datos de la API');
      }
    } catch (error) {
      console.error('Error al conectarse a la API', error);
    }
    setLoading(false);
  }
  async function fetchUserCertificaciones(user) {
    try {
      //const rfc = "XYZ987654321";
      const response = await fetch(`/api/usuario/curriculo/certificaciones/certificacion/${encodeURIComponent(user.RFC)}`);
  
      if (response.ok) {
        const data = await response.json();
        setCertificaciones(data);
        setLoading(false);
      } else {
        console.error('Error al obtener datos de la API');
      }
    } catch (error) {
      console.error('Error al conectarse a la API', error);
    }
    setLoading(false);
  }
  async function fetchUserLenguas(user) {
    try {
      const response = await fetch(`/api/usuario/curriculo/lenguas/lengua/${encodeURIComponent(user.RFC)}`);
  
      if (response.ok) {
        const data = await response.json();
        setLenguas(data);
        setLoading(false);
      } else {
        console.error('Error al obtener datos de la API');
      }
    } catch (error) {
      console.error('Error al conectarse a la API', error);
    }
  }

  useEffect(() => {
    if (session && session.user) {
      fetchData();
      setUserId(session.user.id)
    }
  }, [session]);
  
  const renderTabContent = (item) => {
    switch (item.id) {
      case "cursos":
        return <Cursos cursos = {cursos} isLoaded = {loading} fetchData={fetchData} rfcUsuario = {rfcUsuario}/>;
      case "certificaciones":
        return <Certificaciones certificacion = {certificaciones} isLoaded = {loading} fetchData={fetchData} rfcUsuario = {rfcUsuario}/>;
      case "lenguas":
        return <Lenguas lenguas = {lenguas} isLoaded = {loading} fetchData={fetchData} rfcUsuario = {rfcUsuario}/>;    
      default:
        return null;
    }
  };

  return (
    <Card className={`mx-auto my-auto ${style.main_card}`}>
      <CardHeader className="flex items-center justify-center ">
        <h2 className="text-md">Perfil del trabajador</h2>
      </CardHeader>
      <CardBody>
        <div className="flex w-full flex-col">
          <Tabs aria-label="Dynamic tabs" items={tabs} radius='full' color='secondary'>
            {(item) => (
              <Tab key={item.id} title={item.label} >
                <Card >
                  <CardBody className={style.bodyCard}>
                    {renderTabContent(item)}
                  </CardBody>
                </Card>
              </Tab>
            )}
          </Tabs>
        </div>
      </CardBody>
    </Card>
  );
}
