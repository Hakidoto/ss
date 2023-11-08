"use client";

import React,{useState, useEffect} from 'react'
import { Table, Card, CardHeader, CardBody, Tabs, Tab } from '@nextui-org/react'
//import style from "../styles/FichaUsuario.module.css"
import style from "../components/style/CardU.module.css"
import Faltas from './components/Faltas';
import Incapacidades from './components/Incapacidades';
import Procesos from './components/Procesos';

export default function Page() {
  const [faltas, setFaltas] = useState([]);
  const [incapacidades, setIncapacidades] = useState([]);
  const [procedimientos, setProcedimientos] = useState([]);
  const [loading, setLoading] = useState(true);

  let tabs = [
    {
      id: "faltas",
      label: "Faltas injustificadas",
    },
    {
      id: "incapacidades",
      label: "Incapacidades",
    },
    {
      id: "procAdministrativos",
      label: "Procedimientos administrativos",
    },
  ];

  async function fetchUserFaltas() {
    try {
      const rfc = "XYZ987654321";
      const response = await fetch(`/api/usuario/incidencias/faltas?rfc=${rfc}`);
  
      if (response.ok) {
        const data = await response.json();
        setFaltas(data);
        setLoading(false);
      } else {
        console.error('Error al obtener datos de la API');
      }
    } catch (error) {
      console.error('Error al conectarse a la API', error);
    }
  }

  async function fetchUserIncapacidades() {
    try {
      const rfc = "XYZ987654321";
      const response = await fetch(`/api/usuario/incidencias/incapacidades?rfc=${rfc}`);
  
      if (response.ok) {
        const data = await response.json();
        setIncapacidades(data);
        setLoading(false);
      } else {
        console.error('Error al obtener datos de la API');
      }
    } catch (error) {
      console.error('Error al conectarse a la API', error);
    }
  }

  async function fetchUserProcedimientos() {
    try {
      const rfc = "XYZ987654321";
      const response = await fetch(`/api/usuario/incidencias/procedimientos?rfc=${rfc}`);
  
      if (response.ok) {
        const data = await response.json();
        setProcedimientos(data);
        setLoading(false);
      } else {
        console.error('Error al obtener datos de la API');
      }
    } catch (error) {
      console.error('Error al conectarse a la API', error);
    }
  }

  const renderTabContent = (item) => {
    switch (item.id) {
      case "faltas":
        return <Faltas faltas = {faltas} loading = {loading}/> ;
      case "incapacidades":
          return <Incapacidades incapacidades = {incapacidades} loading = {loading}/> ;
      case "procAdministrativos":
        return <Procesos procedimientos = {procedimientos} loading = {loading}/> ;
      default:
        return null;
    }
  };

  useEffect(() => {
    fetchUserFaltas();
    fetchUserIncapacidades();
    fetchUserProcedimientos();
  }, [])

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
