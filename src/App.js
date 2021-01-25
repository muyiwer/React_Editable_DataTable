
import './App.css';
import MockJson from './data'
import MuyiTable from './plugin/index'
function App() {
  return (
    <div>
      <h1>React Table Library</h1>
      <div style={{width:'50%', fontSize:'14px', marginLeft:'10px'}}>
     <MuyiTable data={MockJson} tableTitle={"My Countries"} paginate={true} rowSize={11} />
      </div>
    </div>
  );
}

export default App;
