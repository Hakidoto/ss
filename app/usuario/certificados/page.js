"use client";

import React from 'react'
import { Table, Card, CardHeader, CardBody, Tabs, Tab } from '@nextui-org/react'
import CardU from '../components/CardU'
//import style from "../styles/FichaUsuario.module.css"
import style from "../components/style/CardU.module.css"
import Cursos from './components/Cursos';
import Certificaciones from './components/Certificaciones';
import Lenguas from './components/Lenguas';

export default function Page() {
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

  const renderTabContent = (item) => {
    switch (item.id) {
      case "cursos":
        return <Cursos/>;
      case "certificaciones":
        return <Certificaciones/>;
      case "lenguas":
        return <Lenguas/>;    
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
