import './App.css';
import {Form,ShowCase} from './Components/index';
import {Provider} from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store} >
      <div className="App">
        <Form />
        <ShowCase />
      </div>
    </Provider>

  );
}

export default App;
