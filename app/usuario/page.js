"use client";

import React from 'react'
import { Table, Card, CardHeader, CardBody, Tabs, Tab } from '@nextui-org/react'
import CardU from './components/CardU'
//import style from "../styles/FichaUsuario.module.css"
import style from "./components/style/CardU.module.css"
import PersonalData from './components/PersonalData'
import ContactData from './components/ContactData';
import StatusData from './components/StatusData';
import WorkExperience from './components/WorkExperience';

export default function Page() {
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

  const renderTabContent = (item) => {
    switch (item.id) {
      case "personalData":
        return <PersonalData />;
      case "contactData":
        return <ContactData />;
      case "employmentStatus":
        return <StatusData />;
      case "workExperience":
        return <WorkExperience />;
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
        {/*<CardU/>*/}
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
