import Head from "next/head";
import { GetStaticPropsResult } from "next";
import { DrupalNode } from "next-drupal";
import { drupal } from "lib/drupal";
import { CarouselSlider } from "components/Carousel";
import { Work } from "components/WorkCards";
import { Col, Row } from "antd";

interface IndexPageProps {
  homePageNode: DrupalNode[];
  workPageCard: DrupalNode[];
}
export default function IndexPage({ homePageNode,workPageCard }: IndexPageProps) {
  const{field_carousel}= homePageNode;
  return (
    <>
      <Head>
        <title> Ial- Saachi</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>
      <div>
        <CarouselSlider carouselData={field_carousel} />
        <br /><br />
        <div className="md:px-[6em] md:pt-[2em] xs:px-[0.25em] xs:py-[0.5em]">
          <Row>
            {workPageCard.map((element, index) => {
              return (
                <Col key={index} xs={24} sm={24} md={24} lg={8} xl={8}>
                  <Work card_data={element}/>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  const path = await drupal.translatePath("/home")
  const homePageNode = await drupal.getResourceFromContext(path, context, {
    params: {
      // "filter[status]": 1,
      "fields[node_type--node_type]": "title,",
      include: "field_carousel.field_slider_image",
      sort: "-created",
    },
  });

  const workPageCard = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--work_page", context, {
    params: {
      // "filter[status]": 1,
      "fields[node_type--node_type]": "title,",
      include: "field_card_image,field_card_banner_image",
      sort: "-created",
    },
  });
  return {
    props: {
      homePageNode,
      workPageCard,
    },
  };
}
