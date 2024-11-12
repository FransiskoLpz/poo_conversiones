// Clase base para conversiones
class Conversion {
  // Constructor de la clase que recibe los parámetros necesarios para la conversión
  constructor(
    inputId1, // ID del primer campo de entrada
    inputId2, // ID del segundo campo de entrada
    conversionRate, // Tasa de conversión entre las dos unidades
    convertToTarget, // Función para convertir de la unidad de origen a la unidad de destino
    convertToSource // Función para convertir de la unidad de destino a la unidad de origen
  ) {
    // Obtener los elementos del DOM mediante sus ID
    this.input1 = document.getElementById(inputId1); // Asigna el primer campo de entrada
    this.input2 = document.getElementById(inputId2); // Asigna el segundo campo de entrada
    this.conversionRate = conversionRate; // Asigna la tasa de conversión
    this.convertToTarget = convertToTarget; // Asigna la función de conversión hacia el objetivo
    this.convertToSource = convertToSource; // Asigna la función de conversión hacia el origen

    // Agregar un listener para detectar cambios en el primer campo de entrada
    this.input1.addEventListener(
      "input",
      () => this.handleInput(this.input1, this.input2, this.convertToTarget) // Convierte de input1 a input2
    );
    // Agregar un listener para detectar cambios en el segundo campo de entrada
    this.input2.addEventListener(
      "input",
      () => this.handleInput(this.input2, this.input1, this.convertToSource) // Convierte de input2 a input1
    );
  }

  // Método para manejar el input y evitar valores negativos
  handleInput(sourceInput, targetInput, conversionFunction) {
    // Obtener el valor del campo de entrada fuente y convertirlo a un número flotante
    const value = parseFloat(sourceInput.value);

    // Verificar si el valor es negativo o no es un número válido
    if (value < 0 || isNaN(value)) {
      // Si el valor es negativo o no es un número válido, limpiar ambos campos
      sourceInput.value = "";
      targetInput.value = "";
    } else {
      // Si el valor es válido, realizar la conversión y actualizar el campo de entrada destino
      targetInput.value = conversionFunction(value); // Aplica la función de conversión y asigna el valor convertido
    }
  }
}

// Clase para convertir de kilogramos a gramos (hereda de Conversion)
class KgToGConversion extends Conversion {
  constructor() {
    // Llama al constructor de la clase base, pasando los parámetros específicos para esta conversión
    super(
      "kg", // ID del campo de entrada para kilogramos
      "grams", // ID del campo de entrada para gramos
      1000, // Tasa de conversión (1 kg = 1000 gramos)
      (kg) => (kg * this.conversionRate).toFixed(2), // Función de conversión de kg a gramos
      (grams) => (grams / this.conversionRate).toFixed(2) // Función de conversión de gramos a kg
    );
  }
}

// Clase para convertir de kilómetros a metros (hereda de Conversion)
class KmToMConversion extends Conversion {
  constructor() {
    // Llama al constructor de la clase base, pasando los parámetros específicos para esta conversión
    super(
      "km", // ID del campo de entrada para kilómetros
      "meters", // ID del campo de entrada para metros
      1000, // Tasa de conversión (1 km = 1000 metros)
      (km) => (km * this.conversionRate).toFixed(2), // Función de conversión de km a metros
      (meters) => (meters / this.conversionRate).toFixed(2) // Función de conversión de metros a km
    );
  }
}

// Clase para convertir córdobas a dólares (hereda de Conversion)
class CurrencyConversion extends Conversion {
  constructor() {
    const exchangeRate = 36.8; // Tasa de conversión para córdobas a dólares (1 USD = 36.8 córdobas)
    // Llama al constructor de la clase base, pasando los parámetros específicos para esta conversión
    super(
      "cordoba", // ID del campo de entrada para córdobas
      "dollar", // ID del campo de entrada para dólares
      exchangeRate, // Tasa de conversión para córdobas a dólares
      (cordobas) => (cordobas / this.conversionRate).toFixed(2), // Función de conversión de córdobas a dólares
      (dollars) => (dollars * this.conversionRate).toFixed(2) // Función de conversión de dólares a córdobas
    );
  }
}

// Clase para convertir metros a centímetros (hereda de Conversion)
class MToCmConversion extends Conversion {
  constructor() {
    // Llama al constructor de la clase base, pasando los parámetros específicos para esta conversión
    super(
      "metersCm", // ID del campo de entrada para metros
      "cm", // ID del campo de entrada para centímetros
      100, // Tasa de conversión (1 metro = 100 centímetros)
      (meters) => (meters * this.conversionRate).toFixed(2), // Función de conversión de metros a centímetros
      (cm) => (cm / this.conversionRate).toFixed(2) // Función de conversión de centímetros a metros
    );
  }
}

// Instanciar las clases de conversión cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  new KgToGConversion(); // Crear una instancia de la conversión de kg a gramos
  new KmToMConversion(); // Crear una instancia de la conversión de km a metros
  new CurrencyConversion(); // Crear una instancia de la conversión de córdobas a dólares
  new MToCmConversion(); // Crear una instancia de la conversión de metros a centímetros
});

/*
  # README - Explicación de la Aplicación

  ## Descripción General
  Este proyecto permite realizar conversiones entre diferentes unidades, tales como:
  - Kilogramos a gramos
  - Kilómetros a metros
  - Córdobas a dólares
  - Metros a centímetros
  
  La aplicación está construida usando el principio de Programación Orientada a Objetos (POO), aprovechando la herencia, el polimorfismo, y el encapsulamiento para hacer el código modular, reutilizable y fácil de mantener.

  ## Principios de POO Aplicados:

  1. **Encapsulamiento**:
     - Cada clase (por ejemplo, `KgToGConversion`, `KmToMConversion`, `CurrencyConversion`) encapsula su propia lógica de conversión. Los detalles internos de cómo se realiza la conversión están ocultos para el usuario, y la interfaz que interactúa con los elementos del DOM es simple y clara.
     - Los valores de entrada y conversión se mantienen privados dentro de la clase, asegurando que las funciones de conversión no puedan ser modificadas directamente desde fuera de la clase.

  2. **Herencia**:
     - La clase `Conversion` es la clase base que contiene la lógica común de conversión (por ejemplo, manejo de los eventos de entrada y salida, validación de valores). Las clases derivadas como `KgToGConversion`, `KmToMConversion`, `CurrencyConversion`, y `MToCmConversion` heredan de `Conversion` y implementan la lógica específica de cada tipo de conversión.
     - Esto permite la reutilización de código y facilita la creación de nuevas conversiones sin duplicar la lógica básica de validación o manejo de eventos.

  3. **Polimorfismo**:
     - Las subclases como `KgToGConversion` y `KmToMConversion` sobrescriben las funciones de conversión de la clase base, como la función `convertToTarget` y `convertToSource`, adaptándolas a sus propias necesidades (por ejemplo, conversiones entre unidades de peso o longitud).
     - Aunque el método `handleInput` es el mismo para todas las clases, el comportamiento de conversión varía dependiendo de la implementación específica de cada clase derivada.

  4. **Modularidad y Extensibilidad**:
     - El diseño basado en clases permite que cada tipo de conversión sea independiente y fácilmente extensible. Si se desea agregar una nueva unidad de conversión, solo se debe crear una nueva clase que herede de `Conversion` y definir las funciones específicas de conversión sin modificar el resto del código.
     - La modularidad también hace que sea sencillo agregar o eliminar conversiones sin afectar las demás, lo que facilita la escalabilidad y el mantenimiento a largo plazo.

  ## Conclusión:
  Esta implementación es un ejemplo claro de cómo la Programación Orientada a Objetos puede ser utilizada para estructurar aplicaciones interactivas de manera eficiente y flexible. Los principios de encapsulamiento, herencia y polimorfismo se aplican de manera efectiva, creando un código limpio, fácil de entender, y que se puede expandir en el futuro con facilidad.
*/
