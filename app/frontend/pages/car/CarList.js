import { any } from "prop-types";
import React from "react"
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";

const CarList = (props) => {
  const cars = props.car;
  const history = useHistory();

  return (
    <div>
      {
        cars.map((car, idx) => (
          <div key={idx}>
            <label>{car.carId}</label>
            <label>{car.maker}</label>
            <label>{car.model}</label>
            <label>{car.grade}</label>
            <label>{car.price}</label>
            <label>{car.navi}</label>
            <label>{car.kawa}</label>
            <label>{car.sr == "1" ? "サンルーフ有" : ""}</label>
            <Button 
              type="button"
              variant="contained" 
              color="primary"
              onClick={() => { history.push(`/users/${car.id}`) }}
            >
              詳細
            </Button>
          </div>
        ))
      }
    </div>
  );
}
// 何故かTSが邪魔しているので
CarList.propTypes = {
  car: any
}


export default React.memo(CarList);
