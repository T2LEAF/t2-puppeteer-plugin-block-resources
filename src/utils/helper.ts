export const sample = (models: Array<any>) => {
    const index = Math.floor(Math.random() * models.length);
    return models[index];
};