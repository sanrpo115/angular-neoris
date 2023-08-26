import { enviroment } from "src/enviroments/enviroment";

export const COLUMNS_TABLE = {
  logo: {
    name: 'Logo',
    tooltip: false,
    width: '5%'
  },
  name: {
    name: 'Nombre del producto',
    tooltip: false,
    width: '18%' 
  },
  description: {
    name: 'Descripción',
    tooltip: true,
    width: '22%' 
  },
  date_release: {
    name: 'Fecha de liberación',
    tooltip: true,
    width: '20%' 
  },
  date_revision: {
    name: 'Fecha de Reestructuración',
    tooltip: true,
    width: '25%' 
  }
}

export const INPUT_TYPES = {
  text: 'text',
  number: 'number',
  list: 'list',
  date: 'date',
  url: 'url'
};

export const FIELDS_FORM = {
  fields: [
    {
      label: 'ID',
      fieldName: 'id',
      placeholder: 'Ingresa un ID',
      type: INPUT_TYPES.text,
      required: true,
      messageObligatoryValidation: true,
      maxlength: 10,
      minlength: 3
    },
    {
      label: 'Nombre',
      fieldName: 'name',
      placeholder: 'Ingresa un Nombre de producto',
      type: INPUT_TYPES.text,
      required: true,
      messageObligatoryValidation: true,
      maxlength: 100,
      minlength: 5
    },
    {
      label: 'Descripción',
      fieldName: 'description',
      placeholder: 'Ingresa una descripción de producto',
      type: INPUT_TYPES.text,
      required: true,
      messageObligatoryValidation: true,
      maxlength: 200,
      minlength: 10
    },
    {
      label: 'Logo',
      fieldName: 'logo',
      placeholder: 'Ingresa un logo',
      type: INPUT_TYPES.url,
      required: true,
      messageObligatoryValidation: true,
      min: 30,
      pattern: /^https?:\g/
    },
    {
      label: 'Fecha de Liberación',
      fieldName: 'date_release',
      placeholder: 'Selecciona fecha de liberación',
      type: INPUT_TYPES.date,
      required: true,
      messageObligatoryValidation: true,
      min: 0,
      disabled: false
    },
    {
      label: 'Fecha de revisión',
      fieldName: 'date_revision',
      placeholder: 'Selecciona fecha de revisión',
      type: INPUT_TYPES.date,
      required: true,
      messageObligatoryValidation: true,
      min: enviroment.days_for_review,
      disabled: true
    },
  ]
}

export const DEFAULT_MSSG = {
  200: {
    title: '¡Bien hecho!',
    message: 'La operación se completo exitosamente'
  },
  202: {
    title: 'ID Existente',
    message: 'El ID ingresado ya existe, por favor ingresa uno nuevo.'
  },
  206: {
    title: 'Error 206',
    message: 'Nombre y/o descripción no deben ser nulos.'
  },
  400: {
    title: 'Error 400',
    message: 'La petición enviada no tiene los Headers correspondientes'
  },
  401: {
    title: 'Error 401',
    message: 'Debes ser el dueño del producto para poder actualizarlo'
  },
  404: {
    title: 'Error 404',
    message: 'No se ha encontrado el recurso solicitado'
  },
  info: {
    title: 'Info',
    message: ''
  },
  warning: {
    title: '¡Ups!',
    message: 'Ha ocurrido un error, por favor intentalo de nuevo'
  }
}