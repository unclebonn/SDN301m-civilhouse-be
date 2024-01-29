import _ from 'lodash';

const filterObject = (obj: object, filterFields: string[]) => {
  return _.pick(obj, filterFields);
};

export default filterObject;
