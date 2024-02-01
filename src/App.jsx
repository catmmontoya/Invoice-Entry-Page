import './App.css';
import InvoiceTable from './components/InvoiceTable';

function App({ initialData }) {
  return (
    <InvoiceTable initialData={initialData} />
  )
}

export default App;
