import React from 'react';

const Navbar = () => {
    return (
        <nav style={{ backgroundColor: '#3b0f00', padding: '10px 20px', marginBottom: '20px' }}>
            <h2 style={{ color: 'white', margin: 0 }}>Avanseus Leave Policy</h2>
        </nav>
    );
};

const EmployeeLeaveRules = () => {
    const goBack = () => {
        window.history.back(); // Navigate back to the previous page
    };
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
            <button onClick={goBack} className='bg-gradient-to-r from-red-600 to-black rounded-md hover:bg-red-700' style={{ color: 'white', padding: '10px 20px', marginBottom: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Go Back</button>
            <Navbar />
            <div style={{ backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)' }}>
                <h1 style={{ color: '#7F1D1D', textAlign: 'center', marginBottom: '30px', fontWeight: 'bold', fontSize: '25px' }}>Employee Leave Rules and Regulations</h1>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ color: '#7F1D1D', borderBottom: '3px solid #7F1D1D', paddingBottom: '10px', fontWeight: 'bold', fontSize: '20px' }}>Types of Leave</h2>
                    <ul style={{ color: '#666', marginLeft: '20px', listStyleType: 'none' }}>
                        <br />
                        <li style={{ marginBottom: "3px" }}><strong>Annual Leave/Vacation Leave:</strong> Paid time off for employees to take a break from work for personal reasons.</li>
                        <li style={{ marginBottom: "3px" }}><strong>Sick Leave:</strong> Paid time off for employees who are ill or need to care for a sick family member.</li>
                        <li style={{ marginBottom: "3px" }}><strong>Maternity/Paternity Leave:</strong> Paid time off for new parents following the birth or adoption of a child.</li>
                        <li style={{ marginBottom: "3px" }}><strong>Bereavement Leave:</strong> Paid time off for employees to grieve the loss of a close family member.</li>
                        <li style={{ marginBottom: "3px" }}><strong>Public Holidays:</strong> Paid days off for nationally recognized holidays.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ color: '#7F1D1D', borderBottom: '3px solid #7F1D1D', paddingBottom: '10px', fontWeight: 'bold', fontSize: '20px' }}>Requesting Leave</h2>
                    <p style={{ color: "#666" }}><strong>Employees must request leave in advance following the company's procedures. This may include filling out a leave request form or submitting requests through an online system.</strong></p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ color: '#7F1D1D', borderBottom: '3px solid #7F1D1D', paddingBottom: '10px', fontWeight: 'bold', fontSize: '20px' }}>Notice Periods</h2>
                    <p style={{ color: "#666" }}><strong>Employees must provide advance notice when requesting leave. Longer notice periods may be required for extended periods of leave or during busy seasons.</strong></p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ color: '#7F1D1D', borderBottom: '3px solid #7F1D1D', paddingBottom: '10px', fontWeight: 'bold', fontSize: '20px' }}>Documentation</h2>
                    <p style={{ color: "#666" }}><strong>Employees may need to provide documentation for certain types of leave, such as a doctor's note for sick leave or proof of a family member's death for bereavement leave.</strong></p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ color: '#7F1D1D', borderBottom: '3px solid #7F1D1D', paddingBottom: '10px', fontWeight: 'bold', fontSize: '20px' }}>Leave Carryover and Expiry</h2>
                    <p style={{ color: "#666" }}><strong>Unused leave may be carried over to the next year or expire if not used within a specified timeframe.</strong></p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ color: '#7F1D1D', borderBottom: '3px solid #7F1D1D', paddingBottom: '10px', fontWeight: 'bold', fontSize: '20px' }}>Paid vs. Unpaid Leave</h2>
                    <p style={{ color: "#666" }}><strong>Some types of leave are paid, while others may be unpaid.</strong></p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ color: '#7F1D1D', borderBottom: '3px solid #7F1D1D', paddingBottom: '10px', fontWeight: 'bold', fontSize: '20px' }}>Special Circumstances</h2>
                    <p style={{ color: "#666" }}><strong>Special circumstances like military leave, jury duty, or personal emergencies may be accommodated.</strong></p>
                </section>

                <section>
                    <h2 style={{ color: '#7F1D1D', borderBottom: '3px solid #7F1D1D', paddingBottom: '10px', fontWeight: 'bold', fontSize: '20px' }}>Penalties for Abuse</h2>
                    <p style={{ color: "#666" }}><strong>Consequences for abusing leave privileges may include disciplinary action or loss of leave benefits.</strong></p>
                </section>
            </div>
        </div>
    );
};

export default EmployeeLeaveRules;
