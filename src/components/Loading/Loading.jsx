import loadingGif from "../../img/Infinity-1s-200px.svg";
const Loading = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={loadingGif}
        alt=""
        style={{
          width: "50%",
          height: "50%",
        }}
      />
    </div>
  );
};

export default Loading;
