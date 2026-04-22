import ClavosDecoration from "../ClavosDecoration/ClavosDecoration";

export default function TitleInput({
  title,
  handleChange,
}: {
  title: string;
  handleChange: any;
}) {
  return (
    <div className="input-title-container">
      <ClavosDecoration />
      <input type="text" name="title" value={title} onChange={handleChange} />
    </div>
  );
}
