import Head from "next/head";
import { GetStaticPropsResult } from "next";
import { DrupalNode } from "next-drupal";
import { drupal } from "lib/drupal";
import { CarouselSlider } from "../../components/Carousel";
import { Work } from "../../components/WorkCards";
import { Col, Row } from "antd";

interface IndexPageProps {
  workPageNode: DrupalNode[];
  workPageCard: DrupalNode[];
}
export default function WorkPage({
  workPageNode,
  workPageCard,
}: IndexPageProps) {
  const { field_carousel } = workPageNode;
  return (
    <>
      <Head>
          <title> WorkPage</title>
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
      <div>
        <CarouselSlider carouselData={field_carousel} pageTitle="Workpage" />
        <br />
        <br />
        <div className="md:px-[6em] md:pt-[2em] xs:px-[0.25em] xs:py-[0.5em]">
          <Row>
            {workPageCard.map((element, index) => {
              return (
                <Col key={index} xs={24} sm={24} md={24} lg={8} xl={8}>
                  <Work card_data={element} index={index} />
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
  const path = await drupal.translatePath("/work");
  const workPageNode = await drupal.getResourceFromContext(path, context, {
    params: {
      // "filter[status]": 1,
      "fields[node_type--node_type]": "title,",
      include: "field_carousel.field_slider_image",
      sort: "-created",
    },
  });

  // Fetching complete Work Cards
  const workPageCard = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--work_page", context, {
    params: {
      // "filter[status]": 1,
      "fields[node_type--node_type]": "title,",
      include: "field_card_image,field_card_banner_image",
      sort: "created",
    },
  });

  return {
    props: {
      workPageCard,
      workPageNode,
    },
  };
}
