import React from "react";
import { GetStaticPropsResult } from "next";
import { DrupalNode } from "next-drupal";
import { drupal } from "lib/drupal";
import SubHeader from "components/SubHeader";
import { PostNav } from "components/PostNav";
import { AboutUsNavItems } from "Utils";
import { Col, Row } from "antd";
import Head from "next/head";
interface IndexPageProps {
  contactUsPageCard: DrupalNode[];
}
const contactUs = ({ contactUsPageCard }: IndexPageProps) => {
  const HeadText: string = "Contact Us";
  const {
    title,
    metatag,
    field_content_data: feildContentData,
  } = contactUsPageCard;
  const {
    field_content_description: { value: descriptionValue },
  } = feildContentData;
  
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
      <div className="px-[6em] pb-[6em]">
        <div className="text-xs leading-6 text-[#838383] mb-5" dangerouslySetInnerHTML={{ __html: descriptionValue }} />
        <Row>
          <Col xs={2} sm={4} md={6} lg={8} xl={17}>
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14483.65774065793!2d67.0726758!3d24.8325996!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x43b4e5c47f934da9!2sIAL+Saatchi+%26+Saatchi!5e0!3m2!1sen!2s!4v1547192318955" width="100%" height="600" ></iframe>
          </Col>
      </Row> </div>
    </>
  );
};

export default contactUs;

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  //   const contactUsPageCard = await drupal.getResourceCollectionFromContext<
  //   DrupalNode[]
  // >("node--about_us", context, {
  //   params: {
  //     "fields[node_type--node_type]": "title,",
  //     include:
  //       "field_content_data.field_content_image",
  //     sort: "-created",
  //   },
  // });
  const path = await drupal.translatePath("/contactus");
  const contactUsPageCard = await drupal.getResourceFromContext(path, context, {
    params: {
      "fields[node_type--node_type]": "title,",
      include: "field_content_data.field_content_image",
      sort: "-created",
    },
  });

  return {
    props: {
      contactUsPageCard,
    },
  };
}
