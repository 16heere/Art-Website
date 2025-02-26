import React from "react";
import "../styles/getinvolved.css";
const GetInvolved = () => {
    return (
        <section id="get-involved" className="get-involved">
            <h2>Get Involved and Make a Difference</h2>
            <p>Support Mental Health through Art and Action</p>
            <ul>
                <li>
                    <strong>Purchase Art:</strong> Your purchase helps raise
                    awareness and funds for mental health initiatives.
                </li>
                <li>
                    <strong>Spread the Word:</strong> Share our website with
                    your friends and family.
                </li>
                <li>
                    <strong>Donate to UK MIND:</strong> Support mental health in
                    the UK through our{" "}
                    <a
                        href="https://www.justgiving.com/page/gurminder-randhawa-1709250402150"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            textDecoration: "none",
                            color: "#66c2ff",
                        }}
                    >
                        JustGiving page
                    </a>
                    .
                </li>
                <li>
                    <strong>Donate to NAMI USA:</strong> Help fund critical
                    programs for individuals and families in the US through
                    their{" "}
                    <a
                        href="https://www.nami.org/get-involved/donate-to-nami/"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            textDecoration: "none",
                            color: "#66c2ff",
                        }}
                    >
                        Donation page
                    </a>
                </li>
            </ul>
            <p>
                In Summer 2024, we raised <strong>$2,000</strong> for mental
                health during the NAMI Washington walk. Thank you to everyone
                who participated!
            </p>
        </section>
    );
};

export default GetInvolved;
