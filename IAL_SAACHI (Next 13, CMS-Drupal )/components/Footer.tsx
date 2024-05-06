import Link from "next/link";
import Image from "next/image";
import { Col, Row } from "antd";
import { useRouter } from "next/router";
export function Footer() {
  const router = useRouter();

  const handleNavigate = (url) => () => {
    router.push(url);
  };

  return (
    <>
      <div className="sm:mx-[3em]  footer-nav ">
        <Row className="text-center sm:py-0 pt-[5em]">
          <Col xs={24} sm={24} md={6} lg={8} xl={17}className="cursor-pointer flex justify-center sm:justify-start sm:py-0 py-[0.8em] " >
            <Image
              src="/logo_large.png"
              width={205}
              height={5}
              alt="Logo of IAL-Sachi"
            />
          </Col>
          <Col xs={24} sm={24} md={6} lg={8} xl={2} className="cursor-pointer flex justify-center sm:py-0 py-[0.25em] text-[12px] sm:text-[14px] ">
            <Link href="/aboutus/contactUs" onClick={handleNavigate("/aboutus/contactUs")}>
              Contact Us
            </Link>
          </Col>
          <Col xs={24} sm={24} md={6} lg={8} xl={3} className=" cursor-pointer flex justify-center sm:py-0 py-[0.25em] text-[12px] sm:text-[14px] ">
            <Link
              href="/Terms-Conditions"
              onClick={handleNavigate("/Terms-Conditions")}
            >
              Terms & Conditions
            </Link>
          </Col>
          <Col xs={24} sm={24} md={6} lg={8} xl={2} className=" cursor-pointer flex justify-center sm:py-0 py-[0.25em] text-[12px] sm:text-[14px] ">
            <Link
              href="/privacy-policy"
              onClick={handleNavigate("/privacy-policy")}
            >
              Privacy Policy
            </Link>
          </Col>
        </Row>
      </div>
    </>
  );
}
