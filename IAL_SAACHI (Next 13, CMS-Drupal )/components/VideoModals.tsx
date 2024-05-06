import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Head from "next/head";

const styles = {
  closeButton: {
    position: "absolute",
    top: "8px", // Adjust the top value as needed
    right: "8px", // Adjust the right value as needed
  },
};
const VideoModals = (props) => {
  const { open, close, videoLink } = props;
  const startIndex = videoLink.lastIndexOf("/") + 1;
  const slicedVideoId = videoLink.slice(startIndex);
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />
      </Head>
      <React.Fragment>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={close}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              maxWidth: 1200,
            }}
          >
            <div className="w-[75vw] h-[75vh]">
              <iframe
                className="w-[75vw] h-[75vh]"
                src={`https://www.youtube.com/embed/${slicedVideoId}`}
                allow="accelerometer; autoplay; encrypted-media; gyroscope;"
              ></iframe>
            </div>
          </Sheet>
        </Modal>
      </React.Fragment>
    </>
  );
};

export default VideoModals;
