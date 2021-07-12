const path = require("path");

const viewsPath = path.resolve(__dirname);

const templates = {
  books: {
    listAll: `${viewsPath}/books/list.ejs`,
    addForm: `${viewsPath}/form/form.ejs`,
    getFormUpdate: `${viewsPath}/form/edit.ejs`,
    details: `${viewsPath}/books/details`,
  },

  home: {
    index: `${viewsPath}/home/home.ejs`,
  },

  login: {
    index: `${viewsPath}/login/login.ejs`,
  },
};

module.exports = templates;
