import { FilterContainer, FilterLabel, FilterInput } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { filter } from 'redux/actions';

import PropTypes from 'prop-types';

const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(state => state.contacts.filter);

  const changeFilter = e => {
    dispatch(filter(e.currentTarget.value));
  };

  return (
    <FilterContainer>
      <FilterLabel>Find contacts by name</FilterLabel>
      <FilterInput type="text" value={filterValue} onChange={changeFilter} />
    </FilterContainer>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Filter;
