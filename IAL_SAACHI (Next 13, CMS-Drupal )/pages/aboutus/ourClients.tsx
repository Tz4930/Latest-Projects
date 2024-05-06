import React from "react";
import { GetStaticPropsResult } from "next";
import { DrupalNode } from "next-drupal";
import { drupal } from "lib/drupal";
import SubHeader from "components/SubHeader";
import { PostNav } from "components/PostNav";
import { AboutUsNavItems } from "Utils";
import { Col, Row } from "antd";
import Head from "next/head";
import OurClientsCards from "components/OurClientsCards";
interface IndexPageProps {
    ourclientsPageCard:DrupalNode[];
  }

const ourclients = ({ ourclientsPageCard }: IndexPageProps)  => {
    const {
      title,
      metatag,
        field_our_clients: feildContentData
      } = ourclientsPageCard;
  const HeadText: string = "Our Clients";
  return (
    <>
    <Head>
        <title>{title}</title>
        {metatag.map((tag, index) => {
          return <tag.tag key={index} {...tag.attributes} />;
        })}
      </Head>
      <PostNav items={AboutUsNavItems} />
      <SubHeader headTxt={title} />
      <div className="px-[8em] pb-[6em]">
      <Row>{
        feildContentData.map((items,index)=>{
            return(
                <Col key={index} xs={2} sm={4} md={6} lg={6} xl={6}>
                <OurClientsCards clientCards={items}/>
                </Col>
            )
        })
        }
      </Row>
      </div>
    </>
  );
};

export default ourclients;


export async function getStaticProps(
    context
  ): Promise<GetStaticPropsResult<IndexPageProps>> {
  //   const ourclientsPageCard = await drupal.getResourceCollectionFromContext<
  //   DrupalNode[]
  // >("node--about_us", context, {
  //   params: {
  //     "fields[node_type--node_type]": "title,",
  //     include:
  //       "field_our_clients.field_our_clients_image",
  //     sort: "-created",
  //   },
  // });
  // 
  const path = await drupal.translatePath("/ourclients");
  const ourclientsPageCard = await drupal.getResourceFromContext(path, context, {
    params: {
      "fields[node_type--node_type]": "title,",
      include:
        "field_our_clients.field_our_clients_image",
      sort: "-created",
    },
  });
    return {
      props: {
        ourclientsPageCard,
      },
    };
  }