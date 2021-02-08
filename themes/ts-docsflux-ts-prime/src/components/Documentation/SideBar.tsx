import { Empty, Menu, Tag } from "antd";
import React, { Fragment, useMemo } from "react";
import * as P from "ts-prime";
import { observer } from "mobx-react";
import { scrollToHash, SearchState } from ".";
import { useHistory } from "react-router-dom";
import { DocsManipulation } from "../../helpers";

const colors = [
  "#fa8c16",
  "#1890ff",
  "#006d75",
  "#08979c",
  "#7cb305",
  "#13c2c2",
  "#0050b3",
  "#003a8c",
  "#9e1068",
];

let availableColors = [...colors]

const colorMap = new Map<string, string>();

export function tagColor(tag: string): string {
  const color = colorMap.get(tag);
  if (color != null) return color

  const selected = availableColors.shift()
  if (selected == null) {
    availableColors = [...colors]
    return tagColor(tag)
  }

  colorMap.set(tag, selected)
  return selected
}
export const SideBar = observer(
  (props: { groupedMembers: DocsManipulation.GroupedDocumentationMembers }) => {
    const history = useHistory();
    const { groupedMembers } = props;
    const items = useMemo(() => {
      return groupedMembers.flatMap((q) => {
        return P.sortBy(q.members, (q) => q.name)
          .filter((q) => q.kind === "Function")
          .filter((q) => q.name.includes(SearchState.search))
          .map((q) => {
            return (
              <Menu.Item key={q.canonicalReferenceGroup}>
                {/* <a href={`#link-${q.name}`} key={q.canonicalReference}></a> */}
                <div
                  onClick={() => {
                    history.replace(`/documentation/${q.name}`);
                    scrollToHash(`#link-${q.name}`);
                  }}
                  key={q.canonicalReference}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <strong>{q.name}</strong>
                  </div>
                  <div>
                    {q.tags
                      .map((q) => (q.value === "Pipe" ? "P" : q.value))
                      .map((cat) => {
                        return (
                          <Tag key={cat} color={tagColor(cat)}>
                            {cat}
                          </Tag>
                        );
                      })}
                  </div>
                </div>
              </Menu.Item>
            );
          });
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SearchState.search]);
    return (
      <div
        className={"side-bar-content"}
        style={{
          height: "calc(100vh - 64px - 72px - 96px)",
          overflow: "hidden",
          overflowY: "auto",
        }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "90%", borderRight: 0 }}
        >
          {items}
          {items.length === 0 && (
            <Fragment>
              <div style={{ height: 30 }}></div>
              <Empty />
            </Fragment>
          )}
          <div style={{ height: 100 }}></div>
        </Menu>
      </div>
    );
  }
);
