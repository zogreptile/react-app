import React, { useState, useContext, useEffect } from 'react';

import Container from '../container';
import Button from '../button';
import Input from '../input';
import Log from '../log';

import { useFetch } from '../../hooks/use-fetch';
import { withAxiosError, AxiosErrorContext } from '../../hocs/with-axios-error';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('?name=bob&age=30');
  const [responses, setResponses] = useState<string[]>([]);
  const [responseData, fetchData] = useFetch(query, { method: 'get' });
  const { error, resetError } = useContext(AxiosErrorContext);

  useEffect(() => {
    setResponses((prevState) => {
      if (!responseData) return prevState;

      return [
        ...prevState,
        JSON.stringify(responseData?.data, null, 2),
      ]
    });
  }, [responseData]);

  useEffect(() => {
    resetError();
  }, [query, resetError]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }

  return (
    <Container>
      <Input
        name="query"
        value={query}
        onChange={handleInputChange}
      />

      <Button onClick={fetchData}>Submit</Button>

      <Log
        responses={responses}
        error={error?.message}
      />
    </Container>
  );
};

export default withAxiosError(App);
