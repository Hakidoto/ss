import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import style from "./style/CardU.module.css";
import { Button, Skeleton } from '@nextui-org/react';



export default function CardU({user}) {
  const { data: session, status } = useSession();
  const [usrData, setUsrData] = useState({});

  useEffect(() => {
    if (session && session.user) {
      setUsrData(user)
    }
  }, [session]);
  
  return (
    <Card className={`${style.cardF}`}>
      <CardHeader className="flex gap-3 justify-end">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col w-full">
          <p className="text-right min-w-full ">{session ? session.user.username : <Skeleton className='rounded-lg'>.</Skeleton>}</p>
          <p className="text-small text-default-500 min-w-full text-right">{session ? session.user.email : <Skeleton className='rounded-lg'>.</Skeleton>}</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody className=" text-center">
        <div className=" container">
          
        </div>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Button color="success" className="">
          Cambiar nombre de usuario o contraseña
        </Button>
      </CardFooter>
    </Card>
  );
}
