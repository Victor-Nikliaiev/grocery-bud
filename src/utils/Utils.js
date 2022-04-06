export class Utils {
  static getStorage() {
    const local = JSON.parse(localStorage.getItem("list"));
    if (!local) {
      return [];
    }
    return local;
  }

  static checkName(name) {
    const payload = {
      hasError: false,
      errorMsg: null,
    };

    if (!name.trim()) {
      payload.hasError = true;
      payload.errorMsg = "Field cannot be empty.";
    }

    if (name.length > 50) {
      payload.hasError = true;
      payload.errorMsg = "Field cannot be more than 50 characters";
    }
    return payload;
  }

  static getFile(filename, data) {
    try {
      let a = document.createElement("a");
      let file = new Blob([data], { type: "application/json" });
      a.href = URL.createObjectURL(file);
      a.download = filename;
      a.click();
    } catch (error) {}
  }

  static checkList(data) {
    const isListEmpty = JSON.parse(data).length === 0;
    const payload = {
      hasError: false,
      errorMsg: null,
    };

    if (isListEmpty) {
      payload.hasError = true;
      payload.errorMsg =
        "The list is empty, nothing is to download, try to add some items.";
    }
    return payload;
  }

  static isListOK(list) {
    let isOk = true;
    let isListEmpty = list.length === 0;

    if (isListEmpty) {
      isOk = false;
      return isOk;
    }

    list.forEach((item) => {
      if (!item.id || !item.title) {
        isOk = false;
      }
    });
    return isOk;
  }

  static addItem(setList, name) {
    setList((prev) => [
      ...prev,
      { id: new Date().getTime().toString(), title: name },
    ]);
  }

  static setUpList(event, setListFromFile) {
    try {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setListFromFile(reader.result);
      };
      reader.readAsText(file);
    } catch (error) {}
  }
}
