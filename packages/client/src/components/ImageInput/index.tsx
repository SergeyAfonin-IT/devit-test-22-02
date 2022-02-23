import React, {useCallback, useState} from "react";
import {Banner, Caption, DropZone, List, Stack, Thumbnail,} from "@shopify/polaris";

import {ImageInputProps} from "../../interfaces";

const ImageInput: React.FC<ImageInputProps> = ({ onChange, file }) => {
  const [rejectedFiles, setRejectedFiles] = useState<File[]>([]);
  const hasError = rejectedFiles.length > 0;

  const handleDrop = useCallback(
    (_droppedFiles, acceptedFiles, rejectedFiles) => {
      onChange(acceptedFiles[0]);
      setRejectedFiles(rejectedFiles);
    },
    [onChange]
  );

  const fileUpload = file === null && <DropZone.FileUpload />;

  const uploadedFile = file !== null && (
    <Stack vertical alignment="center">
      <Stack alignment="center">
        <Thumbnail
          size="large"
          alt={file.name}
          source={window.URL.createObjectURL(file)}
        />
        <div>
          {file.name} <Caption>{file.size} bytes</Caption>
        </div>
      </Stack>
    </Stack>
  );

  const errorMessage = hasError && (
    <Banner
      title="The following images couldn’t be uploaded:"
      status="critical"
    >
      <List type="bullet">
        {rejectedFiles.map((file, index) => (
          <List.Item key={index}>
            {`"${file.name}" is not supported. File type must be .gif, .jpg, .png or .svg.`}
          </List.Item>
        ))}
      </List>
    </Banner>
  );

  return (
    <Stack vertical>
      {errorMessage}
      <DropZone
        label="Image"
        type="image"
        accept={"image/*"}
        onDrop={handleDrop}
      >
        {uploadedFile}
        {fileUpload}
      </DropZone>
    </Stack>
  );
};

export default ImageInput;
