import { Provider } from "react-redux";
import Form from "./components/Form";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./store/store";
import ThankYou from "./components/ThankYou";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
