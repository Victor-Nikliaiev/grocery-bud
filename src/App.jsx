import FileForm from "./components/FileForm";
import ListForm from "./components/ListForm";
import Header from "./components/Header";
import List from "./components/List/List";
import { useListVariables } from "./providers/ListProvider";

function App() {
  const { list } = useListVariables();
  return (
    <>
      <div className="section-center">
        <Header />
        <FileForm />
        <ListForm />
        {list.length !== 0 && <List />}
      </div>
    </>
  );
}

export default App;
