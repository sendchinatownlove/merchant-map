import { NextButton, PrevButton } from "./icons";
import "./NavButtons.scss";

type NavButtonsProps = {
  onBackButtonClick: () => void;
  onForwardButtonClick: () => void;
  href?: string;
};

export default ({
  onBackButtonClick,
  onForwardButtonClick,
  href = "/",
}: NavButtonsProps) => {
  return (
    <div className="NavBar--Container">
      <div className="NavBar--Button" onClick={onBackButtonClick}>
        <PrevButton />
        <span className="NavBar--Button-Text">Prev</span>
      </div>
      <button className="Primary-Button--black">
        <a href={href}>Donate</a>
      </button>
      <div className="NavBar--Button" onClick={onForwardButtonClick}>
        <NextButton />
        <span className="NavBar--Button-Text">Next</span>
      </div>
    </div>
  );
};
