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
    if (name.trim().length !== 0 && image !== null) {
      const data = new FormData();
      data.append('name', name.trim())
      data.append('image', image)

      dispatch(addTask(data));

      setName("");
      setImage(null)
    }
  };

  return (
    <Card sectioned>
      <Stack vertical spacing="loose">
        <ImageInput onChange={(file) => setImage(file)} file={image} />

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
