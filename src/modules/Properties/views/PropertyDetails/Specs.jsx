import { useParams } from "react-router-dom";

function Specs() {
  const { propertyID } = useParams();

  return (
    <iframe
      title="property assets"
      src={`https://airtable.com/embed/shr79f6V8aJMNjiJJ?backgroundColor=transparent&filter_Property%20ID=${propertyID}`}
      width="100%"
      height="540"
      style={{ background: "transparent", border: "none" }}
    />
  );
}

export default Specs;
