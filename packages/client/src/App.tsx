import React, { useEffect } from "react";
import { Page } from "@shopify/polaris";
import { useDispatch } from "react-redux";

import { Form } from "./components/Form";
import List from "./components/List";
import { fetchTasks } from "./store/tasks";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <Page title="Tasks List" narrowWidth>
      <Form />
      <List />
    </Page>
  );
}

export default App;
