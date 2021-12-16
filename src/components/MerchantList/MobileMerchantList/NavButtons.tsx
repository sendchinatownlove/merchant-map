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
      <button className="NavBar--Button" onClick={onBackButtonClick}>
        {"<"}
      </button>
      <button className="Primary-Button--black">
        <a href="/">Visit Merchant Page</a>
      </button>
      <button className="NavBar--Button" onClick={onForwardButtonClick}>
        {">"}
      </button>
    </div>
  );
};
