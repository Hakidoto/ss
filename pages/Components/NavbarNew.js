import { Navbar, Link, Text, Avatar, Dropdown } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function NabarNew() {
  const collapseItems = [
    { title: "Inicio", link: "/" },
    { title: "Perfil", link: "#" },
    { title: "Cuestionarios", link: "/Cuestionarios" },
  ];

  const { asPath } = useRouter();

  return (
    <Navbar
      isBordered
      variant="floating"
    >
      <Navbar.Toggle showIn="xs" />
      <Navbar.Brand
        css={{
          "@xs": {
            w: "12%",
          },
        }}
      >
        <img
          src="trc.png"
          alt="LogoTRC"
          width="60"
          height="48"
          className="LogoTRC d-inline-block align-text-top"
        ></img>
        <Text b color="inherit" hideIn="xs">
          Televisión y Radio Campeche
        </Text>
      </Navbar.Brand>
      <Navbar.Content
        enableCursorHighlight
        activeColor="error"
        hideIn="xs"
        variant="highlight"
      >
        {collapseItems.map((item, index) => (
          <Navbar.Link
            isActive={asPath === item.link}
            key={index}
            href={item.link}
          >
            {collapseItems[index].title}
          </Navbar.Link>
        ))}
      </Navbar.Content>
      <Navbar.Content
        css={{
          "@xs": {
            w: "12%",
            jc: "flex-end",
          },
        }}
      >
        <Dropdown placement="bottom-right">
          <Navbar.Item>
            <Dropdown.Trigger>
              <Avatar
                bordered
                as="button"
                color="error"
                size="md"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </Dropdown.Trigger>
          </Navbar.Item>
          <Dropdown.Menu
            aria-label="User menu actions"
            color="error"
            onAction={(actionKey) => console.log({ actionKey })}
          >
            <Dropdown.Item key="profile" css={{ height: "$18" }}>
              <Text b color="inherit" css={{ d: "flex" }}>
                Signed in as
              </Text>
              <Text b color="inherit" css={{ d: "flex" }}>
                zoey@example.com
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="settings" withDivider>
              Ajustes
            </Dropdown.Item>
            <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
            <Dropdown.Item key="analytics" withDivider>
              Analytics
            </Dropdown.Item>
            <Dropdown.Item key="system">System</Dropdown.Item>
            <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
            <Dropdown.Item key="help_and_feedback" withDivider>
              Help & Feedback
            </Dropdown.Item>
            <Dropdown.Item key="logout" withDivider color="error">
              Cerrar sesion
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>
      <Navbar.Collapse>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem
            key={index}
            activeColor="error"
            css={{
              color: index === collapseItems.length - 1 ? "$error" : "",
            }}
            isActive={index === 2}
          >
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="#"
            >
              {item.title}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}
