import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  Grid,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Modal } from "@mui/material";
import UserMap from "../cliaentPage/map/UserMap";
import CreateIcon from "@mui/icons-material/Create";
import axios from "axios";
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

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const ModOrder = ({ List, toogleModal, isOpen, chargerListOrder }) => {
  const [pos, setPos] = useState({
    markerLat: -21.45,
    markerLng: 47.1,
  });
  const [isDel, setIsDel] = useState(false);
  const [isWait, setIsWait] = useState(false);
  const [stat, setStat] = useState("");

  const updateOrder = (id) => {
    const status = stat
    console.log(id)
    axios
      .put(`http://localhost:8080/api/orders/${id}/status`, { status })
      .then((response) => {
        toogleModal();
        console.log("Article modifier avec succès.");
        chargerListOrder()
        Swal.fire("Ajouté!", "Stas de la commande modifié.", "success");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const confBtn = () => {
    if (List.status === "en attente") {
      setIsWait(true);
      setStat("en livraison")
    } else if (List.status === "en livraison") {
      setIsDel(true);
      setStat("livré")
    }
  };


  useEffect(() => {
    setPos({ ...pos, markerLat: List.latitude, markerLng: List.longitude });
    confBtn()
  }, []);

 console.log(List)
  return (
    <>
      <IconButton onClick={toogleModal}>
        <CreateIcon color="primary" />
      </IconButton>
      <CustomModal open={isOpen} onClose={toogleModal}>
        <Container>
          <ValidatorForm onError={() => null}>
            <div className=" card center shadow p-5">
              <h1 align="left"> Detal de la commande </h1>
              <hr />
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <UserMap pos={pos} setPos={setPos} /> <br />
                {/* <TextField
                                type="text"
                                name="deliveryAddress"
                                label="Info supplémantaire sur l'adresse"
                                placeholder="Saisir ici le code le nom du produit...."
                                onChange={handleChange}
                                value={supInfo.deliveryAddress}
                                validators={["required","minStringLength: 1", "maxStringLength: 9"]}
                                errorMessages={["this field is required"]}
                              />               */}
                <StyledTable>
                  <TableHead>
                    <TableRow>
                      {/* <TableCell align="center"></TableCell> */}
                      <TableCell align="left">Nom</TableCell>
                      <TableCell align="left">Qantité</TableCell>
                      <TableCell align="left">Prix</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {List.order_details.map((detail) => (
                      <TableRow key={detail.id}>
                        <TableCell>{detail.product.nom}</TableCell>
                        <TableCell>{detail.quantity}</TableCell>
                        <TableCell>{detail.product.prix}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </StyledTable>
                <br />
                <br />
                <div className="text-center">
                  {isWait && (
                    <Button
                      color="primary"
                      className="me-2 "
                      variant="outlined"
                      type="submit"
                      onClick={() => updateOrder(List.id)}
                    >
                      Accepter
                    </Button>
                  )}
                  {isDel && (
                    <Button
                      color="primary"
                      className="me-2 "
                      variant="outlined"
                      type="submit"
                      onClick={() => updateOrder(List.id)}
                    >
                      Confirmer
                    </Button>
                  )}

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
    </>
  );
};

export default ModOrder;
