import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import todoAPI from "../dal/TodoAPI";
import { Icon, List, AddList, AddItem } from "../components";
import "./ListsBar.scss";

function ListsBar({ lists, activeItem, onAddList, onRemoveList }) {
  const [icons, setIcons] = React.useState(null);
  const [visibleForm, setVisibleForm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedAll, setSelectedAll] = React.useState(false);
  let navigate = useNavigate();
  let path = useLocation().pathname;

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await todoAPI.getIcons();
        setIcons(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const onRemove = async (item) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      try {
        await todoAPI.deleteList(item.id);
        onRemoveList(item.id);
      } catch (error) {
        console.error(error);
      } finally {
        setSelectedAll(true);
      }
    }
  };
  const toggleVisibleForm = () => {
    setVisibleForm(!visibleForm);
  };

  const onAdd = async (inputValue, selectedIcon) => {
    if (!inputValue) {
      alert("Введите название списка");
      return;
    }
    setIsLoading(true);
    try {
      let newFields = { name: inputValue, iconFileNameId: selectedIcon };
      const { data } = await todoAPI.postList(newFields);
      let iconFileName = icons
        .filter((icon) => icon.id === selectedIcon)
        .shift();
      let newList = { ...data, iconFileName, tasks: [] };
      onAddList(newList);
      setVisibleForm(!visibleForm);
    } catch (error) {
      window.alert("Не удалось добавить список " + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sidebar">
      {/* только для булевых значений можно передать одно имя свойства 
    в хорошей практике ставится вниз после всех свойств значений*/}
      <div
        className={`sidebar__head ${
          selectedAll || path === "/lists" ? "active-all" : ""
        }`}
        onClick={(e) => {
          navigate("/lists", { replace: true });
          setSelectedAll(true);
        }}
      >
        <Icon
          fileName="alltasks.png"
          name="Все задачи"
          className="lists-icon"
        />
        <span>Все задачи</span>
        <Icon
          fileName="close.png"
          name="Закрыть"
          className="close-app"
          onClick={(event) => {
            event.stopPropagation();
            navigate("/");
          }}
        />
      </div>
      <List
        items={lists}
        remove={onRemove}
        onClickItem={(item) => {
          setSelectedAll(false);
          navigate(`/lists/${item.id}`, { replace: true });
        }}
        activeItem={activeItem}
        isRemovable
      />
      <AddItem onVisibleForm={toggleVisibleForm} />
      <AddList
        icons={icons}
        visibleForm={visibleForm}
        onVisibleForm={toggleVisibleForm}
        addItem={onAdd}
        isLoading={isLoading}
      />
    </div>
  );
}

export default ListsBar;
