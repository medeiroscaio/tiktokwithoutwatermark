import { Oval } from "react-loader-spinner";

export const LoaderSpinner = () => {
  return (
    <Oval
      visible={true}
      height={40}
      width={40}
      color="#D3D3D3"
      secondaryColor="#000000"
      ariaLabel="oval-loading"
      wrapperStyle={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    />
  );
};
