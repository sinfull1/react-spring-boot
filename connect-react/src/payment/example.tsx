
import React from 'react';
import './example.css';

export default function Example(props: any): React.ReactElement {
  return (
    <div className="example">
      <div className="title">{props.title}</div>
      <div className="demo">{props.children}</div>
    </div>
  );
}