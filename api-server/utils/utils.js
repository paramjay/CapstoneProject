export const getMaxId = async (model) => {
  const MaxId = await model.findOne({}).sort({ id: -1 });
  console.log(MaxId);
  return MaxId.id;
};