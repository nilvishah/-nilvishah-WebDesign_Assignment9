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
const Jobs = () => {
    const items = [
        { id: 1, title: 'Job 1', description: 'Description for Job 1' },
        { id: 2, title: 'Job 2', description: 'Description for Job 2' },
        { id: 3, title: 'Job 3', description: 'Description for Job 3' }
      ];
  return (
    <div>
        <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <h1>This is Home page</h1>
      <CardList items={items} />
      

    </div>
  )
}

export default Jobs