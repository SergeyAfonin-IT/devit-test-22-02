import React from "react";
import {
  Card,
  ResourceItem,
  ResourceList,
  Spinner,
  Stack,
  TextStyle,
  Thumbnail,
} from "@shopify/polaris";
import { DisableableAction } from "@shopify/polaris/build/ts/latest/src/types";
import { useDispatch, useSelector } from "react-redux";

import { TaskItem } from "../../interfaces";
import { deleteTask, isLoadedSelector, tasksSelector } from "../../store/tasks";

import styles from "./style.module.scss";

function List() {
  const dispatch = useDispatch();
  const tasks = useSelector(tasksSelector);
  const isLoaded = useSelector(isLoadedSelector);

  const handleRemove = (id: string) => {
    dispatch(deleteTask(id));
  };

  const renderItem = ({ id, name, image }: TaskItem) => {
    const media = <Thumbnail size="medium" source={image} alt={name} />;

    const shortcutActions: DisableableAction[] = [
      {
        content: "Remove",
        onAction() {
          handleRemove(id);
        },
      },
    ];

    return (
      <ResourceItem
        id={id}
        media={media}
        shortcutActions={shortcutActions}
        onClick={() => {}}
        verticalAlignment="center"
      >
        <div className={styles.ListItemInner}>
          <h3>
            <TextStyle variation="strong">{name}</TextStyle>
          </h3>
        </div>
      </ResourceItem>
    );
  };

  const list =
    tasks.length > 0 ? (
      <ResourceList items={tasks} renderItem={renderItem} />
    ) : (
      <Stack vertical alignment="center">
        <h3>There is no tasks.</h3>
      </Stack>
    );

  return (
    <Card sectioned>
      {!isLoaded ? (
        <Stack vertical alignment="center">
          <Spinner size="large" />
        </Stack>
      ) : (
        list
      )}
    </Card>
  );
}

export default List;
