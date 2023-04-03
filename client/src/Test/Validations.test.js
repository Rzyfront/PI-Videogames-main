const { validate } = require("../Components/Form/validate.js");

describe("función validate", () => {
  it("debería devolver un objeto vacío si las entradas son válidas", () => {
    const inputs = {
      name: "Nombre del producto",
      image: "https://ejemplo.com/producto.jpg",
      description: "Descripción del producto",
    };

    const result = validate(inputs);

    expect(result).toEqual({});
  });

  it("debería devolver un objeto de error si el nombre contiene símbolos", () => {
    const inputs = {
      name: "Nombre del producto $",
      image: "https://ejemplo.com/producto.jpg",
      description: "Descripción del producto",
    };

    const result = validate(inputs);

    expect(result).toEqual({ name: "unicamente con caracteres alfanumericos" });
  });

  it("debería devolver un objeto de error si el nombre excede la longitud máxima", () => {
    const inputs = {
      name: "Nombre del producto que excede la longitud máxima de cincuenta caracteres",
      image: "https://ejemplo.com/producto.jpg",
      description: "Descripción del producto",
    };

    const result = validate(inputs);

    expect(result).toEqual({ name: "excede max 50 caracteres" });
  });

  it("debería devolver un objeto de error si la URL de la imagen no es válida", () => {
    const inputs = {
      name: "Nombre del producto",
      image: "url inválida",
      description: "Descripción del producto",
    };

    const result = validate(inputs);

    expect(result).toEqual({ image: "URL no valida" });
  });

  it("debería devolver un objeto de error si la URL de la imagen excede la longitud máxima", () => {
    const inputs = {
      name: "Nombre del producto",
      image: "https://ejemplo.com/".repeat(100),
      description: "Descripción del producto",
    };

    const result = validate(inputs);

    expect(result).toEqual({ image: "URL excede max 300 caracteres" });
  });

  it("debería devolver un objeto de error si la descripción excede la longitud máxima", () => {
    const inputs = {
      name: "Nombre del producto",
      image: "https://ejemplo.com/producto.jpg",
      description:
        "Descripción del producto que excede la longitud máxima de setecientos caracteres, lo que lo hace inválido. Descripción del producto que excede la longitud máxima de setecientos caracteres, lo que lo hace inválido.Descripción del producto que excede la longitud máxima de setecientos caracteres, lo que lo hace inválido.Descripción del producto que excede la longitud máxima de setecientos caracteres, lo que lo hace inválido.Descripción del producto que excede la longitud máxima de setecientos caracteres, lo que lo hace inválido.Descripción del producto que excede la longitud máxima de setecientos caracteres, lo que lo hace inválido.Descripción del producto que excede la longitud máxima de setecientos caracteres, lo que lo hace inválido.",
    };

    const result = validate(inputs);

    expect(result).toEqual({
      description: "supera el limite de 700 caracteres",
    });
  });

  it("debería devolver un objeto de error si la descripción contiene símbolos", () => {
    const inputs = {
      name: "Nombre del producto",
      image: "https://ejemplo.com/producto.jpg",
      description: "Descripción del producto con símbolos !@#$%",
    };

    const result = validate(inputs);

    expect(result).toEqual({ description: "no puede contener simbolos" });
  });
});
