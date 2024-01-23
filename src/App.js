import useSWR from 'swr'
import { useState } from 'react'
import { Spinner } from '@contentful/f36-spinner'
import { createClient } from 'contentful'
import Entry from './Entry'
import Content from './Content'
import { entries } from 'contentful-import/dist/transform/transformers'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
})

const fetcher = async () => {
  const entryItems = await client.getEntries({ content_type: 'entry' })
  const tagItems = await client.getTags()

  const tags = tagItems.items.map((tag) => tag.name)

  // Process the data from the Contentful REST API into a neater object
  // If you want to avoid this step, consider using the GraphQL API
  const entries = entryItems.items.map((entry) => {
    const { fields, sys } = entry
    const publishedDate = new Date(sys.updatedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    return {
      name: fields.name,
      image: fields.image.fields.file.url,
      alt: fields.image.fields.title,
      author: fields.author,
      descriptor: fields.descriptor,
      content: fields.content,
      published: publishedDate,
      tags: entry.metadata.tags
        .map((t) => tagItems.items.find((ti) => ti.sys.id === t.sys.id))
        .map((t) => t.name),
    }
  })

  return { entries, tags }
}

function App() {
  const [selectedTags, setSelectedTags] = useState([]);
  const { data, error } = useSWR('contentful', fetcher);

  if (error) {
    console.log(error);
    return <div>failed to load</div>;
  }
  if (!data) return <Spinner size="large" />;

  const { tags, entries } = data;

  const onTagSelected = (e) => {
    const { name: tag, checked } = e.target;
    const index = selectedTags.indexOf(tag);

    if (checked && index === -1) {
      setSelectedTags([...selectedTags, tag]);
    } else if (!checked && index !== -1) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    }
  };

  const checkboxes = tags.map((tag) => (
    <label htmlFor={tag} key={tag}>
      <input
        type="checkbox"
        onChange={onTagSelected}
        name={tag}
        id={tag}
        checked={selectedTags.includes(tag)}
      />
      {tag}
    </label>
  ));

  const entrys = entries
    .filter((entry) => {
      if (selectedTags.length === 0) return true;
      return entry.tags.some((r) => selectedTags.includes(r));
    })
    .map(({ name, image, alt, author, descriptor, content, published }, i) => (
      <Entry key={i} name={name} image={image} alt={alt} author={author} descriptor={descriptor} content={content} published={published} />
    ));

  return (
    <main>
      <div className="container">
        <aside className="sidebar">
          <Content />
          {/* Move the tags inside the sidebar */}
          <div className="tags">
            <strong>Tags:</strong>
            <div>{checkboxes}</div>
          </div>
        </aside>
        <div className="grid">{entrys}</div>
      </div>
    </main>
  );
}

export default App;