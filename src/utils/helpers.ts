export const randomChoice = <T>(array: T[]): T => {
    if (array.length === 0) {
      throw new Error("Массив не может быть пустым");
    }
    return array[Math.floor(Math.random() * array.length)];
  };

export const shuffleArray = <T>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
  };