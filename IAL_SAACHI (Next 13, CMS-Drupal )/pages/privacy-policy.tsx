import React from "react";
import { Col, Row } from "antd";
import { DrupalNode } from "next-drupal";
import { GetStaticPropsResult } from "next";
import { drupal } from "lib/drupal";
import Head from "next/head";

interface IndexPageProps {
  privatePolicyNode: DrupalNode[];
}

const Privacypolicy = ({
  privatePolicyNode,
}: IndexPageProps) => {
  const { title, field_body, metatag } = privatePolicyNode;
  const description: string = field_body?.value ?? "Dummydescription";
  return (
    <>
    <Head>
        <title>{title}</title>
        {metatag.map((tag, index) => {
          return <tag.tag key={index} {...tag.attributes} />;
        })}
      </Head>
      <div className="bg-[#f3f3f3]">
        <div className="px-[6em] py-[3em]">
          <Row>
            <Col xs={2} sm={4} md={6} lg={22} xl={22}>
              <div className="post-header">
                <h1 className="text-[#1c1c1c] text-2xl font-normal">{title}</h1>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={2} sm={4} md={6} lg={22} xl={22}>
              <div
                className="text-xs leading-6 text-[#838383] mb-5"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Privacypolicy;

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  const path = await drupal.translatePath("/privatepolicy");
  const privatePolicyNode = await drupal.getResourceFromContext(path, context, {
    params: {
      "fields[node_type--node_type]": "title,",
      sort: "-created",
    },
  });
  return {
    props: {
      privatePolicyNode,
    },
  };
}
