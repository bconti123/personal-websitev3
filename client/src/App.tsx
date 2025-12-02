import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route element={<div>Root Hello!</div>}>
        <Route path="/test" element={<div>Hello Worl!!!!</div>} />
      </Route>
    </Routes>
  );
}

export default App;
