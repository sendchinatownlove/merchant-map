import "./NavButtons.scss";

type NavButtonsProps = {
  onBackButtonClick: () => void;
  onForwardButtonClick: () => void;
};

export function NavButtons({
  onBackButtonClick,
  onForwardButtonClick,
}: NavButtonsProps) {
  return (
    <div className="NavBar--Container">
      <button onClick={onBackButtonClick}>{"<"}</button>
      <button className="Primary-Button--black">
        <a href="/">Visit Merchant Page</a>
      </button>
      <button onClick={onForwardButtonClick}>{">"}</button>
    </div>
  );
}
