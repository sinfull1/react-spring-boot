/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState } from 'react';
import './payment.css';
import BasicExample from './basic.example';


const GooglePayment: React.FC = () => {
  const [amount, setAmount] = useState('100.00');
  const [existingPaymentMethodRequired, setExistingPaymentMethodRequired] = useState(false);
  const [buttonColor, setButtonColor] = useState('default');
  const [buttonType, setButtonType] = useState('buy');

  function handleAmountChange(event: any) {
    setAmount(event.target.value);
  }

  function handleExistingPaymentMethodRequired(event: any) {
    setExistingPaymentMethodRequired(event.target.value === 'yes');
  }

  function handleColorChange(event: any) {
    setButtonColor(event.target.value);
  }

  function handleTypeChange(event: any) {
    setButtonType(event.target.value);
  }

  const props = {
    amount,
    existingPaymentMethodRequired,
    buttonColor: buttonColor,
    buttonType: buttonType,
  };

  return (
    <div className="App">
      <div className="params">
        <label>
          <span>Default amount:</span>
          <input type="text" defaultValue={amount} onBlur={handleAmountChange} />
        </label>
        <label>
          <span>Payment method required:</span>
          <select onChange={handleExistingPaymentMethodRequired} value={existingPaymentMethodRequired ? 'yes' : 'no'}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </label>
        <label>
          <span>Button color:</span>
          <select onChange={handleColorChange} value={buttonColor}>
            <option value="default">default</option>
            <option value="black">black</option>
            <option value="white">white</option>
          </select>
        </label>
        <label>
          <span>Button type:</span>
          <select onChange={handleTypeChange} value={buttonType}>
            <option value="buy">buy</option>
            <option value="plain">plain</option>
            <option value="donate">donate</option>
            <option value="long">long</option>
            <option value="short">short</option>
          </select>
        </label>
      </div>
      <BasicExample {...props} />
     
    </div>
  );
};

export default GooglePayment;