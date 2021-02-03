import React, { Fragment, useEffect } from "react";
import { DocumentationMembers, groupMembers } from "../../_core";
import { PrimaryLayout } from "../Layout";
import { Input } from "antd";
import { SideBar } from "./SideBar";
import { DocumentationCard } from "./Card";
import { observer } from "mobx-react";
import { makeAutoObservable } from "mobx";
import * as P from "ts-prime";
import { useHistory } from "react-router-dom";
export const SearchState = makeAutoObservable({
  search: "",
});

export async function scrollToHash(component: string) {
  const main = await P.canFail(async () =>
    P.waitUntilDefined(() => document.getElementById("main-view"), 1000)
  );
  if (P.isError(main)) return;
  const element = await P.canFail(async () =>
    P.waitUntilDefined(() => document.querySelector(component), 3000)
  );
  if (P.isError(element)) return;
  const topPos = element.getBoundingClientRect().top;
  main.scrollTo({
    top: topPos + main.scrollTop - 100, // scroll so that the element is at the top of the view
    behavior: "auto", // smooth scroll
  });
}

export default observer(
  (props: { documentation: DocumentationMembers; readme: string }) => {
    const members = props.documentation.filter((q) => q.kind === "Function");
    const groupedMembers = groupMembers(members);
    useEffect(() => {
      const path = window.location.hash.split("/").splice(-1)[0];
      scrollToHash(`#link-${path}`);
    }, []);

    return (
      <PrimaryLayout
        readme={props.readme}
        sideMenu={
          <Fragment>
            <div style={{ padding: 10 }}>
              <Input
                size={"large"}
                placeholder={"Search"}
                onKeyUp={(q) => (SearchState.search = q.currentTarget.value)}
              ></Input>
            </div>
            <SideBar groupedMembers={groupedMembers}></SideBar>
          </Fragment>
        }
      >
        {groupedMembers.map((q) => (
          <div key={q.group}>
            <div key={q.group}>
              {q.members.map((q) => (
                <Fragment key={q.canonicalReference}>
                  <DocumentationCard
                    key={q.canonicalReference}
                    docMember={q}
                  ></DocumentationCard>
                  <div style={{ height: 10 }}></div>
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </PrimaryLayout>
    );
  }
);
