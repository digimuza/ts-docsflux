import { Card, Layout } from "antd";
import React, { PropsWithChildren } from "react";
import { Switch } from "antd";
import {
  HashRouter as Router,
  Route,
  useHistory,
  Link,
} from "react-router-dom";
import * as P from "ts-prime";
import { Markdown } from "../Documentation/Markdown";
import { observer } from "mobx-react";
import { useBasePath } from "../..";
import { layout } from "../../_core/state";
import { State } from "../../_core";
const { Header, Content, Sider } = Layout;

export const paths = {
  home: { key: 1, exact: true, path: "/home", title: "Home" },
  documentation: {
    key: 2,
    path: "/documentation",
    title: "Documentation",
  },
  documentationPage: {
    key: 2,
    path: "/documentation/:fn",
    title: "Documentation",
  },
};

const LayoutHeader = observer(() => {
  const basePath = useBasePath();
  return (
    <Header className="header">
      <Link to={"/home"}>
        <div className={"logo"}>
          <img
            alt={"logo"}
            style={{
              width: 100,
              height: "auto",
            }}
            src={`${basePath}/logo.svg`}
          ></img>
        </div>
      </Link>
      <div className={"flex"}></div>
      <div style={{ paddingRight: 20 }}>
        <Switch
          onChange={() => {
            State.theme.theme = State.theme.theme === "dark" ? "light" : "dark";
            return;
          }}
          checked={State.theme.theme === "light"}
          checkedChildren={"Dark"}
          unCheckedChildren={"Light"}
        ></Switch>
      </div>
      {State.theme.theme === "dark" ? (
        <div>
          <a href={"https://github.com/digimuza/iterparse"}>
            <img
              alt={"Github"}
              style={{
                width: "auto",
                height: "30px",
              }}
              src={`${basePath}/github.white.svg`}
            ></img>
          </a>
        </div>
      ) : (
        <div>
          <a href={"https://github.com/digimuza/iterparse"}>
            <img
              alt={"Github"}
              style={{
                width: "auto",
                height: "30px",
              }}
              src={`${basePath}/github.svg`}
            ></img>
          </a>
        </div>
      )}
    </Header>
  );
});

export const Container = (
  props: PropsWithChildren<{ className?: string; id?: string }>
) => {
  return (
    <Layout
      id={props.id}
      className={`${props.className ?? ""}`}
      style={{ padding: "0 24px 24px" }}
    >
      <Content
        className={`content`}
        style={{
          padding: 24,
          margin: 0,
          minWidth: 380,
          minHeight: 280,
        }}
      >
        {props.children}
      </Content>
    </Layout>
  );
};
export const View = (props: PropsWithChildren<{ className?: string }>) => {
  return (
    <Layout
      className={`${props.className ?? ""} view`}
      style={{
        height: "calc(100vh - 64px)",
        overflow: "hidden",
        overflowY: "auto",
      }}
    >
      {props.children}
    </Layout>
  );
};

export const Page404 = () => {
  const history = useHistory();
  if (history.location.pathname.includes("/documentation")) return null;
  const path = Object.values(paths).find(
    (q) => history.location.pathname === q.path
  );
  if (path != null) return null;
  history.replace(paths.home.path);
  return null;
};

export const Sidebar = observer((props: { sideMenu: JSX.Element }) => {
  return (
    <Sider
      width={layout.size({
        mobile: "80%",
        desktop: 400,
        tablet: 300,
      })}
      collapsible
      breakpoint={"lg"}
      collapsedWidth={0}
      
      defaultCollapsed={layout.size({
        mobile: true,
        desktop: false,
        tablet: false,
      })}
      className="site-layout-background"
    >
      {props.sideMenu}
    </Sider>
  );
});

export const PrimaryLayout = observer(
  (
    props: PropsWithChildren<{
      sideMenu: JSX.Element;
      readme: string;
    }>
  ) => {
    const theme = P.isOneOf(State.theme.theme, ["dark", "light"])
      ? State.theme.theme
      : "dark";
    return (
      <Router>
        <Layout className={`ts-prime-${theme}`}>
          <LayoutHeader></LayoutHeader>
          <Route {...paths.home}>
            <View>
              <Sidebar sideMenu={props.sideMenu}></Sidebar>
              <Container>
                <Card>
                  <Markdown markdown={props.readme} narrow={true}></Markdown>
                </Card>
              </Container>
            </View>
          </Route>
          <Route {...paths.documentation}>
            <View>
              <Sidebar sideMenu={props.sideMenu}></Sidebar>
              <Container id={"main-view"}>{props.children}</Container>
            </View>
          </Route>
          <Page404></Page404>
        </Layout>
      </Router>
    );
  }
);
