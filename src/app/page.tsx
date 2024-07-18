'use client';

import useDebounce from '@/lib/useDebounce';
import { useState } from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function Home() {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const data = useDebounce(value);

  return (
    <main className='min-h-screen flex items-center justify-center'>
      <Autocomplete
        id='asynchronous-demo'
        sx={{
          width: 300,
          marginBottom: '20rem',
        }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.city.name.en === value.city.name.en}
        getOptionLabel={(option) => option.city.name.en}
        options={data?.success ? data?.results : []}
        renderInput={(params) => (
          <TextField
            {...params}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            label='Cities'
          />
        )}
      />
    </main>
  );
}
