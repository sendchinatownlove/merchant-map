import { NextButton, PrevButton } from "./icons";
import "./NavButtons.scss";

type NavButtonsProps = {
  onBackButtonClick: () => void;
  onForwardButtonClick: () => void;
};

export default ({
  onBackButtonClick,
  onForwardButtonClick,
}: NavButtonsProps) => {
  return (
    <div className="NavBar--Container">
      <div className="NavBar--Button" onClick={onBackButtonClick}>
        <PrevButton />
        <span className="NavBar--Button-Text">Prev</span>
      </div>
      <button className="Primary-Button--black">
        <a href="/">Visit Merchant Page</a>
      </button>
      <div className="NavBar--Button" onClick={onForwardButtonClick}>
        <NextButton />
        <span className="NavBar--Button-Text">Next</span>
      </div>
    </div>
  );
};
