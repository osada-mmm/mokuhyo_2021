import { any } from "prop-types";
import React from "react"
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router";



const CarList = (props) => {
  const cars = props.car;
  const history = useHistory();

  return (
    <div>
      {
        cars.map((car, idx) => (
          <div className="contents" key={idx}>
            <Grid container>
              <Grid item xs={1}><label>{car.carId}</label></Grid>
              <Grid item xs={1}><label>{car.maker}</label></Grid>
              <Grid item xs={1}><label>{car.model}</label></Grid>
              <Grid item xs={1}><label>{car.grade}</label></Grid>
              <Grid item xs={1}><label>{car.price}</label></Grid>
              <Grid item xs={1}><label>{car.navi == "1" ? "ナビ有" : ""}</label></Grid>
              <Grid item xs={1}><label>{car.kawa == "1" ? "革有" : ""}</label></Grid>
              <Grid item xs={1}><label>{car.sr == "1" ? "サンルーフ有" : ""}</label></Grid>
              <Button 
              type="button"
              variant="contained" 
              color="primary"
              onClick={() => { history.push(`/users/${car.id}`) }}
            >
              詳細
            </Button>
            </Grid>
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
