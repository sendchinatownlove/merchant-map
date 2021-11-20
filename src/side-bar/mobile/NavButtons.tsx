type NavButtonsProps = {
  onBackButtonClick: () => void;
  onForwardButtonClick: () => void;
};

export function NavButtons({
  onBackButtonClick,
  onForwardButtonClick,
}: NavButtonsProps) {
  return (
    <>
      <button onClick={onBackButtonClick}>{"<"}</button>
      <button>
        <a href="/">Visit Merchant Page</a>
      </button>
      <button onClick={onForwardButtonClick}>{">"}</button>
    </>
  );
}
