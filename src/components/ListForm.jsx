import { IoIosAddCircleOutline, IoIosSave } from "react-icons/io";
import { useEffect, useRef } from "react";

const ListForm = ({ onSubmit, name, setName, isEditing }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <div className="input-group">
        <input
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="e. g. Eggs"
          maxLength={30}
        />
        <button className="btn" type="submit">
          {isEditing ? <IoIosSave /> : <IoIosAddCircleOutline />}
        </button>
      </div>
    </form>
  );
};

export default ListForm;
