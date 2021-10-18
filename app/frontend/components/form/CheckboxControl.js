import React from "react"
import { Controller } from "react-hook-form";
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { any, bool, string } from "prop-types";

const CheckboxControl = (props) => {
  const name = props.name;
  const control = props.control;
  const label = props.label;
  const value = props.value;
  const readOnly = props.readOnly;

  /*
  * RHF(React Hook Form)のControllerコンポーネント(wapper)
  * 使用してMaterial-UIのTextFieldを使用している
  * かなりカオス
  */
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={value}
      render={
        function render ({ field:{ value, onChange} }) {
          return (
            <FormControlLabel
              control = {
                <Checkbox
                  checked = {value}
                  onChange = {onChange}
                />
              }
              label={label}
              disabled={readOnly}
            />
          );             
        }
      }
    />
  );
}
// 何故かTSが邪魔しているので
CheckboxControl.propTypes = {
  name: string,
  control: any,
  label: string,
  value: any,
  readOnly: bool,
  field: any,
};

export default React.memo(CheckboxControl);
