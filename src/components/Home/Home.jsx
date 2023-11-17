import React from 'react'
import { Link } from 'react-router-dom'
const Card = ({ title, description }) => {
    return (
      <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  };
  
  const CardList = ({ items }) => {
    return (
      <div>
        {items.map((item) => (
          <Card key={item.id} title={item.title} description={item.description} />
        ))}
      </div>
    );
  };
const Home = () => {
    const items = [
        { id: 1, title: 'Home 1', description: 'Description for Home 1' },
        { id: 2, title: 'Home 2', description: 'Description for Home 2' },
        { id: 3, title: 'Home 3', description: 'Description for Home 3' }
      ];
  return (
    <div>
        <nav>
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/jobs">Jobs</Link>
          </li>
        </ul>
      </nav>
      <h1>This is Home page</h1>
      <CardList items={items} />
      

    </div>
  )
}

export default Home