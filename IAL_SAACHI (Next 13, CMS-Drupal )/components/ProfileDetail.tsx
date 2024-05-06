import React from "react";
import { Col, Row } from "antd";

const ProfileDetail = (props) => {
    const{profiledata,id}=props;
    const profileDescription = props.profiledata[id]?.field_profile_description?.value || "";
  return (
    <>
      <Row className="py-[4em]">
        <Col xs={2} sm={4} md={6} lg={19} xl={19} className="px-[1em]">
          <Row>
            <div className="single-person-detail">
              <div className="person-title text-[18px] text-[#646464] py-[0.7em]">
                <span className="">
                 {props.profiledata[id].field_profile_name.value} - <span>
                    {props.profiledata[id].field_profile_designation.value}
                    </span>{" "}
                </span>
              </div>
            </div>
          </Row>
          <Row>
          <div className="single-person-detail">
              <div className="person-title text-[13px] leading-[21px] text-[#838383]">
              <div dangerouslySetInnerHTML={{ __html: profileDescription }} />
              </div>
            </div>
          </Row>
        </Col>
        <Col xs={2} sm={4} md={6} lg={5} xl={5}>
        <img
        alt={props.profiledata[id].field_profile_name.value}
                  src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${props.profiledata[id].field_profile_image.uri.url}`}
                  className="img-responsive center-block"
                />
        </Col>
      </Row>
    </>
  );
};

export default ProfileDetail;
