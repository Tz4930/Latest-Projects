import React from "react";
import Link from "next/link";
import { NewsCards } from "../../components/NewsCards";
import { Col, Row } from "antd";
import { GetStaticPathsResult, GetStaticPropsResult } from "next";
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal";
import { drupal } from "lib/drupal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPlay } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
interface IndexPageProps {
  newsPageNode: DrupalNode[];
  newCardNode: DrupalNode[];
}

const News = ({ newsPageNode, newCardNode }: IndexPageProps) => {
  const{metatag} = newCardNode;
  type newsFeildType = {
    title;
    field_news_date;
    field_news_description: { value: string };
  };
  const {
    title,
    field_news_date,
    field_news_description: { value: newsDescription },
  } = newCardNode || {};
  const dateString = field_news_date;
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" }).slice(0, 3);
  const year = date.getFullYear();
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
              <div className="post-header ">
                <h1 className="w-9/12">{title}</h1>
                <p className="text-neutral-300 text-base mt-2 m-0">
                  {day} {month} {year}
                </p>
              </div>
              <div className="post-body">
                <div
                  className="w-9/12"
                  dangerouslySetInnerHTML={{ __html: newsDescription }}
                />
              </div>
            </Col>
            <Col xs={2} sm={4} md={6} lg={2} xl={2}>
              <div className="share-btns">
                <ul>
                  <li className="px-[4px]">
                    <Link href="#">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </Link>
                  </li>
                  <li className="px-[4px]">
                    <Link href="#">
                      <FontAwesomeIcon icon={faTwitter} />
                    </Link>
                  </li>
                  <li className="px-[4px]">
                    <Link href="#">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="px-[6em] py-[3em]">
        <Row>
          {newsPageNode.map((element, index) => {
            return (
              <Col key={index} xs={2} sm={4} md={6} lg={8} xl={8}>
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

export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
  return {
    paths: await drupal.getStaticPathsFromContext("node--news_page", context),
    fallback: "blocking",
  };
}
export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  const path = await drupal.translatePathFromContext(context);
  const newCardNode = await drupal.getResourceFromContext(path, context, {
    params: {
      // "filter[status]": 1,
      "fields[node_type--node_type]": "title,",
      sort: "-created",
    },
  });
  // Fetching complete Work Cards
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
      newCardNode,
      newsPageNode,
    },
  };
}
