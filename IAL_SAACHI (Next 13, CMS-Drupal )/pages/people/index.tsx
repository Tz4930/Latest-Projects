import { PostNav } from "components/PostNav";
import React, { useState } from "react";
import Link from "next/link";
import { GetStaticPropsResult } from "next";
import { DrupalNode } from "next-drupal";
import { drupal } from "lib/drupal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "antd";
import TeamProfile from "components/TeamProfile";
import ProfileDetail from "components/ProfileDetail";
import Head from "next/head";
interface IndexPageProps {
  leaderPageNode: DrupalNode[];
}
export default function People({ leaderPageNode }: IndexPageProps) {
  const [profile, setProfile] = useState(0);
  const { field_team_profile: profiledata } = leaderPageNode[0] || {};
  const NavItems: string[] = ["LEADERSHIP TEAM"];
  const{metatag, title} = leaderPageNode[0];

  const handleClick = event => {
    setProfile(event);
  };
  return (
    <>
     <Head>
        <title>{title}</title>
        {metatag.map((tag, index) => {

          return <tag.tag key={index} {...tag.attributes} />;
        })}
      </Head>
      <PostNav items={NavItems} />
      <div className="px-[6em] py-[2em]">
        <Row>
          <Col xs={2} sm={4} md={6} lg={22} xl={22}>
            <div className="post-header">
              <h1>LEADERSHIP TEAM</h1>
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
        <Row>
          {profiledata.map((element, index) => {
            return (
              <Col key={index} xs={2} sm={4} md={6} lg={4} xl={4}>
                <div className="p-[1em] " onClick={() => handleClick(index )}>
                  <TeamProfile profileData={element} />
                </div>
              </Col>
            );
          })}
        </Row>
        <div>
          <ProfileDetail id={profile} profiledata={profiledata} />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  const leaderPageNode = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--people_page", context, {
    params: {
      // "filter[status]": 1,
      "fields[node_type--node_type]": "title,",
      include:
        "field_team_profile.field_profile_image",
      sort: "-created",
    },
  });

  return {
    props: {
      leaderPageNode,
    },
  };
}
