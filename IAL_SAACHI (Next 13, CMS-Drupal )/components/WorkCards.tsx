import Link from "next/link";
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF ,faTwitter} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
export function Work(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { card_data } = props;
  type CardDataType = {
    title:string;
    field_card_description: { value: string };
    field_card_image: { uri: { url: string } };
    field_card_video_link:{uri:string};
    path:{alias:string};
  };
  const {
    title,
    field_card_description: { value: cardDescription },
    field_card_image: { uri: { url: cardImageURL } },
    field_card_video_link:{uri},
    path:{alias},
  } = card_data || {};

  
  return (
    <>
      <div className="container">
          <div className="px-[1em] w-screen sm:w-[100%]">
            <div className="media-item">
              <div className="item-header news-border">
                <h2 className="item-title">
                 {title}
                </h2>
                <p className="item-cat-name">Work</p>               
                <div className="item-description" dangerouslySetInnerHTML={{ __html: cardDescription }} />
                <div className="share-btns">
                  <p>Share the love</p>
                  <ul>
                    <li className="px-[4px]">
                      <Link href='#'>
                      <FontAwesomeIcon icon={faFacebookF} />
                      </Link>
                    </li>
                    <li className="px-[4px]">
                      <Link href='#'>
                      <FontAwesomeIcon icon={faTwitter} />
                      </Link>
                    </li>
                    <li className="px-[4px]">
                      <Link href='#'>
                      <FontAwesomeIcon icon={faEnvelope} />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <Link href={`http://localhost:3000/work${alias}`}>
                <div className="thumbnail-img">
                  <img alt= {title} src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${cardImageURL}`}/>
                </div>
              </Link>
            </div>
          </div>
      </div>
    </>
  );
}
