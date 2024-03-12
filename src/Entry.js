import { Link } from 'react-router-dom';

const Entry = ({ name, image, alt, author, descriptor, content, published }) => {
  return (
    <figure className="entry">
      <Link to={`/entry/${name.replaceAll(' ', '_')}`}>
        <div className="image-container">
          {/* <img className="image-thumb" src={image} alt={alt} /> */}
          <h3 className="entry-title">{name}</h3>
          <h3 className="entry-date">entry written on {published}</h3>
        </div>
        {descriptor && <p className="entry-descriptor">{descriptor}</p>}
      </Link>
    </figure>
  )
}

export default Entry;
