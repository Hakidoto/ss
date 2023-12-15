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
  Switch,
  DropdownSection,
} from "@nextui-org/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { SunIcon } from "./icons/SunIcon";
import { MoonIcon } from "./icons/MoonIcon";
import style from "./styles/navbar.module.css";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { LuComputer } from "react-icons/lu";
export default function NavbarTRC() {
  const [imagePath, setImagePath] = useState(
    "https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [userData, setUserData] = useState({});
  const router = useRouter();
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();

  const pathname = usePathname();
  const menuItems = [
    { nombre: "Inicio", link: "/" },
    { nombre: "Cuestionarios", link: "/cuestionario" },
    { nombre: "Administracion", link: "/admi/panelusuarios" },
  ];

  useEffect(() => {
    if (session && session.user) {
      fetchData();
    }
  }, [session]);

  async function fetchData() {
    try {
      const UsuarioId = session.user.id; // Reemplaza con el ID del usuario que deseas obtener
      const response = await fetch(`/api/usuario/${UsuarioId}`);

      if (response.ok) {
        const user = await response.json();
        setUserData(user);
        //console.log(user)
      } else {
        console.error("Error al obtener datos de la API");
      }
    } catch (error) {
      console.error("Error al conectarse a la API", error);
    }
  }

  const signout = () =>
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/login`,
    });

  //const imagePath = session && userData.img ?  require(`../resources/${session.user.id}/profilePick/${userData.img}`) : "https://avatars.githubusercontent.com/u/86160567?s=200&v=4"

  useEffect(() => {
    const loadImage = async () => {
      try {
        if (session && userData && userData.img) {
          // Utiliza import() para cargar la imagen de forma asíncrona
          const dynamicImage = await import(
            `../resources/${session.user.id}/profilePick/${userData.img}`
          );
          setImagePath(dynamicImage.default);
        }
      } catch (error) {
        // Manejar el error, por ejemplo, imprimir un mensaje en la consola
        console.error(`Error cargando la imagen: ${error.message}`);
      }
    };

    loadImage();
  }, [session, userData]);

  return (
    <Navbar
      id="navbar"
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
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="mr-4">
          <p className="font-bold text-inherit">TRC</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((item, index) => {
            const pathParts = pathname.split("/");
            const pathLink = "/" + pathParts[1];
            const isActive =
              pathLink === item.link || (item.link === "/" && pathname === "/");
            return (
              <NavbarItem
                as={NextLink}
                href={item.link}
                key={`${item}-${index}`}
                isActive={isActive}
                className={
                  isActive
                    ? "text-danger mx-2"
                    : `text-foreground ${style.hov} mx-2 `
                } // Ajusta las clases según el estado activo
              >
                <span>{item.nombre}</span>
              </NavbarItem>
            );
          })}
        </NavbarContent>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => {
          const pathParts = pathname.split("/");
          const pathLink = "/" + pathParts[1];
          const isActive =
            pathLink === item.link || (item.link === "/" && pathname === "/");
          return (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  isActive
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href={item.link}
                size="lg"
              >
                {item.nombre}
              </Link>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>

      <NavbarContent as="div" className="items-center" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <div className={style.avatarContainer}>
              <Image
                className={style.imgUsr}
                src={imagePath}
                alt="Avatar"
                width={50}
                height={50}
              />
            </div>
          </DropdownTrigger>
          <DropdownMenu
            closeOnSelect={false}
            aria-label="Profile Actions"
            variant="flat"
          >
            <DropdownItem key="profile" className="h-14 gap-2">
              {session ? ( // Check if a session exists
                <>
                  <p className="font-semibold">
                    Sesion de {session.user.username}{" "}
                  </p>
                  <p className="font-semibold">{session.user.email}</p>
                </>
              ) : (
                <>
                  <p className="font-semibold">Sesion de </p>
                  <p className="font-semibold">prueba@prisma.com</p>
                </>
              )}
            </DropdownItem>
            <DropdownSection showDivider title="Perfil">
              <DropdownItem
                key="user_profile"
                as={NextLink}
                color="secondary"
                href="/usuario"
              >
                Datos personales
              </DropdownItem>
              <DropdownItem
                key="user_certifications"
                as={NextLink}
                color="secondary"
                href="/usuario/certificados"
              >
                Formacion y educacion continua
              </DropdownItem>
              <DropdownItem
                key="user_reports"
                as={NextLink}
                color="secondary"
                href="/usuario/incidencias"
              >
                Incidencias
              </DropdownItem>
              <DropdownItem
                key="user_certifications"
                as={NextLink}
                color="secondary"
                href="#"
              >
                Manuales
              </DropdownItem>
            </DropdownSection>
            <DropdownSection title="Sistema" />
            <DropdownItem
              startContent={
                theme == "dark" ? (
                  <MoonIcon />
                ) : theme == "light" ? (
                  <SunIcon />
                ) : (
                  <LuComputer />
                )
              }
              className="flex items-center"
              key="theme_switch"
            >
              <Dropdown>
                <DropdownTrigger>
                  <span className="w-full" variant="bordered">
                    Cambiar tema
                  </span>
                </DropdownTrigger>
                <DropdownMenu
                  variant="faded"
                  aria-label="Dropdown menu with icons"
                >
                  <DropdownItem
                    key="light"
                    startContent={<SunIcon />}
                    onClick={() => setTheme("light")}
                  >
                    Tema claro
                  </DropdownItem>
                  <DropdownItem
                    key="dark"
                    startContent={<MoonIcon />}
                    onClick={() => setTheme("dark")}
                  >
                    Tema oscuro
                  </DropdownItem>
                  <DropdownItem
                    key="system"
                    onClick={() => setTheme("system")}
                    startContent={<LuComputer />}
                  >
                    Sistema
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </DropdownItem>
            <DropdownItem key="configurations" color="secondary">
              Configuracion
            </DropdownItem>
            <DropdownItem key="help_and_feedback" color="secondary">
              Ayuda & Comentarios
            </DropdownItem>
            <DropdownItem as={Button} onClick={signout} color="danger">
              Cerrar sesion
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
