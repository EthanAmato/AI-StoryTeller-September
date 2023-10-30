import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./Styles/App.css";
import UserForm from "./components/UserForm";
import useGetStory from "./Hooks/useGetStory";

function App() {
  const { data, isLoading, error, fetchStory } = useGetStory();

  return (
    <>
      <UserForm callApi={fetchStory} />
      {isLoading ? <h3 style={{ color: "red" }}>Loading...</h3> : <p>{data}</p>}
      {error && <p>{error}</p>}
    </>
  );
}

export default App;
