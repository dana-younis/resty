import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Form from './form.jsx';
import Results from '../results/results'
import '@testing-library/jest-dom/extend-expect';

it('need to run a function on button click', async () => {
  let callApi = jest.fn();
  render(<Form handleApiCall={callApi} />);
  const button = screen.getByTestId('submit');
  fireEvent.click(button);
  await waitFor(() => expect(callApi).toHaveBeenCalled());
});
it('Should render results', () => {
  const data = {
      Headers:{
      'content-type': 'string application/json',
      },
      count: 2,
      results: [
          {name: 'fake thing 1', url: 'http://fakethings.com/1'},
          {name: 'fake thing 2', url: 'http://fakethings.com/2'},
      ],
  };
  render(<Results data={data} />);
  const items = screen.getByTestId('renderedData');
  expect(items).toHaveTextContent('{ "Headers": { "content-type": "string application/json" }, "count": 2, "results": [ { "name": "fake thing 1", "url": "http://fakethings.com/1" }, { "name": "fake thing 2", "url": "http://fakethings.com/2" } ] }');
});

// it('Should render results', () => {
//   const result = {
//     "Headers": {
//       "content-type": "string application/json"
//     },
//     "count": 2,
//     "results": [
//       {
//         "name": "fake thing 1",
//         "url": "http://fakethings.com/1"
//       },
//       {
//         "name": "fake thing 2",
//         "url": "http://fakethings.com/2"
//       }
//     ]
//   };

//   render(<Results data={result} />);

//   const items = screen.getByTestId('renderedData');

//   expect(items).toHaveTextContent('fake thing 1');
//   expect(items).toContainHTML(
//     `<pre data-testid="renderedData">{
//   "Headers": {
//     "content-type": "string application/json"
//   },
//   "count": 2,
//   "results": [
//     {
//       "name": "fake thing 1",
//       "url": "http://fakethings.com/1"
//     },
//     {
//       "name": "fake thing 2",
//       "url": "http://fakethings.com/2"
//     }
//   ]
// }</pre>`
//   );
//   expect(items).toHaveTextContent('http://fakethings.com/2');
//   expect(items).toHaveTextContent('Headers');
// });