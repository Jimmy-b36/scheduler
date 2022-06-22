import React from 'react';

import { render } from '@testing-library/react';

import Appointment from 'components/Appointment';
import propTypes from 'prop-types';

describe('Application', () => {
  it('renders without crashing', () => {
    render(<Appointment />);
  });
  it('The interviewer property type is an array', () => {});
});
