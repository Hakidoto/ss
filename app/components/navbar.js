"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Input,
  Dropdown,
  Avatar,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';
import style from "./styles/navbar.module.css"
export default function NavbarTRC() {
  const router = useRouter();
  const pathname = usePathname();
  const menuItems = [
    { nombre: "Inicio", link: "/" },
    { nombre: "Cuestionarios", link: "cuestionario" },
    { nombre: "Manuales", link: "manuales" },
    { nombre: "Administracion", link: "administracion" },
  ];


  return (
    <Navbar
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-danger",
        ],
      }}
      isBordered
    >
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <p className="hidden sm:block font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">
          {menuItems.map((item, index) => {
            const pathParts = pathname.split('/');
            const isActive = pathParts[1] === item.link || (item.link === '/' && pathname === '/');
            return (
              <NavbarItem key={`${item}-${index}`} isActive={isActive} className={style.hov}>
                <button
                  onClick={() => router.push(item.link)} // Utiliza router.push para navegar
                  className={isActive ? 'text-danger mx-2' : `text-foreground ${style.hov} mx-2 `} // Ajusta las clases según el estado activo
                >
                  {item.nombre}
                </button>
              </NavbarItem>
            );
          })}
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Escribe para buscar..."
          size="sm"
          type="search"
        />
        <Dropdown placement="bottom-end" >
          <DropdownTrigger >
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat" >
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Sesion de </p>
              <p className="font-semibold">prueba@prisma.com</p>
            </DropdownItem>
            <DropdownItem key="settings" color="secondary"  onClick={()=>router.push('/usuario')}>
              <Link color="danger" onClick={()=>router.push('/usuario')}>
                Datos personales
              </Link>
            </DropdownItem>
            <DropdownItem key="team_settings" color="secondary" onClick={()=>router.push('/usuario/certificados')}>
              <Link color="danger" onClick={()=>router.push('/usuario/certificados')}>
                Formacion y educacion continua
              </Link>
            </DropdownItem>
            <DropdownItem key="analytics" color="secondary" onClick={()=>router.push('/usuario/incidencias')}>
              <Link color="danger"  onClick={()=>router.push('/usuario/incidencias')}>
                Incidencias
              </Link>
            </DropdownItem>
            <DropdownSection />
            <DropdownItem key="system">Sistema</DropdownItem>
            <DropdownItem key="configurations">Configuracion</DropdownItem>
            <DropdownItem key="help_and_feedback">Ayuda & Comentarios</DropdownItem>
            <DropdownSection />
            <DropdownItem key="logout" color="danger">
              Cerrar sesion
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
