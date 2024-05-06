import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
export function NewsCards(props) {
  const { state } = props;
  type newsFeildType = {
    title;
    field_news_description: { value: string };
    field_news_image: { uri: { url: string } };
    path: { alias: string };
  };
  const {
    title,
    field_news_description: { value: newsDescription },
    field_news_image: {
      uri: { url: newsImageURL },
    },
    path: { alias },
  } = state || {};
  return (
    <>
      <div className="container ">
        <div className="row">
          <div className="px-[1em]">
            <div className="media-item">
              <div className="item-header news-border">
                <h2 className="item-title">{title}</h2>
                <p className="item-cat-name">News</p>
                <div
                  className="item-description"
                  dangerouslySetInnerHTML={{ __html: newsDescription }}
                />
                <div></div>
                <div className="share-btns">
                  <p>Share the love</p>
                  <ul>
                    <li className="px-[4px]">
                      <Link href="#">
                        <FontAwesomeIcon icon={faFacebookF} />
                      </Link>
                    </li>
                    <li className="px-[4px]">
                      <Link href="#">
                        <FontAwesomeIcon icon={faXTwitter} />
                      </Link>
                    </li>
                    <li className="px-[4px]">
                      <Link href="#">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <Link href={`http://localhost:3000/news${alias}`}>
                <div className="thumbnail-img">
                  <img
                    alt={title}
                    src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${newsImageURL}`}
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
