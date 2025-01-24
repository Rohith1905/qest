import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Footer } from "../components";
import jsPDF from "jspdf";
import { emptyCart } from '../redux/action'; // Import emptyCart action
import "jspdf-autotable";

const Invoice = () => {
    const dispatch = useDispatch();
  const state = useSelector((state) => state.handleCart);
  const userDetails = useSelector((state) => state.userDetails); // Assuming user details are stored in Redux
  console.log("User Details from Redux:", userDetails);

  let subtotal = 0;
  let totalItems = 0;
  state.map((item) => {
    subtotal += item.price * item.qty;
    totalItems += item.qty;
  });

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.text("Invoice", 105, 20, null, null, "center");

    // User Details Section
    doc.setFontSize(12);
    doc.text(`Name: ${userDetails.firstName} ${userDetails.lastName}`, 20, 40);
    doc.text(`Email: ${userDetails.email}`, 20, 50);
    doc.text(`Address: ${userDetails.address}`, 20, 60);

    // Order Summary Table
    const tableColumn = ["Item", "Quantity", "Price"];
    const tableRows = [];
    state.forEach((item) => {
      tableRows.push([item.name, item.qty, `$${item.price}`]);
    });

    doc.autoTable({
      startY: 80,
      head: [tableColumn],
      body: tableRows,
    });

    // Total Section
    doc.setFontSize(14);
    doc.text(`Total Items: ${totalItems}`, 20, doc.autoTable.previous.finalY + 20);
    doc.text(`Total Amount: $${Math.round(subtotal)}`, 20, doc.autoTable.previous.finalY + 30);

    // Save PDF
    doc.save("invoice.pdf");
    //
    dispatch(emptyCart());
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h1 className="text-center">Invoice</h1>
        <hr />
        <div className="row my-4">
          {/* User Details */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-header py-3 bg-light">
                <h5 className="mb-0">Billing Details</h5>
              </div>
              <div className="card-body">
                <p><strong>Name:</strong> {userDetails.firstName} {userDetails.lastName}</p>
                <p><strong>Email:</strong> {userDetails.email}</p>
                <p><strong>Address:</strong> {userDetails.address}</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-header py-3 bg-light">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Products ({totalItems})<span>Rs. {Math.round(subtotal)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Total amount
                    <span>
                      <strong>Rs. {Math.round(subtotal)}</strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Download PDF Button */}
        <div className="row my-4">
          <div className="col-md-12 text-center">
            <button className="btn btn-primary" onClick={handleDownloadPDF}>
              Download Invoice (PDF)
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Invoice;
