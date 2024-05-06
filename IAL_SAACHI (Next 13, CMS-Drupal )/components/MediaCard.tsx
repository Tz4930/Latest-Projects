import Link from "next/link";

export function MediaCards(props) {
  const { state, index } = props;
  const title: string = state[index]?.field_title?.value || "";
  const imageUrl: string = state?.[index]?.field_display_image?.uri?.url || "";
  const mediaUrl: string = state?.[index]?.field_media_file?.uri?.url || "";
  // Date format
  const dateString = state[index].field_date;
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return (
    <>
      <div className="knowledge_section">
        <div className="media-item">
          <div className="item-header-media item-header work-border">
            <h2 className="item-title">
              <Link href="/">{title}</Link>
            </h2>
            <p className="item-cat-name">
              {day}
              <sup>th </sup>
              {month} {year}
            </p>
          </div>
          <Link href={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${mediaUrl}`}>
            <div className="thumbnail-img">
              <img
                src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${imageUrl}`}
                alt={title}
                className="img-fluid"
              />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
