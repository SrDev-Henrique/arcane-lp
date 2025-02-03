import dynamic from "next/dynamic";

const Apresentacao = dynamic(() => import("./components/Apresentacao"));

const Piltover = () => {

  return (
    <Apresentacao />
  );
};
export default Piltover;
