const isEmpty = (value) =>
  value === '' || value === undefined || value === null || value == null;

const validator = (validations = {}, messages = {}) => {
  const errors = {};

  const explode = (separator = ' ', text = '') => {
    return text.split(separator);
  };

  const pushError = (key, message, defaultMessage) => {
    const [keyName] = explode(':', key);
    if (!errors[keyName]) {
      errors[keyName] = message || defaultMessage;
    }
  };

  const validatorMethods = {
    required: (value, key, message) => {
      if (!value || isEmpty(String(value))) {
        pushError(key, message, `Campo é obrigatório.`);
      }
    },

    email: (value, key, message) => {
      // eslint-disable-next-line
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!re.test(String(value))) {
        pushError(key, message, 'Email inválido.');
      }
    },

    phone: (value, key, message) => {
      // (88) 9999-9999 ou (88) 99999-9999
      // eslint-disable-next-line
      const re = /\(\d{2,}\) \d{4,}\-\d{4}/;
      if (!value || String(value).length > 15 || !re.test(value)) {
        pushError(key, message, 'Telefone inválido.');
      }
    },

    date: (value, key, message) => {
      if (value) {
        const [d, m, y] = value.split('/');
        const data = new Date(`${m}/${d}/${y}`);

        if (data.toString() === 'Invalid Date') {
          pushError(key, message, 'Data inválido.');
        }
      }
    },

    array: (value, key, message) => {
      if (!Array.isArray(value)) {
        pushError(key, message, 'Dado inválido');
      }
    },

    callback: (func, key, message) => {
      if (!func()) {
        pushError(key, message, 'Valor inválido.');
      }
    },
  };

  Object.keys(validations).forEach((prop) => {
    const [keyName, validationPlainText] = explode(':', prop);
    const validationsArray = explode('|', validationPlainText);

    validationsArray.map((validate) => {
      const message = messages[`${keyName}|${validate}`];

      return validatorMethods[validate](validations[prop], keyName, message);
    });
  });

  const hasError = () => {
    return Boolean(Object.keys(errors).length);
  };

  return {
    error: errors,
    hasError: () => hasError(),
  };
};

export { validator };
