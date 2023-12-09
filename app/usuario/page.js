"use client";

import React, { useEffect, useState } from 'react';
import { Table, Card, CardHeader, CardBody, Tabs, Tab, Button } from '@nextui-org/react';
import style from "./components/style/CardU.module.css";
import PersonalData from './components/PersonalData';
import ContactData from './components/ContactData';
import StatusData from './components/StatusData';
import WorkExperience from './components/WorkExperience';
import { useSession } from 'next-auth/react';

export default function Page() {
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState();
  const [user, setUser] = useState(null);
  const [userRfc, setUserRfc] = useState("");
  const [userExp, setUserExp] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);


  async function fetchData() {
    setLoading(true);
    try {
      const UsuarioId = session.user.id; // Reemplaza con el ID del usuario que deseas obtener
      const response = await fetch(`/api/usuario/${UsuarioId}`);
  
      if (response.ok) {
        const user = await response.json();
        setUser(user);
        console.log(user)
        setUserRfc(user.RFC)
        setLoading(false);
        // Luego de obtener los datos del usuario, puedes llamar a fetchUserExpData
        await fetchUserExpData(user);
      } else {
        console.error('Error al obtener datos de la API');
      }
    } catch (error) {
      console.error('Error al conectarse a la API', error);
    }
  }

  async function fetchUserExpData(user) {
    try {
      const rfc = user.RFC;
      const response = await fetch(`/api/usuario/experienciaLaboral/experiencia/${encodeURIComponent(user.RFC)}`);
      if (response.ok) {
        const data = await response.json();
        setUserExp(data);
        setUserRfc(rfc)
        setLoading(false);
      } else {
        console.error('Error al obtener datos de la API');
      }
    } catch (error) {
      console.error('Error al conectarse a la API', error);
    }
  }

  let tabs = [
    {
      id: "personalData",
      label: "Datos personales",
    },
    {
      id: "contactData",
      label: "Datos de contacto",
    },
    {
      id: "employmentStatus",
      label: "Estatus laboral",
    },
    {
      id: "workExperience",
      label: "Experiencia laboral",
    },
  ];

  

  useEffect(() => {
    if (session && session.user) {
      fetchData();
      setUserId(session.user.id)
    }
  }, [session]);

  const renderTabContent = (item) => {
    switch (item.id) {
      case "personalData":
        return <PersonalData user = {user} isEditable = {isEditable} userId = {session.user.id} fetchData= {fetchData} setIsEditable={setIsEditable}/>;
      case "contactData":
        return <ContactData user = {user} isEditable = {isEditable} userId = {userId} fetchData= {fetchData} setIsEditable={setIsEditable}/>;
      case "employmentStatus":
        return <StatusData user = {user} isEditable = {isEditable} userId = {userId} fetchData= {fetchData} setIsEditable={setIsEditable}/>;
      case "workExperience":
        return <WorkExperience userExp={userExp} isEditable = {isEditable} userId = {userId} fetchData= {fetchData} setIsEditable={setIsEditable} loading = {loading} userRfc = {userRfc}/>;
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
        <Button className={isEditable? `w-1/2  ${style.hov}` : `w-1/2`} color='secondary' variant={isEditable?'solid' : 'flat'} size='md' onClick={()=> setIsEditable(!isEditable)}>
          {isEditable? "Cancelar" : "Editar informacion personal"}
        </Button>
      </CardBody>
    </Card>
  );
}
