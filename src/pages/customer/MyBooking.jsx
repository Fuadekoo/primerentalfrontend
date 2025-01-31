import React, { useEffect, useState } from "react";
import axiosInstance from "../../helpers/axiousInstance";
import { Card, Spin, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const response = await axiosInstance.get("/bookings/mybookings");
      setBookings(response.data.bookings);
      setLoading(false);
    } catch (error) {
      message.error("Error fetching bookings");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/bookings/${id}`);
          message.success("Booking deleted successfully");
          fetchBookings(); // Refresh the bookings list
        } catch (error) {
          message.error("Error deleting booking");
        }
      }
    });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.map((booking) => (
          <Card
            key={booking.id}
            title={`Booking ID: ${booking.id}`}
            bordered={false}
            className="shadow-lg rounded-lg"
            extra={<DeleteOutlined onClick={() => handleDelete(booking.id)} />}
          >
            <p>
              <strong>Phone Number:</strong> {booking.phone_number}
            </p>
            <p>
              <strong>Description:</strong> {booking.description}
            </p>
            <p>
              <strong>Status:</strong> {booking.status}
            </p>
            <p>
              <strong>Booking Date:</strong>{" "}
              {new Date(booking.created_at).toLocaleDateString()}
            </p>
            <p>
              <strong>Updated At:</strong>{" "}
              {new Date(booking.updated_at).toLocaleDateString()}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyBooking;
