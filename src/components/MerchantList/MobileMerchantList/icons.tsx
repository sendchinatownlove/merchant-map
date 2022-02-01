function PrevButton() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <svg
        width="10"
        height="18"
        viewBox="0 0 10 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.28746 17.75C8.10072 17.7506 7.9162 17.7094 7.74748 17.6294C7.57876 17.5493 7.43011 17.4325 7.31246 17.2875L1.27496 9.78748C1.09111 9.56381 0.990601 9.28326 0.990601 8.99373C0.990601 8.7042 1.09111 8.42364 1.27496 8.19998L7.52496 0.699979C7.73713 0.444708 8.04202 0.284177 8.37256 0.253702C8.70309 0.223228 9.03219 0.325305 9.28746 0.537478C9.54273 0.749652 9.70326 1.05454 9.73374 1.38507C9.76421 1.71561 9.66213 2.04471 9.44996 2.29998L3.86246 8.99998L9.26246 15.7C9.41531 15.8835 9.51241 16.1069 9.54226 16.3438C9.57211 16.5808 9.53346 16.8213 9.43089 17.0369C9.32832 17.2526 9.16612 17.4344 8.96349 17.5607C8.76085 17.6871 8.52625 17.7528 8.28746 17.75Z"
          fill="#828282"
        />
      </svg>
    </div>
  );
}
function NextButton() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <svg
        width="10"
        height="18"
        viewBox="0 0 10 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.71254 0.25002C1.89928 0.249385 2.0838 0.290601 2.25252 0.370637C2.42125 0.450673 2.56989 0.567497 2.68754 0.712522L8.72504 8.21252C8.90889 8.43619 9.0094 8.71674 9.0094 9.00627C9.0094 9.2958 8.90889 9.57636 8.72504 9.80002L2.47504 17.3C2.26287 17.5553 1.95798 17.7158 1.62744 17.7463C1.29691 17.7768 0.967811 17.6747 0.71254 17.4625C0.457269 17.2503 0.296739 16.9455 0.266264 16.6149C0.235789 16.2844 0.337866 15.9553 0.550039 15.7L6.13754 9.00002L0.737542 2.30002C0.584688 2.11654 0.487591 1.89311 0.457742 1.65618C0.427892 1.41924 0.466539 1.17871 0.569109 0.963052C0.671678 0.747392 0.833878 0.565629 1.03652 0.439266C1.23915 0.312904 1.47375 0.247232 1.71254 0.25002Z"
          fill="#828282"
        />
      </svg>
    </div>
  );
}
function UpArrow() {
  return (
    <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 9L9 0.999999L1 9" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}
function DownArrow() {
    return (
      <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L9 9L17 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    )
}

export { PrevButton, NextButton, UpArrow, DownArrow };
