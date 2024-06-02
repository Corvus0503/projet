import {
    Box,
    IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    useTheme,
   alpha,
   InputBase
  } from "@mui/material";
import { useState } from "react";
import axios from "axios"
import { React, useEffect } from "react";
import TestModal from "./TestModal";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../utils/ConfirmationDialog";
import DeleteIcon from '@mui/icons-material/Delete';
import Breadcrumb from "../../utils/Breadcrumb";
import Swal from 'sweetalert2'
import { Span } from "../../components/Typography";
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  borderColor: 'black',
  marginLeft: 0,
  width: '50%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '50%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
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
  const StyledSpan = styled(Span)(({ bgColor }) => ({
    color: "#fff",
    padding: "2px 8px",
    borderRadius: "4px",
    background: bgColor,
    textTransform: "capitalize",
  }));
  
  //A ne pas toucher
  const UserList = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [user, setUser] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [adminList, setAdminList] = useState([]);
    const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] = useState(false);

  const chargerListAdmin = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/user');
      setAdminList(response.data);
      console.log("data loaded");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = id => {
    axios.delete(`http://localhost:8080/user/${id}`).then(response => {
      chargerListAdmin()
      console.log('Le USer a été supprimé avec succès.');
    }).catch(error =>{console.error(error);})
  }

  useEffect(() => {
    chargerListAdmin();
  }, []);

  const { palette } = useTheme();
  const bgGreen = "rgba(9, 182, 109, 1)";
  const bgError = palette.error.main;
  const bgSecondary = palette.secondary.main;

  const renderStatus = (status) => {
    if (status === "Activé") return <StyledSpan bgColor={bgGreen}>{status}</StyledSpan>;
    if (status === "Desactivé") return <StyledSpan bgColor={bgError}>{status}</StyledSpan>;
  };

  const handleDeleteUser = (user) => {
    setUser(user);
    Swal.fire({
      title: 'Confirmation',
      text: "Etes vous dur de supprimer cet utilisateur ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(user)
        Swal.fire(
          'Supprimé!',
          'Utilisateur supprimeé.',
          'success'
        )
      }
    })
  };

  const handleConfirmationResponse = () => {
    deleteUser(user)
    handleDialogClose()
  };

  const handleDialogClose = () => {
    //setShouldOpenEditorDialog(false);
    setShouldOpenConfirmationDialog(false);
    chargerListAdmin();
  };
  
    const handleChangePage = (_, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const renderImage = (photoBlob) => {
      if(!photoBlob){
        return null
      }

      const reader = new FileReader()
      return new Promise((resolve, reject) => {
        reader.onload = () => {
          resolve(reader.result)
        }
        reader.onerror = (error) => {
          reject(error)
        }
        reader.readAsDataURL(photoBlob)
      })
    }

    const [searchTerm, setSearchTerm] = useState("");

      // Filter the adminList based on the search term
  const filteredAdminList = adminList.filter(
    (item) =>
      item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.includes(searchTerm) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.telephone.includes(searchTerm) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );


    console.log(adminList)
    return (
  
      <Container >
        <div className="m-5 mt-3 mb-3">
        <div className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Liste des Utilisateur" }]} />
        </div>
        <div className=" text-start mb-3">
          <button className="btn btn-primary " onClick={() => navigate("/Signup", { replace: true })} > <AddCircleIcon/> Nouvelle utilisateur </button>
        </div>
        <div className="container mt-5 p-5 card shadow">
        <h1 align="left"> Liste des utilisateurs </h1>
          <hr />
          <div style={{paddingLeft: "80%"}}>
          <div style={{width: "200px", right: 0}} className="text-end">
          
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            </Search>
          </div>
          </div>
          
          <Box width="100%" overflow="auto">
          
          
          <StyledTable>
            <TableHead>
              <TableRow>
                {/* <TableCell align="center"></TableCell> */}
                <TableCell align="center">ID</TableCell>
                <TableCell align="left">Nom d'utilisateur</TableCell>      
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Telaphon</TableCell>
                <TableCell align="left">Type</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead> 
            <TableBody>
              {filteredAdminList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((List) => (

                  <TableRow key={List.id}>
                    {/* <TableCell>{List.PHOTO && (
                      <img
                        src={require(`../../../uploads/${List.PHOTO}`)} // Serve the photo from the "uploads" directory on the server
                        alt={List.NOM_AG}
                        style={{width: "40px", height: "40px"}} className="rounded-pill" // Adjust the image size as needed
                      />
                    )}</TableCell> */}
                    <TableCell align="center">{List.id}</TableCell>
                    <TableCell align="left">{List.username}</TableCell>          
                    <TableCell align="left">{List.email}</TableCell>
                    <TableCell align="left">{List.telephone}</TableCell>
                    <TableCell align="left">{List.type}</TableCell>
                    {/* <TableCell align="center">{renderStatus(List.type)}</TableCell> */}
                    <TableCell align="center">
                      <IconButton>
                        <TestModal List={List} adminList={adminList} chargerListAdmin={chargerListAdmin}/>
                      </IconButton>
                      <IconButton onClick={() => handleDeleteUser(List.MATRICULE)}>
                        
                        <DeleteIcon color="error"/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </StyledTable>
    
          <TablePagination
            sx={{ px: 2 }}
            page={page}
            component="div"
            rowsPerPage={rowsPerPage}
            count={adminList.length}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            nextIconButtonProps={{ "aria-label": "Next Page" }}
            backIconButtonProps={{ "aria-label": "Previous Page" }}
          />
          {shouldOpenConfirmationDialog && (
              <ConfirmationDialog
                text="Voulez vous supprimer cet utilisateur?"
                open={shouldOpenConfirmationDialog}
                onConfirmDialogClose={handleDialogClose}
                onYesClick={handleConfirmationResponse}
              />
            )}
          </Box>
        </div>
        </div>
      
      </Container>
      
      
  
      
    );
  };
  
  export default UserList;