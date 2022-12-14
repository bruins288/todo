import React from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

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
    axios.get("http://localhost:4000/iconFileNames").then(({ data }) => {
      setIcons(data);
    });
  }, []);

  const onRemove = (item) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      axios
        .delete("http://localhost:4000/lists/" + item.id)
        .then(() => {
          onRemoveList(item.id);
        })
        .finally(() => {
          setSelectedAll(true);
        });
    }
  };
  const toggleVisibleForm = () => {
    setVisibleForm(!visibleForm);
  };

  const onAdd = (inputValue, selectedIcon) => {
    if (!inputValue) {
      alert("Введите название списка");
      return;
    }
    setIsLoading(true);
    axios
      .post("http://localhost:4000/lists", {
        name: inputValue,
        iconFileNameId: selectedIcon,
      })
      .then(({ data }) => {
        let iconFileName = icons
          .filter((icon) => icon.id === selectedIcon)
          .shift();
        let newList = { ...data, iconFileName, tasks: [] };
        onAddList(newList);
        setVisibleForm(!visibleForm);
      })
      .catch(() => alert("Не удалось добавить список"))
      .finally(() => {
        setIsLoading(false);
      });
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
