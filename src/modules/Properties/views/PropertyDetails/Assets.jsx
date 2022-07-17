import { useParams } from "react-router-dom";

function Assets() {
  const { propertyID } = useParams();

  return (
    <iframe
      title="property assets"
      src={`https://airtable.com/embed/shr6DuSA5b98WkMpg?backgroundColor=transparent&filter_Property%20ID=${propertyID}`}
      width="100%"
      height="540"
      style={{ background: "transparent", border: "none" }}
    />
  );
}

export default Assets;
