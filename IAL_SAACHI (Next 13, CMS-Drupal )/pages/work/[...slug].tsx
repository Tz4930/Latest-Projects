import Link from "next/link";
import { Work } from "components/WorkCards";
import { Col, Row } from "antd";
import { GetStaticPathsResult, GetStaticPropsResult } from "next";
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal";
import { drupal } from "lib/drupal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPlay } from "@fortawesome/free-solid-svg-icons";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import React, { useState } from "react";
import VideoModal from "../../components/VideoModals";
import Head from "next/head";

interface IndexPageProps {
  workPageCard: DrupalNode[];
  workCardNode: DrupalNode[];
  node: any;
}
const RESOURCE_TYPES = ["paragraph--work_card"];
const IndividualWorkSection = ({
  workPageCard,
  workCardNode,
}: IndexPageProps) => {
  const{metatag} = workCardNode;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  type CardDataType = {
    title: string;
    field_card_description: { value: string };
    field_card_banner_image: { uri: { url: string } };
    field_card_video_link: { uri: string };
  };
  const {
    title,
    field_card_description: { value: cardDescription },
    field_card_banner_image: {
      uri: { url: cardImageURL },
    },
    field_card_video_link: { uri },
  } = workCardNode || {};

  return (
    <>
    <Head>
        <title>{title}</title>
        {metatag.map((tag, index) => {
          return <tag.tag key={index} {...tag.attributes} />;
        })}
      </Head>
      <div>
        <div className="slide">
          <img
          alt={title}
            src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${cardImageURL}`}
          />
          <div className="caption mx-auto px-[6em]">
            <div className="container">
              <p className="cat-name">Our Work</p>
              <Link href="#">
                <h2 className="caption-name">{title}</h2>
              </Link>
              <div className="clearfix"></div>

              <Link
                href="https://www.youtube.com/watch?v=Cc31hjfZInE"
                className="play-video-btn"
              >
                <span>
                  <FontAwesomeIcon icon={faPlay} />
                </span>

                <span>
                  Play Video
                </span>
              </Link>
            </div>
          </div>
        </div>
        <section className="details-section work">
          <div className="multiple-posts">
            <div className="container readmore-cont">
              <div>
                <div>
                  <Row>
                    <Col xs={2} sm={4} md={6} lg={22} xl={22}>
                      <div className="post-header">
                        <h1>{title}</h1>
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
                  <div className="post-body w-9/12">
                    <div
                      dangerouslySetInnerHTML={{ __html: cardDescription }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="px-[6em] py-[2em]">
        <Row>
          {workPageCard.map((element, index) => {
            return (
              <Col key={index} xs={2} sm={4} md={6} lg={8} xl={8}>
                <Work card_data={element} />
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
};
export default IndividualWorkSection;

export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
  return {
    paths: await drupal.getStaticPathsFromContext("node--work_page", context),
    fallback: false,
  };
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  const path = await drupal.translatePathFromContext(context);
  const workCardNode = await drupal.getResourceFromContext(path, context, {
    params: {
      // "filter[status]": 1,
      "fields[node_type--node_type]": "title,",
      include: "field_card_image,field_card_banner_image",
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
      sort: "-created",
    },
  });
  return {
    props: {
      workCardNode,
      workPageCard,
    },
  };
}
