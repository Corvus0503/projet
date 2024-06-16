import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  styled,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from "axios";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ModUser = () => {
  const [state, setState] = useState({ date: new Date() });
  const [confirmMdp, setConfirmMdp] = useState("");
  const [modUser, setModUser] = useState({
    MATRICULE: "",
    FONCTION_AG: "",
    MAIL_AG: "",
    NOM_AG: "",
    NOM_UTIL_AG: "",
    TYPE_AG: "",
    PRENOM_AG: "",
    ADRESSE_AG: "",
    TEL_AG: "",
    PASSWORD: "",
    PHOTO: "",
    GENRE: "",
    ACTIVATION: "",
    CODE_DIVISION: "",
  });

  const addNewUser = async () => {
    try {
      await axios.put("http://localhost:8080/user", modUser);
      setModUser({
        MATRICULE: "",
        FONCTION_AG: "",
        MAIL_AG: "",
        NOM_AG: "",
        NOM_UTIL_AG: "",
        TYPE_AG: "",
        PRENOM_AG: "",
        ADRESSE_AG: "",
        TEL_AG: "",
        PASSWORD: "",
        PHOTO: "",
        GENRE: "",
        ACTIVATION: "",
        CODE_DIVISION: "",
      });
      console.log("Le USer a été ajouté avec succès.");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [state.password]);

  const handleSubmit = (event) => {
    console.log(modUser);
    addNewUser();
  };

  const handleChange = (e) => {
    setModUser({ ...modUser, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => setState({ ...state, date });

  return (
    <div className="container">
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="MATRICULE"
              value={modUser.MATRICULE}
              onChange={handleChange}
              errorMessages={["this field is required"]}
              label="Matricule"
              validators={[
                "required",
                "minStringLength: 4",
                "maxStringLength: 9",
              ]}
            />

            <TextField
              type="text"
              name="CODE_DIVISION"
              value={modUser.CODE_DIVISION}
              onChange={handleChange}
              errorMessages={["this field is required"]}
              label="Code division"
              validators={[
                "required",
                "minStringLength: 1",
                "maxStringLength: 9",
              ]}
            />

            <TextField
              type="text"
              name="FONCTION_AG"
              //id="standard-basic"
              value={modUser.FONCTION_AG}
              onChange={handleChange}
              errorMessages={["this field is required"]}
              label="Fonction"
              validators={[
                "required",
                "minStringLength: 4",
                "maxStringLength: 9",
              ]}
            />

            <FormControl>
              <InputLabel id="demo-simple-select-label">Type AG</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={modUser.TYPE_AG}
                label="Age"
                onChange={handleChange}
                MenuProps={MenuProps}
              >
                <MenuItem value={"Admin"}>Admin</MenuItem>
                <MenuItem value={"Affaire Generale"}>Affaire Generale</MenuItem>
                <MenuItem value={"Utilisteur"}>Utilisteur</MenuItem>
              </Select>
            </FormControl>

            <TextField
              type="text"
              name="NOM_UTIL_AG"
              //id="standard-basic"
              value={modUser.NOM_UTIL_AG}
              onChange={handleChange}
              errorMessages={["this field is required"]}
              label="Nom d'utilisteur"
              validators={[
                "required",
                "minStringLength: 1",
                "maxStringLength: 9",
              ]}
            />

            <TextField
              type="text"
              name="NOM_AG"
              label="Nom"
              onChange={handleChange}
              value={modUser.NOM_AG}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

            <TextField
              type="text"
              name="PRENOM_AG"
              label="Prenom"
              onChange={handleChange}
              value={modUser.PRENOM_AG}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

            <TextField
              type="email"
              name="MAIL_AG"
              label="Email"
              value={modUser.MAIL_AG}
              onChange={handleChange}
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email non valide"]}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="ADRESSE_AG"
              label="Adresse"
              onChange={handleChange}
              value={modUser.ADRESSE_AG}
              errorMessages={["this field is required"]}
              validators={["required"]}
            />

            <TextField
              type="text"
              name="TEL_AG"
              value={modUser.TEL_AG}
              label="Contact"
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

            <TextField
              name="PASSWORD"
              type="password"
              label="Password"
              value={modUser.PASSWORD}
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              onChange={(e) => setConfirmMdp(e.target.value)}
              value={confirmMdp}
              validators={["required", "isPasswordMatch"]}
              errorMessages={[
                "this field is required",
                "password didn't match",
              ]}
            />
            <RadioGroup
              row
              name="GENRE"
              sx={{ mb: 2 }}
              value={modUser.GENRE}
              onChange={handleChange}
            >
              <FormControlLabel
                value="M"
                label="Homme"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

              <FormControlLabel
                value="F"
                label="Femme"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />
            </RadioGroup>
            <RadioGroup
              row
              name="ACTIVATION"
              sx={{ mb: 2 }}
              value={modUser.ACTIVATION}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Activé"
                label="Activé"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

              <FormControlLabel
                value="Desactivé"
                label="Desactivé"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />
            </RadioGroup>
          </Grid>
        </Grid>

        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          type="submit"
        >
          {/*<Icon>send</Icon>*/}
          Enregister
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default ModUser;
