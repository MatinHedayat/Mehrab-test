import { useEffect, useState } from 'react';

type dataItem = {
  success: boolean;
  results: [
    {
      city: {
        id: string;
        name: {
          fa: string;
          en: string;
        };
      };
    }
  ];
};

export default function useDebounce(input: string) {
  const [value, setValue] = useState('');
  const [data, setData] = useState<dataItem | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setValue(input);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [input]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      try {
        const url = `https://hub.tikplan.ir/api/v2/reservation/flight/search/airport?str=${value}`;
        const response = await fetch(url, { signal });

        const data = await response.json();
        setData(data);
      } catch (error) {
        // console.log(error)
      }
    }

    fetchData();
    return () => {
      controller.abort();
    };
  }, [value]);

  return data;
}
