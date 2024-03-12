import { Link } from 'react-router-dom';

const laptop = new URL('./assets/resources.svg', import.meta.url)
const screens = new URL('./assets/screens.svg', import.meta.url)

const Content = () => {
  return (
    <div>
      <div className="title">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1>tpk</h1>
          <h2>mostly a movie journal</h2>
        </Link>
      </div>
      <p>“life is short and I don't want to have turned to dust without knowing how something feels. without having felt as many things as I could've felt; even if that means to get hurt.
        movies are magical, they make me feel (hurt) so much at an expense of oh my dreary friend, time.
        time and time again I've pondered what is worth my time and what isn't. to feel is worth it, hence to watch movies is worth my time and do so I've done, do, and will do.
        so it goes.”
      </p>
    </div>
  )
}

export default Content
