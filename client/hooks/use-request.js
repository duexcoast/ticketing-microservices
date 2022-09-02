import axios from 'axios';
import { useState } from 'react';

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const { data } = await axios[method](url, body);

      if (onSuccess) {
        onSuccess('test', data);
      }
      return data;
    } catch (err) {
      setErrors(
        <div className=''>
          <h4>Oops...</h4>
          {err.response.data.errors.map((errr) => {
            return <p>{errr.message}</p>;
          })}
        </div>
      );
    }
  };

  return { doRequest, errors };
};

export default useRequest;
