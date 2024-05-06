import Link from "next/link";

import { useRouter } from "next/router";
export function PostNav(props) {
  const router = useRouter();
  const { items } = props;
  const handleItemClick = (link) => {
    router.push(link);
  };

  return (
    <>
      <div className="post-nav about">
        <div className="container">
          <ul>
            {items.map((items, keys) => {
              return <li className="cursor-pointer" key={keys} onClick={() => handleItemClick(items.link)}>{items.name}</li>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
