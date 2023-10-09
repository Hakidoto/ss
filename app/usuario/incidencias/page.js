"use client";

import React from 'react'
import { Table, Card, CardHeader, CardBody, Tabs, Tab } from '@nextui-org/react'
//import style from "../styles/FichaUsuario.module.css"
import style from "../components/style/CardU.module.css"
import Faltas from './components/Faltas';
import Incapacidades from './components/Incapacidades';
import Procesos from './components/Procesos';

export default function Page() {
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

  const renderTabContent = (item) => {
    switch (item.id) {
      case "faltas":
        return <Faltas/> ;
      case "incapacidades":
          return <Incapacidades/> ;
      case "procAdministrativos":
        return <Procesos/> ;
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
