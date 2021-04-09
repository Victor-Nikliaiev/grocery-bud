import { IoIosAddCircleOutline, IoIosSave } from "react-icons/io";

const Form = ({ onSubmit, name, setName, isEditing }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="input-group">
        <input
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

export default Form;
