import React, { useState } from "react";
import Link from "next/link";
import { Carousel } from "antd";
import { FaPlay ,FaFacebookF,FaEnvelope  } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Col, Row } from "antd";
import VideoModals from "./VideoModals";


export function CarouselSlider(props) {
  const { carouselData, pageTitle } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const handleOpen = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Carousel
        autoplay
        dots
        autoplaySpeed={3000}
      >
        {carouselData.map((currentElement, index) => {
          const description: string =
            currentElement?.field_slider_description?.value ?? "";
          const videoLink: string =
            currentElement?.field_slider_video_link?.uri ?? "";
          return (
            <React.Fragment key={index}>
              <div className="">
                <div className="slide relative h-[150px] sm:h-[500px] bg-black">
                  <img
                  className="bg-cover w-auto h-[130px] sm:h-full select-none pointer-events-none max-w-full block mx-auto my-0"
                    alt={currentElement.field_slider_title}
                    src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${currentElement.field_slider_image.uri.url}`}
                  />
                  {currentElement.field_slider_title != null ? (
                    <>
                      <div className="caption mx-auto sm:px-[6em] pl-[1.5em]">
                        <div className="container ">
                          <p className="cat-name ">Our Work</p>
                          <Link href="#">
                            <h2 className="caption-name bg-white text-[13px] sm:text-3xl font-normal leading-[normal] inline-block mt-3 sm:pb-[9px] p-[5px] sm:p-5 border-t-4 border-t-[#2295d2] border-solid">
                              {currentElement.field_slider_title.value}
                            </h2>
                          </Link>
                          <div className="clearfix"></div>
                          <div
                            onClick={() => {
                              setIsModalOpen(true);
                              setVideoLink(videoLink);
                            }}
                            className="play-video-btn cursor-pointer text-[white]  uppercase sm:text-[13px] mt-[27px] pr-3 bg-blue sm:h-[46px] sm:w-[11em] w-[10em] flex items-center"
                          >
                            <span>
                              <FaPlay />
                            </span>
                            <span className="">Play Video</span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                {
                  <>
                    {currentElement.field_slider_description != null ? (
                      <>
                        <section className="bg-[#f3f3f3] px-[1em] py-[2em] sm:px-[6em] sm:py-[2em] work">
                          <div className="multiple-posts">
                            <div className="container readmore-cont">
                              <div>
                                <div>
                                  <Row>
                                    <Col
                                      key={index}
                                      xs={24}
                                      sm={24}
                                      md={6}
                                      lg={22}
                                      xl={22}
                                    >
                                      <div className="post-header">
                                        <h1>
                                          {
                                            currentElement.field_slider_title
                                              .value
                                          }
                                        </h1>
                                      </div>
                                    </Col>
                                    <Col
                                      key={index}
                                      xs={24}
                                      sm={24}
                                      md={6}
                                      lg={2}
                                      xl={2}
                                    >
                                      <div className=" flex justify-end " >
                                        
                                          
                                            <Link href="#">
                                            <FaFacebookF  className="mx-[2px] text-white flex justify-center items-center w-5 h-5 p-[3px] text-center rounded-[3px] bg-socialIcons"/>
                                            </Link>
                                
                                            <Link href="#">
                                              <FaXTwitter
                                              className="mx-[2px] text-white flex justify-center items-center w-5 h-5 p-[3px] text-center rounded-[3px] bg-socialIcons"
                                              />
                                            </Link>
                                         
                                            <Link href="#">
                                              <FaEnvelope
                                              className="mx-[2px] text-white flex justify-center items-center w-5 h-5 p-[3px] text-center rounded-[3px] bg-socialIcons"
                                           
                                              />
                                            </Link>
                                        
                                      </div>
                                    </Col>
                                  </Row>
                                  <div className="post-body">
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: description,
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                }
              </div>
            </React.Fragment>
          );
        })}
      </Carousel>
      <VideoModals
        open={isModalOpen}
        close={handleClose}
        videoLink={videoLink}
      />
    </>
  );
}
