export const getMaxId = async (model) => {
  const MaxId = await model.findOne({}).sort({ id: -1 });
  return MaxId.id;
};