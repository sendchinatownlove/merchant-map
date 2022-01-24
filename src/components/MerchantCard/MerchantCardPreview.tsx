import { Merchant } from "../../utilities/types";

type MerchantCardPreviewProps = {
  merchant: Merchant;
};

export function MerchantCardPreview({ merchant }: MerchantCardPreviewProps) {
  return (
    <div className="Merchant--Card-Preview">
      <h2 className="Merchant--Name">{merchant.name}</h2>
      {/* TODO: Add address link */}
      <a className="Merchant--Details--Link">Address link</a>
    </div>
  );
}
