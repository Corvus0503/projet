import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box, styled } from "@mui/material";
import Breadcrumb from "../../utils/Breadcrumb";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const chargerListOrder = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/orders");
      setOrders(response.data);
      organizeData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    chargerListOrder();
  }, []);

  const organizeData = (orders) => {
    const statusCounts = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    const statuses = Object.keys(statusCounts);
    const counts = Object.values(statusCounts);

    setChartData({
      labels: statuses,
      datasets: [
        {
          label: "Order Statuses",
          data: counts,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  };

  return (
    <div>
      <Container className="mt-5">
        <div className="m-5 mt-3 mb-3">
          <div className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Dashboard" }]} />
          </div>
          <div className="container mt-5 p-5 card shadow">
            <h1 align="left"> Bienvenue </h1>
            <hr />

            <Box width="100%" overflow="auto">
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "Orders by Status",
                    },
                  },
                }}
              />
            </Box>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
