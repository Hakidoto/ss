"use client";

import React, { useEffect, useState } from 'react';
import { Table, Card, CardHeader, CardBody, Tabs, Tab } from '@nextui-org/react';
import style from "./components/style/CardU.module.css";
import PersonalData from './components/PersonalData';
import ContactData from './components/ContactData';
import StatusData from './components/StatusData';
import WorkExperience from './components/WorkExperience';

export default function Page() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  async function fetchUserData() {
    try {
      const userId = 2; // Reemplaza con el ID del usuario que deseas obtener
      const response = await fetch(`/api/usuario/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data);
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
    fetchUserData();
  }, []);

  const renderTabContent = (item) => {
    switch (item.id) {
      case "personalData":
        return <PersonalData user = {user}/>;
      case "contactData":
        return <ContactData user = {user}/>;
      case "employmentStatus":
        return <StatusData user = {user}/>;
      case "workExperience":
        return <WorkExperience user = {user}/>;
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
