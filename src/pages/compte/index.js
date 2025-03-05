export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/compte/vehicules",
      permanent: false, // Use `true` for a permanent 301 redirect
    },
  };
};

export default function Compte() {
 
  return <></>
}
