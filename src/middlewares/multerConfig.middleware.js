const multer = require('multer');
const path = require('path');

// Configuração do Multer para especificar onde os arquivos serão armazenados
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Os arquivos serão armazenados na pasta 'uploads/'
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

// Inicialize o Multer com as opções de armazenamento
const upload = multer({ storage: storage});

module.exports = upload;