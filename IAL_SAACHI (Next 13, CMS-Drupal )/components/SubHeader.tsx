import React from 'react'
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "antd";

const SubHeader = (props) => {
  return (
    <div>
         <div className="px-[6em] py-[2em]">
         <Row>
          <Col xs={2} sm={4} md={6} lg={22} xl={22}>
            <div className="post-header">
              <h1>{props.headTxt}</h1>
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
  )
}

export default SubHeader