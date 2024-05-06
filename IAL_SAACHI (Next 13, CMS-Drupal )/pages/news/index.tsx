import React from "react";
import { NewsCards } from "../../components/NewsCards";
import { Col, Row } from "antd";
import { DrupalNode } from "next-drupal";
import { GetStaticPropsResult } from "next";
import { drupal } from "lib/drupal";
import Head from "next/head";
interface IndexPageProps {
  newsPageNode: DrupalNode[];
}

const News = ({ newsPageNode }: IndexPageProps) => {
  return (
    <>
      <Head>
          <title> News Page</title>
          <meta
            name="title"
            content="Terms &amp; Conditions | ial-saatchi-saatchi"
          />
          <meta name="description" content="Nothing is impossible." />
          <meta
            name="abstract"
            content="Read our Terms &amp; Conditions to understand the guidelines and agreements governing the use of our services. Your compliance ensures a seamless and secure experience."
          />
          <meta
            name="keywords"
            content="IAL Saatchi &amp; Saatchi, Nothing is impossible"
          />
      </Head>
      <div className="md:px-[6em] md:pt-[2em] xs:px-[0.25em] xs:py-[0.5em]">
           <Row>
          {newsPageNode.map((element, index) => {
            return (
              <Col key={index} xs={24} sm={24} md={24} lg={8} xl={8}>
                 <NewsCards state={element} index={index} />
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
};

export default News;

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  const newsPageNode = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--news_page", context, {
    params: {
      include: "field_news_image",
      sort: "-created",
    },
  });
  return {
    props: {
      newsPageNode,
    },
  };
}
