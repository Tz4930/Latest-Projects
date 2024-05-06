import React from "react";
import { GetStaticPropsResult } from "next";
import { DrupalNode } from "next-drupal";
import { drupal } from "lib/drupal";
import { PostNav } from "components/PostNav";
import SubHeader from "components/SubHeader";
import { AboutUsNavItems } from "Utils";
import Head from "next/head";
interface IndexPageProps {
  aboutUsPageCard: DrupalNode[];
}

const Aboutus = ({ aboutUsPageCard }: IndexPageProps) => {
  const {
    title,
    metatag,
      field_content_data: [
          {
        field_content_description: { value: descriptionValue },
        field_content_image: [
          {
            uri: { url: imageUrl },
          },
        ],
      },
    ],
  } = aboutUsPageCard;
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
      <div className="px-[6em] pb-[2em]">
        <img alt={title} src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${imageUrl}`} />
        <br />
        <div className="text-xs leading-6 text-[#838383] mb-5" dangerouslySetInnerHTML={{ __html: descriptionValue }} />
      </div>
    </>
  );
};
export default Aboutus;

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  const path = await drupal.translatePath("/aboutus");
  const aboutUsPageCard = await drupal.getResourceFromContext(path, context, {
    params: {
      "fields[node_type--node_type]": "title,",
      include: "field_content_data.field_content_image",
      sort: "-created",
    },
  });

  return {
    props: {
      aboutUsPageCard,
    },
  };
}
