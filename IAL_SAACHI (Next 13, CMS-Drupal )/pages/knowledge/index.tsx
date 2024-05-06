import React from "react";
import { PostNav } from "components/PostNav";
import { DrupalNode } from "next-drupal";
import { GetStaticPropsResult } from "next";
import { Col, Row } from "antd";
import { MediaCards } from "components/MediaCard";
import Head from "next/head";
import { drupal } from "lib/drupal";
interface IndexPageProps {
  knowledgePageNode: DrupalNode[];
}
const Knowledge = ({ knowledgePageNode }: IndexPageProps) => {
  const { metatag } = knowledgePageNode[0];
  const title: string = knowledgePageNode[0]?.field_title?.value ?? "DummyText";
  const description: string =
    knowledgePageNode[0]?.field_description?.value ?? "Dummydescription";
  const mediaCards = knowledgePageNode[0].field_mediacards || []; 
  const extractedFields = mediaCards.map((mediaCard) => {
    return {
      displayImage: mediaCard.field_display_image?.uri?.url || "",
    };
  });
  const NavItems: string[] = ["Knowledge"];
  return (
    <>
   <Head>
        <title>Knowledge Page</title>
        {metatag.map((tag, index) => {
          return <tag.tag key={index} {...tag.attributes} />;
        })}
      </Head>
      
      <PostNav items={NavItems} />
      <div className="px-[6em] py-[4em]">
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        <div dangerouslySetInnerHTML={{ __html: description }} />
        <div className="pt-[6em]">
          <Row>
            {mediaCards.map((element, index) => {
              return (
                <Col key={index} xs={2} sm={4} md={6} lg={8} xl={8}>
                  <div className="px-[1em]">
                    <MediaCards state={mediaCards} index={index} />
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </>
  );
};

export default Knowledge;

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  const knowledgePageNode = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--knowledge_page", context, {
    params: {
      include:
        "field_mediacards.field_display_image,field_mediacards.field_media_file",
      sort: "-created",
    },
  });
  return {
    props: {
      knowledgePageNode,
    },
  };
}
