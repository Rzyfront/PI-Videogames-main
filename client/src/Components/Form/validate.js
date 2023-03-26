export function validate(inputs) {
  const error = {};
  const notSimbols = /^[a-zA-ZñÑ][a-zA-ZñÑ\s]*$/;
  const notSimbolsPuations =
    /^[a-zA-ZñÑáéíóúÁÉÍÓÚ][a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s.,;:¡!¿?'-]*$/;
  const onlyUrl = /^(ftp|http|https):\/\/[^ "]+$/;

  if (inputs.name !== "" && !notSimbols.test(inputs.name))
    error.name = "unicamente con caracteres alfanumericos";
  if (inputs.name.length > 50) error.name = "excede max 50 caracteres";

  if (inputs.image.length > 0 && !onlyUrl.test(inputs.image))
    error.image = "URL no valida";
  if (inputs.image.length > 300) error.image = "URL excede max 300 caracteres";

  if (inputs.description.length > 500)
    error.description = "supera el limite de 500 caracteres";

  if (inputs.description !== "" && !notSimbolsPuations.test(inputs.description))
    error.description = "no puede contener simbolos";
  return error;
}
