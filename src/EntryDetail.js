import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const EntryDetail = ({ image, alt, name, content }) => {
  return (
    <div className="entry-detail">
      {/* <img src={image} alt={alt} className="entry-image" /> */}
      <h2 className="entry-title">{name}</h2>
      <div className="entry-content">
        {documentToReactComponents(content)}
      </div>
    </div>
  );
};

export default EntryDetail;