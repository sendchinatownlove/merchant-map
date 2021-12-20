import "./ZoomButtons.scss";

type ZoomButtonsProps = {
  zoomInCallback: () => void;
  zoomOutCallback: () => void;
};
export function ZoomButtons({
  zoomInCallback,
  zoomOutCallback,
}: ZoomButtonsProps) {
  return (
    <div className="ZoomButtons--Container">
      <div className="ZoomButtons--Button" onClick={() => zoomInCallback()}>
        <ZoomInIcon />
      </div>
      <div className="ZoomButtons--Button" onClick={() => zoomOutCallback()}>
        <ZoomOutIcon />
      </div>
    </div>
  );
}

function ZoomInIcon() {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 8H1M9 16V8V16ZM9 8V0V8ZM9 8H17H9Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ZoomOutIcon() {
  return (
    <svg
      width="18"
      height="2"
      viewBox="0 0 18 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17 1H1" stroke="black" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
