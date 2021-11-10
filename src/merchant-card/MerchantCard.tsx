import { Merchant } from "../App";
import "./MerchantCard.css";

interface MerchantCardProps {
	merchant: Merchant
}

function MerchantCard({ merchant }: MerchantCardProps) {
  return (
    <>
			<h2>{merchant.name}</h2>
			<p>{merchant.addressLine1}</p>
			<p>{merchant.addressLine2}</p>
			<p>{merchant.phoneNumber}</p>
			<a href={merchant.websiteUrl}>Website</a>
			<p>{merchant.description}</p>

			<a href="#">
				<button>Visit Merchant Page</button>
			</a>
    </>
  );
}

export default MerchantCard;
