import React from 'react'
import Link from 'next/link';
const OurClientsCards = (props) => {
    const {clientCards}= props;
    const {
  field_our_clients_image: { uri: { url: clientsImageUrl } },
  field_our_clients_image_link: { uri: clientsImageLinkUri }
} = clientCards;

  return (
    <div>
        <Link href={clientsImageLinkUri} target="_blank">
        <img alt='client Image' src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${clientsImageUrl}`} /></Link>
    </div>
  )
}

export default OurClientsCards