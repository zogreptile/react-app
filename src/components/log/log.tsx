import React from 'react';

interface ILogProps {
  responses?: string[];
  error?: string;
}

const Log: React.FC<ILogProps> = (props) => {
  const { responses = [], error = '' } = props;

  return (
    <section className="log">
      <div className="log__column">
        <h2 className="log__title log__title--success">Responses</h2>
        <pre>
          <code>
            {responses.map((item, ind) => (
              <div className="log__item" key={ind}>{item}</div>
            ))}
          </code>
        </pre>
      </div>

      <div className="log__column">
        <h2 className="log__title log__title--fail">Error</h2>
        <pre>
          <code>{error}</code>
        </pre>
      </div>
    </section>
  );
}

export default Log;
