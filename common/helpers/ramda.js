import R from 'ramda';

const merge = (state, data) => R.pipe(
  R.toPairs,
  R.filter(n => !!n[1]),
  R.fromPairs,
  R.merge(state)
)(data);

const concat = (state, data) => R.concat(state, data);

const append = (state, data) => R.append(data, state);

const removeByKey = (state, value, key = 'id') => R.pipe(
  R.groupBy(R.prop(key)),
  R.dissoc(value),
  R.values,
  R.reduce(R.concat, [])
)(state);


const replace = (state, data = [], key = 'id', sort = 'updated_at', reverse = true) => {
  const rData = R.pipe(
    R.concat(R.__, data),
    R.groupBy(R.prop(key)),
    R.values,
    R.map(R.reduce(R.merge, {})),
    R.sortBy(R.prop(sort))
  )(state);

  return reverse ? R.reverse(rData) : rData;
};

const clone = state => R.clone(state);

export default R;

export {
  merge, concat, append, removeByKey, replace, clone
};
