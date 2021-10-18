import { any } from "prop-types";
import React, { useReducer, useState } from "react";
import { useHistory } from "react-router";
import { useForm, Controller } from "react-hook-form";
import TextControl from "../../components/form/TextControl";
import CheckboxControl from "../../components/form/CheckboxControl";
import axios from "axios";
import {getErrorCondition, getErroMessage} from "../../common/error"
import Button from "@material-ui/core/Button";
import { InputLabel, FormControl, FormHelperText, Select, MenuItem } from "@material-ui/core";

// carCreate initialState
const initialState = {
    maker: "",
    model: "",
    grade: "",
    bodyColor: "",
    price: "",
    navi: false,
    kawa: false,
    sr: false,
  errors: {}
}

const reducer = (state, action) => {
  console.log(action);
  switch(action.type) {
    case "CONFIRM":
      return {...state,
        errors: action.payload,
      };
    case "ERROR_CLEAR":
      return {...state,
        errors: {},
      };
  }
  return state;
}

const CarCreate = (props) => {
  const {control, handleSubmit} = useForm();
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  const [pageMode, setPageMode] = useState(props.pageMode);
  const readOnly = pageMode !== "confirm" ? false : true;

  // carData 入力チェック
  const doConfirm = async (data) => {
    const url = `/api/car/createConfirm`;
    const carJSON = `{"car": ${JSON.stringify(data)}, "mode": "edit"}`
    console.log(JSON.stringify(data));
    await axios.post(url, JSON.parse(carJSON))
    .then(
      () => {
        dispatch({type: 'ERROR_CLEAR'})
        setPageMode("confirm");
      }
    ).catch(
      (error) => {
        if (error.response.status === 400) {
          const errors = error.response.data;

          console.log(errors);
          dispatch({type: 'CONFIRM', payload: errors})
        }
        else if (error.response.status === 404) {
          alert("error");
          history.push("/carCreate");
        } else {
          history.push('/');
        }
      }
    );
  }

  // carData 登録更新
  const doPost = async (data) => {
    const url = `/api/car/create`;
    const userJSON = `{"car": ${JSON.stringify(data)}, "mode": "edit"}`

    await axios.post(url, JSON.parse(userJSON))
    .then(
      () => {
        alert("登録しました。");
        history.push("/carCreate");
      }
    ).catch(
      (error) => {
        if (error.response.status === 400) {
          alert("登録できません。");
        }
      }
    );
  }

  // 戻るボタン
  const backButton = (
  <Button 
      type="button"
      variant="contained" 
      color="primary"
      onClick={() => { 
        setPageMode("edit");
        history.push("/CarCreate");
      }}
    >戻る</Button>
  );

    // menuに戻るボタン
    const menuButton = (
        <Button 
            type="button"
            variant="contained" 
            color="primary"
            onClick={() => { 
              setPageMode("edit");
              history.push("/menu");
            }}
          >menu</Button>
        );
      
  
  // メーカー名セレクトボックス
  const makerSelect =  (
    <FormControl
      error={getErrorCondition(state.errors, "maker")}
      style={{minWidth:200}}
    >        
      <InputLabel id="demo-simple-select-label">メーカー名</InputLabel>
      <Controller
        render={
          // eslint-disable-next-line react/display-name
          ({ field }) => <Select {...field}>
            <MenuItem value={"toyota"}>トヨタ</MenuItem>
            <MenuItem value={"日産"}>日産</MenuItem>
            <MenuItem value={"ホンダ"}>ホンダ</MenuItem>
            <MenuItem value={"三菱"}>三菱</MenuItem>
            <MenuItem value={"マツダ"}>マツダ</MenuItem>
            <MenuItem value={"スバル"}>スバル</MenuItem>
            <MenuItem value={"スズキ"}>スズキ</MenuItem>
            <MenuItem value={"ダイハツ"}>ダイハツ</MenuItem>
          </Select>
        }
        control={control}
        name="maker"
        defaultValue={state.maker}
      />
      <FormHelperText>{getErroMessage(state.errors, "maker")}</FormHelperText>
    </FormControl>
  );
  const makerText = (
    <TextControl
      control={control}
      name="maker"
      label="メーカー名"
      value={state.maker}
      readOnly={true}
      error={getErrorCondition(state.errors, "maker")}
      helperText={getErroMessage(state.errors, "maker")}            
    />
  );

  /////////////////////
  // フロント表示部分 //
  ////////////////////
  return (
    <main>
      <h1>車両新規登録</h1>
      <form onSubmit={handleSubmit(pageMode === "confirm" ? doPost : doConfirm)}>
        <div style={{marginTop:10}}>
        {pageMode === "confirm" ? makerText : makerSelect}
        </div>

        <div style={{marginTop:10}}>
        <TextControl
          control={control}
          name="model"
          label="車種名"
          value={state.model}
          readOnly={readOnly}
          error={getErrorCondition(state.errors, "model")}
          helperText={getErroMessage(state.errors, "model")}            
        />
        </div>

        <div style={{marginTop:10}}>
        <TextControl
          control={control}
          name="grade"
          label="グレード"
          value={state.grade}
          readOnly={readOnly}
          error={getErrorCondition(state.errors, "grade")}
          helperText={getErroMessage(state.errors, "grade")}            
        />
        </div>

        <div style={{marginTop:10}}>
        <TextControl
          control={control}
          name="bodyColor"
          label="ボディカラー"
          value={state.bodyColor}
          readOnly={readOnly}
          error={getErrorCondition(state.errors, "bodyColor")}
          helperText={getErroMessage(state.errors, "bodyColor")}            
        />
        </div>

        <div style={{marginTop:10}}>
        <TextControl
          control={control}
          name="price"
          label="価格"
          value={state.price}
          readOnly={readOnly}
          error={getErrorCondition(state.errors, "price")}
          helperText={getErroMessage(state.errors, "price")}            
        />
        </div>
        <div style={{marginTop:10}}>
        <CheckboxControl
          control={control}
          name="navi"
          label="ナビ"
          value={state.navi}
          readOnly={readOnly}
        />
        <CheckboxControl
          control={control}
          name="kawa"
          label="革"
          value={state.kawa}
          readOnly={readOnly}
        />
        <CheckboxControl
          control={control}
          name="sr"
          label="サンルーフ"
          value={state.sr}
          readOnly={readOnly}
        />
        </div>

        <div style={{marginTop:10}}>
        {pageMode === "confirm" ? "" : menuButton}
        {pageMode === "confirm" ? backButton : ""}
        <Button 
          type="submit"
          variant="contained" 
          color={pageMode === "confirm" ? "secondary" : "primary"}
        >
          {pageMode === "confirm" ? "登録" : "確認"}
        </Button>
        </div>

      </form>
    </main>
  );
}

// 何故かTSが邪魔しているので
CarCreate.propTypes = {
  pageMode: any,
  location: any,
  field: any
}

export default React.memo(CarCreate);