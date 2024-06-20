import { Modal } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton,LinkedinIcon,LinkedinShareButton,TelegramIcon,TelegramShareButton,TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";

const Share = ({fundraiserDetails }) => {
  const [isShareShow, setIsShareShow] = useState(false);

 

  const showModalShare = () => {
    setIsShareShow(true);
  };

  const handleSharingCancel = () => {
    setIsShareShow(false);
  };

  return (
    <>
    <div className=" flex flex-col w-[340px]md:w-[380px]    "
      
      
    >
      <Link onClick={() => showModalShare()}
      // to={`https://api.whatsapp.com/send?text=Check%20out%20this%20fundraiser!%20http://localhost:5173/fundraiser/${id}`}
      className=" bg-[#2E9732] rounded-full text-center text-white text-[25px] mt-6 mx-10 py-1 font-semibold hover:bg-[#42aa46] "
      >
        Share now
      </Link>

      <Modal
        title="Share the Fundraiser"
        open={isShareShow}
        onCancel={handleSharingCancel}
        footer={null}
        centered
        className="rounded-md shadow-lg"
      >
<div className="flex gap-5">

<FacebookShareButton url={window.location.href} quote="Share this fundraiser" hashtag={fundraiserDetails?.category?.categoryName}>
  <FacebookIcon className="rounded-full" />
</FacebookShareButton>

<TwitterShareButton url={window.location.href} quote="Share this fundraiser" hashtag={fundraiserDetails?.category?.categoryName} >
  <TwitterIcon className="rounded-full" />
</TwitterShareButton>

<WhatsappShareButton url={window.location.href} title= {fundraiserDetails.fundraiserTitle}   >
  <WhatsappIcon className="rounded-full" />
</WhatsappShareButton>

<LinkedinShareButton url={window.location.href} title= {fundraiserDetails.fundraiserTitle} default="scASCascas " summary= "Description of the shared page" >
  <LinkedinIcon className="rounded-full" />
</LinkedinShareButton>

<TelegramShareButton url={window.location.href} title= {fundraiserDetails.fundraiserTitle} summary= "Description of the shared page" >
  <TelegramIcon className="rounded-full" />
</TelegramShareButton>

<EmailShareButton url={window.location.href} subject = {fundraiserDetails.fundraiserTitle} body = "Email will be prepended to the url." >
  <EmailIcon className="rounded-full" />
</EmailShareButton>





</div>


      </Modal>
    </div>
    </>
  );
};

export default Share;
