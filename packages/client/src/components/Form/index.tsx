import React, { useState } from "react";
import { Button, Card, Stack, TextField } from "@shopify/polaris";
import {useDispatch, useSelector} from "react-redux";

import ImageInput from "../ImageInput";
import {addTask, isLoadingSelector} from "../../store/tasks";

export function Form() {
  const dispatch = useDispatch();

  const isLoading = useSelector(isLoadingSelector)

  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = () => {
    const payload = {
      name: name.trim(),
      image: "",
    };

    if (payload.name.length !== 0) {
      dispatch(addTask(payload));
    }

    setName("");
  };

  console.log(image)

  return (
    <Card sectioned>
      <Stack vertical spacing="loose">
        <ImageInput onChange={(file) => setImage(file)} />

        <TextField
          value={name}
          onChange={setName}
          autoComplete="off"
          label="Name"
        />

        <Stack vertical alignment="trailing">
          <Button onClick={handleSubmit} loading={isLoading} primary>
            Add
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
