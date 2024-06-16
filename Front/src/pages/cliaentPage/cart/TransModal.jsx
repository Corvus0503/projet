// import  LocalizationProvider  from '@mui/x-date-pickers/LocalizationProvider'
import { Autocomplete, Button, Grid, styled } from "@mui/material";
import React, { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Modal } from "@mui/material";
import UserMap from "../map/UserMap";
import Swal from "sweetalert2";

const AutoComplete = styled(Autocomplete)(() => ({
  width: "100%",
  marginBottom: "13px",
}));

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
  boxShadow: theme.shadows[5],
  width: "600px",
}));
const CustomModal = styled(Modal)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const suggestions = [{ label: "Paypal" }, { label: "AG" }];

const TransModal = ({
  supInfo,
  setSupInfo,
  isOpen,
  toogleModal,
  placeOrder,
  pos,
  setPos,
}) => {
  const handleChange = (event) => {
    event.persist();
    setSupInfo({ ...supInfo, [event.target.name]: event.target.value });
  };

  console.log("position" + pos.markerLat);

  return (
    <CustomModal open={isOpen} onClose={toogleModal}>
      <Container>
        <ValidatorForm onError={() => null} onSubmit={placeOrder}>
          <div className=" card center shadow p-5">
            <h1 align="left"> Transaction </h1>
            <hr />
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <UserMap pos={pos} setPos={setPos} /> <br />
              <TextField
                type="text"
                name="deliveryAddress"
                label="Info supplémantaire sur l'adresse"
                placeholder="Info..."
                onChange={handleChange}
                value={supInfo.deliveryAddress}
                validators={[
                  "required",
                  "minStringLength: 1",
                  "maxStringLength: 18",
                ]}
                errorMessages={["this field is required"]}
              />
              {/* <AutoComplete
                options={suggestions}
                getOptionLabel={(option) => option.label}
                value={{ label: supInfo.payementMode }} // Set value as an object with label property
                onChange={handleChange}
                name="payementMode"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Type de payement"
                    variant="outlined"
                    fullWidth
                  />
                )}
              /> */}
              <TextField
                type="number"
                name="cardNumber"
                label="Numéro de carte bancaire"
                placeholder="Card number...."
                onChange={handleChange}
                value={supInfo.cardNumber}
                validators={[
                  "required",
                  "minStringLength: 1",
                  "maxStringLength: 9",
                ]}
                errorMessages={["this field is required"]}
              />
              <div className="text-center">
                <Button
                  color="primary"
                  className="me-2 "
                  variant="outlined"
                  type="submit"
                >
                  Enregister
                </Button>
                <Button
                  color="secondary"
                  className=" me-2 ms-1 ps-4 pe-4"
                  variant="outlined"
                  onClick={toogleModal}
                >
                  Fermer
                </Button>
              </div>
            </Grid>
          </div>
        </ValidatorForm>
      </Container>
    </CustomModal>
  );
};

export default TransModal;
