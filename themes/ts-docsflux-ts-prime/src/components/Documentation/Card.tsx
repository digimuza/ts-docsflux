import { Card, Tag, Typography } from "antd";
import React, { Fragment } from "react";
import * as P from "ts-prime";
import { tagColor } from "./SideBar";
import { beautify } from "../../_core/utils";
import "./Card.css";
import { Markdown } from "./Markdown";
import { DocsManipulation } from "../../helpers";

export const DocumentationCard = (props: {
  docMember: DocsManipulation.DocumentationMembers[number];
}) => {
  return (
    <Card
      id={`link-${props.docMember.name}`}
      key={`link-${props.docMember.name}`}
      title={
        <Typography.Title level={4}>{props.docMember.name}</Typography.Title>
      }
      style={{ width: "100%" }}
      extra={props.docMember.tags
        .map((q) => (q.value === "Pipe" ? "P" : q.value))
        .map((q) => (
          <Tag key={q} color={tagColor(q)}>
            {q}
          </Tag>
        ))}
    >
      <Markdown
        markdown={props.docMember.members[0].comment.description}
      ></Markdown>
      <div style={{ height: 10 }}></div>
      {props.docMember.members[0].comment.parsed
        .filter((q) => q.tag === "@warning")
        .map((q) => {
          if (Array.isArray(q.content)) {
            return (
              <div key={q.tag} className={"warning"}>
                <div className={"dot"}>WARNING</div>
                <div className={"warning-text"}>
                  <Markdown markdown={q.content.join("\n")}></Markdown>
                </div>
              </div>
            );
          }

          return null;
        })}
      <div style={{ height: 10 }}></div>
      {props.docMember.members[0].comment.parsed
        .filter((q) => q.tag === "@description")
        .map((q) => {
          if (Array.isArray(q.content)) {
            return (
              <Markdown key={q.tag} markdown={q.content.join("\n")}></Markdown>
            );
          }

          return null;
        })}
      <div style={{ height: 10 }}></div>
      <div>
        <div>
          {P.take(props.docMember.members, 1).flatMap((q) => {
            const example = q.comment.examples;
            return example?.map((e) => {
              if (example == null) return null;

              const bExample = beautify(e);

              return (
                <Fragment>
                  <div key={q.canonicalReference}>
                    <Markdown
                      markdown={`
  \`\`\`typescript
  ${beautify(bExample)}
  \`\`\`
  `}
                    ></Markdown>
                  </div>
                  <div style={{ height: 10 }}></div>
                </Fragment> 
              );
            });
          })}
        </div>
      </div>
      <div style={{ height: 10 }}></div>
    </Card>
  );
};
