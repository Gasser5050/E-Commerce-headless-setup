import { useThemeGrabber } from "../hooks/useThemeGrabber";

function Cart() {
  const themeStyle = useThemeGrabber();

  return (
    <div
      className="grow flex flex-col bg-cover bg-center bg-no-repeat transition-bg ease-in-out duration-300"
      style={themeStyle}
    >
      <h1 className="text-black">About Us</h1>
    </div>
  );
}

export default Cart;
